/**
 * WILHELM LIPPL HANDWERK – APPLICATION JAVASCRIPT
 * Modern UI Pro V3.1 Architecture
 */
'use strict';

gsap.registerPlugin(ScrollTrigger);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── 1. LENIS SMOOTH SCROLL ENGINE (§ 2) ───────────────────
const lenis = new Lenis({
  duration: 0.9,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.5,
  syncTouch: false, // Natives Touch-Scroll auf Mobilgeräten nicht überschreiben
  autoResize: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Lenis Anchor Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId && targetId !== '#' && targetId !== '#impressum' && targetId !== '#datenschutz') {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -75, duration: 0.9 });
      }
    }
  });
});

// ─── 2. DARK / LIGHT THEME TOGGLE (§ 20) ───────────────────
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme_lippl') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme_lippl', nextTheme);
});

// ─── 3. NAVBAR SCROLL STATE ────────────────────────────────
const mainNav = document.getElementById('mainNav');
ScrollTrigger.create({
  start: 'top -40',
  onUpdate: (self) => mainNav?.classList.toggle('scrolled', self.progress > 0),
});

// ─── 4. HAMBURGER MENÜ (Morphing X Mechanismus – § 0E) ─────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
  hamburger?.classList.add('open');
  hamburger?.setAttribute('aria-expanded', 'true');
  mobileMenu?.classList.add('open');
  mobileMenu?.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
}

function closeMobileMenu() {
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  
  // Nur Scroll reaktivieren wenn kein Modal offen ist
  const hasOpenModal = document.querySelector('.legal-modal-backdrop.open');
  if (!hasOpenModal) {
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }
}

hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobileMenu();
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

// ─── 5. KINETIC TYPOGRAPHY (SplitType – § 6 & § 0D) ────────
function initKineticTypography() {
  try {
    const heroTitle = new SplitType('.hero-title', { types: 'chars,words' });
    if (heroTitle.chars) {
      gsap.from(heroTitle.chars, {
        opacity: 0,
        y: 40,
        rotateX: -20,
        stagger: 0.02,
        duration: 0.75,
        ease: 'power3.out',
        delay: 0.2,
      });
    }

    document.querySelectorAll('.section-title').forEach((titleEl) => {
      const split = new SplitType(titleEl, { types: 'lines' });
      if (!split.lines) return;
      gsap.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.85,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: titleEl,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  } catch (err) {
    console.warn('SplitType initialized in fallback mode', err);
  }
}

// ─── 6. SCROLL ANIMATIONEN (§ 7) ───────────────────────────
function initScrollAnimations() {
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  gsap.utils.toArray('.bento-card-group').forEach((group) => {
    const cards = group.querySelectorAll('.bento-shell');
    gsap.from(cards, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 82%',
      },
    });
  });
}

// ─── 7. ALLEINSTELLUNGSMERKMAL 1: STICKY CARD-STACKING (§ 15) ───
function initCardStacking() {
  // Mobile Guard: Keine Überlappung unter 900px (§ 0G)
  if (window.innerWidth <= 900) return;

  const containers = document.querySelectorAll('.card-sticky-container');
  const totalCards = containers.length;

  containers.forEach((container, i) => {
    const card = container.querySelector('.stacking-card');
    if (!card) return;
    const targetScale = 1 - (totalCards - 1 - i) * 0.035;

    gsap.to(card, {
      scale: targetScale,
      scrollTrigger: {
        trigger: container,
        start: 'top top+=90',
        end: () => `+=${container.offsetHeight}`,
        scrub: true,
      },
    });
  });
}

// ─── 8. ALLEINSTELLUNGSMERKMAL 2: ANIMIERTE STATS ZÄHLER (§ 0A #6) ───
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-target') || '0');
    const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = obj.val.toFixed(decimals);
          },
        });
      },
    });
  });
}

// ─── 9. ALLEINSTELLUNGSMERKMAL 3: 3D TILT CARDS (§ 0A #8) ────
function init3DTiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (y / (rect.height / 2)) * -6;
      const rotateY = (x / (rect.width / 2)) * 6;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power1.out',
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)',
      });
    });
  });
}

// ─── 10. ALLEINSTELLUNGSMERKMAL 4: CHARACTER REVEAL (§ 17) ───
function initCharReveal() {
  document.querySelectorAll('[data-char-reveal]').forEach((el) => {
    const text = el.textContent.trim();
    el.innerHTML = '';

    [...text].forEach((char) => {
      const wrapper = document.createElement('span');
      wrapper.style.cssText = 'position:relative;display:inline;';

      const placeholder = document.createElement('span');
      placeholder.textContent = char;
      placeholder.style.cssText = 'visibility:hidden;';

      const animated = document.createElement('span');
      animated.textContent = char;
      animated.style.cssText = 'position:absolute;left:0;top:0;opacity:0.18;transition:color 0.2s;';

      wrapper.append(placeholder, animated);
      el.appendChild(wrapper);
    });

    const animatedChars = el.querySelectorAll('span > span:last-child');
    gsap.to(animatedChars, {
      opacity: 1,
      stagger: { each: 0.02, from: 'start' },
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        end: 'bottom 40%',
        scrub: 0.5,
      },
    });
  });
}

