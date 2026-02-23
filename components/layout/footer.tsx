import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { SITE_CONFIG as siteConfig } from "@/lib/content/site-config";
import { services } from "@/lib/content/services";

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "YouTube", href: siteConfig.social.youtube },
  { label: "TikTok", href: siteConfig.social.tiktok },
  { label: "Facebook", href: siteConfig.social.facebook },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-black pb-20 md:pb-8">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-4 mb-5 group">
              <div className="relative h-20 w-20 transition-transform group-hover:scale-105 drop-shadow-[0_0_12px_rgba(245,183,49,0.15)]">
                <Image
                  src="/logo.png"
                  alt="GM Opel Garage Logo"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-black text-foreground group-hover:text-brand transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-xs font-semibold text-brand/60 tracking-widest uppercase">
                  {siteConfig.nameSecondary}
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {siteConfig.foundedYear} yılından bu yana {siteConfig.brands.join(", ")} araçlara elektrik, elektronik ve mekanik servis hizmeti.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Şu an açığız
            </div>

            {/* Social media */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground bg-white/[0.03] border border-white/[0.06] hover:text-brand hover:border-brand/30 transition-all duration-300"
                >
                  {social.label}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-brand uppercase tracking-wider mb-4">
              Hizmetlerimiz
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group text-sm text-muted-foreground hover:text-brand transition-colors flex items-center gap-1.5"
                  >
                    <span className="h-px w-3 bg-border group-hover:w-5 group-hover:bg-brand transition-all" />
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-brand uppercase tracking-wider mb-4">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Hakkımızda", href: "/about" },
                { label: "Arızalar", href: "/faults" },
                { label: "Blog", href: "/blog" },
                { label: "İletişim", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm text-muted-foreground hover:text-brand transition-colors flex items-center gap-1.5"
                  >
                    <span className="h-px w-3 bg-border group-hover:w-5 group-hover:bg-brand transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-brand uppercase tracking-wider mb-4">
              İletişim
            </h4>
            <ul className="space-y-3">
              {/* Şirket hattı */}
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-brand transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  {siteConfig.phone}
                </a>
              </li>
              {/* WhatsApp numaraları */}
              {siteConfig.whatsappNumbers.map((wp) => (
                <li key={wp.raw}>
                  <a
                    href={`https://wa.me/${wp.raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-green-400 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-green-400" />
                    {wp.number}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-brand transition-colors"
                >
                  <Mail className="h-4 w-4 text-brand" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                {siteConfig.address.street}, {siteConfig.address.district}/{siteConfig.address.city}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-muted-foreground">
            {siteConfig.brands.join(" · ")} — Profesyonel oto elektronik çözümleri
          </p>
        </div>
      </div>
    </footer>
  );
}
