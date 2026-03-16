"use client";

import { ChipTuningCalculator } from "@/components/sections/chip-tuning-calculator";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function ChipTuningPageContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Dr.Şair Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-background" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-80" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-brand transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </motion.div>

          {/* Brand */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/25 px-6 py-2.5 text-xs font-bold text-brand uppercase tracking-[0.25em] mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Chip Tuning & Yazılım
            </div>

            {/* Logo */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto mb-5 rounded-2xl overflow-hidden shadow-2xl shadow-brand/20 ring-2 ring-brand/20">
              <Image
                src="/drsairlogo.svg"
                alt="Dr.Şair Logo"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
              />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4">
              <span className="text-white">Dr.</span>
              <span className="text-gradient-gold">Şair</span>
            </h1>
            <p className="text-sm sm:text-base text-white/40 font-medium tracking-widest uppercase mb-4">
              Performance Software Solutions
            </p>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              Aracınızın gizli potansiyelini açığa çıkarın. Tüm marka ve modeller için profesyonel chip tuning yazılımı ile{" "}
              <strong className="text-brand font-semibold">%35&apos;e kadar güç artışı</strong> ve{" "}
              <strong className="text-brand font-semibold">%15&apos;e kadar yakıt tasarrufu</strong> sağlayın.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <ChipTuningCalculator />

      {/* Spacer for mobile CTA bar */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
