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
    `${SITE_CONFIG.name} — ${SITE_CONFIG.foundedYear} yılından bu yana ${SITE_CONFIG.brands.join(", ")} araçlara elektrik, elektronik ve mekanik servis hizmeti.`,
  path: "/about",
});

const currentYear = new Date().getFullYear();
const yearsExperience = currentYear - SITE_CONFIG.foundedYear;

const stats = [
  { icon: Award, value: `${yearsExperience}+`, label: "Yıl Deneyim" },
  { icon: Users, value: "10000+", label: "Mutlu Müşteri" },
  { icon: Wrench, value: "10.000+", label: "Başarılı Onarım" },
  { icon: Target, value: "%98", label: "Müşteri Memnuniyeti" },
];

export default function AboutPage() {
  return (
    <SectionWrapper className="pt-28 md:pt-36">
      <SectionHeader
        title="Hakkımızda"
        subtitle={`${SITE_CONFIG.name} — ${SITE_CONFIG.nameSecondary} | Araç elektroniğinde güvenilir çözüm ortağınız.`}
      />

      <div className="max-w-3xl mx-auto mb-16">
        <ScrollReveal>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              {SITE_CONFIG.foundedYear} yılından bu yana {SITE_CONFIG.brands.join(", ")} marka araçlara
              elektrik ve elektronik hizmeti veren şirketimiz, oto beyin tamirleri, yedek parça
              hizmeti ve mekanik servis hizmetlerini profesyonel ekibimiz tarafından sunmaktadır.
            </p>
            <p>
              Günümüz şartlarında araçlarınızda bulunan oto beyinleri yüksek rakamlarda olup
              siz değerli müşterilerimizin bütçesini zorlamaktadır. Bizim buradaki amacımız doğru ve
              hızlı teşhis ile minimum rakamlarla yaptığımız tamir ve tadilat işlemlerini{" "}
              <strong className="text-brand">{SITE_CONFIG.name}</strong> olarak{" "}
              <strong className="text-brand">{SITE_CONFIG.warranty} garanti</strong> vererek
              siz değerli müşterilerimize hizmet sağlamaktayız.
            </p>
            <p>
              {SITE_CONFIG.address.district}/{SITE_CONFIG.address.city} merkezli servisimiz,
              ECU, BCM, EPS, gösterge paneli, airbag modülü ve immobilizer onarımlarında
              uzmanlaşmış bir ekipten oluşmaktadır. Son teknoloji teşhis ekipmanları ve
              orijinal yedek parçalar kullanarak aracınızın elektronik sorunlarını kısa sürede
              ve garantili olarak çözüyoruz.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Stats */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div className="group text-center rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand mb-3 group-hover:bg-brand group-hover:text-black transition-all duration-500">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-black text-brand">
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
