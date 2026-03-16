import type { Metadata } from "next";
import { Award, Users, Wrench, Target, Clock, Cable, Cog, ScanLine, Globe, Cpu } from "lucide-react";
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

const serviceHighlights = [
  { icon: Cpu, title: "Oto Beyin Tamiri", desc: "ECU, BCM, EPS ve tüm kontrol ünitesi onarımları" },
  { icon: Cable, title: "Tesisat Tamiri", desc: "Komple araç elektrik tesisatı onarım ve yenileme" },
  { icon: Cog, title: "Easytronic Robot Tamiri", desc: "Robotize şanzıman aktüatör ve yazılım onarımı" },
  { icon: ScanLine, title: "Araç Üstü Diagnoz", desc: "Yerinde profesyonel arıza tespiti ve diagnoz" },
  { icon: Globe, title: "Online Yazılım & Güncelleme", desc: "Uzaktan yazılım desteği ve online dosya çözümleri" },
  { icon: Wrench, title: "Mekanik Servis", desc: "Yedek parça, bakım ve mekanik onarım hizmetleri" },
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
              ECU, BCM, EPS, gösterge paneli, airbag modülü ve immobilizer onarımlarının yanı sıra{" "}
              <strong className="text-brand">araç elektrik tesisat tamiri</strong>,{" "}
              <strong className="text-brand">Easytronic robot şanzıman tamiri</strong>,{" "}
              <strong className="text-brand">araç üstü diagnoz hizmeti</strong> ve{" "}
              <strong className="text-brand">online yazılım &amp; güncelleme</strong>{" "}
              çözümleri sunmaktadır. Son teknoloji teşhis ekipmanları ve orijinal yedek parçalar
              kullanarak aracınızın elektronik sorunlarını kısa sürede ve garantili olarak çözüyoruz.
            </p>
            <p>
              <strong className="text-brand">Dr.Şair</strong> markamız ile tüm marka ve model araçlara
              chip tuning yazılımı, performans optimizasyonu ve yakıt tasarrufu çözümleri de sunmaktayız.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Stats */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 mb-16">
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

      {/* Hizmet Alanlarımız */}
      <ScrollReveal>
        <h2 className="text-2xl font-black text-center text-foreground mb-8">Hizmet Alanlarımız</h2>
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {serviceHighlights.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.08}>
            <div className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:shadow-brand/10">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-black transition-all duration-300">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-brand transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Çalışma Saatleri */}
      <ScrollReveal>
        <div className="max-w-md mx-auto rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand mb-4">
            <Clock className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-black text-foreground mb-4">Çalışma Saatleri</h2>
          <div className="space-y-3 text-muted-foreground">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="font-medium">Pazartesi – Cuma</span>
              <span className="font-bold text-foreground">{SITE_CONFIG.hours.weekdays}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="font-medium">Cumartesi</span>
              <span className="font-bold text-foreground">{SITE_CONFIG.hours.saturday}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">Pazar</span>
              <span className="font-bold text-red-400">{SITE_CONFIG.hours.sunday}</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
