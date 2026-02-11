import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content/faqs";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FAQSection() {
  return (
    <SectionWrapper id="faq">
      <SectionHeader
        title="Sıkça Sorulan Sorular"
        subtitle="Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz."
      />

      <ScrollReveal>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6 transition-all duration-300 hover:border-brand/40 data-[state=open]:border-brand/50 data-[state=open]:shadow-lg data-[state=open]:shadow-brand/10"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-brand transition-colors py-5 [&[data-state=open]]:text-brand">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
