import { Phone, MessageCircle } from "lucide-react";
import { SITE_CONFIG as siteConfig } from "@/lib/content/site-config";

export function MobileCTA() {
  const phoneClean = siteConfig.phone.replace(/[\s+]/g, "");
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-brand/20 bg-black/95 backdrop-blur-xl">
      <div className="grid grid-cols-2 divide-x divide-brand/20">
        <a
          href={`tel:+${phoneClean}`}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-brand active:bg-brand/10 transition-colors"
        >
          <Phone className="h-5 w-5" />
          Hemen Ara
        </a>
        <a
          href={`https://wa.me/${phoneClean}?text=${encodeURIComponent("Merhaba, araç elektronik onarım hakkında bilgi almak istiyorum.")}`}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-green-400 active:bg-green-500/10 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
