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
  {
    slug: "arac-tesisat-arizasi",
    title: "Araç Elektrik Tesisat Arızası",
    description:
      "Araç elektrik tesisatında kısa devre, kablo kopması, sigorta patlaması ve elektrik kesintisi sorunları.",
    symptoms: [
      "Aracın elektrik sistemi çalışmıyor",
      "Sigortalar sürekli atıyor",
      "Farlar veya iç aydınlatma yanmıyor",
      "Akü hızlı boşalıyor",
      "Kablo tesisatında erime kokusu",
    ],
    relatedServiceSlug: "tesisat-tamiri",
  },
  {
    slug: "easytronic-robot-sanziman-arizasi",
    title: "Easytronic Robot Şanzıman Arızası",
    description:
      "Opel Corsa, Meriva ve Zafira araçlarda Easytronic robotize şanzıman aktüatör ve yazılım arızaları.",
    symptoms: [
      "Vites geçmiyor veya takılıyor",
      "F harfi veya şanzıman uyarısı yanıyor",
      "Araç sarsarak vites değiştiriyor",
      "Debriyaj sürtünmesi veya kayması",
      "Düz yolda geri kayma hissi",
    ],
    relatedServiceSlug: "easytronic-robot-tamiri",
  },
  {
    slug: "arac-ustu-diagnoz-arizasi",
    title: "Araç Üstü Diagnoz & Arıza Tespiti",
    description:
      "Yerinde teşhis hizmeti ile aracınızın elektronik ve mekanik arızalarının hızlı tespiti.",
    symptoms: [
      "Motor kontrol lambası yanıyor",
      "Araç performansı düştü",
      "Nedeni bilinmeyen uyarı lambaları",
      "Araç çalışmıyor veya durma problemi",
      "Elektronik sistemlerde belirsiz arızalar",
    ],
    relatedServiceSlug: "arac-ustu-diagnoz",
  },
  {
    slug: "online-yazilim-guncelleme-sorunlari",
    title: "Online Yazılım & Güncelleme Sorunları",
    description:
      "ECU yazılım güncelleme gereklilikleri, yazılım kaynaklı performans düşüklüğü ve online çözümler.",
    symptoms: [
      "Araç performansı düşük",
      "Yakıt tüketimi normalin üstünde",
      "Motor rölantide dengesiz çalışıyor",
      "Vites geçişlerinde sertlik",
      "Fabrika güncellemesi gerekiyor uyarısı",
    ],
    relatedServiceSlug: "yazilim-online-cozumler",
  },
];

export function getFaultBySlug(slug: string): Fault | undefined {
  return faults.find((f) => f.slug === slug);
}
