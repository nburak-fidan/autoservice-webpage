import { Shield, Award, Clock, Users, Cpu, Truck } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const reasons = [
  {
    icon: Award,
    title: "15+ Yıl Tecrübe",
    description: "Opel ve Chevrolet elektronik onarımında köklü deneyim.",
  },
  {
    icon: Cpu,
    title: "Profesyonel Ekipman",
    description: "Endüstriyel seviye cihaz ve yazılımlarla doğru teşhis.",
  },
  {
    icon: Shield,
    title: "Garantili Hizmet",
    description: "Tüm onarımlarımız garantili olarak sunulmaktadır.",
  },
  {
    icon: Clock,
    title: "Hızlı Teslimat",
    description: "Çoğu onarım aynı gün tamamlanarak teslim edilir.",
  },
  {
    icon: Users,
    title: "Uzman Kadro",
    description: "Alanında uzman sertifikalı teknikerlerden oluşan ekip.",
  },
  {
    icon: Truck,
    title: "Türkiye Geneli",
    description: "Kargo ile Türkiye'nin her yerine hizmet veriyoruz.",
  },
];

export function WhyUsSection() {
  return (
    <SectionWrapper id="why-us">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand/5 rounded-full blur-[120px] -translate-y-1/2" />

      <SectionHeader
        title="Neden Bizi Tercih Etmelisiniz?"
        subtitle="Müşterilerimizin bize güvenmesinin en önemli sebepleri."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, i) => (
          <ScrollReveal key={reason.title} delay={i * 0.08}>
            <div className="group relative flex items-start gap-5 rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10 h-full">
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-black transition-all duration-500 group-hover:shadow-md group-hover:shadow-brand/20">
                <reason.icon className="h-6 w-6" />
              </div>
              <div className="relative">
                <h3 className="font-bold text-foreground mb-1 group-hover:text-brand transition-colors">
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