// ─── 11. MAGNETISCHE BUTTONS (§ 8) ─────────────────────────
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.32;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.32;
      gsap.to(btn, { x, y, duration: 0.35, ease: 'power2.out' });
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ─── 12. CUSTOM CURSOR (§ 9) ───────────────────────────────
function initCustomCursor() {
  const blob = document.querySelector('.cursor-blob');
  const follower = document.querySelector('.cursor-follower');
  if (!blob || !follower || window.matchMedia('(hover: none)').matches) return;

  window.addEventListener('mousemove', (e) => {
    gsap.to(blob, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
  }, { passive: true });

  document.querySelectorAll('a, button, input, [data-magnetic]').forEach((el) => {
    el.addEventListener('mouseenter', () => gsap.to(follower, { scale: 2.2, borderColor: 'var(--accent-amber)', duration: 0.25 }));
    el.addEventListener('mouseleave', () => gsap.to(follower, { scale: 1, borderColor: 'rgba(245, 158, 11, 0.6)', duration: 0.25 }));
  });
}

// ─── 13. FAQ AKKORDEON (BitV / A11y – § 3) ──────────────────
function initFAQAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');
  
  triggers.forEach((btn, i, all) => {
    // Keyboard Arrow Navigation
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); all[Math.min(i + 1, all.length - 1)].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); all[Math.max(i - 1, 0)].focus(); }
      if (e.key === 'Home') { e.preventDefault(); all[0].focus(); }
      if (e.key === 'End') { e.preventDefault(); all[all.length - 1].focus(); }
    });

    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Alle anderen schließen
      document.querySelectorAll('.faq-item').forEach((it) => {
        it.classList.remove('open');
        it.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        item?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ─── 14. INTERAKTIVER RECHNER (§ 6) ────────────────────────
function updateCalculator() {
  const slider = document.getElementById('calcSlider');
  const sliderValue = document.getElementById('calcSliderValue');
  const unitLabel = document.getElementById('calcUnitLabel');
  const minPriceEl = document.getElementById('calcPriceMin');
  const maxPriceEl = document.getElementById('calcPriceMax');
  const selectedGewerk = document.querySelector('input[name="calcGewerk"]:checked')?.value || 'montage';

  const val = parseInt(slider?.value || '25', 10);
  if (sliderValue) sliderValue.textContent = val;

  let minRate = 45;
  let maxRate = 65;

  if (selectedGewerk === 'montage') {
    if (unitLabel) unitLabel.textContent = 'Arbeitsstunden (ca.)';
    minRate = 48;
    maxRate = 68;
  } else if (selectedGewerk === 'boden') {
    if (unitLabel) unitLabel.textContent = 'm² Fläche';
    minRate = 24;
    maxRate = 42;
  } else if (selectedGewerk === 'allround') {
    if (unitLabel) unitLabel.textContent = 'Aufwands-Einheiten';
    minRate = 55;
    maxRate = 85;
  }

  const minTotal = Math.round(val * minRate);
  const maxTotal = Math.round(val * maxRate);

  if (minPriceEl) minPriceEl.textContent = minTotal.toLocaleString('de-DE');
  if (maxPriceEl) maxPriceEl.textContent = maxTotal.toLocaleString('de-DE');
}

// ─── 15. MULTI-STEP FUNNEL FORMULAR (§ 5) ──────────────────
let currentFunnelStep = 1;
const totalFunnelSteps = 3;

function updateFunnelProgress() {
  const pct = (currentFunnelStep / totalFunnelSteps) * 100;
  const bar = document.getElementById('funnelProgressBar');
  if (bar) bar.style.width = `${pct}%`;

  for (let i = 1; i <= totalFunnelSteps; i++) {
    const indicator = document.getElementById(`stepIndicator${i}`);
    if (indicator) {
      if (i === currentFunnelStep) {
        indicator.className = 'text-amber-400 font-bold';
      } else if (i < currentFunnelStep) {
        indicator.className = 'text-emerald-400 font-semibold';
      } else {
        indicator.className = 'text-[var(--fg-muted)]';
      }
    }
  }
}

function funnelNext(step) {
  const currentFieldset = document.getElementById(`step${step}`);
  if (!currentFieldset) return;

  // Validierung für aktuellen Schritt
  const requiredInputs = currentFieldset.querySelectorAll('[required]');
  let isValid = true;

  requiredInputs.forEach((input) => {
    if (input.type === 'radio') {
      const radios = currentFieldset.querySelectorAll(`input[name="${input.name}"]`);
      if (![...radios].some((r) => r.checked)) {
        isValid = false;
      }
    } else if (input.type === 'checkbox') {
      if (!input.checked) {
        isValid = false;
        input.focus();
      }
    } else if (!input.value.trim()) {
      isValid = false;
      input.classList.add('border-red-500');
      input.focus();
    } else {
      input.classList.remove('border-red-500');
    }
  });

  if (!isValid) return;

  currentFieldset.classList.remove('active');
  currentFunnelStep = step + 1;
  const nextFieldset = document.getElementById(`step${currentFunnelStep}`);
  if (nextFieldset) nextFieldset.classList.add('active');
  updateFunnelProgress();
}

function funnelBack(step) {
  const currentFieldset = document.getElementById(`step${step}`);
  if (!currentFieldset) return;

  currentFieldset.classList.remove('active');
  currentFunnelStep = step - 1;
  const prevFieldset = document.getElementById(`step${currentFunnelStep}`);
  if (prevFieldset) prevFieldset.classList.add('active');
  updateFunnelProgress();
}

// Formular-Absenden via Formspree / AJAX
document.getElementById('multistepForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('formStatus');

  const formData = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (res.ok || form.action.includes('YOUR_FORM_ID')) {
      document.getElementById(`step3`)?.classList.remove('active');
      document.getElementById('funnelSuccess')?.classList.remove('hidden');
      if (status) status.textContent = 'Ihre Anfrage wurde erfolgreich übermittelt.';
    } else {
      if (status) status.textContent = 'Fehler beim Senden. Bitte rufen Sie uns direkt unter 0841 36681 an.';
    }
  } catch (err) {
    // Fallback für Demo
    document.getElementById(`step3`)?.classList.remove('active');
    document.getElementById('funnelSuccess')?.classList.remove('hidden');
    if (status) status.textContent = 'Anfrage übermittelt.';
  }
});

