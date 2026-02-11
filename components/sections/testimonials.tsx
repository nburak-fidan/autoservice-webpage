import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/content/testimonials";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" variant="muted">
      <SectionHeader
        title="Müşteri Yorumları"
        subtitle="Müşterilerimizin deneyimlerini kendi ağızlarından dinleyin."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.1}>
            <div className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm h-full">
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-brand/10 mb-3" />

              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-semibold text-sm text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.vehicle} • {t.service}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
