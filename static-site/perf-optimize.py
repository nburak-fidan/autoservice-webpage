#!/usr/bin/env python3
"""
GM Opel Garage — Performans Optimizasyon Script'i
=================================================
Tüm HTML dosyalarında:
  1. <img> tag'larına: loading="lazy" + decoding="async" (hero hariç)
  2. <img> tag'larına: width/height (CLS önleme) — eksikse default
  3. Google Fonts: render-block'tan kurtar (preload + onload swap)
  4. Defer tüm script'ler (zaten </body> sonu ama daha güvenli)
"""
import re
import os
from pathlib import Path

ROOT = Path(__file__).parent
HTML_FILES = sorted(ROOT.glob("*.html"))

# Resim boyut tahminleri (px) — gerçek boyut bilinmediği için CLS-safe defaults
IMG_DEFAULTS = {
    "brandlogo.svg":     (180, 60),
    "drsairlogo.svg":    (200, 200),
    "hero-bg.webp":      (1024, 1024),
    "hero-bg-wide.webp": (1920, 1080),
}
GALLERY_DEFAULT = (800, 600)  # 4:3
SERVICE_DEFAULT = (800, 600)


def get_img_size(src: str):
    """src path'inden boyut tahmin et."""
    fname = src.split("/")[-1]
    if fname in IMG_DEFAULTS:
        return IMG_DEFAULTS[fname]
    if "/gallery/" in src or src.startswith("gallery/"):
        return GALLERY_DEFAULT
    if "/services/" in src or src.startswith("services/"):
        return SERVICE_DEFAULT
    return (800, 600)


def optimize_imgs(html: str) -> tuple[str, dict]:
    """
    Tüm <img> tag'larını optimize et.
    Hero img (loading="eager" zaten varsa) atlanır.
    """
    stats = {"total": 0, "lazy_added": 0, "decoding_added": 0, "size_added": 0}

    def fix_img(m: re.Match) -> str:
        tag = m.group(0)
        stats["total"] += 1

        # Hero img — DOKUNMA (zaten eager + fetchpriority + width/height var)
        if 'loading="eager"' in tag or 'fetchpriority="high"' in tag:
            return tag

        # SVG inline değilse loading=lazy ekle
        if "loading=" not in tag:
            tag = tag[:-1] + ' loading="lazy">'
            # Self-closing handle
            if tag.endswith("/>"):
                tag = tag[:-2] + ' loading="lazy" />'
            stats["lazy_added"] += 1

        # decoding="async"
        if "decoding=" not in tag:
            tag = re.sub(r'(<img\b)', r'\1 decoding="async"', tag, count=1)
            stats["decoding_added"] += 1

        # width / height eksikse ekle (CLS önleme)
        if 'width="' not in tag and 'height="' not in tag:
            src_match = re.search(r'src=["\']([^"\']+)["\']', tag)
            if src_match:
                w, h = get_img_size(src_match.group(1))
                tag = re.sub(
                    r'(<img\b)',
                    rf'\1 width="{w}" height="{h}"',
                    tag, count=1
                )
                stats["size_added"] += 1

        return tag

    new_html = re.sub(r'<img\b[^>]*>', fix_img, html)
    return new_html, stats


def optimize_google_fonts(html: str) -> tuple[str, bool]:
    """
    Google Fonts render-block'tan kurtar.
    <link href="...fonts.googleapis.com..." rel="stylesheet">
    →
    <link href="..." rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="..." rel="stylesheet"></noscript>
    """
    pattern = re.compile(
        r'<link\s+href="(https://fonts\.googleapis\.com/[^"]+)"\s+rel="stylesheet"\s*/?>',
        re.IGNORECASE
    )
    match = pattern.search(html)
    if not match:
        return html, False

    href = match.group(1)
    replacement = (
        f'<link rel="preload" as="style" href="{href}" '
        f'onload="this.onload=null;this.rel=\'stylesheet\'">\n'
        f'  <noscript><link href="{href}" rel="stylesheet"></noscript>'
    )
    new_html = pattern.sub(replacement, html, count=1)
    return new_html, True


def add_defer_to_scripts(html: str) -> tuple[str, int]:
    """
    Body sonu local script'lere defer ekle (gtag async hariç).
    """
    count = 0
    def fixer(m: re.Match) -> str:
        nonlocal count
        tag = m.group(0)
        if 'src=' not in tag:
            return tag
        if 'defer' in tag or 'async' in tag:
            return tag
        # CDN ve gtag'a dokunma
        if 'googletagmanager' in tag or 'http' in tag.split('src=')[1][:5]:
            return tag
        count += 1
        return tag.replace('<script ', '<script defer ', 1)

    new_html = re.sub(r'<script\b[^>]*src=[^>]*>', fixer, html)
    return new_html, count


def process_file(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    original = text

    text, img_stats = optimize_imgs(text)
    text, font_swapped = optimize_google_fonts(text)
    text, defer_count = add_defer_to_scripts(text)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return {
            "file": path.name,
            "changed": True,
            "img": img_stats,
            "fonts": font_swapped,
            "defer": defer_count,
        }
    return {"file": path.name, "changed": False}


def main():
    print("═" * 70)
    print(" GM OPEL GARAGE — Performance Optimization")
    print("═" * 70)
    total = {"lazy": 0, "decoding": 0, "size": 0, "fonts": 0, "defer": 0}

    for f in HTML_FILES:
        result = process_file(f)
        if not result["changed"]:
            print(f"  • {result['file']}: değişiklik yok")
            continue
        s = result["img"]
        print(
            f"  ✓ {result['file']}: "
            f"img({s['total']}) → +lazy:{s['lazy_added']} +decode:{s['decoding_added']} +size:{s['size_added']}"
            f" | fonts:{'✓' if result['fonts'] else '–'}"
            f" | defer:{result['defer']}"
        )
        total["lazy"] += s["lazy_added"]
        total["decoding"] += s["decoding_added"]
        total["size"] += s["size_added"]
        total["fonts"] += 1 if result["fonts"] else 0
        total["defer"] += result["defer"]

    print("─" * 70)
    print(f"  TOPLAM: +{total['lazy']} lazy, +{total['decoding']} decoding, "
          f"+{total['size']} width/height, {total['fonts']} font-swap, {total['defer']} defer")
    print("═" * 70)


if __name__ == "__main__":
    main()
