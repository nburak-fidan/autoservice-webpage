"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ShieldCheck, Clock, Award, ChevronDown, Zap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/content/site-config";
import { CounterStat } from "@/components/ui/counter-stat";

const trustChips = [
  { icon: ShieldCheck, label: "12 Ay Garanti" },
  { icon: Clock, label: "Aynı Gün Teslimat" },
  { icon: Award, label: "15+ Yıl Deneyim" },
];

const stats = [
  { value: 15, suffix: "+", label: "Yıl Deneyim" },
  { value: 5000, suffix: "+", label: "Mutlu Müşteri" },
  { value: 10000, suffix: "+", label: "Başarılı Onarım" },
  { value: 98, suffix: "%", label: "Memnuniyet" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop')",
          y: bgY,
        }}
      />

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,183,49,0.06),transparent_60%)]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-brand/30 rounded-full"
          style={{ left: `${20 + i * 20}%`, top: `${25 + i * 15}%` }}
          animate={{
            y: [-15, -50, -15],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Decorative glow */}
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-brand/6 rounded-full blur-[150px]" />

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 md:pt-40 md:pb-32"
      >
        {/* Two-column layout: text left + stats right on large screens */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* ── Left column (3/5) ── */}
          <div className="lg:col-span-3">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/25 px-5 py-2.5 text-xs font-bold text-brand uppercase tracking-widest backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5" />
                Opel & Chevrolet Uzmanı
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mt-7 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl !leading-[1.08]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white">Araç Elektroniğinde</span>
              <br />
              <span className="text-gradient-gold">Uzman Çözüm</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="mt-6 text-base sm:text-lg text-white/55 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              ECU, BCM, EPS, gösterge paneli, airbag modülü ve immobilizer
              onarımında{" "}
              <strong className="text-brand font-semibold">15 yılı aşkın deneyim</strong>.
              Profesyonel teşhis, garantili onarım, uygun fiyat.
            </motion.p>

            {/* Trust chips */}
            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {trustChips.map((chip) => (
                <motion.span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-2 text-sm font-medium text-white/75 backdrop-blur-sm hover:bg-brand/10 hover:border-brand/30 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <chip.icon className="h-4 w-4 text-brand" />
                  {chip.label}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-9 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Button
                size="lg"
                className="bg-brand hover:bg-brand-light text-black text-base font-black px-8 h-13 shadow-xl shadow-brand/20 hover:shadow-brand/40 transition-all duration-300"
                asChild
              >
                <a href={`tel:${SITE_CONFIG.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Hemen Ara
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-13 border-white/15 text-white hover:bg-white/5 hover:border-brand/40 hover:text-brand transition-all duration-300"
                asChild
              >
                <a
                  href={SITE_CONFIG.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile Yaz
                </a>
              </Button>
            </motion.div>
          </div>

          {/* ── Right column (2/5) — Stats card ── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md p-8 sm:p-10">
              {/* Top accent */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
              {/* Corner glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 rounded-full blur-[60px]" />

              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="relative text-center lg:text-left"
                  >
                    <CounterStat
                      value={stat.value}
                      suffix={stat.suffix}
                      delay={0.7 + i * 0.15}
                    />
                    <p className="text-xs text-white/35 uppercase tracking-wider font-medium mt-1">
                      {stat.label}
                    </p>
                    {/* Divider between rows */}
                    {i < 2 && (
                      <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                    )}
                  </div>
                ))}
              </div>

              {/* Mini CTA inside card */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                  Hızlı İletişim
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-white/70 hover:text-brand transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-black transition-all duration-300">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/80 group-hover:text-brand transition-colors">
                      {SITE_CONFIG.phone}
                    </p>
                    <p className="text-[11px] text-white/30">
                      Hafta içi 08:30 - 18:30
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/25 uppercase tracking-widest">
            Keşfet
          </span>
          <ChevronDown className="h-5 w-5 text-brand/50" />
        </div>
      </motion.div>
    </section>
  );
}
