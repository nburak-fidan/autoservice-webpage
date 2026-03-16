// ============================================================
// Site-wide constants & business info
// GM OPEL GARAGE — PSA SERVİS
// ============================================================

export const SITE_CONFIG = {
  name: "GM Opel Garage",
  nameSecondary: "PSA Servis",
  tagline: "Opel Chevrolet Peugeot Citroen Elektrik & Elektronik Uzmanı",
  description:
    "1998 yılından bu yana Opel, Chevrolet, Peugeot ve Citroen marka araçlara elektrik, elektronik, oto beyin tamiri, yazılım & dosya hizmeti, yedek parça ve mekanik servis hizmeti veren profesyonel ekip. Dr.Şair markası ile tüm araçlara chip tuning ve yazılım çözümleri. Doğru ve hızlı teşhis ile 6 ay garantili onarım.",
  url: "https://www.gmopelgarage.com",
  // İletişim hatları
  phone: "0212 482 07 90",         // Şirket hattı
  phoneRaw: "902124820790",
  whatsappNumbers: [
    { label: "WhatsApp 1", number: "0539 342 42 46", raw: "905393424246" },
    { label: "WhatsApp 2", number: "0532 307 77 71", raw: "905323077771" },
  ],
  email: "info@gmopelgarage.com",
  address: {
    street: "Avrupa Yakası, Maltepe",
    district: "Zeytinburnu",
    city: "İstanbul",
    zip: "34010",
    country: "TR",
  },
  geo: {
    lat: 41.0482,
    lng: 28.9015,
  },
  hours: {
    weekdays: "08:30 – 18:30",
    saturday: "09:00 – 15:00",
    sunday: "Kapalı",
  },
  social: {
    instagram: "https://www.instagram.com/gm_opel_garage?igsh=MWJqa203cTRqN3l5OQ==",
    facebook: "https://www.facebook.com/share/1QK5gsm3zc/?mibextid=wwXIfr",
    youtube: "https://youtube.com/@gmopelgarage.?si=kMwNKzgQvUG6hKVb",
    tiktok: "https://www.tiktok.com/@gm.opel.garage?_r=1&_t=ZS-93wOxxKVLX7",
    whatsapp: "https://wa.me/905393424246",
    googleReviews: "https://maps.app.goo.gl/b4LCQKKeRA6WQ3GE9",
  },
  // Markalar
  brands: ["Opel", "Chevrolet", "Peugeot", "Citroen"],
  // Garanti
  warranty: "6 Ay",
  // Kuruluş yılı
  foundedYear: 1998,
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.5!2d28.90!3d41.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAzJzAyLjAiTiAyOMKwNTQnMDUuNCJF!5e0!3m2!1str!2str!4v1234567890",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
