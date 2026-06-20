# Dexa Doors — Intro Animation Work Log

> **Document purpose:** A complete audit of every decision, file change, and line of logic involved in the website boot-up intro animation, from the original user request through the current broken runtime behavior.  
> **Generated:** Sunday, June 21, 2026  
> **Project:** `dexadoors` (TanStack Start + React 19 + Vite + Tailwind CSS 4)  
> **Primary transcript:** [Intro animation session](63bc3ae0-f490-4cd8-b3ef-e5a2321654b6)

---

## Table of Contents

1. [Background & Context](#1-background--context)
2. [Original User Requirements](#2-original-user-requirements)
3. [Research & Technology Choices](#3-research--technology-choices)
4. [Assets Created or Modified](#4-assets-created-or-modified)
5. [Codebase Changes — File by File](#5-codebase-changes--file-by-file)
6. [IntroOverlay Architecture](#6-introoverlay-architecture)
7. [Intended Animation Timeline](#7-intended-animation-timeline)
8. [Runtime Integration & Layering](#8-runtime-integration--layering)
9. [Build & Verification History](#9-build--verification-history)
10. [Bug Reports & Fix Attempts](#10-bug-reports--fix-attempts)
11. [Current Issue — Black Screen, No Animations, Instant Disappear](#11-current-issue--black-screen-no-animations-instant-disappear)
12. [Git Status at Time of Writing](#12-git-status-at-time-of-writing)
13. [Recommended Next Steps (Not Yet Implemented)](#13-recommended-next-steps-not-yet-implemented)

---

## 1. Background & Context

Before the intro animation work began, the Dexa Doors site had already gone through a major redesign pass inspired by Resend.com:

- **Typography:** Playfair Display (headlines) + DM Sans (body)
- **Colors:** Near-black `#080808` background, `#111111` cards, muted `#6B6B6B` text
- **Navbar:** Fixed full-width bar (52px), translucent blur, logo left / links center / CTA right
- **Background:** React Bits `SideRays` component (pure white rays, top-right origin) via `SiteBackground`
- **Logo:** User-provided `newlogo.png` ("Dexa." wordmark) in the navbar

The intro animation was requested as a **pre-show curtain** — a cinematic sequence that plays once on first load before the user sees the main site.

---

## 2. Original User Requirements

The user provided this exact sequence (paraphrased from chat, timestamp ~2:10 AM UTC+5):

| Step | Requirement |
|------|-------------|
| 0 | After the website boots up completely, **wait 2 seconds** |
| 1 | On a **fully black background**, the standalone **D logo** pops out smoothly from a point to full size, centered on screen |
| 2 | A **glare/shine** sweeps **top to bottom** across the D |
| 3 | The D **moves toward the navbar**, staying on black background |
| 4 | The D must **align exactly** with the "D" glyph inside the navbar `newlogo.png` ("Dexa.") |
| 5 | Once docked, show tagline in **white, bold, Inter font**: *"Our business is to make your business grow"* |
| 6 | Tagline appears with a **left-to-right reveal** animation |
| 7 | Hold the tagline for **~1500ms (1.5 seconds)** |
| 8 | The black "curtain" **decays/fades away with a gradient**, revealing the real website underneath |

Additional notes from the user:

- All motion must be **smooth**
- Agent was asked to search the web and **React Bits** for animation patterns
- User later provided standalone asset: **`D.png` in project root** (white D on black, same glyph style as navbar logo)

---

## 3. Research & Technology Choices

### React Bits MCP

The React Bits MCP server (`user-reactbits`) was available in the project. The agent searched the registry for pre-built components matching this sequence.

**Finding:** No single React Bits component covers a multi-phase boot sequence (pop → shine → fly-to-element → text wipe → curtain reveal). This is a bespoke choreography problem, not a drop-in background effect.

**Decision:** Build a custom `IntroOverlay` component using **Framer Motion** (`framer-motion@^12.40.0`), which was already installed for earlier UI work.

### Framer Motion APIs Used

| API | Purpose |
|-----|---------|
| `useAnimate()` | Imperative timeline control via CSS selectors inside a scoped ref |
| `useMotionValue()` | Numeric driver for curtain hole radius |
| `useTransform()` | Derive outer edge of radial gradient from hole value |
| `useMotionTemplate` | Build dynamic `mask-image` CSS string |
| `motion.div` | Animated D container, shine sweep, tagline clip-path reveal |

### Alignment Strategy

Because the navbar logo is a responsive PNG with internal padding, pixel-perfect docking cannot rely on hard-coded CSS coordinates alone.

**Approach chosen:**

1. Add `id="dexa-nav-logo"` to the navbar `<img>`
2. At runtime, call `getBoundingClientRect()` on that element
3. Map fractional bounding boxes (0–1) for the "D" glyph inside each PNG:
   - `STANDALONE_D` — D glyph region inside `D.png`
   - `LOGO_D` — D glyph region inside `newlogo.png`
4. Compute where to place/size the animated `D.png` so its glyph overlays the navbar glyph exactly
5. Use `transformOrigin` at the glyph center so scale animations don't drift

These fractional values were **eyeballed from image analysis**, not programmatically extracted from PNG alpha channels. They are documented as tunable constants at the top of `intro-overlay.tsx`.

---

## 4. Assets Created or Modified

| File | Location | Role | Notes |
|------|----------|------|-------|
| `D.png` | Project root (`/D.png`) | User-provided source asset | Standalone white "D" on black background |
| `D.png` | `public/D.png` | Served static asset | Copied from root for `/D.png` URL in browser |
| `newlogo.png` | `public/newlogo.png` | Navbar wordmark | Pre-existing; "Dexa." logo used as dock target |
| `newlogo.png` | Project root | Source copy | User-added file |

**Asset observations:**

- Both PNGs share the same intrinsic canvas dimensions (**1024 × 683**), which simplified aspect-ratio math (`IMG_ASPECT = 1024 / 683`)
- `D.png` is a large file (~2 MB). This can delay image decode/paint but does not explain missing animations by itself
- The standalone D and the D inside "Dexa." share the same glyph artwork, making overlay alignment feasible

---

## 5. Codebase Changes — File by File

### 5.1 NEW: `src/components/intro/intro-overlay.tsx` (255 lines)

The entire intro system lives in this single file. No other intro-related components, hooks, or CSS modules were created.

**Exports:** `IntroOverlay` (default export pattern: named export)

**Constants:**

```ts
STANDALONE_D = { xMin: 0.352, xMax: 0.685, yMin: 0.227, yMax: 0.75 }
LOGO_D       = { xMin: 0.195, xMax: 0.369, yMin: 0.34, yMax: 0.608 }
IMG_ASPECT   = 1024 / 683
TAGLINE      = "Our business is to make your business grow"
```

**Helper functions:**

| Function | Description |
|----------|-------------|
| `geometryFromTarget(target: Box)` | Given the on-screen box of the navbar D glyph, computes full `DockGeometry` (position, size, transform origin, hero start transform) |
| `measureTarget()` | Reads `#dexa-nav-logo` from DOM, returns glyph box or `null` |
| `fallbackTarget()` | Hard-coded `{ left: 52, top: 14, width: 22, height: 26 }` if logo measurement fails after ~90 frames |

**State & refs:**

| Name | Type | Purpose |
|------|------|---------|
| `scope` | `useAnimate` ref | Animation scope for `#intro-d`, `#intro-shine`, `#intro-text` selectors |
| `geo` | `useState<DockGeometry \| null>` | Computed dock geometry; gates rendering of animated D |
| `showText` | `useState<boolean>` | Controls tagline mount |
| `done` | `useState<boolean>` | When `true`, component returns `null` (fully unmounted) |
| `ran` | `useRef<boolean>` | Prevents animation sequence from running more than once |
| `hole` | `useMotionValue(-60)` | Radial mask hole size for curtain reveal |

**Effects:**

1. **Geometry measurement** (lines 90–109): `requestAnimationFrame` loop, up to 90 tries (~1.5s), then fallback
2. **Scroll lock** (lines 111–117): Sets `document.body.style.overflow = "hidden"` on mount, restores on unmount
3. **Animation choreography** (lines 119–179): Async IIFE triggered once `geo` is available; includes 10s safety timeout

**JSX structure:**

```
fixed inset-0 z-[200] overlay (pointer-events-none)
├── motion.div — black curtain (#050505) with radial-gradient mask
├── centered tagline container (conditional on showText)
│   └── motion.div#intro-text — clip-path wipe + Inter bold white text
└── motion.div#intro-d (conditional on geo)
    ├── img src="/D.png"
    └── shine container (CSS mask-image: url(/D.png))
        └── motion.div#intro-shine — vertical gradient sweep
```

---

### 5.2 MODIFIED: `src/routes/__root.tsx`

**Changes made:**

1. **Import added:**
   ```ts
   import { IntroOverlay } from "../components/intro/intro-overlay";
   ```

2. **Google Fonts link updated** — Inter added for tagline typography:
   ```
   family=Inter:wght@400;500;600;700;800
   ```
   (Alongside existing DM Sans + Playfair Display)

3. **Mount point added in `RootShell`:**
   ```tsx
   <body>
     <SiteBackground />
     {children}
     <IntroOverlay />   // ← added after page content, before Scripts
     <Scripts />
   </body>
   ```

**Important architectural note:** Unlike `SiteBackground`, which uses a client-only `mounted` gate and returns `null` during SSR, **`IntroOverlay is NOT client-gated**. It renders immediately on both server and client. This means the black curtain HTML is present in the SSR output before JavaScript hydrates.

---

### 5.3 MODIFIED: `src/routes/index.tsx`

**Single-line functional change:**

```tsx
<img
  id="dexa-nav-logo"    // ← added for runtime measurement
  src="/newlogo.png"
  alt="Dexa Doors"
  className="h-14 w-auto object-contain md:h-[80px]"
/>
```

No other homepage content was modified for the intro. The navbar logo sizing (`h-14` / `md:h-[80px]`) directly affects dock geometry calculations.

---

### 5.4 NOT MODIFIED (but relevant)

| File | Relevance |
|------|-----------|
| `src/components/backgrounds/site-background.tsx` | Renders `SideRays` at `z-0`, client-only after mount |
| `src/styles.css` | No intro-specific styles added; overlay uses inline styles + Tailwind |
| `package.json` | `framer-motion@^12.40.0` already present; no new deps for intro |

---

## 6. IntroOverlay Architecture

### Layer Stack (z-index)

| Layer | z-index | Component |
|-------|---------|-----------|
| SideRays background | `z-0` | `SiteBackground` |
| Page content (navbar, hero, etc.) | `z-[1]` | `index.tsx` root div |
| Navbar | `z-50` | Fixed nav |
| Intro overlay | `z-[200]` | `IntroOverlay` |

The intro sits above everything, including the navbar, which is correct for a full-screen curtain.

### Dock Geometry Math (Summary)

Given navbar logo rect `r`:

```
target.left   = r.left   + r.width  * LOGO_D.xMin
target.top    = r.top    + r.height * LOGO_D.yMin
target.width  = r.width  * (LOGO_D.xMax - LOGO_D.xMin)
target.height = r.height * (LOGO_D.yMax - LOGO_D.yMin)

element.width  = target.width / (STANDALONE_D.xMax - STANDALONE_D.xMin)
element.height = element.width / IMG_ASPECT
element.left   = target.left - element.width  * STANDALONE_D.xMin
element.top    = target.top  - element.height * STANDALONE_D.yMin

hero scale     = min(viewportWidth * 0.42, 340) / target.width
startX/Y       = viewport center minus glyph center at rest position
```

### Curtain Mask Mechanism

The black curtain uses a **CSS `mask-image` radial gradient**:

```css
radial-gradient(circle at 50% 50%, transparent {hole}%, black {holeOuter}%)
```

- `hole` starts at **-60** (fully opaque black — no visible hole)
- During final phase, `hole` animates to **135** (large transparent center, site revealed)
- `holeOuter = hole + 24` creates a soft gradient edge on the "curtain decay"

### Shine Effect

- A white linear gradient `motion.div` sweeps vertically inside a container
- Container is masked with `mask-image: url(/D.png)` so shine only appears on the D shape
- Animated via `useAnimate` on `#intro-shine`: `y: ["-130%", "130%"]`, opacity keyframes

---

## 7. Intended Animation Timeline

| Phase | Duration (coded) | Trigger | Visual |
|-------|------------------|---------|--------|
| **Initial wait** | **NOT IMPLEMENTED** | User asked for 2s | Should delay before pop; skipped in code |
| **Geometry measure** | 0–~90 frames | `requestAnimationFrame` | Black curtain only; D not yet rendered |
| **1. Pop-out** | 0.85s | `animate("#intro-d", { scale: [0, startScale], opacity: [0, 1] })` | D grows from point at screen center |
| **2. Shine** | 0.9s + 0.15s pause | `animate("#intro-shine", ...)` | Top-to-bottom glare on D |
| **3. Fly-to-dock** | 1.05s | `animate("#intro-d", { x, y, scale })` | D moves/shrinks to navbar position |
| **4. Tagline reveal** | 0.7s (+ 750ms buffer) | `setShowText(true)` + clip-path animation | Left-to-right text wipe |
| **5. Hold** | 1500ms | `sleep(1500)` | Tagline stays visible |
| **6. Curtain decay** | 0.95s | `animate(hole, 135)` + text fade | Gradient hole opens from center |
| **7. Unmount** | immediate | `setDone(true)` | Overlay removed from DOM |

**Expected total runtime (if all phases execute):** ~5.5–6.5 seconds (excluding the missing 2s initial wait).

---

## 8. Runtime Integration & Layering

### Mount Location

`IntroOverlay` is mounted in `RootShell`, not inside the homepage route. This means:

- It runs on **every page** that uses the root shell (not just `/`)
- It is a sibling of `{children}`, not a child of homepage content
- It renders **after** page content in DOM order but stacks above via `z-[200]`

### SSR Behavior

| Component | SSR output | Client hydration |
|-----------|------------|------------------|
| `SiteBackground` | `null` | Mounts SideRays after `useEffect` |
| `IntroOverlay` | **Full black curtain div rendered** | Effects run, geometry measured, animation starts |
| Page content | Full HTML | Visible underneath curtain (but obscured) |

### Scroll Lock

- `overflow: hidden` applied to `document.body` on overlay mount
- Restored when curtain decay begins (step 5) and again in `finally` / cleanup
- Safety timeout also restores scroll at 10s

### Safety Net

A `setTimeout(..., 10000)` forces `setDone(true)` if the async sequence hangs, preventing a permanent black screen. This was added after the first "stuck screen" bug report.

---

## 9. Build & Verification History

| Attempt | Result | Notes |
|---------|--------|-------|
| Initial `npm run build` after intro implementation | ✅ Exit 0 | Client + SSR + Nitro builds passed |
| Post-fix build (hole = -60, fallback, safety net) | ✅ Exit 0 | Confirmed in chat before interrupted re-run |
| User runtime test on `localhost:3001` | ❌ Stuck on circular hole revealing hero text | Reported ~2:20 AM |
| User runtime test on `localhost:3000` (latest) | ❌ Black flash, no visible animations, instant disappear | Reported in follow-up |

Build passing does **not** guarantee animation runtime correctness — Framer Motion selector timing, React Strict Mode, and SSR hydration are runtime concerns not caught by `vite build`.

---

## 10. Bug Reports & Fix Attempts

### Bug #1 — Stuck Screen with Circular Hole (~2:20 AM)

**User report:** Screen stuck showing a faint circular area in the center. For a fraction of a second, that circle filled with a white gradient before settling into the stuck state. Hero headline text ("Your business deserves more than just a website") was faintly visible through the hole.

**Screenshot analysis:** The radial curtain mask had a **non-zero transparent center at rest**, exposing the SideRays background and hero text while the intro was supposedly still playing. The D logo and tagline were not visible.

**Root cause (diagnosed in chat):**

1. Initial `hole` motion value was **`0`**, making the radial gradient mask create a visible center hole immediately (`transparent 0%, black 22%`)
2. If geometry measurement failed (`#dexa-nav-logo` not found or zero-size rect), the animated `#intro-d` never rendered, so the `useAnimate` sequence never started — overlay stayed up indefinitely

**Fix attempt applied:**

| Fix | Code change |
|-----|-------------|
| Start curtain fully opaque | `hole = useMotionValue(-60)` instead of `0` |
| Retry measurement | Up to 90 `requestAnimationFrame` attempts |
| Fallback geometry | `fallbackTarget()` after retries exhausted |
| Safety unmount | 10-second hard timeout + `try/finally` always calling `setDone(true)` |
| Cancel-safe cleanup | `cancelled` flag in effect cleanup |

---

### Bug #2 — Black Screen, No Animations, Instant Disappear (latest)

**User report:** No animations play. Screen goes black briefly, then the overlay disappears almost instantly and the full site appears (navbar, hero, SideRays — all normal). No visible D pop, shine, fly, tagline, or curtain reveal.

**User screenshots (latest session):**

1. **Screenshot A:** Entire viewport solid black — consistent with the intro curtain covering the page
2. **Screenshot B:** Full site visible — intro overlay has unmounted (`done === true`)

See [Section 11](#11-current-issue--black-screen-no-animations-instant-disappear) for full analysis.

---

## 11. Current Issue — Black Screen, No Animations, Instant Disappear

### Observed Behavior

1. Page loads → **black screen** (curtain is working)
2. Brief flash — user previously described a white circle with gradient fade (curtain mask artifact)
3. **No visible D animation**, no shine, no tagline, no smooth curtain reveal
4. Overlay **vanishes quickly** → site appears fully formed (Screenshot B)
5. Site itself is healthy — navbar, hero, SideRays, typography all correct underneath

### What This Implies in Code Terms

For the overlay to disappear, `setDone(true)` must run. That happens in:

```ts
} finally {
  clearTimeout(safety);
  if (!cancelled) {
    document.body.style.overflow = "";
    setDone(true);  // ← overlay unmounts
  }
}
```

The 10-second safety timeout is **not** "instant." Therefore the async choreography **is starting and reaching its `finally` block** in a very short wall-clock time — likely within a few seconds at most, possibly sub-second if sleep/animate calls resolve abnormally fast.

The black screen with **no visible D** means either:

- `#intro-d` is never painted before the sequence ends, OR
- `#intro-d` is present but animations resolve without visible frames, OR
- The D renders but is invisible (opacity/scale stuck at 0) while the sequence still completes

---

### Likely Root Causes (Ranked by Probability)

#### 1. `useAnimate` selector timing / instant resolution

The animation timeline uses imperative calls:

```ts
await animate("#intro-d", { scale: [0, geo.startScale], opacity: [0, 1] }, { duration: 0.85, ... });
```

These run inside `useEffect` immediately after `geo` is set. In Framer Motion, if the scoped selector cannot resolve to a mounted element, **`animate()` may resolve immediately** without visible motion. The sequence would then fall through all `await`s rapidly (modulo explicit `sleep()` calls).

**Remaining sleeps even if animations fail:** `150 + 750 + 1500 + 950 ≈ 3350ms` minimum → user would see ~3–4 seconds of black, not truly instant. If the user perceives this as "instant" relative to an expected 8+ second cinematic sequence, this still fits.

**Why D wouldn't show:** If scale/opacity animation never runs, `#intro-d` stays at `initial={{ scale: 0, opacity: 0 }}`.

---

#### 2. React Strict Mode interaction with `ran.current` guard

In React 18+ development Strict Mode:

1. Component mounts → effect runs → `ran.current = true` → async sequence starts
2. Strict Mode unmounts → effect cleanup sets `cancelled = true`
3. Component remounts → effect sees `ran.current === true` → **returns early, never restarts animation**

If the first async run was cancelled mid-flight:

- `finally` block skips `setDone(true)` because `cancelled === true`
- Overlay would stay forever (black screen stuck) **unless** safety timeout fires at 10s

This contradicts "instant disappear" unless Strict Mode is off or the first run completes before cleanup. **Mixed symptoms across sessions** (stuck vs instant) could indicate Strict Mode race conditions.

---

#### 3. Missing client-only mount gate (SSR flash)

`SiteBackground` pattern (used successfully elsewhere):

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

`IntroOverlay` does **not** use this pattern. The black curtain is SSR-rendered into HTML immediately. Before hydration:

- User sees black (expected)
- No JavaScript effects run yet
- After hydration, effects begin

This doesn't fully explain missing animations post-hydration, but it explains the **initial black flash** on every load.

---

#### 4. Missing 2-second initial delay (requirement gap)

The user explicitly requested waiting **2 seconds after boot** before the D pop animation. This was **never implemented**. The sequence starts as soon as geometry is measured (often within 1–2 frames after hydration). This is a **spec compliance bug**, not the primary cause of "no animations," but it affects perceived timing.

---

#### 5. `useAnimate` scope ref vs conditional rendering

`#intro-d` is conditionally rendered:

```tsx
{geo && (
  <motion.div id="intro-d" ...>
```

The animation effect depends on `[geo]` and runs in the same commit cycle after `geo` is set. In theory the element exists when the effect runs. However, **`useAnimate`'s scope ref may not include dynamically mounted children if the animate call fires in the same tick before layout**. A single `requestAnimationFrame` delay before starting the sequence would be safer (not currently implemented).

---

#### 6. Large `D.png` asset (~2 MB)

The standalone D PNG is very large for a logo asset. Slow decode could mean the D `<img>` isn't painted during early animation frames. This would cause a "black screen during pop" effect but shouldn't skip the entire sequence.

---

#### 7. First bug fix may have over-corrected the curtain

Changing `hole` from `0` to `-60` fixed the stuck visible hole. However, if the radial mask animation (`animate(hole, 135)`) behaves inconsistently across browsers when starting from negative values, the final reveal could appear to "snap" rather than animate — contributing to the "instant disappear" feeling even if the overlay lifecycle is technically correct.

---

### Symptom Cross-Reference Table

| Symptom | Session 1 (stuck) | Session 2 (instant) | Explanation |
|---------|-------------------|---------------------|-------------|
| Black curtain visible | ✅ | ✅ | Overlay mounts correctly |
| Center hole showing site | ✅ | ❌ (fixed) | `hole=0` bug; fixed to `-60` |
| D pop animation | ❌ | ❌ | `useAnimate` or visibility issue |
| Tagline | ❌ | ❌ | Never reaches or never visible |
| Site eventually visible | ❌ (stuck) | ✅ (fast) | Safety net / fast `setDone(true)` |
| SideRays/hero visible under curtain | ✅ (through hole) | ❌ | Curtain opacity fix worked |

---

### What Is Confirmed Working

- ✅ `IntroOverlay` mounts in `RootShell`
- ✅ Black curtain renders and covers the page
- ✅ Overlay eventually unmounts (`setDone(true)` path executes)
- ✅ Site underneath is fully functional once overlay is gone
- ✅ Production build compiles (client + SSR)
- ✅ `#dexa-nav-logo` anchor exists in navbar markup
- ✅ `/D.png` exists in `public/`
- ✅ Inter font loaded in `__root.tsx`

### What Is Confirmed NOT Working

- ❌ Visible D pop-out animation
- ❌ Visible shine sweep
- ❌ Visible fly-to-navbar motion
- ❌ Visible tagline wipe
- ❌ Visible smooth curtain decay (may flash or skip)
- ❌ 2-second post-boot delay (never implemented)
- ❌ Pixel-perfect dock alignment (cannot be verified — fly phase never visibly runs)

---

## 12. Git Status at Time of Writing

```
Modified:
  src/routes/__root.tsx     (+ IntroOverlay import, Inter font, mount)
  src/routes/index.tsx      (+ id="dexa-nav-logo")

Untracked (new):
  D.png
  public/D.png
  src/components/intro/     (intro-overlay.tsx)
```

The intro work has **not been committed** to git.

---

## 13. Recommended Next Steps (Not Yet Implemented)

These are diagnostic/fix directions for a future pass — **not implemented in this log document**:

1. **Add client-only gate** to `IntroOverlay` (match `SiteBackground` pattern) to eliminate SSR black flash
2. **Replace `useAnimate` selectors** with direct `ref`-based Framer Motion controls on the D, shine, and text elements
3. **Add `requestAnimationFrame` / `flushSync` delay** before starting choreography to guarantee DOM readiness
4. **Fix Strict Mode compatibility** — reset `ran.current` on cleanup or remove the guard and use an abort controller instead
5. **Implement the missing 2-second initial wait** from the original spec
6. **Add `console.log` phase markers** (or React DevTools timeline) to measure which steps actually execute and how long they take
7. **Optimize `D.png`** — compress to <100 KB; same visual, faster decode
8. **Consider `sessionStorage` flag** (`introPlayed`) so the sequence only runs once per session
9. **Verify in browser DevTools → Elements** whether `#intro-d` exists during the black screen phase and what its computed `opacity`/`transform` values are

---

## Appendix A — Complete File Reference

```
src/
├── components/
│   ├── intro/
│   │   └── intro-overlay.tsx    ← ALL intro animation logic (255 lines)
│   └── backgrounds/
│       └── site-background.tsx  ← SideRays wrapper (unchanged for intro)
├── routes/
│   ├── __root.tsx               ← IntroOverlay mount + Inter font
│   └── index.tsx                ← #dexa-nav-logo anchor
public/
├── D.png                        ← Animated standalone D asset
└── newlogo.png                  ← Navbar wordmark (dock target)
```

---

## Appendix B — Dependency Versions (Animation-Related)

```json
"framer-motion": "^12.40.0",
"react": "^19.2.0",
"react-dom": "^19.2.0",
"ogl": "^1.0.11",
"three": "^0.184.0"
```

---

## Appendix C — Chat Timeline Summary

| Time (UTC+5) | Event |
|--------------|-------|
| ~2:10 AM | User requests full boot-up intro sequence (D pop, shine, fly, tagline, curtain) |
| ~2:11 AM | User provides `D.png` in project root |
| ~2:11–2:15 AM | Agent implements IntroOverlay, copies asset, adds Inter font, mounts in root, builds successfully |
| ~2:20 AM | User reports stuck screen with circular hole showing hero text |
| ~2:20–2:30 AM | Agent diagnoses mask hole + geometry failure; applies hole=-60, retry, fallback, safety timeout |
| ~3:10 AM | User reports black screen, no animations, instant disappear; requests this log document |
| ~3:10 AM | Build re-verified (exit 0) before log writing |

---

*End of log.*
