"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ShieldCheck, Clock, Award } from "lucide-react";
import { SITE_CONFIG } from "@/lib/content/site-config";

const trustChips = [
  { icon: ShieldCheck, label: "12 Ay Garanti" },
  { icon: Clock, label: "Aynı Gün Teslimat" },
  { icon: Award, label: "15+ Yıl Deneyim" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-background" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-100/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-light/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 text-xs font-semibold text-brand uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Opel & Chevrolet Uzmanı
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl !leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Araç Elektroniğinde{" "}
            <span className="text-brand">Uzman Çözüm</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ECU, BCM, EPS, gösterge paneli, airbag modülü ve immobilizer
            onarımında{" "}
            <strong className="text-foreground">15 yılı aşkın deneyim</strong>.
            Profesyonel teşhis, garantili onarım, uygun fiyat.
          </motion.p>

          {/* Trust chips */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {trustChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-2 text-sm font-medium text-foreground shadow-sm"
              >
                <chip.icon className="h-4 w-4 text-brand" />
                {chip.label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-brand hover:bg-brand-light text-white text-base px-8 h-12 shadow-lg shadow-brand/20"
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
              className="text-base px-8 h-12 border-brand/20 hover:bg-brand-50 hover:text-brand"
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
      </div>
    </section>
  );
}
