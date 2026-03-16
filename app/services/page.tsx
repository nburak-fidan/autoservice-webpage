import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services } from "@/lib/content/services";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Hizmetlerimiz",
  description:
    "Opel ve Chevrolet araçlar için ECU, BCM, EPS, gösterge paneli, airbag modülü ve immobilizer onarım hizmetleri.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SectionWrapper className="pt-28 md:pt-36">
      <SectionHeader
        title="Hizmetlerimiz"
        subtitle="Opel ve Chevrolet araçlarınız için sunduğumuz profesyonel elektronik onarım hizmetleri."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ScrollReveal key={service.slug} delay={i * 0.08}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-2 hover:border-brand/40 h-full"
            >
              {/* Thumbnail */}
              {service.image && (
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
              )}
              <div className="relative p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand mb-4 group-hover:bg-brand group-hover:text-black transition-all duration-500">
                  <service.icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-semibold text-brand opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Detaylı bilgi
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
