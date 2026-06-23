# Dexa Doors — Website Aesthetics

A design reference for the current Dexa Doors marketing site. This document describes the visual language as implemented today — colors, type, spacing, surfaces, motion, and the overall mood — so future changes stay consistent with the brand.

---

## Design philosophy

Dexa Doors presents as a **premium dark-mode digital agency**: confident, minimal, and technically credible without feeling cold or corporate. The aesthetic draws from modern developer-tool marketing (Resend, Linear, Vercel) — near-black canvases, restrained white type, a single strong blue accent, and subtle glass/blur effects rather than heavy decoration.

The site prioritizes:

- **Clarity over clutter** — one message per section, generous whitespace, no competing visual noise
- **Typography as hierarchy** — serif headlines for authority, sans-serif body for readability
- **Quiet luxury** — borders and glows are low-contrast; hover states are felt, not shouted
- **Purposeful motion** — animation appears only where it adds meaning (intro boot, nav edge glow, scroll reveals)

There is **no hero background illustration, light rays, or 3D model** in the current build. The hero uses plain `#080808` with typography and CTAs on the left; on desktop (`lg+`) a **glass browser mockup** with a blurred dashboard skeleton sits on the right.

---

## Mood & tone

| Attribute | Expression |
|-----------|--------------|
| **Mood** | Dark, focused, professional, slightly cinematic |
| **Energy** | Calm and assured — not playful or startup-neon |
| **Trust** | Serif headlines, real project cards, stats, structured contact flow |
| **Tech** | Blue accent, glass nav, animated nav border, boot intro with logo fly-in, Lenis smooth scroll + GSAP scroll reveals |

---

## Color palette

### Core surfaces

| Token / usage | Hex / value | Role |
|---------------|-------------|------|
| **Background** | `#080808` | Page canvas, form inputs, icon tile insets |
| **Intro / boot cover** | `#050505` | Slightly deeper black during intro sequence |
| **Card / elevated surface** | `#111111` | Service cards, project cards, forms, contact blocks |
| **Foreground (primary text)** | `#F2F2F2` | Headlines, body emphasis, nav CTA default text |
| **Muted foreground** | `#6B6B6B` | Body copy, labels, icons, footer links default |
| **Nav link default** | `#9a9a9a` | Center nav links before hover |
| **Primary accent** | `#2563EB` | Primary buttons, input focus rings, shadcn `--primary` |
| **White** | `#FFFFFF` | Stats numerals, nav CTA hover fill |

### Borders & dividers

Borders are **never solid bright lines**. They use translucent white:

- **Default border** — `rgba(255, 255, 255, 0.06)` on cards and section containers
- **Hover border** — `rgba(255, 255, 255, 0.14)` on interactive cards
- **Button / input border** — `rgba(255, 255, 255, 0.08)` default; `0.16`–`0.20` on hover
- **Nav CTA border** — `rgba(32, 32, 31, 0.75)`
- **Footer rule** — `rgba(255, 255, 255, 0.06)`

### shadcn CSS variables

Defined in `src/styles.css` (`:root` and `.dark` are identical — the site is dark-only):

```css
--background: #080808;
--foreground: #F2F2F2;
--card: #111111;
--muted-foreground: #6B6B6B;
--primary: #2563EB;
--border: rgba(255, 255, 255, 0.08);
--radius: 0.75rem;
```

---

## Typography

### Font families

| Role | Family | Source |
|------|--------|--------|
| **Sans (UI & body)** | DM Sans | Google Fonts |
| **Serif (headlines)** | Playfair Display | Google Fonts |
| **Intro tagline only** | Inter (700) | Google Fonts — used exclusively in boot overlay |

Loaded in `src/routes/__root.tsx` via Google Fonts stylesheet.

### Type scale (homepage)

