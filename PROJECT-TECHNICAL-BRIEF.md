# Dexa Doors — Technical Project Brief

> **Purpose:** Shareable technical overview for consultants, contractors, or senior engineers joining the project.  
> **Project:** Marketing website for Dexa Doors (digital agency)  
> **Repository:** `dexadoors`  
> **Last updated:** June 21, 2026  
> **Related doc:** See `INTRO-ANIMATION-LOG.md` for a deep dive on the boot-up intro animation work and its current bugs.

---

## 1. Executive Summary

Dexa Doors is a **single-page marketing website** built as a modern full-stack React application. It presents the agency’s services, portfolio, contact options, and booking flow in a **dark, minimal, premium aesthetic** inspired by Resend.com.

The site is **not a CMS or multi-route app** today — it is essentially one homepage (`/`) with anchor-linked sections (Services, Work, Contact, Book a Call). It uses **server-side rendering (SSR)** via TanStack Start, ships as a **Node server bundle (Nitro)**, and layers **WebGL/canvas visual effects** (React Bits components) behind the content.

**Current state:** The main site renders correctly (navbar, hero, sections, SideRays background). A **boot-up intro animation** (D logo fly-in + tagline + curtain reveal) has been implemented but **does not play correctly at runtime** — users see a brief black flash, then the site appears with no visible animation sequence.

---

## 2. Business Context

| Item | Detail |
|------|--------|
| **Brand** | Dexa Doors |
| **Tagline (intro animation)** | *"Our business is to make your business grow"* |
| **Target audience** | Businesses needing full-stack digital services (UK, Netherlands, international) |
| **Primary CTA** | Contact form (mailto), Calendly booking, “Let’s Talk” nav button |
| **Contact email** | `dexadoors@gmail.com` |
| **Calendly** | `https://calendly.com/dexadoors/30min` |

---

## 3. Technology Stack

### Core Framework

| Layer | Technology | Version (approx.) |
|-------|------------|-------------------|
| UI library | React | 19.2.x |
| Meta-framework | TanStack Start | 1.167.x |
| Routing | TanStack Router (file-based) | 1.168.x |
| Data fetching (scaffolded) | TanStack React Query | 5.83.x |
| Build tool | Vite | 8.0.x |
| SSR / production server | Nitro | 3.0 beta |
| Language | TypeScript | 5.8.x (strict mode) |

### Styling & UI

| Layer | Technology |
|-------|------------|
| CSS framework | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Component primitives | shadcn/ui (“new-york” style) on Radix UI |
| Icons | Lucide React |
| Animation | Framer Motion 12.x |
| Utility | `clsx` + `tailwind-merge` (`cn()` helper) |

### Graphics / Effects

| Library | Used for |
|---------|----------|
| **OGL** | `SideRays` background (WebGL shader, currently active) |
| **Three.js** | `FloatingLines` background (implemented, not currently mounted) |
| Canvas 2D + SVG | `DotField` background (implemented, not currently mounted) |
| Custom WebGL | `LightPillar` (implemented, not currently mounted) |

### Tooling

- ESLint 9 + TypeScript ESLint + Prettier
- Path alias: `@/*` → `./src/*`
- Auto-generated route tree: `src/routeTree.gen.ts`

---

## 4. Architecture Overview

### High-Level Request Flow

```
Browser Request
      │
      ▼
src/server.ts          ← Custom Nitro entry; error normalization
      │
      ▼
TanStack Start SSR     ← Renders React on server
      │
      ▼
src/routes/__root.tsx  ← HTML shell, global backgrounds, intro overlay
      │
      ▼
src/routes/index.tsx   ← Homepage content (all sections)
      │
      ▼
Hydration (client)     ← WebGL backgrounds mount; intro animation runs
```

### SSR vs Client-Only Components

The project mixes **SSR-rendered content** with **client-only WebGL/animation**:

| Component | SSR behavior | Client behavior |
|-----------|--------------|-----------------|
| Homepage content (`index.tsx`) | Fully rendered HTML | Hydrates normally |
| `SiteBackground` (SideRays) | Returns `null` | Mounts WebGL after `useEffect` |
| `IntroOverlay` | **Renders black curtain in HTML** | Runs Framer Motion sequence |
| Background alternatives (DotField, FloatingLines, LightPillar) | Wrapped with `mounted` gate | Available but not active |

