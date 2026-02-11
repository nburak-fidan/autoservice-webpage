"use client";

import { Phone, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/content/site-config";

// ============================================================
// Sticky bottom CTA bar for mobile — call + WhatsApp
// ============================================================

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-border bg-white/95 backdrop-blur-lg safe-area-bottom">
      <div className="grid grid-cols-2 divide-x divide-border">
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-brand hover:bg-brand-50 transition-colors"
          aria-label="Telefon ile ara"
        >
          <Phone className="h-4 w-4" />
          Hemen Ara
        </a>
        <a
          href={SITE_CONFIG.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors"
          aria-label="WhatsApp ile yaz"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
