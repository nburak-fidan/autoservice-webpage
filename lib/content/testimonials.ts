// ============================================================
// Testimonials data
// TODO: Replace with real customer testimonials
// ============================================================

export interface Testimonial {
  name: string;
  vehicle: string;
  service: string;
  text: string;
  rating: number; // 1-5
}

export const testimonials: Testimonial[] = [
  {
    name: "Ahmet Y.",
    vehicle: "Opel Astra J 2015",
    service: "ECU Tamiri",
    text: "Motor beyni arızası nedeniyle aracım çalışmıyordu. Aynı gün teslim aldım, mükemmel hizmet. Bayiye kıyasla çok daha uygun fiyata çözüldü.",
    rating: 5,
  },
  {
    name: "Mehmet K.",
    vehicle: "Opel Corsa E 2018",
    service: "EPS Tamiri",
    text: "Direksiyon ağırlaşma problemi yaşıyordum. Profesyonel ekip sorunu hızlıca teşhis edip aynı gün çözdü. 1 yıldır sorunsuz kullanıyorum.",
    rating: 5,
  },
  {
    name: "Fatma S.",
    vehicle: "Chevrolet Cruze 2016",
    service: "BCM Tamiri",
    text: "Merkezi kilit ve cam sorunları beni çok yormuştu. Burada kısa sürede onarıldı. İlgili ve güvenilir bir ekip, herkese tavsiye ederim.",
    rating: 5,
  },
  {
    name: "Emre D.",
    vehicle: "Opel Insignia 2017",
    service: "Gösterge Paneli",
    text: "Gösterge panelim tamamen sönmüştü. Piksel sorunu ve aydınlatma tamamen giderildi. Araç sanki sıfır gibi oldu, çok memnunum.",
    rating: 5,
  },
  {
    name: "Ayşe B.",
    vehicle: "Opel Astra H 2012",
    service: "Airbag Modülü",
    text: "Kaza sonrası airbag lambası sürekli yanıyordu. Crash data silindi ve modül onarıldı. Yeni modül almak yerine çok ekonomik bir çözüm oldu.",
    rating: 5,
  },
];
