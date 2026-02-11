"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ShieldCheck, Clock, Award, ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/content/site-config";

const trustChips = [
  { icon: ShieldCheck, label: "12 Ay Garanti" },
  { icon: Clock, label: "Aynı Gün Teslimat" },
  { icon: Award, label: "15+ Yıl Deneyim" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* HD Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop')",
        }}
      />
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      {/* Decorative glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-brand/5 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/30 px-5 py-2 text-xs font-bold text-brand uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              Opel & Chevrolet Uzmanı
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-8 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl !leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-white">Araç Elektroniğinde</span>
            <br />
            <span className="text-gradient-gold">Uzman Çözüm</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            ECU, BCM, EPS, gösterge paneli, airbag modülü ve immobilizer
            onarımında{" "}
            <strong className="text-brand">15 yılı aşkın deneyim</strong>.
            Profesyonel teşhis, garantili onarım, uygun fiyat.
          </motion.p>

          {/* Trust chips */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {trustChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm"
              >
                <chip.icon className="h-4 w-4 text-brand" />
                {chip.label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-brand hover:bg-brand-light text-black text-base font-bold px-8 h-14 shadow-xl shadow-brand/20 animate-pulse-glow"
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
              className="text-base px-8 h-14 border-white/20 text-white hover:bg-white/10 hover:border-brand/50"
              asChild
            >
              <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp ile Yaz
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6 text-brand/50" />
      </motion.div>
    </section>
  );
}