| Element | Font | Size | Weight | Line height | Color |
|---------|------|------|--------|-------------|-------|
| Hero H1 | Playfair Display | 48px → 72px (md+) | Bold | 1.1 | `#F2F2F2` |
| Section H2 | Playfair Display | 36px → 52px (md+) | Bold | 1.15 | `#F2F2F2` — class `.section-heading`; line-split for scroll reveal |
| Hero subcopy | DM Sans | 18px | Normal | 1.7 | `#6B6B6B` |
| Section subcopy | DM Sans | 16px | Normal | 1.7 | `#6B6B6B` |
| Card title | DM Sans | 16–20px | Medium (500) | — | `#F2F2F2` |
| Card body | DM Sans | 14px | Normal | 1.7 / relaxed | `#6B6B6B` |
| Stats number | Playfair Display | 48px → 64px (md+) | Bold | — | `#FFFFFF` |
| Stats label | DM Sans | 13px | Normal | — | `#6B6B6B`, uppercase, `tracking-[0.05em]` |
| Nav links | DM Sans | 13px | Normal | — | `#9a9a9a` → `#f2f2f2` hover |
| Buttons | DM Sans | 14px | Medium (nav CTA) | — | White on blue or white on ghost |
| Footer brand | DM Sans | 13px | Normal | — | White, `tracking-[0.1em]` |
| Form labels | DM Sans | 13px | Normal | — | `#6B6B6B` |
| Tags (project) | DM Sans | 12px | Normal | — | `#6B6B6B`, uppercase, `tracking-[0.08em]` |

### Typographic rules

- **Headlines are always left-aligned** in content sections except contact/book headings (centered).
- **Serif is reserved for H1, H2, stats numbers, and one book-a-call date line** — never for UI chrome or form labels.
- **Section H2s use `.section-heading`** — split into lines (`.split-line`) for scroll animation; parent clips with `overflow: hidden`.
- **Muted gray (`#6B6B6B`) carries all secondary reading** — descriptions, trust lines, metadata.
- **No gradient text** on the live homepage (gradient headlines exist only in unused Spline demo components).

---

## Layout & spacing

### Content width

| Container | Max width | Horizontal padding |
|-----------|-----------|-------------------|
| Main sections | `max-w-5xl` (1024px) | `px-6` |
| Navigation inner | `max-w-6xl` | `px-4` → `px-6` (md+) |
| Hero text block | `max-w-xl` inside section | Inherited from section |

### Vertical rhythm

- **Section padding** — `py-[140px]` (140px top and bottom) on all major sections
- **Footer padding** — `py-[80px]`
- **Hero** — `min-h-screen`, vertically centered content, `pt-[52px]` to clear fixed nav
- **Between heading and grid** — `mt-16` (64px) typical gap before card grids
- **Between hero elements** — H1 → subcopy `mt-8`, subcopy → buttons `mt-10`, buttons → trust line `mt-10`

### Grid patterns

- **Services** — 1 → 2 → 3 columns (`sm:grid-cols-2`, `lg:grid-cols-3`), `gap-5`
- **Stats** — 2 columns mobile, 4 desktop, `gap-y-16`
- **Work (projects)** — 1 → 2 columns, `gap-6`
- **Difference** — 1 → 3 columns, `gap-6`
- **Contact** — 2 columns on `lg+`, `gap-12`

### Navigation layout

Three-column grid: `grid-cols-[1fr_auto_1fr]` — logo left, links centered, CTA right. Fixed height **52px**.

---

## Surfaces & depth

The site uses **layered dark surfaces** with restrained elevation — flat by default, depth on intentional hover.

### Card pattern (services, projects, difference)

```
rounded-xl
border border-[rgba(255,255,255,0.06)]
bg-[#111111]
p-8 (or asymmetric padding on project cards)
hover:border-[rgba(255,255,255,0.14)]
```

**Service cards (`.service-card`)** — exception to flat cards:

- Default hairline ring: `box-shadow: 0 0 0 1px rgba(255,255,255,0.06)`
- Hover: 1px top accent glow `rgba(37,99,235,0.4)` + depth shadow `0 8px 32px rgba(0,0,0,0.4)`

**Project cards (`.project-card`)** — faint SVG noise grain overlay at `opacity: 0.03`; industry tag as pill badge on `#080808`.

**Difference / contact cards** — flat border-only hover (no shadow exception).

Depth is primarily communicated through **background step** (`#080808` → `#111111`) and **border brightening on hover**; service cards add hover elevation only.

### Section layout hierarchy

- `.section-intro` — H2 + subcopy, `z-index: 2`
- `.section-cards` — grids sit slightly lower (`md:translate-y-3`) with extra top margin
- `.section-divider` — `border-top: rgba(255,255,255,0.04)` between major sections

### Stats data chips (`.stat-chip`)

Each stat wrapped with left accent line `border-l rgba(37,99,235,0.3)` and generous horizontal padding — reads as a data chip, not a bare numeral.

