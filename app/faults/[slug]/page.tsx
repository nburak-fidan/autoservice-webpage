import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { faults, getFaultBySlug } from "@/lib/content/faults";
import { getServiceBySlug } from "@/lib/content/services";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { createPageMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return faults.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fault = getFaultBySlug(slug);
  if (!fault) return {};
  return createPageMetadata({
    title: fault.title,
    description: fault.description,
    path: `/faults/${fault.slug}`,
  });
}

export default async function FaultDetailPage({ params }: Props) {
  const { slug } = await params;
  const fault = getFaultBySlug(slug);
  if (!fault) notFound();

  const relatedService = getServiceBySlug(fault.relatedServiceSlug);

  return (
    <SectionWrapper className="pt-28 md:pt-36">
      <ScrollReveal>
        <Link
          href="/faults"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Tüm Arızalar
        </Link>
      </ScrollReveal>

      <div className="max-w-3xl">
        <ScrollReveal>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
            {fault.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {fault.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Belirtiler
          </h2>
          <ul className="space-y-3 mb-10">
            {fault.symptoms.map((symptom) => (
              <li
                key={symptom}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {relatedService && (
          <ScrollReveal delay={0.2}>
            <div className="rounded-2xl border border-brand/20 bg-brand-50 p-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Bu arıza için çözümümüz
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {relatedService.description}
              </p>
              <Button
                className="bg-brand hover:bg-brand-light text-white"
                asChild
              >
                <Link href={`/services/${relatedService.slug}`}>
                  {relatedService.title} hakkında bilgi alın
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </SectionWrapper>
  );
}
