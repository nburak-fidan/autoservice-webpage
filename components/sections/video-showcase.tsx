"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Youtube, ExternalLink } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SITE_CONFIG } from "@/lib/content/site-config";
import { Button } from "@/components/ui/button";

/* ── YouTube videoları — GM OPEL GARAGE gerçek kanal videoları ── */
const videos = [
  {
    id: "L45R58I-X9U",
    title: "Sektörde Öncü Firma — GM OPEL GARAGE Neler Yapıyor?",
    description:
      "GM Opel Garage firması olarak sizlere en iyi hizmeti verebilmek için buradayız. Tanıtım videomuz.",
  },
  {
    id: "Nm_rEaUji_k",
    title: "Opel ve Chevrolet Elektronik Arıza Problemleri",
    description:
      "Yapılan tüm işlerimiz GM Opel Garage bünyesinde 6 ay garantilidir. Elektronik arıza çözümleri.",
  },
  {
    id: "-2zwpzRNgG0",
    title: "Yarı Otomatik Şanzımanlarda Kampanya!",
    description:
      "Easytronic araçlarınızın robotlarını revize edip garantili şekilde gönderiyoruz.",
  },
  {
    id: "mSvtnNpfj6U",
    title: "Astra H Şanzıman Robot Onarım Merkezi",
    description:
      "Opel ve Chevrolet elektronik servis olarak yarı otomatik şanzıman robot onarım hizmeti.",
  },
  {
    id: "twdOv6WTOdo",
    title: "AFL Sistem Arızaları ve Çözümü",
    description:
      "81 ile gönderdiğimiz %100 memnuniyetle sonuç alan AFL sistem arıza çözümleri.",
  },
  {
    id: "0C0p5HLoxhE",
    title: "Uzaktan Beyin Programlama Hizmeti",
    description:
      "Yaptığımız işlemler GM Opel Garage bünyesinde 6 ay garantilidir. Uzaktan ECU programlama.",
  },
  {
    id: "j5AbhHyxKxo",
    title: "ECU Değişimi ve Astra H Kalorifer Klape Onarımı",
    description:
      "ECU tamirleri ve elektronik hizmetler — Astra H kalorifer sıcak soğuk klape onarımı ömür boyu garantili.",
  },
  {
    id: "GkJGqw7jxtI",
    title: "GM OPEL GARAGE — MasterTech Levent Canikli",
    description:
      "Profesyonel ekibimiz ve MasterTech sertifikalı teknik kadromuzla hizmetinizdeyiz.",
  },
  {
    id: "1l7P8AroQeM",
    title: "Astra Yarı Otomatik Çözüm Ortağınız",
    description:
      "GM Opel Garage olarak iş ortağınız ve ustanız olmaktan memnuniyet duyarız.",
  },
  {
    id: "XB74oA6-RLo",
    title: "Yazın Kesinlikle Şart Olan Yazılım",
    description:
      "Siz değerli müşterilerimize en iyi hizmeti vermeye çalışıyoruz.",
  },
  {
    id: "ncywNUDFfyo",
    title: "Sabahları ESP Yanıyor Tekliyor — Çözümü",
    description:
      "ESP arıza lambası sorunu ve ısınınca düzeliyor problemi için profesyonel çözüm.",
  },
];

/* ── Sosyal medya hesapları ── */
const socialPlatforms = [
  {
    name: "YouTube",
    icon: Youtube,
    href: SITE_CONFIG.social.youtube,
    color: "bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white",
    description: "Tamir süreçleri ve tanıtım videoları",
    stat: "11+ Video İçerik",
  },
  {
    name: "Instagram",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    href: SITE_CONFIG.social.instagram,
    color:
      "bg-pink-500/10 text-pink-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white",
    description: "Atölye paylaşımları ve hikayeler",
    stat: "Fotoğraf & Reels",
  },
  {
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-1.96-.41 4.85 4.85 0 01-1.59-1.14V6.69z" />
      </svg>
    ),
    href: SITE_CONFIG.social.tiktok,
    color: "bg-white/10 text-white hover:bg-white hover:text-black",
    description: "Kısa tamir videoları ve servis hikayeleri",
    stat: "Kısa Videolar",
  },
  {
    name: "Facebook",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    href: SITE_CONFIG.social.facebook,
    color: "bg-blue-500/10 text-blue-400 hover:bg-blue-600 hover:text-white",
    description: "Haberler ve müşteri yorumları",
    stat: "Güncel Paylaşımlar",
  },
];

export function VideoShowcaseSection() {
  return (
    <SectionWrapper id="video-showcase" variant="muted" className="noise-overlay">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand/5 rounded-full blur-[100px]" />

      <SectionHeader
        title="Videolarımız & Sosyal Medya"
        subtitle="Tamir süreçlerimizi ve atölyemizi sosyal medya hesaplarımızdan takip edin."
      />

      {/* ── Featured Video (big embed) ── */}
      <ScrollReveal>
        <div className="relative mb-12 rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].id}?rel=0&modestbranding=1`}
              title={videos[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                GM OPEL GARAGE
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-foreground mb-1">
              {videos[0].title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {videos[0].description}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Video Thumbnails Grid (6 videos) ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-14">
        {videos.slice(1, 7).map((video, i) => (
          <ScrollReveal key={`${video.id}-${i}`} delay={i * 0.1}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden border border-border/50 bg-card transition-all duration-500 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/90 text-black shadow-xl shadow-brand/30 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                  </motion.div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors line-clamp-1">
                  {video.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>

      {/* ── More Videos (compact list) ── */}
      {videos.length > 7 && (
        <ScrollReveal>
          <div className="mb-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <Play className="h-4 w-4 text-brand" />
              <h3 className="text-base font-black text-foreground">
                Daha Fazla Video
              </h3>
              <span className="text-xs text-muted-foreground">
                ({videos.length - 7} video daha)
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {videos.slice(7).map((video, i) => (
                <motion.a
                  key={`${video.id}-more-${i}`}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border/30 bg-card/50 p-3 transition-all duration-300 hover:border-brand/40 hover:bg-card"
                  whileHover={{ x: 4 }}
                >
                  {/* Mini thumbnail */}
                  <div className="relative h-16 w-28 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" fill="currentColor" />
                    </div>
                  </div>
                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-brand transition-colors line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                      {video.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* ── Social Media Platforms ── */}
      <ScrollReveal>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
            <span className="text-xs font-bold text-brand uppercase tracking-widest">
              Bizi Takip Edin
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socialPlatforms.map((platform, i) => (
              <motion.a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center text-center rounded-2xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${platform.color}`}
                >
                  <platform.icon />
                </div>

                <h4 className="relative mt-4 text-base font-black text-foreground group-hover:text-brand transition-colors">
                  {platform.name}
                </h4>
                <p className="relative text-xs text-muted-foreground mt-1">
                  {platform.description}
                </p>
                <span className="relative mt-3 text-[11px] font-semibold text-brand/60 uppercase tracking-wider">
                  {platform.stat}
                </span>

                {/* External link hint */}
                <ExternalLink className="absolute top-4 right-4 h-3.5 w-3.5 text-white/10 group-hover:text-brand/50 transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* YouTube CTA */}
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
              asChild
            >
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="mr-2 h-4 w-4" />
                YouTube Kanalımıza Abone Olun
              </a>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
