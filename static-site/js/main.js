/* ============================================================
   GM OPEL GARAGE — Pure JavaScript
   No dependencies — vanilla JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initFAQ();
  initCounters();
});

/* ── Navbar scroll effect ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile menu ── */
function initMobileMenu() {
  const openBtn = document.querySelector('.navbar__hamburger');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu__close');
  const backdrop = document.querySelector('.mobile-menu__backdrop');
  const links = document.querySelectorAll('.mobile-menu__link');

  if (!openBtn || !menu) return;

  function open() {
    menu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    menu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);

  links.forEach(link => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ── Scroll Reveal ──
 * v2: rootMargin + early-trigger ile scroll-lag eliminate edildi.
 * - Kullanıcı motion-reduce isterse animasyon devre dışı.
 * - rootMargin pozitif: eleman ekrana girmeden 200px ÖNCE animasyon başlasın → "pop" yok.
 * - threshold 0: 1 piksel görünür olunca tetiklenir, beklemez.
 * - "Above the fold" elemanlar (ilk 600px) anında görünür yapılır.
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Kullanıcı animasyonları azaltmak istiyorsa hepsini direkt görünür yap
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    reveals.forEach(el => el.classList.add('reveal--visible'));
    return;
  }

  // IntersectionObserver desteklenmiyorsa fallback
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('reveal--visible'));
    return;
  }

  const viewportH = window.innerHeight;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay) || 0;
        if (delay > 0) {
          setTimeout(() => entry.target.classList.add('reveal--visible'), delay * 1000);
        } else {
          entry.target.classList.add('reveal--visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    // Eleman viewport'a girmeden 200px önce başlat — scroll-lag eliminate
    rootMargin: '0px 0px 200px 0px'
  });

  reveals.forEach(el => {
    // Above-the-fold (ilk ekran) elemanlarını anında göster — observer beklemesi yok
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportH * 0.9) {
      el.classList.add('reveal--visible');
    } else {
      observer.observe(el);
    }
  });
}

/* ── FAQ Accordion ── */
function initFAQ() {
  const items = document.querySelectorAll('.faq__item');

  items.forEach(item => {
    const btn = item.querySelector('.faq__question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--open');

      // Close all
      items.forEach(i => i.classList.remove('faq__item--open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('faq__item--open');
      }
    });
  });
}

/* ── Live Counter System ── */
/*
 * Dinamik sayaç sistemi:
 * - Kuruluş: 1 Ocak 1998
 * - Her gün geçtikçe müşteri ve onarım sayıları organik artar
 * - Küsüratlı, gerçekçi sayılar (10.847 gibi, 10.000 gibi değil)
 * - Sayfa her açıldığında tutarlı ama günden güne değişen rakamlar
 * - Yıl deneyim: otomatik hesaplanır
 */

const LIVE_COUNTER_CONFIG = {
  founded: new Date(1998, 0, 1),   // 1 Ocak 1998

  customers: {
    base: 4250,                     // 1 Ocak 2010 itibariyle baz
    baseDate: new Date(2010, 0, 1),
    dailyRate: 1.35,                // Günlük ortalama yeni müşteri
    seed: 7919                      // Deterministik rastgelelik seed
  },

  repairs: {
    base: 5100,
    baseDate: new Date(2010, 0, 1),
    dailyRate: 1.85,                // Onarım müşteriden biraz fazla
    seed: 1301
  }
};

/* Deterministik pseudo-random (aynı seed = aynı sequence her zaman) */
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* Bugüne kadar geçen gün sayısı */
function daysSince(fromDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((today - fromDate) / (1000 * 60 * 60 * 24));
}

function computeLiveValue(cfg) {
  const days = daysSince(cfg.baseDate);
  // Seed sabit — aynı sequence, her gün sadece 1 adım daha ilerliyor
  const rng = seededRandom(cfg.seed);

  let total = cfg.base;
  for (let d = 0; d < days; d++) {
    const dateMs = cfg.baseDate.getTime() + d * 86400000;
    const dayOfWeek = new Date(dateMs).getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.4 : 1.0;

    const month = new Date(dateMs).getMonth();
    const seasonFactor = 1 + 0.15 * Math.sin((month - 3) * Math.PI / 6);

    const jitter = 0.6 + rng() * 0.8;  // 0.6x–1.4x arası varyans
    total += cfg.dailyRate * weekendFactor * seasonFactor * jitter;
  }

  return Math.floor(total);
}

function computeExperience() {
  const now = new Date();
  const founded = LIVE_COUNTER_CONFIG.founded;
  let years = now.getFullYear() - founded.getFullYear();
  // Yıl dönümü henüz geçmediyse -1
  if (
    now.getMonth() < founded.getMonth() ||
    (now.getMonth() === founded.getMonth() && now.getDate() < founded.getDate())
  ) {
    years--;
  }
  return years;
}

function formatNumber(n) {
  return new Intl.NumberFormat('tr-TR').format(n);
}

/* Sayma animasyonu (0'dan hedefe) */
function animateToValue(el, target, suffix) {
  const duration = 2200;
  const fps = 60;
  const totalFrames = Math.round(duration / (1000 / fps));
  let frame = 0;

  // Easing: easeOutExpo
  function ease(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function tick() {
    frame++;
    const progress = ease(frame / totalFrames);
    const current = Math.floor(progress * target);

    el.textContent = formatNumber(current) + (suffix || '');

    if (frame < totalFrames) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = formatNumber(target) + (suffix || '');
    }
  }

  requestAnimationFrame(tick);
}

function initCounters() {
  const liveEls = document.querySelectorAll('[data-live-counter]');
  if (!liveEls.length) return;

  // Hedef değerleri hesapla
  const values = {
    experience: computeExperience(),
    customers: computeLiveValue(LIVE_COUNTER_CONFIG.customers),
    repairs: computeLiveValue(LIVE_COUNTER_CONFIG.repairs)
  };

  // IntersectionObserver ile görünürlükte animasyon başlat
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const type = el.dataset.liveCounter;
        const suffix = el.dataset.suffix || '';
        const target = values[type] || 0;

        animateToValue(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  liveEls.forEach(el => observer.observe(el));

  // Eski data-count elemanları da çalışsın (başka sayfalarda varsa)
  const legacyCounters = document.querySelectorAll('[data-count]');
  if (!legacyCounters.length) return;

  const legacyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        animateToValue(el, target, suffix);
        legacyObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  legacyCounters.forEach(el => legacyObserver.observe(el));
}
