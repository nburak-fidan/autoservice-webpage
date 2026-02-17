"use client";

import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { testimonials, googleReviewSummary } from "@/lib/content/testimonials";
import { SITE_CONFIG } from "@/lib/content/site-config";

/* ── Google "G" logo SVG ── */
function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" variant="muted" className="noise-overlay">
      {/* Decorative */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-brand/5 rounded-full blur-[100px]" />

      <SectionHeader
        title="Google Müşteri Yorumları"
        subtitle="Google İşletme Profilimizdeki gerçek müşteri değerlendirmeleri."
      />

      {/* ── Google Review Badge ── */}
      <ScrollReveal>
        <div className="flex justify-center mb-10">
          <a
            href={SITE_CONFIG.social.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-6 py-4 transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
          >
            {/* Google G icon */}
            <GoogleLogo className="h-10 w-10 flex-shrink-0" />

            {/* Rating info */}
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-2xl font-black text-foreground">
                  {googleReviewSummary.averageRating.toFixed(1)}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {googleReviewSummary.totalReviews}+
                </span>{" "}
                Google yorumu
              </p>
            </div>

            {/* Separator */}
            <div className="hidden sm:block h-10 w-px bg-border/50" />

            {/* CTA */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-brand group-hover:text-brand-light transition-colors">
              Tüm Yorumları Gör
              <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </a>
        </div>
      </ScrollReveal>

      {/* ── Review Cards ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.1}>
            <div className="card-hover-tilt group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-7 h-full flex flex-col">
              {/* Hover top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />

              {/* Header: Avatar + Name + Google badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar with initial */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand font-black text-sm group-hover:bg-brand group-hover:text-black transition-all duration-300">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    {/* Stars */}
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: t.rating }).map((_, si) => (
                        <motion.div
                          key={si}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + si * 0.08 }}
                        >
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Google icon */}
                <GoogleLogo className="h-5 w-5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Review text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Footer: Google verified badge */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3" />
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="text-[11px] text-muted-foreground font-medium">
                  Google&apos;da Doğrulanmış Yorum
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Bottom CTA: Google'da Yorum Bırakın ── */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button
            variant="outline"
            className="border-white/10 hover:border-brand/40 hover:bg-brand/10 transition-all duration-300"
            asChild
          >
            <a
              href={SITE_CONFIG.social.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoogleLogo className="mr-2 h-4 w-4" />
              Google&apos;da Tüm Yorumları Gör
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </a>
          </Button>
          <Button
            className="bg-brand text-black font-bold hover:bg-brand-light transition-all duration-300 hover:shadow-lg hover:shadow-brand/30"
            asChild
          >
            <a
              href={SITE_CONFIG.social.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="mr-2 h-4 w-4" />
              Siz de Yorum Bırakın
            </a>
          </Button>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
