import {
  Cpu,
  Gauge,
  CircuitBoard,
  KeyRound,
  AlertTriangle,
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
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
