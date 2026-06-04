import dns from 'dns';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

// VPS sans IPv6 : éviter ENETUNREACH vers smtp.gmail.com en IPv6
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'The School of Mathematics';

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim() || user || 'noreply@schoolofmathematics.com';

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
  return getSmtpConfig() !== null;
}

export async function sendVerificationCodeEmail(
  to: string,
  name: string,
  code: string
): Promise<void> {
  const smtp = getSmtpConfig();
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

  if (!smtp) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[email:dev] SMTP non configuré — code de vérification:', {
        to,
        code,
      });
      return;
    }
    throw new Error(
      'Email service is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.'
    );
  }

  const transportOptions: SMTPTransport.Options = {
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    requireTLS: smtp.port === 587,
    auth: {
      user: smtp.auth.user,
      pass: smtp.auth.pass,
    },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 30_000,
  };

  const transporter = nodemailer.createTransport(transportOptions);

  await transporter.sendMail({
    from: smtp.from,
    to,
    subject,
    text,
    html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
