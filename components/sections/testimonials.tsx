"use client";

import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/content/testimonials";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" variant="muted">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[150px]" />

      <SectionHeader
        title="Müşteri Yorumları"
        subtitle="Müşterilerimizin deneyimlerinden bazıları."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.08}>
            <div className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10 h-full">
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-brand/20 mb-4 group-hover:text-brand/40 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.vehicle} &middot; {t.service}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
