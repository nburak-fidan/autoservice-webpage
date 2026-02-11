import { ClipboardCheck, Search, Wrench, CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Kayıt & Kabul",
    description: "Aracınızın bilgileri alınır ve arıza detayları kaydedilir.",
  },
  {
    icon: Search,
    title: "Arıza Tespiti",
    description: "Profesyonel cihazlarla detaylı elektronik arıza tespiti yapılır.",
  },
  {
    icon: Wrench,
    title: "Onarım & Test",
    description: "Uzman ekibimiz tarafından onarım gerçekleştirilir ve testleri yapılır.",
  },
  {
    icon: CheckCircle2,
    title: "Teslim & Garanti",
    description: "Aracınız garantili bir şekilde teslim edilir.",
  },
];

export function ProcessSection() {
  return (
    <SectionWrapper id="process" variant="muted">
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand/5 rounded-full blur-[100px]" />

      <SectionHeader
        title="Nasıl Çalışıyoruz?"
        subtitle="Aracınızın onarım süreci 4 basit adımda tamamlanır."
      />

      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

        {steps.map((step, i) => (
          <ScrollReveal key={step.title} delay={i * 0.12}>
            <div className="group relative flex flex-col items-center text-center p-6">
              {/* Step number badge */}
              <div className="absolute -top-3 right-4 bg-brand text-black text-xs font-black px-2.5 py-1 rounded-full">
                0{i + 1}
              </div>

              {/* Icon circle */}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-brand/10 border border-brand/20 text-brand mb-6 group-hover:bg-brand group-hover:text-black transition-all duration-500 group-hover:shadow-lg group-hover:shadow-brand/30 group-hover:scale-110">
                <step.icon className="h-9 w-9" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
