"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { testimonials } from "@/lib/content/testimonials";

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" variant="muted" className="noise-overlay">
      {/* Decorative */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-brand/5 rounded-full blur-[100px]" />

      <SectionHeader
        title="Müşteri Yorumları"
        subtitle="Müşterilerimizin deneyimlerini kendi ağızlarından dinleyin."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.1}>
            <div className="card-hover-tilt group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 h-full flex flex-col">
              {/* Hover top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />

              {/* Quote icon */}
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <Quote className="h-8 w-8 text-brand/30 group-hover:text-brand/60 transition-colors" />
              </motion.div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + si * 0.1 }}
                  >
                    <Star className="h-4 w-4 fill-brand text-brand" />
                  </motion.div>
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

              {/* Author info */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand font-black text-sm group-hover:bg-brand group-hover:text-black transition-all duration-300">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.vehicle}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
