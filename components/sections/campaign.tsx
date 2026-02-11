"use client";

import { ArrowRight, Repeat, Sparkles, BadgePercent } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG as siteConfig } from "@/lib/content/site-config";
import { motion } from "framer-motion";

const campaigns = [
  {
    title: "Eskiyi Getir, Yeniyi Al",
    description:
      "Arızalı ECU, BCM veya gösterge panelinizi getirin, yenilenmiş veya sıfır ürünlerle uygun fiyata değiştirin. Eski parçanız indirim olarak düşülür!",
    badge: "Popüler",
    icon: Repeat,
    features: [
      "Eski parça takas indirimi",
      "Garantili yenilenmiş ürünler",
      "Aynı gün montaj imkanı",
    ],
  },
  {
    title: "Kargo ile Onarım",
    description:
      "Türkiye'nin neresinde olursanız olun, arızalı parçanızı kargo ile gönderin, onarılmış halini geri alın. Kargo masrafı bizden!",
    badge: "Ücretsiz Kargo",
    icon: Sparkles,
    features: [
      "Türkiye geneli hizmet",
      "Ücretsiz kargo (gidiş-dönüş)",
      "2-3 iş günü teslimat",
    ],
  },
  {
    title: "Filo İndirimi",
    description:
      "3 ve üzeri araç için toplu onarım ve bakım hizmeti. Filo sahiplerine özel %15'e varan indirimler!",
    badge: "%15 İndirim",
    icon: BadgePercent,
    features: [
      "Toplu onarım avantajı",
      "Öncelikli servis hakkı",
      "Özel filo fiyatlandırması",
    ],
  },
];

export function CampaignSection() {
  const phoneClean = siteConfig.phone.replace(/[\s+]/g, "");

  return (
    <SectionWrapper id="campaigns">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand/5 rounded-full blur-[120px]" />

      <ScrollReveal>
        <div className="text-center mb-14">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-sm font-bold mb-5"
          >
            <Sparkles className="h-4 w-4" />
            Kampanyalar
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Fırsatları{" "}
            <span className="text-gradient-gold">Kaçırmayın</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Size özel kampanyalarımızdan yararlanın, oto elektronik
            onarımlarınızda tasarruf edin.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign, i) => (
          <ScrollReveal key={campaign.title} delay={i * 0.1}>
            <div className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden h-full transition-all duration-500 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-2">
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-brand via-brand-light to-brand" />

              {/* Badge */}
              <div className="absolute top-5 right-5">
                <span className="px-3 py-1 rounded-full bg-brand text-black text-xs font-black uppercase tracking-wide">
                  {campaign.badge}
                </span>
              </div>

              <div className="p-7 flex flex-col flex-1">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-5 group-hover:bg-brand group-hover:text-black transition-all duration-500 group-hover:shadow-lg group-hover:shadow-brand/30 group-hover:scale-110">
                  <campaign.icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-brand transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {campaign.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {campaign.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/${phoneClean}?text=${encodeURIComponent(`Merhaba, "${campaign.title}" kampanyası hakkında bilgi almak istiyorum.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-brand text-black font-bold hover:bg-brand-light transition-all duration-300 hover:shadow-lg hover:shadow-brand/30 group-hover:animate-pulse-glow">
                    Bilgi Al
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
