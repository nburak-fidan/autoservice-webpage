import Link from "next/link";
import type { Metadata } from "next";
import { faults } from "@/lib/content/faults";
import { getServiceBySlug } from "@/lib/content/services";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Arıza Rehberi",
  description:
    "Opel ve Chevrolet araçlarda sık karşılaşılan elektronik arızalar, belirtileri ve çözüm yöntemleri.",
  path: "/faults",
});

export default function FaultsPage() {
  return (
    <SectionWrapper className="pt-28 md:pt-36">
      <SectionHeader
        title="Arıza Rehberi"
        subtitle="Aracınızda karşılaşabileceğiniz elektronik arızalar hakkında bilgi edinin."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {faults.map((fault, i) => {
          const relatedService = getServiceBySlug(fault.relatedServiceSlug);
          return (
            <ScrollReveal key={fault.slug} delay={i * 0.1}>
              <Link
                href={`/faults/${fault.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-brand/20 transition-all h-full"
              >
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {fault.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {fault.description}
                </p>
                {relatedService && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-brand bg-brand-50 rounded-full px-3 py-1 w-fit">
                    İlgili: {relatedService.shortTitle}
                  </span>
                )}
                <div className="mt-3 flex items-center text-sm font-medium text-brand">
                  Devamını oku
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