This split is intentional for WebGL (no canvas on server), but **`IntroOverlay` does not use the same client-only gate**, which contributes to SSR/hydration complexity.

### Routing

File-based routing via TanStack Router:

| File | Route |
|------|-------|
| `src/routes/__root.tsx` | Root layout (wraps all pages) |
| `src/routes/index.tsx` | `/` (only active page) |

There is currently **one page route**. Adding `src/routes/about.tsx` would automatically create `/about`.

### Application Shell (`__root.tsx`)

The root shell provides:

- HTML document structure (`<html>`, `<head>`, `<body>`)
- Global CSS (`src/styles.css`)
- Google Fonts (DM Sans, Playfair Display, Inter)
- `<SiteBackground />` — fixed SideRays at `z-0`
- `{children}` — page content via `<Outlet />`
- `<IntroOverlay />` — fixed overlay at `z-[200]`
- `<Scripts />` — client JS bundles

Also includes custom **404** and **500 error pages**.

---

## 5. Project Structure

```
dexadoors/
├── public/                          # Static assets served at /
│   ├── D.png                        # Standalone D logo (intro animation)
│   ├── newlogo.png                  # Navbar "Dexa." wordmark
│   ├── dexa-doors-logo.png          # Earlier logo variant
│   ├── logo.png                     # Favicon
│   └── logos/                       # Tech stack SVG icons (legacy)
│
├── src/
│   ├── routes/
│   │   ├── __root.tsx               # App shell, fonts, global mounts
│   │   ├── index.tsx                # Homepage (447 lines, all sections)
│   │   └── README.md                # Routing conventions
│   │
│   ├── components/
│   │   ├── intro/
│   │   │   └── intro-overlay.tsx    # Boot-up animation (255 lines) ⚠️ broken
│   │   ├── backgrounds/
│   │   │   ├── site-background.tsx  # Active: SideRays wrapper
│   │   │   ├── side-rays.tsx        # OGL WebGL rays (active)
│   │   │   ├── dot-field.tsx        # Canvas dot grid (inactive)
│   │   │   ├── dot-field-background.tsx
│   │   │   ├── floating-lines.tsx   # Three.js lines (inactive)
│   │   │   ├── light-pillar.tsx     # WebGL pillar (inactive)
│   │   │   └── light-pillar-background.tsx
│   │   ├── animations/
│   │   │   └── logo-loop.tsx        # Marquee component (not used on homepage)
│   │   ├── ui/                      # ~40 shadcn/ui components
│   │   ├── site-nav.tsx             # Legacy nav (unused; nav is inline in index)
│   │   └── glow-cta.tsx             # Legacy CTA glow (unused on homepage)
│   │
│   ├── hooks/
│   │   └── use-mobile.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                 # cn() classname helper
│   │   ├── error-capture.ts         # Global error recording for SSR
│   │   └── error-page.ts            # HTML error page renderer
│   │
│   ├── router.tsx                   # Router factory + QueryClient
│   ├── routeTree.gen.ts             # Auto-generated (do not edit)
│   ├── start.ts                     # TanStack Start middleware
│   ├── server.ts                    # Nitro server entry
│   └── styles.css                   # Tailwind + design tokens
│
├── vite.config.ts
├── tsconfig.json
├── components.json                  # shadcn/ui config
├── package.json
├── INTRO-ANIMATION-LOG.md           # Detailed intro animation audit
└── PROJECT-TECHNICAL-BRIEF.md       # This document
```

---

## 6. Design System

### Visual Direction

Dark, spacious, premium — modeled after Resend.com:

- Large serif headlines, generous vertical padding (`140px` section spacing)
- Near-black backgrounds, subtle borders, no heavy shadows or gradient blobs
- Accent blue used sparingly on primary CTAs

### Typography

| Role | Font | Source |
|------|------|--------|
| Headlines | Playfair Display | Google Fonts |
| Body / UI | DM Sans | Google Fonts |
| Intro tagline | Inter (bold) | Google Fonts |

