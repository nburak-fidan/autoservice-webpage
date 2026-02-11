import { Search, Wrench, CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Ücretsiz Teşhis",
    description:
      "Aracınızı veya modülünüzü teslim alıyor, son teknoloji ekipmanlarla arızayı tespit ediyoruz. Ön teşhis ücretsizdir.",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Profesyonel Onarım",
    description:
      "Arıza tespit edildikten sonra onarım sürecine geçilir. Orijinal yedek parça ve profesyonel ekipman kullanılır.",
  },
  {
    icon: CheckCircle2,
    number: "03",
    title: "Test & Teslim",
    description:
      "Onarım sonrası kapsamlı testler yapılır. Garantili şekilde aracınız teslim edilir. 12 ay onarım garantisi verilir.",
  },
];

export function ProcessSection() {
  return (
    <SectionWrapper id="process" variant="muted">
      <SectionHeader
        title="Nasıl Çalışıyoruz?"
        subtitle="3 basit adımda aracınızın elektronik sorunlarını çözüyoruz."
      />

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.15}>
            <div className="relative text-center">
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}

              {/* Icon circle */}
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white border border-border shadow-sm mb-6">
                <step.icon className="h-8 w-8 text-brand" />
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white text-xs font-bold">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
