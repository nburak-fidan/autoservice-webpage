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
        subtitle="Merak ettiğiniz soruların yanıtlarını burada bulabilirsiniz."
      />

      <ScrollReveal>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6 shadow-sm data-[state=open]:shadow-md data-[state=open]:border-brand/20 transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-brand py-5 text-[15px]">
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
