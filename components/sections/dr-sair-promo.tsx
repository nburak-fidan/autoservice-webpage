"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Zap, Fuel, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DrSairPromoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="dr-sair" className="overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Dr.Şair Logo / Brand Identity */}
        <ScrollReveal>
          <div className="text-center mb-10">
            {/* Brand badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/25 px-6 py-2.5 text-xs font-bold text-brand uppercase tracking-[0.25em] mb-8"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Chip Tuning & Yazılım Markamız
            </motion.div>

            {/* Dr.Şair Brand Name + Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-6 flex flex-col items-center"
            >
              {/* Logo */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 rounded-2xl overflow-hidden shadow-2xl shadow-brand/20 ring-2 ring-brand/20">
                <Image
                  src="/drsairlogo.svg"
                  alt="Dr.Şair Logo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                />
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                <span className="text-white">Dr.</span>
                <span className="text-gradient-gold">Şair</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/40 font-medium tracking-widest uppercase">
                Performance Software Solutions
              </p>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Floating CTA Cloud / Bubble */}
        <ScrollReveal delay={0.2}>
          <motion.div
            className="relative max-w-4xl mx-auto"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-brand/10 to-brand/20 rounded-3xl blur-xl" />
            
            <div className="relative bg-black/60 backdrop-blur-xl border border-brand/30 rounded-3xl p-8 md:p-12 overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-brand/10 to-transparent" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-brand/10 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent" />

              {/* Content */}
              <div className="relative text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  Araçlarınız{" "}
                  <span className="text-gradient-gold">%35 Daha Güçlü</span>
                  <br />
                  <span className="text-gradient-gold">%15 Daha Tasarruflu</span>
                  {" "}Olsun İster Misiniz?
                </h3>

                <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                  Dr.Şair yazılım teknolojisi ile aracınızın gizli potansiyelini açığa çıkarın. 
                  Tüm marka ve modeller için profesyonel chip tuning yazılımı.
                </p>

                {/* Stats chips */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2.5">
                    <Zap className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-bold text-green-400">%35&apos;e Kadar Güç Artışı</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5">
                    <Fuel className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-bold text-blue-400">%15&apos;e Kadar Yakıt Tasarrufu</span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="bg-brand hover:bg-brand-light text-black text-lg font-black px-10 h-14 shadow-2xl shadow-brand/30 hover:shadow-brand/50 transition-all duration-300 animate-pulse-glow"
                    asChild
                  >
                    <Link href="/chip-tuning">
                      <Zap className="mr-2 h-5 w-5" />
                      Hemen Aracını Hesapla
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>

                <p className="mt-4 text-xs text-white/30">
                  Tüm markalar • Tüm modeller • Tüm motor seçenekleri
                </p>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Brand logos / All brands indicator */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-4">Desteklenen Markalar</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {[
                "Opel", "Chevrolet", "Peugeot", "Citroen", "Volkswagen", "BMW", 
                "Mercedes", "Audi", "Ford", "Renault", "Fiat", "Toyota", 
                "Hyundai", "Kia", "Skoda", "Seat", "Dacia", "Volvo",
                "Honda", "Nissan"
              ].map((brand) => (
                <span
                  key={brand}
                  className="text-xs font-semibold text-white/30 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 hover:border-brand/30 hover:text-brand/60 transition-all duration-300"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
