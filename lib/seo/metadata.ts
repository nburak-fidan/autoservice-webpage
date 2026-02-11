import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/content/site-config";

// ============================================================
// Default metadata + helper to create per-page overrides
// ============================================================

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Opel ECU tamiri",
    "Chevrolet elektronik onarım",
    "BCM tamiri",
    "EPS direksiyon tamiri",
    "gösterge paneli tamiri",
    "airbag modülü tamiri",
    "immobilizer tamiri",
    "oto elektronik",
    SITE_CONFIG.address.city,
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

/**
 * Create page-specific metadata by merging with defaults.
 */
export function createPageMetadata(overrides: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = overrides.path
    ? `${SITE_CONFIG.url}${overrides.path}`
    : SITE_CONFIG.url;

  return {
    title: overrides.title,
    description: overrides.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${overrides.title} | ${SITE_CONFIG.name}`,
      description: overrides.description,
      url,
    },
  };
}
