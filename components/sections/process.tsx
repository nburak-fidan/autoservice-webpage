"use client";

import { ClipboardCheck, Search, Wrench, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Kayıt & Kabul",
    description: "Aracınızın bilgileri alınır ve arıza detayları kaydedilir.",
  },
  {
    icon: Search,
    title: "Arıza Tespiti",
    description: "Profesyonel cihazlarla detaylı elektronik arıza tespiti yapılır.",
  },
  {
    icon: Wrench,
    title: "Onarım & Test",
    description: "Uzman ekibimiz tarafından onarım gerçekleştirilir ve testleri yapılır.",
  },
  {
    icon: CheckCircle2,
    title: "Teslim & Garanti",
    description: "Aracınız garantili bir şekilde teslim edilir.",
  },
];

export function ProcessSection() {
  return (
    <SectionWrapper id="process" variant="muted">
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-0 w-52 h-52 bg-brand/3 rounded-full blur-[80px]" />

      <SectionHeader
        title="Nasıl Çalışıyoruz?"
        subtitle="Aracınızın onarım süreci 4 basit adımda tamamlanır."
      />

      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-px overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand/50 via-brand to-brand/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {steps.map((step, i) => (
          <ScrollReveal key={step.title} delay={i * 0.15}>
            <div className="group relative flex flex-col items-center text-center p-6">
              {/* Step number badge */}
              <motion.div
                className="absolute -top-3 right-4 bg-brand text-black text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-brand/20"
                whileHover={{ scale: 1.2, rotate: -5 }}
              >
                0{i + 1}
              </motion.div>

              {/* Icon circle with rotating border */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 animate-rotate-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: "1px" }} />
                <motion.div
                  className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-brand/20 text-brand group-hover:bg-brand group-hover:text-black transition-all duration-500 group-hover:shadow-xl group-hover:shadow-brand/30"
                  whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="h-9 w-9" />
                </motion.div>
              </div>

              <h3 className="text-lg font-black text-foreground mb-2 group-hover:text-brand transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
