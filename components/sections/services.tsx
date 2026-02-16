"use client";

import { ArrowRight, Cpu, Zap, Wrench, Cog } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SITE_CONFIG } from "@/lib/content/site-config";

const serviceCards = [
  {
    icon: Cpu,
    title: "Oto Beyin Tamiri",
    description:
      "Motor beyni (ECU) tamiri, değişimi ve kodlama işlemleri 6 ay garantili.",
  },
  {
    icon: Zap,
    title: "Elektronik Arıza Çözümleri",
    description: "Hızlı teşhis, doğru çözüm, minimum maliyet.",
  },
  {
    icon: Wrench,
    title: "Yedek Parça & Mekanik",
    description: "Profesyonel ekip ile mekanik ve yedek parça desteği.",
  },
  {
    icon: Cog,
    title: "Elektrik & Bakım",
    description: "Komple araç elektrik tesisatı ve periyodik bakım hizmetleri.",
  },
];

export function ServicesSection() {
  return (
    <SectionWrapper id="services" className="grid-pattern">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-brand/3 rounded-full blur-[100px]" />

      <SectionHeader
        title="Hizmetlerimiz"
        subtitle={`${SITE_CONFIG.brands.join(", ")} araçlarınız için kapsamlı elektronik ve mekanik çözümler.`}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCards.map((service, i) => (
          <ScrollReveal key={service.title} delay={i * 0.1}>
            <div className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:border-brand/50 card-hover-tilt hover:shadow-2xl hover:shadow-brand/15 h-full overflow-hidden">
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/0 to-transparent group-hover:via-brand transition-all duration-700" />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 via-transparent to-brand/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col flex-1">
                {/* Icon */}
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand mb-6 group-hover:bg-brand group-hover:text-black transition-all duration-500 group-hover:shadow-lg group-hover:shadow-brand/25"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="h-7 w-7" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-black text-foreground mb-2 group-hover:text-brand transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Detail link */}
                <div className="mt-6 flex items-center text-sm font-bold text-brand translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  Detaylı bilgi
                  <ArrowRight className="ml-1.5 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
