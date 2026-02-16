"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_CONFIG as siteConfig } from "@/lib/content/site-config";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactInfo: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  accent?: boolean;
}[] = [
  {
    icon: Phone,
    label: "Şirket Hattı",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  ...siteConfig.whatsappNumbers.map((wp) => ({
    icon: MessageCircle as typeof Phone,
    label: `WhatsApp`,
    value: wp.number,
    href: `https://wa.me/${wp.raw}`,
    accent: true,
  })),
  {
    icon: Mail,
    label: "E-posta",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Adres",
    value: `${siteConfig.address.street}, ${siteConfig.address.district}/${siteConfig.address.city}`,
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: `Hafta içi: ${siteConfig.hours.weekdays} | Cumartesi: ${siteConfig.hours.saturday}`,
  },
];

export function ContactSection() {
  return (
    <SectionWrapper id="contact" variant="muted" className="noise-overlay">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand/5 rounded-full blur-[100px]" />

      <SectionHeader
        title="Bize Ulaşın"
        subtitle="Aracınızla ilgili herhangi bir sorun mu yaşıyorsunuz? Hemen bizimle iletişime geçin."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Contact info cards */}
        <ScrollReveal>
          <div className="space-y-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={`${item.label}-${i}`}
                className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:shadow-brand/10"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Left accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand/0 group-hover:bg-brand transition-all duration-300" />

                <motion.div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                    item.accent
                      ? "bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-500/20"
                      : "bg-brand/10 text-brand group-hover:bg-brand group-hover:text-black group-hover:shadow-lg group-hover:shadow-brand/20"
                  }`}
                  whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.accent ? "_blank" : undefined}
                      rel={item.accent ? "noopener noreferrer" : undefined}
                      className="text-sm font-semibold text-foreground hover:text-brand transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Contact form */}
        <ScrollReveal delay={0.15}>
          <div className="relative rounded-2xl border border-border/50 bg-card p-8 overflow-hidden">
            {/* Top accent */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand/5 to-transparent" />

            <h3 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-brand" />
              Mesaj Gönderin
            </h3>
            <form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-muted-foreground">Ad Soyad</Label>
                  <Input
                    id="name"
                    placeholder="Adınız Soyadınız"
                    className="bg-background border-border/50 focus:border-brand focus:ring-brand/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-muted-foreground">Telefon</Label>
                  <Input
                    id="phone"
                    placeholder="05XX XXX XX XX"
                    className="bg-background border-border/50 focus:border-brand focus:ring-brand/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm text-muted-foreground">Konu</Label>
                <Input
                  id="subject"
                  placeholder="Araç modeli ve arıza bilgisi"
                  className="bg-background border-border/50 focus:border-brand focus:ring-brand/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-muted-foreground">Mesaj</Label>
                <Textarea
                  id="message"
                  placeholder="Detaylı açıklama yazınız..."
                  rows={4}
                  className="bg-background border-border/50 focus:border-brand focus:ring-brand/20"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-brand text-black font-bold hover:bg-brand-light transition-all duration-300 hover:shadow-lg hover:shadow-brand/30 pulse-glow"
              >
                <Send className="h-4 w-4 mr-2" />
                Gönder
              </Button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
