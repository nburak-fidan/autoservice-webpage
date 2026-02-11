import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content/services";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <SectionHeader
        title="Hizmetlerimiz"
        subtitle="Opel ve Chevrolet araçlarınız için kapsamlı elektronik onarım çözümleri sunuyoruz."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ScrollReveal key={service.slug} delay={i * 0.08}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 hover:border-brand/20 h-full"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                <service.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.shortTitle}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Link indicator */}
              <div className="mt-4 flex items-center text-sm font-medium text-brand opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                Detaylı bilgi
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