### Glass / frosted surfaces

**Fixed navigation bar:**

```css
background: rgba(8, 8, 8, 0.6);
backdrop-filter: blur(12px) saturate(150%);
```

**“Let’s Talk” nav CTA (`.nav-cta`):**

- Default: multi-corner radial gradients on translucent dark base + `backdrop-filter: blur(12px) saturate(150%)`
- Hover: solid white background, black text, white border, soft white glow shadow

This is the most elaborate surface treatment in the header — intentional focal point alongside the hero mockup on desktop.

**Hero device mockup (`HeroDeviceMockup`):**

- Right-side glass browser frame (`lg+` only), `backdrop-blur-xl`, `#111111` at 80% opacity
- CSS dashboard skeleton inside with `blur(2px)` — decorative, `aria-hidden`
- Slow vertical float (6s); static when `prefers-reduced-motion`

---

## Buttons & CTAs

### Primary (blue pill)

```
rounded-full
bg-[#2563EB]
text-white text-[14px]
px-6 py-2.5 (or px-8 py-3 for larger)
hover:opacity-90
transition-opacity
```

Used for: “Start a Project”, “Send Message”, “Schedule A Call Now”.

Often paired with a **Lucide icon** at 16px (`h-4 w-4`) with `gap-2`.

### Secondary (ghost pill)

```
rounded-full
border border-[rgba(255,255,255,0.08)]
text-[#F2F2F2] text-[14px]
hover:border-[rgba(255,255,255,0.16)]
transition-colors
```

Used for: “See Our Work”, project “Visit Live Site” links.

### Nav CTA

Distinct glass pill — see `.nav-cta` in `src/styles.css`. Inverts to white-on-black on hover with glow.

### Border radius language

- **Pills / buttons** — `rounded-full`
- **Cards / forms** — `rounded-xl` (12px effective via `--radius: 0.75rem`)
- **Inputs** — `rounded-lg`
- **Small icon containers** — `rounded-lg` on `#080808` inset squares

---

## Icons

- **Library:** Lucide React (`lucide-react`)
- **Default size:** `h-5 w-5` in cards, `h-4 w-4` in buttons and form adornments
- **Color:** `#6B6B6B` — icons stay muted; they never compete with headlines
- **Style:** Outline/stroke only, no filled icon sets

---

## Forms & inputs

Contact form aesthetic:

- Form sits in `#111111` card with `rounded-xl` and standard card border
- Inputs: `h-11`, `bg-[#080808]`, `border-[rgba(255,255,255,0.08)]`, `text-[14px]`
- Placeholders: `#6B6B6B`
- Focus: `border-[#2563EB]`, `outline-none` — blue ring via border only, no glow halo
- Submit: full-width primary blue pill

Email contact card uses nested icon tile: `h-10 w-10` rounded square on `#080808` inside the card.

---

## Motion & animation

Motion is split across three systems: **Framer Motion** (intro only), **Lenis** (global smooth scroll), and **GSAP + ScrollTrigger** (homepage scroll reveals). All scroll animations respect `prefers-reduced-motion: reduce` — Lenis and GSAP effects are skipped; content renders immediately.

Detailed implementation log: `SCROLL-ANIMATIONS-PHASE-1.md`.

### Global UI

- `antialiased` and legibility rendering on body text
- Hover transitions are **short** (150–300ms) and limited to color, border, or opacity

### Global scroll

- **Lenis** — smooth wheel scroll site-wide (`lerp: 0.08`, `smoothWheel: true`), initialized in `SmoothScrollProvider` via `src/routes/__root.tsx`
- **GSAP ticker sync** — `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add` drives Lenis RAF
- **Anchor links** — `#services`, `#work`, `#contact` scroll via Lenis with **52px offset** (fixed nav height)
- **CSS** — `scroll-behavior: smooth` on `html` as fallback; `html.lenis { scroll-behavior: auto !important; }` when Lenis is active
- **Reduced motion** — Lenis disabled; native browser scroll

### Nav border glow (`.nav-border-glow`)

A **1px animated light** along the bottom of the navigation bar:

- **Cycle:** 8 seconds, infinite, `linear` timing
- **Behavior:** Light enters from the right, sweeps left at constant speed, fades as if swallowed by darkness, then ~3.6s pause before repeating
- **Visual:** Comet-shaped white gradient blob; edge vignette fades line into `#080808` at sides
- **Implementation:** `src/styles.css` — `@keyframes nav-glow-pulse`

