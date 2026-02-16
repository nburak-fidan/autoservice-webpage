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
    slug: "motor-beyni-arizasi-nasil-anlasilir",
    title: "Motor Beyni Arızası Nasıl Anlaşılır?",
    excerpt:
      "Aracınız ani güç kayıpları yaşıyor, rölantide titriyor ya da check engine lambası sürekli yanıyorsa motor beyni (ECU) arızası söz konusu olabilir. Yakıt tüketiminde açıklanamayan artış, vites geçişlerinde sertlik ve zaman zaman aracın hiç çalışmaması da ECU kaynaklı sorunların en yaygın belirtileri arasındadır. Bu tür semptomlarla karşılaştığınızda profesyonel bir teşhis cihazıyla arıza kodlarının okunması, doğru müdahale için ilk ve en önemli adımdır.",
    date: "2026-02-10",
  },
  {
    slug: "ecu-tamiri-mi-degisim-mi",
    title: "ECU Tamiri mi Değişim mi?",
    excerpt:
      "Motor beyni arızalandığında pek çok servis doğrudan yeni ünite değişimi önerir; ancak bu her zaman gerekli değildir. Yazılımsal hatalar, yanmış devre elemanları veya bağlantı sorunlarının büyük çoğunluğu profesyonel tamir ile çözülebilir — hem de değişim maliyetinin çok altında. Sıfır ECU değişimi binlerce liraya mal olurken, tamir işlemi çoğu zaman aynı gün tamamlanıp 6 ay garantiyle teslim edilir. Değişim yalnızca işlemci veya ana kartın fiziksel olarak hasar gördüğü ileri düzey vakalarda kaçınılmazdır.",
    date: "2026-01-25",
  },
  {
    slug: "elektronik-ariza-isiklari",
    title: "Elektronik Arıza Işıkları Ne Anlama Gelir?",
    excerpt:
      "Gösterge panelinizdeki uyarı lambaları, aracınızın sağlık durumu hakkında doğrudan bilgi verir. Check engine (motor arızası), ABS, airbag, EPS (direksiyon) ve akü ikaz lambaları en sık karşılaşılan uyarılardır. Bu ışıkların yanması her zaman büyük bir arıza olduğu anlamına gelmez; bazen bir sensör hatası ya da yazılımsal aksaklık da aynı uyarıyı tetikleyebilir. Ancak görmezden gelmek ciddi hasarlara yol açabilir. Uyarı yandığında en kısa sürede profesyonel arıza tespiti yaptırmanız hem güvenliğiniz hem de bütçeniz açısından en doğru karardır.",
    date: "2026-01-12",
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
