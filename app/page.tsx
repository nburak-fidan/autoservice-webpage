import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { DrSairPromoSection } from "@/components/sections/dr-sair-promo";
import { GallerySection } from "@/components/sections/gallery";
import { ProcessSection } from "@/components/sections/process";
import { WhyUsSection } from "@/components/sections/why-us";
import { VideoShowcaseSection } from "@/components/sections/video-showcase";
import { CampaignSection } from "@/components/sections/campaign";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import {
  JsonLd,
  buildLocalBusinessSchema,
  buildFAQSchema,
} from "@/lib/seo/json-ld";
import { faqs } from "@/lib/content/faqs";

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildFAQSchema(faqs)} />

      <HeroSection />
      <ServicesSection />
      <DrSairPromoSection />
      <GallerySection />
      <ProcessSection />
      <WhyUsSection />
      <VideoShowcaseSection />
      <CampaignSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />

      {/* Spacer for mobile CTA bar */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
