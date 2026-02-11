// ============================================================
// Common faults data — for /faults listing and detail pages
// ============================================================

export interface Fault {
  slug: string;
  title: string;
  description: string;
  symptoms: string[];
  relatedServiceSlug: string; // links to a service
}

export const faults: Fault[] = [
  {
    slug: "opel-astra-ecu-arizasi",
    title: "Opel Astra ECU Arızası",
    description:
      "Opel Astra araçlarda sık karşılaşılan motor beyni arızaları, belirtileri ve çözüm yöntemleri.",
    symptoms: [
      "Motor çalışmıyor veya zor çalışıyor",
      "Check Engine lambası yanıyor",
      "Araç rölantide titriyor",
      "Yakıt tüketimi arttı",
    ],
    relatedServiceSlug: "ecu-tamiri",
  },
  {
    slug: "opel-corsa-eps-arizasi",
    title: "Opel Corsa EPS (Direksiyon) Arızası",
    description:
      "Opel Corsa D ve E modellerde sık görülen elektrikli direksiyon arızaları ve çözümleri.",
    symptoms: [
      "Direksiyon ağırlaştı",
      "Direksiyon simidi titriyor",
      "EPS uyarı lambası yandı",
      "Düşük hızda direksiyon zorlanıyor",
    ],
    relatedServiceSlug: "eps-tamiri",
  },
  {
    slug: "opel-astra-bcm-arizasi",
    title: "Opel Astra BCM Arızası",
    description:
      "Opel Astra J ve K modellerde gövde kontrol modülü arızaları ve çözüm yöntemleri.",
    symptoms: [
      "Farlar düzensiz çalışıyor",
      "Merkezi kilit çalışmıyor",
      "Silecek sorunları",
      "Elektrikli camlar tepki vermiyor",
    ],
    relatedServiceSlug: "bcm-tamiri",
  },
  {
    slug: "chevrolet-cruze-airbag-arizasi",
    title: "Chevrolet Cruze Airbag Arızası",
    description:
      "Chevrolet Cruze araçlarda airbag uyarı lambası ve kontrol modülü sorunları.",
    symptoms: [
      "Airbag uyarı lambası sürekli yanıyor",
      "Kaza sonrası airbag açılmadı",
      "Koltuk sensörü uyarısı",
      "SRS sistemi arızalı",
    ],
    relatedServiceSlug: "airbag-modulu-tamiri",
  },
];

export function getFaultBySlug(slug: string): Fault | undefined {
  return faults.find((f) => f.slug === slug);
}
