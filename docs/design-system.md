# Design-System & Technische Architektur – Wilhelm Lippl (Handwerk)
*V3.1 – MotionSites Edition*

---

## 1. Farbpsychologie & Farbpalette

### Farbphilosophie: Craft Warmth, Precision & Trust
Handwerk verlangt nach einer authentischen, geerdeten Farbwelt. Dunkles Schiefer-Anthrazit sorgt für zeitlose Ruhe, während warmes Bernsteingold und Kupfer für handwerkliche Meisterschaft und Wärme stehen.

### CSS Custom Properties (Dark / Light Theme Tokens)

```css
:root {
  /* Fonts */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

  /* Akzentfarben */
  --accent-amber: #f59e0b;
  --accent-amber-glow: rgba(245, 158, 11, 0.35);
  --accent-copper: #ea580c;
  --accent-copper-glow: rgba(234, 88, 12, 0.3);
  --accent-emerald: #10b981;
  --accent-emerald-glow: rgba(16, 185, 129, 0.25);
  
  /* Aurora Glow */
  --aurora-1: hsla(38, 95%, 52%, 0.22);
  --aurora-2: hsla(18, 90%, 50%, 0.18);
  --aurora-3: hsla(160, 80%, 45%, 0.12);
}

/* Dark Theme (Standard) */
[data-theme="dark"] {
  --bg: #0a0c10;
  --bg-secondary: #0f131a;
  --fg: #f8fafc;
  --fg-muted: #94a3b8;
  --card-bg: rgba(15, 19, 26, 0.88);
  --card-border: rgba(255, 255, 255, 0.08);
  --shell-bg: rgba(255, 255, 255, 0.03);
  --shell-border: rgba(255, 255, 255, 0.07);
  --nav-bg: rgba(10, 12, 16, 0.78);
  --nav-border: rgba(255, 255, 255, 0.1);
  --border: rgba(255, 255, 255, 0.1);
  --input-bg: rgba(20, 26, 36, 0.75);
}

/* Light Theme */
[data-theme="light"] {
  --bg: #f8fafc;
  --bg-secondary: #f1f5f9;
  --fg: #0f172a;
  --fg-muted: #475569;
  --card-bg: rgba(255, 255, 255, 0.95);
  --card-border: rgba(15, 23, 42, 0.08);
  --shell-bg: rgba(15, 23, 42, 0.02);
  --shell-border: rgba(15, 23, 42, 0.06);
  --nav-bg: rgba(255, 255, 255, 0.82);
  --nav-border: rgba(15, 23, 42, 0.1);
  --border: rgba(15, 23, 42, 0.12);
  --input-bg: rgba(241, 245, 249, 0.85);
}
```

### Kontrast-Matrix & Sichtbarkeits-Regel (§ 0D)
- Auf dunklem Hintergrund: `color: var(--accent-amber) !important;` für Highlight-Wörter.
- **SplitType-Schutz:** Keine transparente Hintergrund-Clip-Typografie auf SplitType-Elementen.
- WCAG AA Konformität: Alle Fließtexte mindestens 4.5:1 Kontrast.

---

## 2. Typografie-System

- **Display-Schriftart:** `Playfair Display` (700, 900) für H1, H2, Zitate.
- **Fließtext-Schriftart:** `Plus Jakarta Sans` (300, 400, 500, 600, 700) für Lesbarkeit und moderne UI-Klarheit.
- **Größenhierarchie:**
  - Hero-Titel H1: `clamp(2.75rem, 6.5vw, 5.5rem)`
  - Sektionstitel H2: `clamp(2rem, 4.5vw, 3.75rem)`
  - Untertitel H3: `clamp(1.25rem, 2.5vw, 1.75rem)`
  - Fließtext: `clamp(0.95rem, 1.1vw, 1.125rem)`

---

## 3. Animation-Blueprint & Alleinstellungsmerkmale

### A. Lenis Smooth-Scroll Engine (§ 2)
- Konfiguration: `duration: 0.9`, `easing: custom-power`, `wheelMultiplier: 1.0`, `smoothTouch: false`.
- Synchronisation mit GSAP ScrollTrigger via `gsap.ticker.add`.
- `lagSmoothing(0)` zur Vermeidung jeglicher Verzögerungen auf Touchpads.

### B. Alleinstellungsmerkmal 1: Sticky 3D Card-Stacking System (§ 15)
- 4 Leistungsbereiche:
  1. *Montage- & Reparaturdienst* (Möbel, Bauelemente, Kleinreparaturen)
  2. *Renovierung & Innenausbau* (Wand, Boden, Trockenbau, Ausbesserung)
  3. *Hausmeisterservice & Instandhaltung* (Objektbetreuung, Pflege, Checkups)
  4. *Schnelle Vor-Ort-Hilfe in Ingolstadt* (Persönlich & flexibel)
- **Desktop:** `h-[85vh]` Sticky-Container mit GSAP Scale-Down beim Scrollen.
- **Mobile (<= 900px):** Beendet Stacking-Logik mit sauberer relativer Anordnung ohne Überlappung.

