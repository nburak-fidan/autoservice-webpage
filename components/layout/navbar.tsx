"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/content/site-config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/services", label: "Hizmetler" },
  { href: "/chip-tuning", label: "Dr.Şair Yazılım" },
  { href: "/faults", label: "Arıza Rehberi" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/contact", label: "İletişim" },
];

function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [mounted] = useState(() => typeof window !== "undefined");
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true" aria-label="Mobil menü">
          {/* Backdrop overlay — z-[9998] */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Slide-in panel — z-[9999] */}
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black border-l border-brand/20 z-[9999] shadow-2xl flex flex-col will-change-transform"
          >
            {/* Menu header */}
            <div className="flex-shrink-0 flex items-center justify-between p-5 border-b border-white/10">
              <span className="text-lg font-bold text-brand tracking-tight">Menü</span>
              <button
                onClick={onClose}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 hover:bg-brand/10 active:scale-95 transition-all"
                aria-label="Menüyü kapat"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Menu content — scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "py-3.5 px-4 text-base font-medium rounded-xl transition-all block border",
                          isActive
                            ? "bg-brand/10 text-brand border-brand/20"
                            : "text-white hover:bg-brand/10 hover:text-brand border-transparent hover:border-brand/20"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="px-4 pb-4">
                <div className="flex flex-col gap-3 pt-5 border-t border-white/10">
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
                  <Button className="w-full h-12 bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10" asChild>
                    <a href={`https://maps.google.com/?q=${SITE_CONFIG.geo.lat},${SITE_CONFIG.geo.lng}`} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-5 w-5 text-brand" />
                      Yol Tarifi Al
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/90 backdrop-blur-xl shadow-lg shadow-brand/5 border-b border-brand/10"
            : "bg-transparent"
        )}
      >
        {/* ═══════════════════════════════════════════════
            DESKTOP NAVBAR — lg and above
            Single row: [LOGO + BRAND] ... [NAV LINKS] ... [CTA ICONS]
        ═══════════════════════════════════════════════ */}
        <div className="hidden lg:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={cn(
                "flex items-center justify-between transition-all duration-500",
                scrolled ? "h-20" : "h-28"
              )}
            >
              {/* ── Logo + Brand ── */}
              <Link href="/" className="flex items-center gap-4 group shrink-0">
                <div
                  className={cn(
                    "relative shrink-0 transition-all duration-500 drop-shadow-[0_0_15px_rgba(245,183,49,0.15)] group-hover:drop-shadow-[0_0_20px_rgba(245,183,49,0.3)]",
                    scrolled ? "h-14 w-14" : "h-20 w-20 xl:h-24 xl:w-24"
                  )}
                >
                  <Image
                    src="/weblogo.svg"
                    alt="GM Opel Garage Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span
                    className={cn(
                      "font-black tracking-tight text-brand uppercase leading-none transition-all duration-500",
                      scrolled ? "text-lg" : "text-2xl xl:text-[1.7rem]"
                    )}
                  >
                    GM OPEL GARAGE
                  </span>
                  <span
                    className={cn(
                      "font-bold text-brand/40 tracking-[0.3em] uppercase transition-all duration-500",
                      scrolled ? "text-[9px] mt-0.5" : "text-[11px] mt-1.5"
                    )}
                  >
                    PSA SERVİS
                  </span>
                </div>
              </Link>

              {/* ── Navigation links ── */}
              <ul className="flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "relative px-3 xl:px-4 py-2 text-[13px] xl:text-sm font-medium transition-colors rounded-lg group whitespace-nowrap",
                          isActive
                            ? "text-brand"
                            : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-brand rounded-full transition-all duration-300",
                            isActive ? "w-3/5" : "w-0 group-hover:w-3/5"
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* ── CTA icon group — compact pill ── */}
              <div className="flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.08] p-1">
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  aria-label="Bizi arayın"
                  className="flex items-center justify-center h-9 w-9 rounded-full text-white/60 hover:text-brand hover:bg-brand/10 transition-all duration-200"
                  title="Ara"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <div className="w-px h-5 bg-white/[0.08]" />
                <a
                  href={SITE_CONFIG.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp ile yazın"
                  className="flex items-center justify-center h-9 w-9 rounded-full text-white/60 hover:text-green-400 hover:bg-green-400/10 transition-all duration-200"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <div className="w-px h-5 bg-white/[0.08]" />
                <a
                  href={`https://maps.google.com/?q=${SITE_CONFIG.geo.lat},${SITE_CONFIG.geo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yol tarifi al"
                  className="flex items-center justify-center h-9 w-9 rounded-full text-black bg-brand hover:bg-brand-light transition-all duration-200"
                  title="Yol Tarifi"
                >
                  <MapPin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            MOBILE / TABLET NAVBAR — below lg
            [LOGO + BRAND] ←→ [HAMBURGER]
        ═══════════════════════════════════════════════ */}
        <nav className="lg:hidden mx-auto flex items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 group transition-all duration-500",
              scrolled ? "py-2.5" : "py-3.5 sm:py-4"
            )}
          >
            <div
              className={cn(
                "relative shrink-0 transition-all duration-500 drop-shadow-[0_0_10px_rgba(245,183,49,0.15)]",
                scrolled ? "h-10 w-10" : "h-14 w-14 sm:h-16 sm:w-16"
              )}
            >
              <Image
                src="/weblogo.svg"
                alt="GM Opel Garage Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span
                className={cn(
                  "font-black tracking-tight text-brand uppercase leading-none whitespace-nowrap transition-all duration-500",
                  scrolled ? "text-sm" : "text-base sm:text-lg"
                )}
              >
                GM OPEL GARAGE
              </span>
              <span
                className={cn(
                  "font-bold text-brand/40 tracking-[0.2em] uppercase transition-all duration-500",
                  scrolled ? "text-[6px] mt-0" : "text-[7px] sm:text-[8px] mt-0.5"
                )}
              >
                PSA SERVİS
              </span>
            </div>
          </Link>

          {/* Hamburger */}
          <button
            className="relative z-[60] flex items-center justify-center h-11 w-11 rounded-xl text-white hover:bg-brand/10 active:scale-95 transition-all shrink-0"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile menu — rendered via portal to document.body */}
      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} pathname={pathname} />
    </>
  );
}
