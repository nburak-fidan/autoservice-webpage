import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/content/services";
import { faults } from "@/lib/content/faults";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { JsonLd, buildServiceSchema } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/content/site-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createPageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedFaults = faults.filter(
    (f) => f.relatedServiceSlug === service.slug
  );

  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          title: service.title,
          description: service.description,
          slug: service.slug,
        })}
      />

      <SectionWrapper className="pt-28 md:pt-36">
        {/* Breadcrumb */}
        <ScrollReveal>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Tüm Hizmetler
          </Link>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
                <service.icon className="h-7 w-7" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.longDescription}
              </p>
            </ScrollReveal>

            {/* Features */}
            <ScrollReveal delay={0.1}>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Hizmet Kapsamı
              </h2>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Supported models */}
            <ScrollReveal delay={0.2}>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Desteklenen Modeller
              </h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {service.brands.map((brand) => (
                  <span
                    key={brand}
                    className="rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-sm font-medium text-brand"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Related faults */}
            {relatedFaults.length > 0 && (
              <ScrollReveal delay={0.3}>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  İlgili Arıza Rehberleri
                </h2>
                <div className="space-y-3">
                  {relatedFaults.map((fault) => (
                    <Link
                      key={fault.slug}
                      href={`/faults/${fault.slug}`}
                      className="block rounded-xl border border-border bg-card p-4 hover:border-brand/40 hover:shadow-md hover:shadow-brand/10 transition-all"
                    >
                      <h3 className="font-semibold text-foreground text-sm">
                        {fault.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {fault.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <ScrollReveal direction="right">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-4">
                <h3 className="font-semibold text-foreground">
                  Ücretsiz Teşhis İçin Arayın
                </h3>
                <p className="text-sm text-muted-foreground">
                  Arızanızla ilgili sorularınızı yanıtlayalım. Ön teşhis
                  ücretsizdir.
                </p>
                <Button
                  className="w-full bg-brand hover:bg-brand-light text-black font-bold"
                  asChild
                >
                  <a href={`tel:${SITE_CONFIG.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Hemen Ara
                  </a>
                </Button>
                <Button variant="outline" className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10" asChild>
                  <a
                    href={SITE_CONFIG.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp ile Yaz
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