Tailwind classes: `font-serif` → Playfair, default body → DM Sans.

### Color Tokens (`src/styles.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#080808` | Page background |
| `--foreground` | `#F2F2F2` | Primary text |
| `--card` | `#111111` | Cards, form surfaces |
| `--muted-foreground` | `#6B6B6B` | Secondary text |
| `--primary` / `--accent` | `#2563EB` | Buttons, focus rings |
| `--border` | `rgba(255,255,255,0.08)` | Borders |

Many homepage elements also use **hard-coded hex values** inline (e.g. `text-[#6B6B6B]`) rather than CSS variables — consistent visually, but duplicated.

### Layout Conventions

- Max content width: `max-w-5xl` (~1024px)
- Section padding: `py-[140px]`
- Navbar height: `52px` fixed
- Cards: `#111111` background, `rounded-xl`, `1px` border at 6% white opacity

---

## 7. Homepage Structure (`src/routes/index.tsx`)

The entire marketing site lives in a **single React component** (`Home`). Data is defined as static arrays at the top of the file (services, stats, projects, differences).

### Sections (anchor-linked)

| Section | ID | Content |
|---------|-----|---------|
| Navbar | — | Fixed bar: logo, Services / Work / Contact links, “Let’s Talk” CTA |
| Hero | `#top` | Headline, subcopy, two CTAs, trust line |
| Services | `#services` | 7 service cards with Lucide icons |
| Stats | — | 4 metrics (10+ systems, 3 countries, etc.) |
| Work | `#work` | 4 portfolio project cards with external links |
| Difference | — | 3 value proposition cards |
| Contact | `#contact` | Email link + mailto form (name, email, message) |
| Book a Call | `#book` | Calendly CTA, availability info |
| Footer | — | Links + copyright |

### Navbar Implementation

The navbar is **inline in `index.tsx`**, not a separate component:

- Fixed, full-width, `52px` tall
- Background: `rgba(8, 8, 8, 0.6)` + `backdrop-filter: blur(12px)`
- Logo: `/newlogo.png` with `id="dexa-nav-logo"` (used by intro animation for position measurement)
- Logo sizing: `h-14` mobile, `md:h-[80px]` desktop
- “Let’s Talk” button: white border/glow style (not blue)

### Contact Form Behavior

The contact form does **not** POST to a backend API. On submit it constructs a **`mailto:` URL** with encoded subject/body and redirects via `window.location.href`. This is client-side only.

---

## 8. Background & Visual Effects

### Currently Active: SideRays

**File:** `src/components/backgrounds/side-rays.tsx`  
**Wrapper:** `src/components/backgrounds/site-background.tsx`  
**Technology:** OGL (minimal WebGL library)

Configuration in production:

```tsx
<SideRays
  rayColor1="#FFFFFF"
  rayColor2="#FFFFFF"
  speed={2}
  intensity={1.8}
  spread={2}
  origin="top-right"
  saturation={0}
  blend={0.5}
  falloff={2}
  opacity={0.85}
/>
```

- Fixed full-viewport, `z-0`, `pointer-events-none`
- Uses `IntersectionObserver` to pause rendering when off-screen
- Client-only mount (returns `null` until hydrated)

### Implemented but Inactive

These React Bits–style components exist in the repo from earlier design iterations:

| Component | Tech | Previous use |
|-----------|------|--------------|
| `DotField` | Canvas 2D + SVG glow | Full-page interactive dot grid |
| `FloatingLines` | Three.js shaders | Animated wave lines, blended with DotField |
| `LightPillar` | Custom WebGL | Blue pillar glow (removed per redesign) |

Switching backgrounds requires changing the import/mount in `__root.tsx` (currently `SiteBackground` → SideRays only).

### Other Animation Components (Unused on Homepage)

| File | Description |
|------|-------------|
| `src/components/animations/logo-loop.tsx` | Infinite horizontal logo marquee |
| `src/components/ui/glass-surface.tsx` | Frosted glass effect (React Bits) |
| `src/components/ui/star-border.tsx` | Animated star border button |
| `src/components/site-nav.tsx` | Old pill-shaped glass navbar (superseded) |