This is the only **continuous ambient CSS animation** on the page after intro (scroll motion is user-driven, not looping).

### Homepage scroll reveals (GSAP)

Implemented in `src/hooks/useScrollAnimations.ts`, called from `src/routes/index.tsx`. Animations initialize after the intro completes (`useIntroComplete`) and Playfair Display loads (`document.fonts.ready`). All motion uses **transform and opacity only** (`will-change: transform`).

#### Hero H1 (`.hero-title`)

- **Parallax scrub** — `y: 0 → -(heroHeight × 0.3)` as user scrolls through hero
- **Trigger:** hero section, `start: "top top"`, `end: "bottom top"`, `scrub: true`, `ease: "none"`
- Text stays fully visible; no line split, no fade

#### Section H2s (`.section-heading`)

Five section titles — services, work, difference, contact, book a call. Two-part animation per heading:

**1. One-time line reveal** (split-type, `types: "lines"`, class `.split-line`)

| Property | Value |
|----------|-------|
| Offset | `y: 24 → 0` |
| Opacity | `0 → 1` |
| Duration | `0.6s` |
| Stagger | `0.05s` per line |
| Ease | `power2.out` |
| Trigger | `top 88%`, **`once: true`** |

Lines reveal on first enter, then **stay visible** — headings never fade out while reading a section.

**2. Section parallax** (hero-style, gentler)

| Property | Value |
|----------|-------|
| Target | whole `.section-heading` element |
| Motion | `y: 0 → -(sectionHeight × 0.12)` |
| Trigger | parent `<section>`, `top top` → `bottom top` |
| Scrub | `true`, `ease: "none"` |

Subtle up/down drift while scrolling through a section — opacity unchanged.

**CSS** (`src/styles.css`):

```css
.section-heading { overflow: hidden; }
.split-line { display: block; overflow: hidden; will-change: transform; }
```

#### Service cards (`.service-card`)

- Enter at `y: 40`, `opacity: 0`
- **ScrollTrigger.batch** — stagger `0.1`, duration `0.7s`, `power2.out`, trigger `top 85%`
- Play on enter only; cards stay visible after reveal

#### Stats (`.stat-number`, `#stats`)

- Count from `0` to target (`data-value`: `"10+"`, `"100%"`, etc.) over **1.5s**
- GSAP `snap: 1` for whole numbers; suffix preserved
- **Once** per page load when stats section enters at `top 85%`

#### Project cards (`.project-card`)

- Enter at `y: 50`, `scale: 0.96`, `opacity: 0`
- **ScrollTrigger.batch** — stagger `0.15`, duration `0.8s`, `power2.out`, trigger `top 85%`

### Motion principles (scroll)

- **Subtle over showy** — small offsets (24px lines, 0.12× parallax on sections vs 0.3× on hero)
- **Readable first** — section headings do not hide after reveal; no reverse-to-opacity-zero
- **Transform-only** — no layout-triggering properties animated
- **Intro is separate** — Framer Motion intro logic is untouched; scroll animations defer until intro finishes

### Homepage intro (first visit)

Documented in detail in `INTRO-ANIMATION-LOG.md`. Aesthetic summary:

1. **Black cover** (`#050505`) — site hidden until sequence runs
2. **D logo** (`/D.png`) — pop, shine sweep through mask, fly to navbar logo position
3. **Tagline** — Inter bold, white, center-screen wipe reveal: *“Our business is to make your business grow”*
4. **Curtain reveal** — circular clip-path expands, overlay fades, page appears
5. **Skipped** on return visits (`sessionStorage`), reduced motion, or non-home routes

Intro motion uses **Framer Motion** with custom easing curves — snappy pop (`[0.16, 1, 0.3, 1]`), smooth fly (`[0.65, 0, 0.35, 1]`).

---

## Section-by-section aesthetic

### Hero

- Full viewport height; left-aligned copy block (`max-w-xl`)
- Desktop (`lg+`): glass browser mockup on right 55% — blurred dashboard skeleton, no 3D/WebGL
- Mobile: text-only hero (mockup hidden)
- Largest serif headline (`.hero-title`) with scroll-linked parallax
- Dual CTA row: blue primary + ghost secondary
- Small trust line in muted gray

### Services

