# Dexa Doors — Website Aesthetics

A design reference for the current Dexa Doors marketing site. This document describes the visual language as implemented today — colors, type, spacing, surfaces, motion, and the overall mood — so future changes stay consistent with the brand.

---

## Design philosophy

Dexa Doors presents as a **premium dark-mode digital agency**: confident, minimal, and technically credible without feeling cold or corporate. The aesthetic draws from modern developer-tool marketing (Resend, Linear, Vercel) — near-black canvases, restrained white type, a single strong blue accent, and subtle glass/blur effects rather than heavy decoration.

The site prioritizes:

- **Clarity over clutter** — one message per section, generous whitespace, no competing visual noise
- **Typography as hierarchy** — serif headlines for authority, sans-serif body for readability
- **Quiet luxury** — borders and glows are low-contrast; hover states are felt, not shouted
- **Purposeful motion** — animation appears only where it adds meaning (intro boot, nav edge glow)

There is **no hero background illustration, light rays, or 3D model** in the current build. The hero is plain `#080808` with typography and CTAs only.

---

## Mood & tone

| Attribute | Expression |
|-----------|--------------|
| **Mood** | Dark, focused, professional, slightly cinematic |
| **Energy** | Calm and assured — not playful or startup-neon |
| **Trust** | Serif headlines, real project cards, stats, structured contact flow |
| **Tech** | Blue accent, glass nav, animated nav border, boot intro with logo fly-in |

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
| Section H2 | Playfair Display | 36px → 52px (md+) | Bold | 1.15 | `#F2F2F2` |
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

The site uses **flat dark layers**, not heavy shadows.

### Card pattern (services, projects, difference)

```
rounded-xl
border border-[rgba(255,255,255,0.06)]
bg-[#111111]
p-8 (or asymmetric padding on project cards)
transition-[border-color] duration-200
hover:border-[rgba(255,255,255,0.14)]
```

No box-shadow on cards. Depth is communicated through **background step** (`#080808` → `#111111`) and **border brightening on hover**.

### Glass / frosted surfaces

**Fixed navigation bar:**

```css
background: rgba(8, 8, 8, 0.6);
backdrop-filter: blur(12px) saturate(150%);
```

**“Let’s Talk” nav CTA (`.nav-cta`):**

- Default: multi-corner radial gradients on translucent dark base + `backdrop-filter: blur(12px) saturate(150%)`
- Hover: solid white background, black text, white border, soft white glow shadow

This is the most elaborate surface treatment on the site — intentional focal point in the header.

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

### Global

- `scroll-behavior: smooth` on `html` for anchor navigation (`#services`, `#work`, `#contact`)
- `antialiased` and legibility rendering on body text
- Hover transitions are **short** (150–300ms) and limited to color, border, or opacity

### Nav border glow (`.nav-border-glow`)

A **1px animated light** along the bottom of the navigation bar:

- **Cycle:** 8 seconds, infinite, `linear` timing
- **Behavior:** Light enters from the right, sweeps left at constant speed, fades as if swallowed by darkness, then ~3.6s pause before repeating
- **Visual:** Comet-shaped white gradient blob; edge vignette fades line into `#080808` at sides
- **Implementation:** `src/styles.css` — `@keyframes nav-glow-pulse`

This is the only continuous ambient animation on the page after intro.

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

- Full viewport height, left-aligned copy block
- No background effects — pure `#080808`
- Largest serif headline on the site
- Dual CTA row: blue primary + ghost secondary
- Small trust line in muted gray

### Services

- Problem-statement H2 + muted explainer
- 7-card grid with service icons
- Uniform card height via flex column, icon → title → description

### Stats

- Open section (no card wrappers)
- Large serif numerals as visual anchors
- Uppercase micro-labels beneath

### Work

- Project cards with industry/tag line at top
- External link as ghost pill at card bottom
- `group` class present but hover is border-only (no image reveals)

### Difference (values)

- Three-column value props — same card language as services

### Contact

- Centered section header
- Split: left narrative + email card, right mailto form
- Form submits via `mailto:` — no backend UI chrome

### Book a call

- Centered header
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
- No gradients on headlines or backgrounds (except nav CTA glass and nav glow)
- No drop shadows on cards
- No bright secondary accent colors (orange, green, etc.)
- No animated scroll reveals on section content

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
8. **Motion** — subtle, fast hovers; no gratuitous parallax or scroll jank
9. **Glass** — reserve for nav-level chrome, not every card

---

## File reference

| Concern | Location |
|---------|----------|
| Design tokens & custom CSS | `src/styles.css` |
| Homepage layout & inline styles | `src/routes/index.tsx` |
| Font loading | `src/routes/__root.tsx` |
| Intro overlay aesthetics | `src/components/intro/intro-overlay.tsx` |
| shadcn config | `components.json` (style: `new-york`) |

---

*Last updated to reflect the site state after removal of hero background effects and 3D model.*
