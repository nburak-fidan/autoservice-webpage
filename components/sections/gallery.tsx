"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Camera, Wrench, Cpu, Zap, Users, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Row 1: İşçilikler & Beyinler ── */
const workshopItems = [
  {
    src: "/gallery/ecu-unit.jpg",
    alt: "ECU Motor Beyni Devre Kartı — Mikroçip ve Bileşenler",
    label: "ECU Devre Kartı",
    icon: Cpu,
  },
  {
    src: "/gallery/pcb-soldering.jpg",
    alt: "Devre Kartı Üzerinde Lehimleme İşlemi",
    label: "PCB Lehimleme",
    icon: Zap,
  },
  {
    src: "/gallery/obd-diagnostic.jpg",
    alt: "Araç Elektronik Arıza Tespiti OBD Cihazı",
    label: "Arıza Tespiti",
    icon: Wrench,
  },
  {
    src: "/gallery/soldering-macro.jpg",
    alt: "Elektronik Bileşen Lehim Detay Çalışması",
    label: "Elektronik Onarım",
    icon: Cpu,
  },
  {
    src: "/gallery/circuit-board-closeup.jpg",
    alt: "Devre Kartı Yakın Çekim — Elektronik Kontrol Ünitesi",
    label: "Devre Kartı Detay",
    icon: Cpu,
  },
  {
    src: "/gallery/kablo-sensor.jpg",
    alt: "Araç Kablo Tesisatı ve Sensör Çalışması",
    label: "Kablo & Sensör",
    icon: Zap,
  },
];

/* ── Row 2: Çalışanlar & İş Üstünde ── */
const teamItems = [
  {
    src: "/gallery/electronics-workshop.jpg",
    alt: "Profesyonel Elektronik Tamir Atölyesi",
    label: "Tamir Atölyesi",
    icon: Users,
  },
  {
    src: "/gallery/car-engine-wiring.jpg",
    alt: "Araç Motor Bölümü Kablo Tesisatı ve Sensörler",
    label: "Motor Çalışması",
    icon: Wrench,
  },
  {
    src: "/gallery/car-mechanic-diagnostic.jpg",
    alt: "Profesyonel Araç Diagnostik ve Servis Alanı",
    label: "Diagnostik Servis",
    icon: Camera,
  },
  {
    src: "/gallery/elektronik-onarim.jpg",
    alt: "Elektronik Onarım ve Bakım Hizmeti",
    label: "Elektronik Bakım",
    icon: Zap,
  },
];

/* ── Horizontal scrollable row ── */
function GalleryRow({ 
  items, 
  title, 
  subtitle 
}: { 
  items: typeof workshopItems; 
  title: string; 
  subtitle: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-12 last:mb-0">
      {/* Row header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/40 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:border-brand/40 hover:text-brand hover:bg-brand/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Sola kaydır"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:border-brand/40 hover:text-brand hover:bg-brand/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Sağa kaydır"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div className="relative">
        {/* Left fade */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        )}
        {/* Right fade */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
        >
          {items.map((item) => (
            <motion.div
              key={item.alt}
              className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
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
          ))}
        </div>
      </div>
    </div>
  );
}

export function GallerySection() {
  return (
    <SectionWrapper id="gallery">
      {/* Decorative */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand/3 rounded-full blur-[100px]" />

      <SectionHeader
        title="Atölyemizden Kareler"
        subtitle="Profesyonel ekibimiz ve donanımlarımızla aracınızın elektronik sorunlarını çözüyoruz."
      />

      {/* Row 1: İşçilikler & Beyinler */}
      <ScrollReveal>
        <GalleryRow
          items={workshopItems}
          title="İşçilikler & Beyin Onarımları"
          subtitle="ECU, BCM ve devre kartı onarım çalışmalarımız"
        />
      </ScrollReveal>

      {/* Row 2: Ekibimiz İş Üstünde */}
      <ScrollReveal delay={0.15}>
        <GalleryRow
          items={teamItems}
          title="Ekibimiz İş Üstünde"
          subtitle="Profesyonel ekibimizin atölye çalışmaları"
        />
      </ScrollReveal>
    </SectionWrapper>
  );
}
