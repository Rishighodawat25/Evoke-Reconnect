/**
 * EVOKE Reconnect – WhatsApp Message Generator
 * Generates personalized WhatsApp messages for each lead.
 * Does NOT send automatically. CSV export only.
 */

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://evoke-reconnect.vercel.app';
const RISHI_PHONE = import.meta.env.VITE_RISHI_WHATSAPP || '919876543210';

/**
 * Generate a WhatsApp message for a single lead
 */
export function generateWhatsAppMessage(lead) {
  const firstName = lead.name.split(' ')[0];
  const url = `${BASE_URL}/${lead.slug}`;

  return `Hi ${firstName},

I was reviewing some of our old EVOKE South Goa enquiries today and came across your name.

Instead of sending another brochure, I put together something a little different:

${url}

Would genuinely love your feedback.

– Rishi`;
}

/**
 * Generate a WhatsApp click URL for Rishi's follow-up
 * (used on the lead page after they respond YES / MAYBE)
 */
export function getWhatsAppUrl(lead, message) {
  const firstName = lead.name.split(' ')[0];
  const defaultMsg = message || `Hi, I just visited the EVOKE page you sent me. I'm ${firstName} from ${lead.city || 'India'}.`;
  const encoded = encodeURIComponent(defaultMsg);
  return `https://wa.me/${RISHI_PHONE}?text=${encoded}`;
}

/**
 * Export all leads as a CSV with WhatsApp messages
 * Returns a Blob for download
 */
export function exportWhatsAppCSV(leads) {
  const rows = [
    ['Name', 'Phone', 'City', 'Unique URL', 'WhatsApp Message'],
    ...leads.map((lead) => [
      lead.name,
      lead.phone,
      lead.city,
      `${BASE_URL}/${lead.slug}`,
      generateWhatsAppMessage(lead).replace(/\n/g, ' | '),
    ]),
  ];

  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
}

/**
 * Trigger CSV download in the browser
 */
export function downloadCSV(blob, filename = 'evoke-whatsapp-messages.csv') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
