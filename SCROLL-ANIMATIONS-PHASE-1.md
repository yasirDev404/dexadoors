# Scroll Animations — Phase 1: Section Headings

Log of changes for the first refinement pass on homepage scroll animations. Scope: **section H2 headings only** (`.section-heading`). Service cards, stats, project cards, and hero parallax were not changed.

**Date:** 2026-06-24

---

## Problem

Section titles (e.g. *"Tired of managing agencies that don't talk to each other?"*, *"Real projects. Real businesses."*) were not revealing reliably on scroll, and did not reverse when scrolling back up.

### Root causes identified

1. **No reverse behavior** — ScrollTrigger used the default `toggleActions: "play none none none"`, so animations played once on enter and never reversed on scroll up.
2. **Font timing** — Headings use Playfair Display (`font-serif`). Split-type ran before the web font loaded, causing incorrect line breaks or stuck hidden text (`opacity: 0`, `y: 60`).
3. **Incomplete line mask CSS** — `overflow: hidden` was on `.section-heading` but not on each `.split-line` wrapper, weakening the per-line slide-up effect.
4. **Resize leak** — Re-splitting on resize created new ScrollTriggers without killing previous heading tweens.

---

## Changes

### `src/hooks/useScrollAnimations.ts`

| Before | After |
|--------|-------|
| `gsap.set` + `gsap.to` | `gsap.fromTo` for clearer from/to states |
| `y: 60`, `duration: 0.9`, `stagger: 0.08`, `ease: "power3.out"` | `y: 24`, `duration: 0.6`, `stagger: 0.05`, `ease: "power2.out"` |
| `start: "top 85%"` only | `start: "top 88%"`, `end: "bottom 70%"` |
| No `toggleActions` | `toggleActions: "play reverse play reverse"` |
| Split immediately on init | Wait for `document.fonts.ready` before splitting |
| Resize re-split without tween cleanup | Kill heading tweens before re-split on resize |

**Bidirectional behavior (`toggleActions: "play reverse play reverse"`):**

| Scroll action | Result |
|---------------|--------|
| Scroll down — heading enters viewport | Lines slide up and fade in |
| Scroll down — heading leaves viewport | Lines reverse out |
| Scroll up — heading re-enters viewport | Lines play in again |
| Scroll up — heading leaves viewport | Lines reverse out |

### `src/styles.css`

```css
.split-line {
  display: block;
  overflow: hidden;   /* added — per-line clip mask */
  will-change: transform;
}
```

---

## Animation spec (Phase 1 headings)

| Property | Value |
|----------|-------|
| Target | All 5 `.section-heading` H2 elements |
| Split | `split-type`, `types: "lines"`, class `split-line` |
| Offset | `y: 24` → `0` |
| Opacity | `0` → `1` |
| Duration | `0.6s` |
| Stagger | `0.05s` per line |
| Ease | `power2.out` |
| Trigger start | `top 88%` |
| Trigger end | `bottom 70%` |
| Reduced motion | Unchanged — no split, no hide; content stays visible |

---

## Files touched

- `src/hooks/useScrollAnimations.ts` — heading animation block
- `src/styles.css` — `.split-line` overflow
- `SCROLL-ANIMATIONS-PHASE-1.md` — this log

---

## Manual test checklist

- [ ] First visit `/` — after intro, scroll to services section; heading lines reveal subtly
- [ ] Scroll back up past services heading — lines reverse down/out
- [ ] Repeat for Work, Difference, Contact, and Book a Call headings
- [ ] Resize browser — headings re-split without duplicate animation glitches
- [ ] Enable `prefers-reduced-motion: reduce` — all headings visible immediately, no animation

---

## Out of scope (future phases)

- Service card batch reveals
- Stats counter
- Project card stagger
- Hero H1 parallax
- Difference / contact card animations
- Body paragraph reveals under headings

---

## Phase 1.1 — Headings stay visible (2026-06-24)

### Problem

Section headings were disappearing too early when scrolling down. The bidirectional `toggleActions: "play reverse play reverse"` with `end: "bottom 70%"` reversed the animation (opacity → 0) while the heading was still on screen. Scrolling back up required a large distance before headings reappeared.

### Desired behavior

- Headings should **not fade out** while reading a section
- Subtle **up/down motion** while scrolling — match the hero H1 parallax feel
- Lines reveal once on first enter, then stay readable

### Changes

**`src/hooks/useScrollAnimations.ts`**

| Before (Phase 1) | After (Phase 1.1) |
|------------------|-------------------|
| `toggleActions: "play reverse play reverse"` | Removed — no reverse/hide on leave |
| `end: "bottom 70%"` | Removed from reveal trigger |
| Single combined tween | **Two-part animation** per heading |

**1. One-time line reveal** (`once: true`)

- Lines stagger in (`y: 24 → 0`, `opacity: 0 → 1`) when heading first enters viewport
- After reveal completes, text **stays visible** — never reverses to hidden

**2. Hero-style scrub parallax** (parent `<section>`)

- Same pattern as `.hero-title`: `scrub: true`, `ease: "none"`
- `start: "top top"`, `end: "bottom top"` on the section
- Subtle drift: `y: 0 → -(sectionHeight × 0.12)` (hero uses `× 0.3`; section headings use a gentler factor)
- Scrolling up/down moves the heading slightly — no opacity change

### Updated spec

| Property | Reveal | Parallax |
|----------|--------|----------|
| Target | `.split-line` elements | `.section-heading` element |
| Trigger | heading, `top 88%` | parent section, `top top` → `bottom top` |
| Motion | `y: 24 → 0`, opacity in | `y: 0 → -(height × 0.12)` |
| Scrub | No (timed tween) | Yes |
| Repeat | Once only | Continuous with scroll |

### Manual test checklist (Phase 1.1)

- [ ] Scroll to services heading — lines reveal once, stay visible while reading section
- [ ] Continue scrolling down through section — heading does **not** fade out
- [ ] Scroll up/down within section — heading drifts subtly (parallax), always readable
- [ ] Repeat for all 5 section H2s
- [ ] Hero H1 behavior unchanged