- `.section-intro` heading block + muted explainer — line reveal on scroll
- `.section-cards` grid below with visual offset (headings lead, cards follow)
- 7-card grid (`.service-card`) with staggered scroll enter + hover top glow
- Uniform card height via flex column, icon → title → description

### Stats

- Open section (`#stats`) with “By the numbers” micro-label
- `.stat-chip` wrappers — left blue accent border, generous padding
- Large serif numerals (`.stat-number`) — count up from 0 on first enter
- Uppercase micro-labels beneath

### Work

- `.section-intro` H2 with line reveal; `.section-cards` grid offset below
- Project cards (`.project-card`) with grain overlay + staggered scale/fade enter
- Industry tag as **pill badge** (`rounded-full`, `#080808` inset); external link as ghost pill at card bottom
- `group` class present but hover is border-only (no image reveals)

### Difference (values)

- Three-column value props — same card language as services (cards not scroll-animated; H2 uses line reveal)

### Contact

- Centered section header (`.section-heading`) with line reveal
- Split: left narrative + email card, right mailto form
- Form submits via `mailto:` — no backend UI chrome

### Book a call

- Centered header (`.section-heading`) with line reveal
- Single large card with checklist (icon tiles) and Calendly CTA
- Availability shown in serif for the day range

### Footer

- Minimal: wordmark line, tagline, three links, copyright rule
- No social icons, no newsletter, no large logo image

---

## Logo usage

- **Navbar:** `/newlogo.png` — `max-h-[52px]`, full nav height, `object-contain`
- **Intro animation target:** `#dexa-nav-logo` — D glyph flies into this position
- **Intro asset:** `/D.png` — standalone D mark for boot sequence
- **Favicon:** `/logo.png` (from root head config)

---

## What is intentionally absent

To avoid aesthetic drift, note what the **current** site does **not** use:

- No light/dark mode toggle (dark is the only theme)
- No hero background rays, particles, or WebGL (`SideRays` removed from hero)
- No 3D Spline robot in the hero (removed)
- No photography or stock imagery in sections
- No gradients on headlines or backgrounds (except nav CTA glass, nav glow, and low-opacity blue in mockup skeleton)
- No drop shadows on cards except **service card hover elevation**
- No bright secondary accent colors (orange, green, etc.)
- No scroll animation on difference-section value cards or body paragraphs (headings, service cards, stats, and project cards only)

---

## Consistency checklist

When adding new UI, match these patterns:

1. **Background** — `#080808` page, `#111111` elevated panels
2. **Text** — `#F2F2F2` primary, `#6B6B6B` secondary, serif only for major headings
3. **Accent** — `#2563EB` for primary actions and focus only
4. **Borders** — `rgba(255,255,255,0.06)` default, `0.14` hover
5. **Radius** — `rounded-xl` cards, `rounded-full` buttons, `rounded-lg` inputs
6. **Spacing** — `py-[140px]` sections, `px-6` gutters, `max-w-5xl` content
7. **Icons** — Lucide, 20px in cards, muted gray
8. **Motion** — subtle scroll reveals (GSAP); Lenis smooth scroll; fast hover transitions (150–300ms); section headings stay visible after reveal; parallax is gentle (0.12× sections, 0.3× hero)
9. **Glass** — nav chrome + hero mockup frame; not every card
10. **Premium elevation** — service hover glow, stat chips, project grain — see `PREMIUM-REDESIGN.md`

---

## File reference

| Concern | Location |
|---------|----------|
| Design tokens & custom CSS | `src/styles.css` |
| Homepage layout & inline styles | `src/routes/index.tsx` |
| Font loading | `src/routes/__root.tsx` |
| Lenis smooth scroll provider | `src/components/smooth-scroll/smooth-scroll-provider.tsx` |
| Homepage scroll animations | `src/hooks/useScrollAnimations.ts` |
| Scroll animation changelog | `SCROLL-ANIMATIONS-PHASE-1.md` |
| Premium visual redesign log | `PREMIUM-REDESIGN.md` |
| Hero device mockup | `src/components/hero/hero-device-mockup.tsx` |
| Intro overlay aesthetics | `src/components/intro/intro-overlay.tsx` |
| shadcn config | `components.json` (style: `new-york`) |

---

*Last updated to reflect premium visual redesign: hero mockup, section hierarchy, service hover elevation, stat chips, project grain + pill tags. Scroll animations unchanged.*
