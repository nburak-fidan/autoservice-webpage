import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { createPageMetadata } from "@/lib/seo/metadata";

const blogSlugs = [
  "motor-beyni-arizasi-nasil-anlasilir",
  "ecu-tamiri-mi-degisim-mi",
  "elektronik-ariza-isiklari",
];

export async function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export const metadata: Metadata = createPageMetadata({
  title: "Blog Yazısı",
  description: "Blog yazısı detay sayfası.",
  path: "/blog",
});

// TODO: Implement dynamic blog detail page with MDX or CMS content
export default function BlogDetailPage() {
  return (
    <SectionWrapper className="pt-28 md:pt-36">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          title="Blog Yazısı"
          subtitle="Bu sayfa yakında aktif olacaktır."
        />
        <p className="text-muted-foreground">
          Blog detay sayfaları için MDX veya CMS entegrasyonu yapılacaktır.
        </p>
      </div>
    </SectionWrapper>
  );
}
