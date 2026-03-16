import {
  Cpu,
  Gauge,
  CircuitBoard,
  KeyRound,
  AlertTriangle,
  Code,
  Globe,
  Cable,
  Cog,
  ScanLine,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// Services data — drives service cards, pages, and SEO
// ============================================================

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  image?: string;
  features: string[];
  brands: string[];
}

export const services: Service[] = [
  {
    slug: "ecu-tamiri",
    title: "ECU (Motor Beyni) Tamiri",
    shortTitle: "ECU Tamiri",
    description:
      "Opel, Chevrolet, Peugeot ve Citroen araçlarda motor kontrol ünitesi arıza tespiti, onarımı ve yazılım güncelleme hizmeti.",
    longDescription:
      "Motor kontrol ünitesi (ECU), aracınızın kalbini yöneten en kritik elektronik bileşendir. Uzman ekibimiz, ECU arızalarını son teknoloji ekipmanlarla tespit eder ve onarır. Yazılım güncelleme, harita yükleme ve kalibrasyon işlemleri yapılır.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1635073943212-f0564643dbf2?q=80&w=800&auto=format&fit=crop",
    features: [
      "Arıza kodu okuma ve silme",
      "ECU yazılım güncelleme",
      "Motor performans optimizasyonu",
      "İmmobilizer entegrasyon",
    ],
    brands: [
      "Opel Astra", "Opel Corsa", "Opel Insignia",
      "Chevrolet Cruze", "Chevrolet Aveo",
      "Peugeot 301", "Peugeot 308", "Peugeot 3008",
      "Citroen C3", "Citroen C4", "Citroen C-Elysée",
    ],
  },
  {
    slug: "bcm-tamiri",
    title: "BCM (Gövde Kontrol Modülü) Tamiri",
    shortTitle: "BCM Tamiri",
    description:
      "Gövde kontrol modülü onarımı: aydınlatma, merkezi kilit, cam ve ayna sistemleri.",
    longDescription:
      "BCM (Body Control Module), aracınızdaki aydınlatma, merkezi kilit, elektrikli cam, ayna ve silecek gibi gövde fonksiyonlarını kontrol eder. BCM arızalarında yaşanan elektrik sorunlarını kısa sürede çözüyoruz.",
    icon: CircuitBoard,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    features: [
      "Aydınlatma sistemi onarımı",
      "Merkezi kilit sistem tamiri",
      "Elektrikli cam ve ayna tamiri",
      "Kodlama ve programlama",
    ],
    brands: [
      "Opel Astra J/K", "Opel Corsa D/E", "Opel Mokka",
      "Chevrolet Cruze",
      "Peugeot 308", "Peugeot 508",
      "Citroen C4", "Citroen C5",
    ],
  },
  {
    slug: "eps-tamiri",
    title: "EPS (Elektrikli Direksiyon) Tamiri",
    shortTitle: "EPS Tamiri",
    description:
      "Elektrikli power steering ünitesi onarımı. Direksiyon ağırlaşması ve arıza lambası sorunları.",
    longDescription:
      "Elektrikli direksiyon sistemi (EPS) arızaları, sürüş güvenliğini doğrudan etkiler. Direksiyon ağırlaşması, arıza lambası yanması veya direksiyon titremesi gibi sorunları profesyonel olarak onarıyoruz.",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop",
    features: [
      "EPS motor onarımı",
      "Tork sensör tamiri",
      "Yazılım kalibrasyonu",
      "Direksiyon açı sensörü",
    ],
    brands: [
      "Opel Corsa D/E", "Opel Astra H/J", "Opel Meriva", "Opel Zafira",
      "Peugeot 207", "Peugeot 308",
      "Citroen C3", "Citroen C4",
    ],
  },
  {
    slug: "gosterge-paneli-tamiri",
    title: "Gösterge Paneli (Kilometre Saati) Tamiri",
    shortTitle: "Gösterge Paneli",
    description:
      "Gösterge paneli arızaları, ekran sönmesi, ibre sorunları ve piksel tamiri.",
    longDescription:
      "Araç gösterge panelinde yaşanan ekran sönmesi, piksel bozulması, ibre arızaları ve uyarı lambası sorunlarını çözüyoruz. Kilometre bilgisi korunarak onarım yapılır.",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop",
    features: [
      "LCD/TFT ekran tamiri",
      "İbre motoru değişimi",
      "Piksel onarımı",
      "Aydınlatma tamiri",
    ],
    brands: [
      "Opel Astra H/J/K", "Opel Corsa D/E", "Opel Insignia", "Opel Vectra C",
      "Peugeot 206", "Peugeot 307", "Peugeot 308",
      "Citroen C2", "Citroen C3", "Citroen C4",
    ],
  },
  {
    slug: "airbag-modulu-tamiri",
    title: "Airbag Modülü Tamiri",
    shortTitle: "Airbag Modülü",
    description:
      "Airbag kontrol ünitesi onarımı, crash data silme ve airbag arıza lambası çözümü.",
    longDescription:
      "Kaza sonrası airbag kontrol ünitesinde saklanan crash data silinir, modül onarılır ve airbag sisteminiz yeniden aktif hale getirilir. Yeni modül satın almaya gerek kalmadan ekonomik çözüm.",
    icon: AlertTriangle,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
    features: [
      "Crash data silme",
      "Airbag kontrol ünitesi onarımı",
      "Koltuk sensörü tamiri",
      "Arıza lambası çözümü",
    ],
    brands: [
      "Opel Astra", "Opel Corsa", "Opel Insignia",
      "Chevrolet Cruze", "Chevrolet Aveo",
      "Peugeot 301", "Peugeot 308", "Peugeot 3008",
      "Citroen C3", "Citroen C4", "Citroen C-Elysée",
    ],
  },
  {
    slug: "immobilizer-tamiri",
    title: "İmmobilizer Sistemi Tamiri",
    shortTitle: "İmmobilizer",
    description:
      "Anahtar tanıma sorunu, immobilizer kodlama, yedek anahtar programlama hizmeti.",
    longDescription:
      "İmmobilizer sistemi aracınızın güvenlik kalkanıdır. Anahtar tanımama, çalıştırmama ve güvenlik lambası sorunlarında hızlı ve güvenilir çözüm sunuyoruz. Yedek anahtar programlama da yapılmaktadır.",
    icon: KeyRound,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop",
    features: [
      "Anahtar programlama",
      "İmmobilizer kodlama",
      "Yedek anahtar yapımı",
      "PIN kodu hesaplama",
    ],
    brands: [
      "Opel Astra", "Opel Corsa", "Opel Vectra", "Opel Zafira",
      "Chevrolet Cruze", "Chevrolet Aveo",
      "Peugeot 301", "Peugeot 308",
      "Citroen C3", "Citroen C4", "Citroen C-Elysée",
    ],
  },
  {
    slug: "yazilim-dosya-hizmeti",
    title: "Yazılım & Dosya Hizmeti",
    shortTitle: "Yazılım & Dosya",
    description:
      "ECU yazılım güncelleme, dosya okuma/yazma, orijinal ve modifiye dosya hizmeti.",
    longDescription:
      "Profesyonel ekipmanlarımızla araç ECU yazılım dosyalarını okuma, yazma ve güncelleme hizmeti veriyoruz. Orijinal fabrika dosyaları ve özel modifiye dosyalar ile aracınızın performansını optimize ediyoruz. DPF, EGR, AdBlue ve çeşitli yazılım çözümleri sunulmaktadır.",
    icon: Code,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    features: [
      "ECU dosya okuma ve yazma",
      "Orijinal dosya güncelleme",
      "DPF/EGR/AdBlue yazılım çözümleri",
      "Modifiye dosya hazırlama",
    ],
    brands: [
      "Opel Astra", "Opel Corsa", "Opel Insignia",
      "Chevrolet Cruze", "Chevrolet Aveo",
      "Peugeot 301", "Peugeot 308", "Peugeot 3008",
      "Citroen C3", "Citroen C4", "Citroen C-Elysée",
      "Volkswagen Golf", "BMW 3 Serisi", "Mercedes C Serisi",
    ],
  },
  {
    slug: "yazilim-online-cozumler",
    title: "Yazılım & Online Çözümler",
    shortTitle: "Online Çözümler",
    description:
      "Uzaktan yazılım desteği, online dosya çözümleri ve anlık teknik destek hizmeti.",
    longDescription:
      "Türkiye genelinde uzaktan yazılım desteği sunuyoruz. Online dosya çözümleri, anlık teknik destek ve uzaktan erişim ile araç yazılım sorunlarınızı bulunduğunuz yerden çözüyoruz. Uzaktan ECU programlama, dosya hazırlama ve teknik danışmanlık hizmetleri mevcuttur.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    features: [
      "Uzaktan yazılım desteği",
      "Online dosya çözümleri",
      "Anlık teknik destek",
      "Uzaktan ECU programlama",
    ],
    brands: [
      "Tüm Markalar",
      "Opel", "Chevrolet", "Peugeot", "Citroen",
      "Volkswagen", "BMW", "Mercedes", "Audi",
      "Ford", "Renault", "Fiat", "Toyota",
    ],
  },
  {
    slug: "tesisat-tamiri",
    title: "Araç Elektrik Tesisat Tamiri",
    shortTitle: "Tesisat Tamiri",
    description:
      "Araç elektrik tesisatı onarımı, kablo tamiri, sigorta kutusu ve topraklama sorunları çözümleri.",
    longDescription:
      "Araç elektrik tesisatı, aracınızdaki tüm elektronik sistemlerin çalışmasını sağlayan sinir ağıdır. Kısa devre, kablo kopması, sigorta patlaması, topraklama sorunları ve tesisat erimeleri gibi arızaları profesyonel ekipmanlarla tespit edip onarıyoruz. Komple tesisat yenileme, kablo tamiri ve sigorta kutusu onarımı hizmetleri sunuyoruz.",
    icon: Cable,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop",
    features: [
      "Komple tesisat onarımı",
      "Kısa devre tespiti ve tamiri",
      "Sigorta kutusu onarımı",
      "Topraklama sorunları çözümü",
      "Kablo tamiri ve yenileme",
    ],
    brands: [
      "Opel Astra", "Opel Corsa", "Opel Insignia", "Opel Zafira",
      "Chevrolet Cruze", "Chevrolet Aveo",
      "Peugeot 301", "Peugeot 308", "Peugeot 3008",
      "Citroen C3", "Citroen C4", "Citroen C-Elysée",
    ],
  },
  {
    slug: "easytronic-robot-tamiri",
    title: "Easytronic Robot Şanzıman Tamiri",
    shortTitle: "Easytronic Robot",
    description:
      "Opel Easytronic robotize şanzıman aktüatör tamiri, yazılım kalibrasyonu ve debriyaj ayarı.",
    longDescription:
      "Opel Corsa, Meriva ve Zafira araçlarda kullanılan Easytronic robotize şanzıman sistemi, aktüatör arızaları, debriyaj aşınması ve yazılım kaynaklı sorunlar yaşayabilir. Uzman ekibimiz aktüatör motor tamiri, debriyaj pot ayarı, vites sensörü onarımı ve ECU kalibrasyonu işlemlerini gerçekleştirir. Yeni aktüatör almak yerine ekonomik tamir çözümü sunuyoruz.",
    icon: Cog,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop",
    features: [
      "Aktüatör motor tamiri",
      "Debriyaj pot ayarı",
      "Vites sensörü onarımı",
      "Şanzıman yazılım kalibrasyonu",
      "Debriyaj seti değişimi",
    ],
    brands: [
      "Opel Corsa C", "Opel Corsa D", "Opel Meriva A", "Opel Meriva B",
      "Opel Zafira A", "Opel Zafira B", "Opel Astra H",
    ],
  },
  {
    slug: "arac-ustu-diagnoz",
    title: "Araç Üstü Diagnoz & Arıza Tespiti",
    shortTitle: "Araç Üstü Diagnoz",
    description:
      "Yerinde profesyonel arıza tespiti, osiloskop ve diagnoz cihazı ile detaylı teşhis hizmeti.",
    longDescription:
      "Son teknoloji diagnoz cihazları, osiloskop ve multimetre ile aracınızın tüm elektronik ve mekanik sistemlerini yerinde teşhis ediyoruz. Motor, şanzıman, ABS, ESP, airbag, klima ve diğer tüm sistemlerin arıza kodlarını okuyarak sorunun kaynağını tespit ediyoruz. Hızlı ve doğru teşhis ile gereksiz parça değişiminin önüne geçiyoruz.",
    icon: ScanLine,
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=800&auto=format&fit=crop",
    features: [
      "Profesyonel diagnoz cihazı ile tarama",
      "Osiloskop ile sinyal analizi",
      "Arıza kodu okuma ve yorumlama",
      "Tüm elektronik sistemlerin kontrolü",
      "Detaylı arıza raporu",
    ],
    brands: [
      "Opel Astra", "Opel Corsa", "Opel Insignia", "Opel Mokka",
      "Chevrolet Cruze", "Chevrolet Aveo", "Chevrolet Captiva",
      "Peugeot 301", "Peugeot 308", "Peugeot 3008",
      "Citroen C3", "Citroen C4", "Citroen C-Elysée",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
