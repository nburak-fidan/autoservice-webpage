// ============================================================
// Testimonials data — Google İşletme Profili'nden gerçek yorumlar
// GM OPEL GARAGE — PSA SERVİS
// ============================================================

export interface Testimonial {
  name: string;
  text: string;
  rating: number; // 1-5
  source: "google";
}

export const testimonials: Testimonial[] = [
  {
    name: "Atakan Canpolat",
    text: "Kendim 15 yıllık Borusan personeliyim, BORUSAN BMW servis standartlarında çalışan birisi olarak Opel ve Chevrolet otomobillerinizin servis ihtiyaçlarınızı servislerin yarı fiyatına karşılayabilirsiniz. Levent Bey gerçek bir usta, gerçek bir esnaf. İlk karşılama ve ağırlanmaktan memnun kaldım, o kadar yoğun olmalarına rağmen aracımı cihaza bağlayıp konu hakkında hızlı bir bilgi paylaştılar. Sallamasyon değil, gerçekten sorunları ve sebepleri paylaşıldı.",
    rating: 5,
    source: "google",
  },
  {
    name: "Yavuz Sakallı",
    text: "Tavsiye ve öneri üzerine kendilerine ulaştım. Aracımın şanzıman beyninde arıza tespit edilip en hızlı şekilde çözüme ulaştırıldı. Levent Bey ve ekibi bu konuda gördüğüm ve deneyimlediğim en uzman kişiler. Ödeme ve zaman konusunda bana olan yardımları için sonsuz teşekkür ederim. Gönül rahatlığı ile aracınızı bırakabileceğiniz esnaflardır.",
    rating: 5,
    source: "google",
  },
  {
    name: "Mehmet Gelen",
    text: "Aracım oksijen sensör arızası veriyordu, parçayı kendim aldım arkadaşlar montajını yaptı ve bir kuruş ücret ödemedim. Levent ustama ve ekibine çok teşekkür ederim, çok iyi ilgilendiler. Topkapı deyince biraz ön yargım vardı ama arkadaşlar çok samimi ve güler yüzlü. Hayırlı işler ve bol bereketli kazançlar dilerim 🙏",
    rating: 5,
    source: "google",
  },
  {
    name: "Hüseyin İmamoğlu",
    text: "Randevusuz gitmeme rağmen yolu bulamadım diye aradım. Hemen personel gönderip aldırdılar. Gerekli incelemeler ve bilgilendirmeler yapıldı. Ardından işlemler hızlı bir şekilde başladı ve öğlene işimiz bitti. Aracımdaki F arızası sorunu çözüldü. Başta Levent usta olmak üzere tüm ekibe teşekkür ederim.",
    rating: 5,
    source: "google",
  },
  {
    name: "İsmail Günaltay",
    text: "Yaklaşık 1 yıldır yaşamış olduğum sorunu çözdükleri için başta Levent ve Şenol usta olmak üzere tüm ekip arkadaşlarına teşekkür ederim.",
    rating: 5,
    source: "google",
  },
  {
    name: "Furkan Yücel",
    text: "Chevrolet Cruze aracımı getirdim, hızlı kontroller sayesinde beyinden arıza verdiğini söylediler. Kesin bir şekilde beyin değişti, arıza gitti. Levent usta ilgilendi, çalışan herkesin eline sağlık. Başka yerde şanzımanı yaptırdım, burayı sonradan öğrendiğim için keşke burada yaptırsaydım dedim. İşinde çok iyiler, kesinlikle tavsiye ederim.",
    rating: 5,
    source: "google",
  },
];

// Google İşletme Profili özet bilgileri
export const googleReviewSummary = {
  averageRating: 4.9,
  totalReviews: 429,
  businessName: "GM OPEL GARAGE",
};
