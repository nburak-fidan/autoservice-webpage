"use client";

import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content/faqs";

export function FAQSection() {
  return (
    <SectionWrapper id="faq">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand/3 rounded-full blur-[150px]" />

      <SectionHeader
        title="Sıkça Sorulan Sorular"
        subtitle="En çok merak edilen soruları ve cevaplarını burada bulabilirsiniz."
      />

      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="relative rounded-2xl bg-card border border-border/50 p-6 sm:p-8 overflow-hidden">
            {/* Top accent */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-border/30"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-foreground hover:text-brand transition-colors py-5 gap-3">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-brand shrink-0" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pl-8 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
