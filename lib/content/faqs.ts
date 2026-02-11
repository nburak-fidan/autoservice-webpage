// ============================================================
// FAQ data — drives FAQ accordion + JSON-LD FAQ schema
// ============================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "ECU tamiri ne kadar sürer?",
    answer:
      "Arızanın türüne bağlı olarak ECU tamiri genellikle 1-3 iş günü içinde tamamlanır. Basit yazılım sorunları aynı gün çözülebilir. Donanımsal onarımlar daha uzun sürebilir.",
  },
  {
    question: "Onarım sonrası garanti veriyor musunuz?",
    answer:
      "Evet, tüm onarımlarımız için 12 ay garanti sunuyoruz. Garanti süresi içinde aynı arızanın tekrarlanması durumunda ücretsiz onarım yapılır.",
  },
  {
    question: "Hangi Opel ve Chevrolet modellere hizmet veriyorsunuz?",
    answer:
      "Opel Astra, Corsa, Insignia, Vectra, Zafira, Mokka, Meriva ve tüm Chevrolet Cruze, Aveo, Captiva modellerine hizmet veriyoruz. Diğer modeller için lütfen bizi arayın.",
  },
  {
    question: "Araç teslim alınıyor mu?",
    answer:
      "Şehir içi belirli bölgelerden araç teslim alma hizmeti sunuyoruz. Ayrıca modül olarak söküp gönderebileceğiniz parçalar için kargo ile de çalışıyoruz.",
  },
  {
    question: "Onarım fiyatları ne kadar?",
    answer:
      "Fiyatlar arızanın türüne ve kapsamına göre değişir. Ücretsiz ön teşhis sonrası net fiyat bilgisi verilir. Yeni modül satın almaya kıyasla %50-70 tasarruf sağlarsınız.",
  },
  {
    question: "Crash data silme nedir?",
    answer:
      "Kaza sonrası airbag kontrol ünitesinde kaza verisi (crash data) kaydedilir. Bu veri silinmeden airbag sistemi tekrar aktif olmaz. Crash data silme işlemi ile modülünüz sıfır gibi çalışır hale gelir.",
  },
  {
    question: "Randevu almam gerekiyor mu?",
    answer:
      "Randevu almanız önerilir; böylece size özel zaman ayırabilir ve bekleme süresini minimuma indirebiliriz. Telefon veya WhatsApp üzerinden kolayca randevu oluşturabilirsiniz.",
  },
];
