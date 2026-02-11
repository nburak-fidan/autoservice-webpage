import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG as siteConfig } from "@/lib/content/site-config";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.phone,
    href: `https://wa.me/${siteConfig.phone.replace(/[\s+]/g, "")}`,
    accent: true,
  },
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
    <SectionWrapper id="contact" variant="muted">
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
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:shadow-brand/10"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  item.accent
                    ? "bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white"
                    : "bg-brand/10 text-brand group-hover:bg-brand group-hover:text-black"
                }`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-foreground hover:text-brand transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Contact form */}
        <ScrollReveal delay={0.15}>
          <form className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">
              Mesaj Gönderin
            </h3>
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-muted-foreground">Ad Soyad</Label>
                  <Input
                    id="name"
                    placeholder="Adınız Soyadınız"
                    className="bg-background border-border focus:border-brand focus:ring-brand/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-muted-foreground">Telefon</Label>
                  <Input
                    id="phone"
                    placeholder="05XX XXX XX XX"
                    className="bg-background border-border focus:border-brand focus:ring-brand/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm text-muted-foreground">Konu</Label>
                <Input
                  id="subject"
                  placeholder="Araç modeli ve arıza bilgisi"
                  className="bg-background border-border focus:border-brand focus:ring-brand/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-muted-foreground">Mesaj</Label>
                <Textarea
                  id="message"
                  placeholder="Detaylı açıklama yazınız..."
                  rows={4}
                  className="bg-background border-border focus:border-brand focus:ring-brand/20"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-brand text-black font-bold hover:bg-brand-light transition-all duration-300 hover:shadow-lg hover:shadow-brand/30"
              >
                Gönder
              </Button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