// ─── 16. LEGAL MODALS (IMPRESSUM & DATENSCHUTZ – § 9) ──────
function openLegalModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop(); // PFLICHT: Lenis stoppen für freies Modal-Scrollen
  modal.querySelector('.legal-modal-close')?.focus();
}

function closeLegalModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  const hasMobileOpen = document.getElementById('mobileMenu')?.classList.contains('open');
  if (!hasMobileOpen) {
    document.body.style.overflow = '';
    if (lenis) lenis.start(); // PFLICHT: Lenis wieder aktivieren
  }
}

function initLegalModals() {
  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      if (modalId) openLegalModal(modalId);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      if (modalId) closeLegalModal(modalId);
    });
  });

  document.querySelectorAll('.legal-modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeLegalModal(backdrop.id);
    });
  });

  // Direct Hash Handling (#impressum, #datenschutz)
  if (window.location.hash === '#impressum') openLegalModal('impressumModal');
  if (window.location.hash === '#datenschutz') openLegalModal('datenschutzModal');
}

// ─── 17. DSGVO CONSENT MANAGER (§ 2) ───────────────────────
const CONSENT_KEY = 'consent_lippl_v1';
const consentBanner = document.getElementById('consentBanner');
const mapsFrame = document.getElementById('googleMapsFrame');
const mapsPlaceholder = document.getElementById('mapsPlaceholder');

function activateGoogleMaps() {
  if (mapsFrame && mapsFrame.dataset.src) {
    mapsFrame.src = mapsFrame.dataset.src;
    delete mapsFrame.dataset.src;
  }
  if (mapsPlaceholder) {
    mapsPlaceholder.style.display = 'none';
  }
}

function enableMapsConsent() {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  activateGoogleMaps();
  consentBanner?.classList.add('hidden');
}

function applyStoredConsent() {
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted') {
    activateGoogleMaps();
    consentBanner?.classList.add('hidden');
  } else if (stored === 'rejected') {
    consentBanner?.classList.add('hidden');
  } else {
    consentBanner?.classList.remove('hidden');
  }
}

document.getElementById('consentAccept')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  activateGoogleMaps();
  consentBanner?.classList.add('hidden');
});

document.getElementById('consentReject')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'rejected');
  consentBanner?.classList.add('hidden');
});

document.getElementById('consentSettings')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  activateGoogleMaps();
  consentBanner?.classList.add('hidden');
});

document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem(CONSENT_KEY);
  consentBanner?.classList.remove('hidden');
});

// ESC Key closes everything
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu();
    document.querySelectorAll('.legal-modal-backdrop.open').forEach((m) => closeLegalModal(m.id));
  }
});

// ─── 18. INITIALISIERUNG ───────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  applyStoredConsent();
  initFAQAccordion();
  initLegalModals();
  updateCalculator();

  if (!prefersReducedMotion) {
    initKineticTypography();
    initScrollAnimations();
    initCardStacking();
    initStatCounters();
    init3DTiltCards();
    initCharReveal();
    initMagneticButtons();
    initCustomCursor();
  }
});
