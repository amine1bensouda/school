/**
 * Teste l'envoi e-mail depuis le VPS ou en local.
 * Usage: npx tsx scripts/test-email.ts votre@email.com
 */
import 'dotenv/config';
import { getEmailProviderLabel, isEmailConfigured, sendVerificationCodeEmail } from '../src/lib/email';

async function main() {
  const to = process.argv[2]?.trim();

  if (!to) {
    console.error('Usage: npx tsx scripts/test-email.ts votre@email.com');
    process.exit(1);
  }

  if (!isEmailConfigured()) {
    console.error('❌ Aucun provider e-mail configuré.');
    console.error('   Ajoutez RESEND_API_KEY (+ RESEND_FROM) ou SMTP_* dans .env');
    process.exit(1);
  }

  const provider = getEmailProviderLabel();
  console.log(`Provider: ${provider}`);
  console.log(`Envoi d'un code test à ${to}...`);

  try {
    await sendVerificationCodeEmail(to, 'Test User', '123456');
    console.log('✅ E-mail envoyé avec succès.');
  } catch (error) {
    console.error('❌ Échec:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
