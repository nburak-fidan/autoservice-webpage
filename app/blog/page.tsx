import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Oto elektronik onarım, araç bakım ipuçları ve teknik bilgiler.",
  path: "/blog",
});

// TODO: Replace with real blog posts (MDX, CMS, or static data)
const placeholderPosts = [
  {
    slug: "ecu-nedir",
    title: "ECU Nedir? Motor Beyni Hakkında Bilmeniz Gerekenler",
    excerpt:
      "Motor kontrol ünitesi (ECU) aracınızın en kritik elektronik bileşenidir. Bu yazıda ECU'nun çalışma prensibini açıklıyoruz.",
    date: "2026-01-15",
  },
  {
    slug: "eps-arizasi-belirtileri",
    title: "EPS Arızası Belirtileri ve Çözümleri",
    excerpt:
      "Elektrikli direksiyon sistemi arızaları nasıl anlaşılır? Belirtileri ve çözüm yollarını öğrenin.",
    date: "2026-01-08",
  },
  {
    slug: "airbag-lambasi-neden-yanar",
    title: "Airbag Lambası Neden Yanar?",
    excerpt:
      "Airbag uyarı lambasının yanma nedenleri ve yapmanız gerekenler hakkında detaylı bilgi.",
    date: "2025-12-20",
  },
];

export default function BlogPage() {
  return (
    <SectionWrapper className="pt-28 md:pt-36">
      <SectionHeader
        title="Blog"
        subtitle="Araç elektroniği hakkında faydalı bilgiler ve teknik içerikler."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderPosts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.1}>
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-brand/20 transition-all h-full flex flex-col">
              <time className="text-xs text-muted-foreground mb-2">
                {new Date(post.date).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {post.excerpt}
              </p>
              {/* TODO: Link to /blog/[slug] when blog detail pages are ready */}
              <span className="mt-4 text-sm font-medium text-brand">
                Devamını oku →
              </span>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
