import dns from 'dns';
import { lookup } from 'dns/promises';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

// VPS sans IPv6 : préférer IPv4 pour toute résolution DNS
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'The School of Mathematics';

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM?.trim() ||
    process.env.SMTP_FROM?.trim() ||
    `The School of Mathematics <noreply@theschoolofmathematics.com>`;

  if (!apiKey) return null;
  return { apiKey, from };
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim() || user || 'noreply@theschoolofmathematics.com';

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    from,
  };
}

export function isEmailConfigured(): boolean {
  return getResendConfig() !== null || getSmtpConfig() !== null;
}

export function getEmailProviderLabel(): 'resend' | 'smtp' | null {
  if (getResendConfig()) return 'resend';
  if (getSmtpConfig()) return 'smtp';
  return null;
}

/** Message utilisateur pour les erreurs d'envoi (timeout SMTP, etc.). */
export function formatEmailSendError(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code?: string }).code)
      : '';

  if (
    /timeout|ETIMEDOUT|ECONNREFUSED|ENETUNREACH|ESOCKET|Connection timeout|Greeting never received/i.test(
      msg + code
    )
  ) {
    return 'Le serveur e-mail ne répond pas (timeout). Sur le VPS, ajoutez RESEND_API_KEY dans .env (recommandé) ou vérifiez SMTP_HOST / ports 587-465.';
  }

  if (/Invalid login|EAUTH|authentication/i.test(msg)) {
    return 'Identifiants SMTP incorrects. Vérifiez SMTP_USER et SMTP_PASS (mot de passe d\'application pour Gmail).';
  }

  if (/domain is not verified|not authorized|RESEND/i.test(msg)) {
    return msg;
  }

  return msg || 'Impossible d\'envoyer l\'e-mail de confirmation.';
}

async function resolveSmtpHostIpv4(hostname: string): Promise<string> {
  const override = process.env.SMTP_HOST_IPV4?.trim();
  if (override) return override;

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    return hostname;
  }

  const { address } = await lookup(hostname, { family: 4 });
  return address;
}

async function sendViaResend(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  const resend = getResendConfig();
  if (!resend) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resend.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resend.from,
      to: [to],
      subject,
      html,
      text,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    message?: string;
    name?: string;
  };

  if (!response.ok) {
    throw new Error(data.message || data.name || `Resend API error (${response.status})`);
  }
}

async function sendViaSmtp(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error(
      'Email service is not configured. Set RESEND_API_KEY or SMTP_HOST, SMTP_USER, and SMTP_PASS.'
    );
  }

  const smtpHostname = smtp.host;
  const smtpHostIpv4 = await resolveSmtpHostIpv4(smtpHostname);

  const portsToTry =
    smtp.port === 465 || smtp.port === 587
      ? [smtp.port, smtp.port === 587 ? 465 : 587]
      : [smtp.port];

  let lastError: unknown;

  for (const port of portsToTry) {
    const transportOptions: SMTPTransport.Options = {
      host: smtpHostIpv4,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: {
        user: smtp.auth.user,
        pass: smtp.auth.pass,
      },
      tls: {
        servername: smtpHostname,
      },
      connectionTimeout: 25_000,
      greetingTimeout: 25_000,
      socketTimeout: 35_000,
    };

    const transporter = nodemailer.createTransport(transportOptions);

    try {
      await transporter.sendMail({
        from: smtp.from,
        to,
        subject,
        text,
        html,
      });
      return;
    } catch (err) {
      lastError = err;
      console.error(`[email] SMTP port ${port} failed:`, err);
    }
  }

  throw lastError instanceof Error ? lastError : new Error('SMTP send failed');
}

export async function sendVerificationCodeEmail(
  to: string,
  name: string,
  code: string
): Promise<void> {
  const subject = `${SITE_NAME} — Code de confirmation (${code})`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #111;">Confirmez votre inscription</h2>
      <p>Bonjour ${escapeHtml(name)},</p>
      <p>Voici votre code de confirmation pour créer un compte sur <strong>${escapeHtml(SITE_NAME)}</strong> :</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 16px; background: #f3f4f6; border-radius: 12px; color: #111;">
        ${code}
      </p>
      <p style="color: #666; font-size: 14px;">Ce code expire dans <strong>15 minutes</strong>. Ne le partagez avec personne.</p>
      <p style="color: #666; font-size: 14px;">Si vous n'avez pas demandé cette inscription, ignorez cet e-mail.</p>
    </div>
  `;

  const text = `Bonjour ${name},\n\nVotre code de confirmation : ${code}\n\nIl expire dans 15 minutes.\n\n— ${SITE_NAME}`;

  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[email:dev] Aucun provider — code de vérification:', { to, code });
      return;
    }
    throw new Error(
      'Email service is not configured. Set RESEND_API_KEY (recommended) or SMTP_* variables.'
    );
  }

  // Resend (HTTPS) en priorité — évite les blocages SMTP sur VPS
  if (getResendConfig()) {
    await sendViaResend(to, subject, html, text);
    return;
  }

  await sendViaSmtp(to, subject, html, text);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
