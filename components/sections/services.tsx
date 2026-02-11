import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content/services";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ServicesSection() {
  return (
    <SectionWrapper id="services">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-[120px]" />

      <SectionHeader
        title="Hizmetlerimiz"
        subtitle="Opel ve Chevrolet araçlarınız için kapsamlı elektronik onarım çözümleri sunuyoruz."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ScrollReveal key={service.slug} delay={i * 0.08}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-brand/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand/10 h-full"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand mb-5 group-hover:bg-brand group-hover:text-black transition-all duration-500 group-hover:shadow-lg group-hover:shadow-brand/20">
                  <service.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Link indicator */}
                <div className="mt-5 flex items-center text-sm font-semibold text-brand opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Detaylı bilgi
                  <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
