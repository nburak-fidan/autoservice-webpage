// ============================================================
// Site-wide constants & business info
// TODO: Replace all placeholder values with real business data
// ============================================================

export const SITE_CONFIG = {
  name: "OtoElektronik Pro",
  tagline: "Opel & Chevrolet Elektronik Onarım Uzmanı",
  description:
    "Opel ve Chevrolet araçlar için profesyonel elektronik onarım hizmeti. ECU, BCM, EPS, gösterge paneli, airbag modülü ve immobilizer tamiri.",
  url: "https://www.otoelektronikpro.com", // TODO: real domain
  phone: "+90 555 123 4567", // TODO: real phone
  phoneRaw: "905551234567", // TODO: for WhatsApp link
  email: "info@otoelektronikpro.com", // TODO: real email
  address: {
    street: "Sanayi Mahallesi, Oto Sanayi Sitesi No: 42", // TODO
    district: "Nilüfer",
    city: "Bursa",
    zip: "16110",
    country: "TR",
  },
  geo: {
    lat: 40.2128,
    lng: 28.9744,
  },
  hours: {
    weekdays: "09:00 – 18:00",
    saturday: "09:00 – 14:00",
    sunday: "Kapalı",
  },
  social: {
    instagram: "https://instagram.com/otoelektronikpro", // TODO
    facebook: "https://facebook.com/otoelektronikpro", // TODO
    whatsapp: "https://wa.me/905551234567", // TODO
  },
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.1!2d28.97!3d40.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEyJzQ2LjEiTiAyOMKwNTgnMjcuOCJF!5e0!3m2!1str!2str!4v1234567890", // TODO
} as const;

export type SiteConfig = typeof SITE_CONFIG;