### C. Alleinstellungsmerkmal 2: Animierte Zähler-Stats (§ 0A #6)
- GSAP-animierter Zähler bei Sichtbarkeit:
  - `5.0` Google-Bewertung (3 Berichte)
  - `100%` Zufriedenheit & Weiterempfehlung
  - `1` Direkter Meister-Ansprechpartner vor Ort

### D. Alleinstellungsmerkmal 3: 3D Tilt-on-Hover Glassmorphismus-Karten (§ 0A #8)
- Sanfte perspektivische 3D-Neigung bei Mausbewegung über die USP-Bento-Shells auf dem Desktop.

### E. Alleinstellungsmerkmal 4: Character-by-Character Text Reveal (§ 17)
- Cineastisches Einblenden des Qualitäts- und Zuverlässigkeitsversprechens von Willi Lippl beim Scrollen.

---

## 4. Header-Architektur: Fluid Island Navbar (Variante A)

- Schwebende Floating Pill zentriert im Viewport (`position: fixed; top: 1.5rem; left: 50%; transform: translateX(-50%)`).
- Integriert: Logo/Firmenname + 5.0⭐ Badge + Desktop-Nav + Theme-Toggle + Magnetischer Anruf-CTA + Mobile Hamburger.
- Genau EIN Header, kein Doppelheader.

---

## 5. Mobile Responsiveness & Hamburger (§ 0E & 0G)

- Hamburger morpht direkt per CSS-Transform zu einem 'X' (3 Linien → 2 diagonale Linien, mittlere Linie ausgeblendet).
- Kein zweiter X-Button im Overlay.
- Klick auf Links, Backdrop oder ESC schließt das Menü.
- Buttons auf Mobile: `width: 100%; white-space: normal; word-break: break-word;`.

---

## 6. Business Features & Legal System

- **DSGVO Consent Banner (§ 2):** Speichert Entscheidung in `localStorage`, blockiert Google Maps `data-src` bis Consent.
- **Legal Modals (§ 9):**
  - `#impressumModal`: Angaben gem. § 5 TMG mit Regensburger Str. 210, 85055 Ingolstadt, Telefon 0841 36681.
  - `#datenschutzModal`: DSGVO Art. 13 Erklärung (Vercel Hosting, Formspree, Google Fonts & Maps, localStorage).
  - Lenis pausiert während geöffneter Modals und startet nach Schließen wieder.
- **WhatsApp Widget (§ 4):** `4984136681` mit animiertem Puls und Mobile-Anpassung.
- **Multi-Step Funnel (§ 5):** 3 Schritte mit Fortschrittsbalken, Honeypot-Spamschutz, Pflichtfeld-Validierung und Datenschutz-Checkbox.
- **Interaktiver Projekt- & m²-Rechner (§ 6):** Dynamischer Kostenschätzer für Handwerksleistungen.
- **Erweitertes Schema.org (§ 8):** JSON-LD mit LocalBusiness, OpeningHoursSpecification und FAQPage.

---

## 7. Pre-Delivery Checklist

* [x] Favicon vorhanden (Handwerker-Icon)
* [x] Genau EIN Header (Fluid Island Pill)
* [x] Hamburger: genau EIN X-Mechanismus (Morphing)
* [x] Dark/Light Toggle vorhanden & funktionsfähig
* [x] Touchpad-Scroll: passive Listener, kein preventDefault, smoothTouch: false
* [x] Alle Texte auf Hintergrund lesbar (Kontrast geprüft)
* [x] Mindestens 2 Alleinstellungsmerkmale implementiert (Card-Stacking, 3D Tilt, Counter, Char-Reveal)
* [x] Lenis + GSAP + SplitType CDN eingebunden
* [x] Kinetic Typography auf h1 + h2
* [x] Staggered Load Animations auf Hero-Elementen
* [x] GSAP ScrollTrigger Fade-Up + Blur auf alle `[data-animate]`
* [x] Bento-Grid asymmetrisch mit Double-Bezel
* [x] Aurora-Gradient + Noise-Overlay im Hero
* [x] Skip-to-Content Link als allererstes Element
* [x] Alle `<img>` mit alt, width, height & "Beispielbild"-Badge
* [x] Alle Icon-Buttons mit aria-label
* [x] FAQ: aria-expanded + aria-controls + Keyboard-Nav
* [x] DSGVO-Banner eingebaut (Vanilla JS)
* [x] Google Maps: data-src statt src (Consent-safe)
* [x] WhatsApp-Widget mit internationalem Tel-Format `4984136681`
* [x] Multi-Step Kontaktformular (3 Schritte + Formspree)
* [x] Branchenrechner implementiert
* [x] Erweitertes Schema.org (OpeningHoursSpec + FAQPage)
* [x] Impressum & Datenschutz als barrierefreie Modals mit echten Daten
* [x] LCP-Bild: fetchpriority="high"
* [x] Alle anderen Bilder: loading="lazy"
* [x] Keine halluzinierten Daten
