"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { SITE_CONFIG as siteConfig } from "@/lib/content/site-config";
import { motion, AnimatePresence } from "framer-motion";

const quickMessages = [
  "ECU onarım fiyatı öğrenmek istiyorum",
  "BCM arızası hakkında bilgi almak istiyorum",
  "Gösterge paneli tamiri için fiyat sormak istiyorum",
  "Araç bilgilerimi paylaşmak istiyorum",
];

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneClean = siteConfig.phone.replace(/[\s+]/g, "");

  const sendMessage = (msg: string) => {
    window.open(
      `https://wa.me/${phoneClean}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-24 md:bottom-8 right-4 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-16 right-0 w-80 rounded-2xl border border-border bg-card shadow-2xl shadow-black/50 overflow-hidden mb-3"
            >
              {/* Header */}
              <div className="bg-green-600 p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{siteConfig.name}</p>
                  <p className="text-green-100 text-xs">Genellikle hemen yanıt verir</p>
                </div>
              </div>

              {/* Chat body */}
              <div className="p-4 bg-[#0d1117]">
                {/* Incoming message bubble */}
                <div className="bg-card rounded-xl rounded-tl-sm p-3 mb-4 max-w-[85%] border border-border">
                  <p className="text-sm text-foreground">
                    Merhaba! 👋 Araç elektronik onarımı hakkında nasıl yardımcı olabiliriz?
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 text-right">Şimdi</p>
                </div>

                {/* Quick reply buttons */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Hızlı mesaj seçin:</p>
                  {quickMessages.map((msg) => (
                    <button
                      key={msg}
                      onClick={() => sendMessage(msg)}
                      className="w-full text-left text-xs px-3 py-2.5 rounded-lg border border-brand/20 bg-brand/5 text-foreground hover:bg-brand/10 hover:border-brand/40 transition-all duration-200 flex items-center gap-2"
                    >
                      <Send className="h-3 w-3 text-brand shrink-0" />
                      {msg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer input */}
              <div className="p-3 border-t border-border bg-card">
                <a
                  href={`https://wa.me/${phoneClean}?text=${encodeURIComponent("Merhaba, bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp ile Yazın
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 ${
            isOpen
              ? "bg-card border border-border text-foreground"
              : "bg-green-600 text-white shadow-green-600/30"
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse ring */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
          )}
        </motion.button>
      </div>
    </>
  );
}
