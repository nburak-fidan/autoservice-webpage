"use client";

import { Shield, Award, Clock, Users, Cpu, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const reasons = [
  {
    icon: Shield,
    title: "Garantili Hizmet",
    description: "Tüm onarımlarımız garantilidir. Sorun tekrarlanırsa ücretsiz müdahale ederiz.",
  },
  {
    icon: Award,
    title: "15+ Yıl Deneyim",
    description: "Opel ve Chevrolet elektronik sistemleri konusunda 15 yılı aşkın uzmanlık.",
  },
  {
    icon: Clock,
    title: "Hızlı Teslimat",
    description: "Onarımlar genellikle 1-3 iş günü içinde tamamlanır.",
  },
  {
    icon: Users,
    title: "10.000+ Mutlu Müşteri",
    description: "Türkiye genelinden binlerce müşteriye başarılı hizmet verdik.",
  },
  {
    icon: Cpu,
    title: "Profesyonel Ekipman",
    description: "En son teknoloji cihazlarla hassas arıza tespiti ve onarım.",
  },
  {
    icon: Truck,
    title: "Kargo ile Onarım",
    description: "Türkiye'nin her yerinden kargo ile parça kabul ediyoruz.",
  },
];

export function WhyUsSection() {
  return (
    <SectionWrapper id="why-us">
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-brand/3 rounded-full blur-[100px]" />

      <SectionHeader
        title="Neden Bizi Tercih Etmelisiniz?"
        subtitle="Müşterilerimizin bizi tercih etmesinin en önemli nedenleri."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, i) => (
          <ScrollReveal key={reason.title} delay={i * 0.1}>
            <div className="card-hover-tilt group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 h-full">
              {/* Hover top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand/10 via-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand mb-5 group-hover:bg-brand group-hover:text-black transition-all duration-500 group-hover:shadow-lg group-hover:shadow-brand/20"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                <reason.icon className="h-7 w-7" />
              </motion.div>

              <h3 className="text-lg font-black text-foreground mb-2 group-hover:text-brand transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
