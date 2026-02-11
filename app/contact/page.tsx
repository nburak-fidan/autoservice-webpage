import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildLocalBusinessSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "İletişim",
  description:
    "Opel ve Chevrolet elektronik onarım için bizimle iletişime geçin. Ücretsiz ön teşhis, adres, telefon ve çalışma saatleri.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <div className="pt-12 md:pt-16">
        <ContactSection />
      </div>
    </>
  );
}
