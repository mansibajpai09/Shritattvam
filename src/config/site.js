export const SITE = {
  name: 'ShriTattvam',
  tagline:
    'Premium pooja essentials, exquisitely curated for a divine experience.',
  phoneDisplay: '+91 82998 29846',
  phoneTel: '+918299829846',
  whatsappNumber: '918299829846',
  email: 'shritattvam@gmail.com',
  supportHours: 'Mon - Sat | 10:00 AM - 7:00 PM',
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
  },
}

export function getWhatsAppUrl(text = '') {
  const base = `https://wa.me/${SITE.whatsappNumber}`
  if (!text) return base
  return `${base}?text=${encodeURIComponent(text)}`
}
