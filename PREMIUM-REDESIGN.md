# Premium Visual Redesign

Visual-only elevation pass for the Dexa Doors homepage. **No scroll animation changes** — [`useScrollAnimations.ts`](src/hooks/useScrollAnimations.ts) was not modified.

**Date:** 2026-06-24

---

## Goal

Elevate the site from clean to premium (Resend / Linear tier) while keeping the existing palette and minimal aesthetic.

---

## Changes

### Hero — device mockup (`HeroDeviceMockup`)

**File:** [`src/components/hero/hero-device-mockup.tsx`](src/components/hero/hero-device-mockup.tsx)

- Glass-bordered browser frame on the right (`lg+` only)
- CSS-only dashboard skeleton (sidebar, stat tiles, chart bars, table rows)
- Inner preview blurred (`filter: blur(2px)`)
- Slow float animation (`hero-mockup-float`, 6s) — disabled under `prefers-reduced-motion`
- Left copy block unchanged (verbatim text)

### Section hierarchy

**File:** [`src/routes/index.tsx`](src/routes/index.tsx)

- `.section-intro` — heading blocks, `z-[2]`
- `.section-cards` — card grids, `z-[1]`, `md:translate-y-3`, increased top margin
- Applied to Services, Work, Difference
- `.section-divider` — subtle top border on major sections

### Service cards

**File:** [`src/styles.css`](src/styles.css)

- Default hairline ring: `box-shadow: 0 0 0 1px rgba(255,255,255,0.06)`
- Hover: blue top accent line (`rgba(37,99,235,0.4)`) via `::before`
- Hover depth: `0 8px 32px rgba(0,0,0,0.4)`

### Stats — data chips

- `.stat-chip` wrapper with left border `rgba(37,99,235,0.3)` and generous padding
- Micro-label “By the numbers” above grid
- `.stat-number` class preserved for GSAP counter

### Project cards

- SVG noise grain overlay via `::after` (`opacity: 0.03`, `mix-blend-mode: overlay`)
- Industry tag restyled as pill badge (`rounded-full`, `#080808` inset)

---

## Files touched

| File | Change |
|------|--------|
| `src/components/hero/hero-device-mockup.tsx` | Created |
| `src/routes/index.tsx` | Hero layout, section wrappers, stats chips, project badges |
| `src/styles.css` | Premium surface utilities |
| `WEBSITE-AESTHETICS.md` | Synced |
| `PREMIUM-REDESIGN.md` | This log |

## Untouched

- `src/hooks/useScrollAnimations.ts`
- `src/components/smooth-scroll/smooth-scroll-provider.tsx`
- `src/components/intro/*`

---

## Test checklist

- [ ] Hero mockup visible on `lg+`, hidden on mobile
- [ ] Left hero copy identical to before
- [ ] Scroll animations unchanged (headings, cards, stats, projects)
- [ ] Service card hover shows blue top line + depth shadow
- [ ] Stats show left blue border chips; counter still runs
- [ ] Project cards show faint grain; tags are pills
- [ ] Section headings visually sit above card grids
