import {
  ShieldCheck,
  Clock,
  BadgeDollarSign,
  Award,
  Truck,
  HeadphonesIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const reasons = [
  {
    icon: Award,
    title: "15+ Yıl Deneyim",
    description:
      "Opel ve Chevrolet araçlarda uzmanlaşmış, 15 yılı aşkın sektör tecrübesi.",
  },
  {
    icon: ShieldCheck,
    title: "12 Ay Garanti",
    description:
      "Tüm onarımlarımızda 12 ay garanti. Güvenle teslim edin, güvenle geri alın.",
  },
  {
    icon: Clock,
    title: "Hızlı Teslimat",
    description:
      "Çoğu onarım 1-3 iş günü içinde tamamlanır. Basit arızalar aynı gün çözülür.",
  },
  {
    icon: BadgeDollarSign,
    title: "Uygun Fiyat",
    description:
      "Yeni modül satın almaya kıyasla %50-70 tasarruf sağlayın. Ücretsiz ön teşhis.",
  },
  {
    icon: Truck,
    title: "Kargo ile Hizmet",
    description:
      "Türkiye genelinden kargo ile modül gönderebilirsiniz. Onarılıp geri gönderilir.",
  },
  {
    icon: HeadphonesIcon,
    title: "7/24 Destek",
    description:
      "WhatsApp üzerinden her zaman ulaşabilirsiniz. Teknik sorularınızı yanıtlıyoruz.",
  },
];

export function WhyUsSection() {
  return (
    <SectionWrapper id="why-us">
      <SectionHeader
        title="Neden Biz?"
        subtitle="Müşterilerimizin bizi tercih etmesinin nedenleri."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, i) => (
          <ScrollReveal key={reason.title} delay={i * 0.08}>
            <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand/20">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <reason.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
