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
            <article className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-2 hover:border-brand/40 h-full flex flex-col">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col flex-1">
                <time className="text-xs text-brand font-medium mb-3">
                  {new Date(post.date).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <span className="mt-4 text-sm font-semibold text-brand opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Devamını oku →
                </span>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
