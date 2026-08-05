import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import ContactForm from '@/components/Contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME} - We'd love to hear from you`,
  alternates: { canonical: '/contact-us' },
};

const CONTACT_EMAIL = 'contact@schoolofmathematics.com';
const SUPPORT_EMAIL = 'support@schoolofmathematics.com';

export default function ContactUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-8">
          We'd love to hear from you! Whether you have a question, feedback, or need support,
          our team is here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card-modern p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold mb-1">Email</p>
                <p className="text-gray-600">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gray-900 underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Support</p>
                <p className="text-gray-600">
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-gray-900 underline">
                    {SUPPORT_EMAIL}
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Business Hours</p>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Response Time</p>
                <p className="text-gray-600">We typically reply within 1–2 business days.</p>
              </div>
            </div>
          </div>

          <div className="card-modern p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-gray-600">
                Stay connected with us on social media for updates, tips, and educational content.
              </p>
            </div>
          </div>
        </div>

        <div className="card-modern p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
