import { NextRequest, NextResponse } from 'next/server';
import {
  formatEmailSendError,
  isEmailConfigured,
  sendContactFormEmail,
} from '@/lib/email';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const recaptchaToken =
      typeof body.recaptchaToken === 'string' ? body.recaptchaToken : undefined;

    const recaptcha = await verifyRecaptchaToken(recaptchaToken, {
      remoteIp:
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.ip ||
        null,
      action: 'contact',
    });
    if (!recaptcha.ok) {
      return NextResponse.json({ error: recaptcha.error }, { status: 400 });
    }

    if (!name || name.length > MAX_NAME) {
      return NextResponse.json(
        { error: 'Please enter a valid name (max 120 characters).' },
        { status: 400 }
      );
    }

    if (!email || email.length > MAX_EMAIL || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || message.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: 'Please enter a message (max 5000 characters).' },
        { status: 400 }
      );
    }

    if (!isEmailConfigured() && process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Email service is temporarily unavailable. Please email us directly.' },
        { status: 503 }
      );
    }

    await sendContactFormEmail({ name, email, message });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent. We will get back to you soon.',
    });
  } catch (error) {
    console.error('[api/contact]', error);
    return NextResponse.json(
      { error: formatEmailSendError(error) },
      { status: 500 }
    );
  }
}