---

## 9. Boot-Up Intro Animation (Work in Progress)

### Intended Behavior

On first page load, before the user interacts with the site:

1. Black curtain covers the entire viewport
2. Standalone **D logo** (`/D.png`) pops from a point to full size at screen center
3. A **shine/glare** sweeps top-to-bottom across the D
4. The D **flies and scales down** to align exactly with the “D” in the navbar `newlogo.png`
5. Tagline appears (left-to-right wipe): *"Our business is to make your business grow"*
6. Tagline holds for ~1.5 seconds
7. Black curtain **decays outward** (radial gradient mask) revealing the site

**Note:** The user originally requested a **2-second wait** before step 2. This delay was **never implemented**.

### Implementation

| Item | Detail |
|------|--------|
| Component | `src/components/intro/intro-overlay.tsx` (255 lines) |
| Mount point | `src/routes/__root.tsx` — after `{children}`, `z-[200]` |
| Animation library | Framer Motion (`useAnimate`, `useMotionValue`, `useMotionTemplate`) |
| Dock alignment | Runtime `getBoundingClientRect()` on `#dexa-nav-logo` + fractional glyph bounding boxes |
| Asset | `public/D.png` (~2 MB — large for a logo) |
| Scroll lock | `document.body.style.overflow = hidden` during intro |

### Known Runtime Issues ⚠️

**Symptoms reported by the client:**

1. Screen goes **fully black** briefly on load
2. **No visible D animation**, shine, tagline, or curtain reveal
3. Overlay **disappears quickly**; site appears normally underneath
4. Earlier bug (partially fixed): screen **stuck** with a circular hole showing hero text through the mask

**Likely technical causes** (see `INTRO-ANIMATION-LOG.md` for full analysis):

| Issue | Impact |
|-------|--------|
| `useAnimate()` selector timing | Animations may resolve instantly if DOM targets aren’t ready; D stays at `opacity: 0` |
| No client-only mount gate | Black curtain SSR-renders before JS hydration |
| React Strict Mode + `ran.current` guard | Can cancel first animation run and block restart in dev |
| Missing 2s initial delay | Sequence starts immediately after geometry measurement |
| Large `D.png` file | Slow decode; may miss first animation frames |

**Status:** Build passes (client + SSR). Runtime animation sequence is **not production-ready**.

---

## 10. Server, SSR & Error Handling

### Server Entry (`src/server.ts`)

Custom Nitro fetch handler that:

1. Delegates to TanStack Start server entry
2. Intercepts h3 “swallowed” 500 JSON responses and replaces them with a friendly HTML error page
3. Uses `src/lib/error-capture.ts` to recover the original error stack from global listeners

### Start Middleware (`src/start.ts`)

Wraps server requests in try/catch; returns HTML 500 page on unhandled errors (preserves HTTP errors with status codes).

### Error Pages

- **404:** Defined in `__root.tsx` (`NotFoundComponent`)
- **500:** Custom HTML via `src/lib/error-page.ts`

---

## 11. UI Component Library (shadcn/ui)

The project includes the full shadcn/ui “new-york” component set under `src/components/ui/` (~40 components): Button, Card, Dialog, Form, Tabs, Sidebar, Chart, etc.

**Current homepage usage:** The marketing page is built primarily with **plain Tailwind markup**, not shadcn components. The UI library is scaffolded for future features (admin panels, forms with validation, etc.) but largely unused on `/` today.

Configuration: `components.json` — aliases `@/components`, `@/lib/utils`, CSS at `src/styles.css`.

---

## 12. Build, Run & Deploy

### Scripts

```bash
npm run dev       # Vite dev server (default port 3000)
npm run build     # Production build → .output/
npm run preview   # Preview production build
npm run lint      # ESLint
npm run format    # Prettier
```

### Build Output

Vite produces:

- Client bundles → `.output/public/assets/`
- SSR bundle → `node_modules/.nitro/vite/services/ssr/`
- Nitro server → `.output/server/` (Node preset)

Build has been verified passing with intro overlay included. Main client chunk is **~527 KB** (Framer Motion + router contribute significantly).

