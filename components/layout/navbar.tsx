"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/content/site-config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/services", label: "Hizmetler" },
  { href: "/faults", label: "Arıza Rehberi" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/contact", label: "İletişim" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/90 backdrop-blur-xl shadow-lg shadow-brand/5 border-b border-brand/10"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-28">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
          <div className="relative h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 transition-transform group-hover:scale-105 drop-shadow-[0_0_12px_rgba(245,183,49,0.2)]">
            <Image
              src="/logo.png"
              alt="GM Opel Garage Logo"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-base sm:text-xl md:text-2xl tracking-tight text-brand">
              GM Opel Garage
            </span>
            <span className="text-[9px] sm:text-[11px] font-semibold text-brand/60 tracking-widest uppercase">
              {SITE_CONFIG.nameSecondary}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-brand transition-colors rounded-md group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand rounded-full transition-all duration-300 group-hover:w-4/5" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-brand hover:bg-brand/10" asChild>
            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} aria-label="Bizi arayın">
              <Phone className="mr-1.5 h-4 w-4" />
              Ara
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-green-400 hover:bg-green-400/10" asChild>
            <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">
              <MessageCircle className="mr-1.5 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button size="sm" className="bg-brand hover:bg-brand-light text-black font-semibold" asChild>
            <a href={`https://maps.google.com/?q=${SITE_CONFIG.geo.lat},${SITE_CONFIG.geo.lng}`} target="_blank" rel="noopener noreferrer" aria-label="Yol tarifi al">
              <MapPin className="mr-1.5 h-4 w-4" />
              Yol Tarifi
            </a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-md text-white hover:bg-brand/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black border-l border-brand/20 z-50 shadow-2xl"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-lg font-bold text-brand">Menü</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 hover:bg-brand/10 transition-colors"
                  aria-label="Menüyü kapat"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Menu content */}
              <div className="flex flex-col p-4 gap-1 overflow-y-auto h-[calc(100%-80px)]">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3.5 px-4 text-base font-medium text-white hover:bg-brand/10 hover:text-brand rounded-xl transition-colors block border border-transparent hover:border-brand/20"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-border">
                  <Button className="w-full h-12 bg-brand hover:bg-brand-light text-black font-semibold text-base" asChild>
                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      {SITE_CONFIG.phone}
                    </a>
                  </Button>
                  {SITE_CONFIG.whatsappNumbers.map((wp) => (
                    <Button key={wp.raw} variant="outline" className="w-full h-12 border-green-500/30 text-green-400 hover:bg-green-500/10 text-base" asChild>
                      <a href={`https://wa.me/${wp.raw}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        {wp.number}
                      </a>
                    </Button>
                  ))}
                </div>

                {/* Yol Tarifi */}
                <div className="mt-4">
                  <Button className="w-full h-12 bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10" asChild>
                    <a href={`https://maps.google.com/?q=${SITE_CONFIG.geo.lat},${SITE_CONFIG.geo.lng}`} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-5 w-5 text-brand" />
                      Yol Tarifi Al
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
