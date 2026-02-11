import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/content/site-config";
import { services } from "@/lib/content/services";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white/90 pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white text-sm font-bold">
                OE
              </div>
              {SITE_CONFIG.name}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {SITE_CONFIG.tagline}. {SITE_CONFIG.address.city} merkezli
              profesyonel oto elektronik onarım hizmeti.
            </p>
          </div>

          {/* Col 2: Hizmetler */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/40">
              Hizmetler
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sayfalar */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/40">
              Sayfalar
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "Hakkımızda" },
                { href: "/faults", label: "Arıza Rehberi" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "İletişim" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: İletişim */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/40">
              İletişim
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white/40" />
                <span>
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.district}/{SITE_CONFIG.address.city}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-white/40" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-white/40" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 text-sm text-white/40">
              <p>Hafta içi: {SITE_CONFIG.hours.weekdays}</p>
              <p>Cumartesi: {SITE_CONFIG.hours.saturday}</p>
              <p>Pazar: {SITE_CONFIG.hours.sunday}</p>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Tüm hakları
            saklıdır.
          </p>
          <p>
            Profesyonel oto elektronik onarım — {SITE_CONFIG.address.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
