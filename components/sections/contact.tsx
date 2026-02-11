"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/content/site-config";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ContactSection() {
  return (
    <SectionWrapper id="contact" variant="muted">
      <SectionHeader
        title="Bize Ulaşın"
        subtitle="Aracınızla ilgili sorularınız mı var? Ücretsiz ön teşhis için hemen iletişime geçin."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: Form */}
        <ScrollReveal direction="left">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              İletişim Formu
            </h3>
            {/* TODO: Wire up form submission (API route, email service, etc.) */}
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input
                    id="name"
                    placeholder="Adınız Soyadınız"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle">Araç Bilgisi</Label>
                <Input
                  id="vehicle"
                  placeholder="Örn: Opel Astra J 2015"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Arıza Açıklaması</Label>
                <Textarea
                  id="message"
                  placeholder="Yaşadığınız sorunu kısaca açıklayın..."
                  rows={4}
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-brand hover:bg-brand-light text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Gönder
              </Button>
            </form>
          </div>
        </ScrollReveal>

        {/* Right: Info + Map */}
        <ScrollReveal direction="right">
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <Phone className="h-4 w-4" />
                  </div>
                  <h4 className="font-semibold text-sm">Telefon</h4>
                </div>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-sm text-muted-foreground hover:text-brand transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <Mail className="h-4 w-4" />
                  </div>
                  <h4 className="font-semibold text-sm">E-posta</h4>
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm text-muted-foreground hover:text-brand transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <h4 className="font-semibold text-sm">Adres</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {SITE_CONFIG.address.street},{" "}
                  {SITE_CONFIG.address.district}/{SITE_CONFIG.address.city}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <Clock className="h-4 w-4" />
                  </div>
                  <h4 className="font-semibold text-sm">Çalışma Saatleri</h4>
                </div>
                <div className="text-sm text-muted-foreground space-y-0.5">
                  <p>Hafta içi: {SITE_CONFIG.hours.weekdays}</p>
                  <p>Cumartesi: {SITE_CONFIG.hours.saturday}</p>
                  <p>Pazar: {SITE_CONFIG.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Map embed placeholder */}
            <div className="rounded-xl border border-border overflow-hidden shadow-sm aspect-video bg-muted">
              <iframe
                src={SITE_CONFIG.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Konum haritası"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