### Environment

- **Node.js** required (Nitro Node server preset)
- No `.env` file in repo currently
- No CI/CD configuration in repo
- Git: intro work is **uncommitted** at time of writing

---

## 13. External Dependencies & Integrations

| Integration | Type | Status |
|-------------|------|--------|
| Google Fonts | CDN stylesheets | Active (DM Sans, Playfair, Inter) |
| Calendly | External link | Active (`calendly.com/dexadoors/30min`) |
| Email | `mailto:` protocol | Active (no backend mail service) |
| React Bits | Component source (via MCP / GitHub) | Used for background effects |
| Backend API | — | **None** |
| Database | — | **None** |
| Auth | — | **None** |
| Analytics | — | **Not implemented** |

---

## 14. Technical Debt & Legacy Code

| Item | Notes |
|------|-------|
| Inline navbar in `index.tsx` | `site-nav.tsx` exists but is unused |
| Hard-coded colors | Mix of CSS variables and inline hex |
| Unused background components | DotField, FloatingLines, LightPillar still in repo |
| Unused animation components | LogoLoop, GlassSurface nav, StarBorder |
| Single-file homepage | All content in one 447-line component |
| Intro animation | Implemented but broken at runtime |
| Large PNG assets | `D.png`, `newlogo.png` are ~2 MB each |
| No tests | No unit, integration, or E2E tests in repo |
| No CI | No GitHub Actions or similar |

---

## 15. Key Files Quick Reference

| Concern | File(s) |
|---------|---------|
| Homepage content | `src/routes/index.tsx` |
| Global layout / fonts / mounts | `src/routes/__root.tsx` |
| Design tokens | `src/styles.css` |
| Active background | `src/components/backgrounds/site-background.tsx` |
| Intro animation | `src/components/intro/intro-overlay.tsx` |
| Router setup | `src/router.tsx`, `src/routeTree.gen.ts` |
| Server / SSR | `src/server.ts`, `src/start.ts` |
| Build config | `vite.config.ts` |
| Intro bug audit | `INTRO-ANIMATION-LOG.md` |

---

## 16. Recommended Consultant Focus Areas

If you're being brought in to help, these are the highest-value areas based on current project state:

### Priority 1 — Fix intro animation

- Replace `useAnimate` CSS selectors with direct `ref`-based Framer Motion controls
- Add client-only mount gate (match `SiteBackground` pattern)
- Fix React Strict Mode compatibility
- Implement the missing 2-second initial delay
- Optimize/compress `D.png` (target < 100 KB)
- Add phase logging or Storybook/isolated test page for the sequence

### Priority 2 — Production hardening

- Set up deployment pipeline (Vercel, Cloudflare, Node VPS, etc.)
- Add image optimization (WebP/AVIF, responsive sizes)
- Consider code-splitting Framer Motion (527 KB main chunk warning)
- Add basic analytics and SEO audit (OG images, structured data)

### Priority 3 — Code organization

- Extract homepage sections into components (`Hero`, `Services`, `Work`, etc.)
- Consolidate navbar into a shared component
- Remove or archive unused legacy components
- Migrate inline hex colors to design tokens

### Priority 4 — Contact / backend (if needed)

- Replace mailto form with a proper form backend (Resend, Formspree, custom API)
- Add spam protection (honeypot, Turnstile)

---

## 17. Glossary

| Term | Meaning |
|------|---------|
| **TanStack Start** | Full-stack React framework built on Vite + TanStack Router with SSR |
| **Nitro** | Universal server engine used for production SSR output |
| **shadcn/ui** | Copy-paste component library built on Radix UI + Tailwind |
| **React Bits** | Third-party React visual effect components (backgrounds, animations) |
| **OGL** | Minimal WebGL library used by SideRays |
| **Client-only gate** | Pattern: `useState(false)` + `useEffect(() => setMounted(true))` + early `return null` to skip SSR render |
| **Curtain / overlay** | Full-screen black div that hides the site during intro animation |

---

*This document reflects the codebase as of June 21, 2026. For the detailed intro animation investigation, see `INTRO-ANIMATION-LOG.md`.*
