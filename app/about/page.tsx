import type { Metadata } from "next";
import { Award, Users, Wrench, Target } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/content/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Hakkımızda",
  description:
    "Opel ve Chevrolet araç elektroniği onarımında 15 yılı aşkın deneyim. Ekibimizi ve misyonumuzu tanıyın.",
  path: "/about",
});

const stats = [
  { icon: Award, value: "15+", label: "Yıl Deneyim" },
  { icon: Users, value: "5000+", label: "Mutlu Müşteri" },
  { icon: Wrench, value: "10.000+", label: "Başarılı Onarım" },
  { icon: Target, value: "%98", label: "Müşteri Memnuniyeti" },
];

export default function AboutPage() {
  return (
    <SectionWrapper className="pt-28 md:pt-36">
      <SectionHeader
        title="Hakkımızda"
        subtitle={`${SITE_CONFIG.name} — Araç elektroniğinde güvenilir çözüm ortağınız.`}
      />

      <div className="max-w-3xl mx-auto mb-16">
        <ScrollReveal>
          {/* TODO: Replace with real about text */}
          <div className="prose prose-lg text-muted-foreground max-w-none">
            <p>
              {SITE_CONFIG.name}, {SITE_CONFIG.address.city} merkezli olarak
              Opel ve Chevrolet araçlara özel elektronik onarım hizmeti
              sunmaktadır. 15 yılı aşkın sektör deneyimimizle, ECU, BCM, EPS,
              gösterge paneli, airbag modülü ve immobilizer onarımlarında
              uzmanlaşmış bir ekibiz.
            </p>
            <p>
              Son teknoloji teşhis ekipmanları ve orijinal yedek parçalar
              kullanarak, aracınızın elektronik sorunlarını kısa sürede ve
              garantili olarak çözüyoruz. Müşteri memnuniyeti ve kaliteli hizmet
              anlayışımızla sektörde fark yaratıyoruz.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Stats */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div className="text-center rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand mb-3">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
