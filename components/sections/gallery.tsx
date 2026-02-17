"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Camera, Wrench, Cpu, Zap } from "lucide-react";

const galleryItems = [
  {
    src: "/gallery/ecu-unit.jpg",
    alt: "ECU Motor Beyni Devre Kartı — Mikroçip ve Bileşenler",
    label: "ECU Devre Kartı",
    icon: Cpu,
    span: "col-span-2 row-span-2",
  },
  {
    src: "/gallery/pcb-soldering.jpg",
    alt: "Devre Kartı Üzerinde Lehimleme İşlemi",
    label: "PCB Lehimleme",
    icon: Zap,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/gallery/obd-diagnostic.jpg",
    alt: "Araç Elektronik Arıza Tespiti OBD Cihazı",
    label: "Arıza Tespiti",
    icon: Wrench,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/gallery/soldering-macro.jpg",
    alt: "Elektronik Bileşen Lehim Detay Çalışması",
    label: "Elektronik Onarım",
    icon: Cpu,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/gallery/electronics-workshop.jpg",
    alt: "Profesyonel Elektronik Tamir Atölyesi",
    label: "Tamir Atölyesi",
    icon: Wrench,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/gallery/car-engine-wiring.jpg",
    alt: "Araç Motor Bölümü Kablo Tesisatı ve Sensörler",
    label: "Kablo & Sensör",
    icon: Zap,
    span: "col-span-2 row-span-1",
  },
  {
    src: "/gallery/circuit-board-closeup.jpg",
    alt: "Devre Kartı Yakın Çekim — Elektronik Kontrol Ünitesi",
    label: "Devre Kartı Detay",
    icon: Cpu,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/gallery/car-mechanic-diagnostic.jpg",
    alt: "Profesyonel Araç Diagnostik ve Servis Alanı",
    label: "Diagnostik Servis",
    icon: Camera,
    span: "col-span-1 row-span-1",
  },
];

export function GallerySection() {
  return (
    <SectionWrapper id="gallery" className="noise-overlay">
      {/* Decorative */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand/3 rounded-full blur-[100px]" />

      <SectionHeader
        title="Atölyemizden Kareler"
        subtitle="Profesyonel ekibimiz ve donanımlarımızla aracınızın elektronik sorunlarını çözüyoruz."
      />

      {/* Masonry-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[200px]">
        {galleryItems.map((item, i) => (
          <ScrollReveal
            key={item.alt}
            delay={i * 0.08}
            className={item.span}
          >
            <motion.div
              className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand/40 transition-all duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2">
                  <item.icon className="h-3.5 w-3.5 text-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="text-xs sm:text-sm font-bold text-white/90">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-brand/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
