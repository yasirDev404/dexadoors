import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

import { logIntroElement, logIntroPhase } from "./intro-debug";
import {
  type DockGeometry,
  fallbackTarget,
  geometryFromTarget,
  measureTarget,
  sleep,
  waitForImages,
  waitFrames,
} from "./intro-geometry";

export const INTRO_PLAYED_KEY = "dexadoors-intro-played";
export const TAGLINE = "Our business is to make your business grow";

const BOOT_DELAY_MS = 2000;
const POP_MS = 850;
const SHINE_MS = 900;
const SHINE_PAUSE_MS = 150;
const FLY_MS = 1050;
const TAGLINE_WIPE_MS = 700;
const TAGLINE_HOLD_MS = 1500;
const TEXT_FADE_MS = 500;
const CURTAIN_MS = 950;
const SAFETY_MS = 12000;
const REF_POLL_MAX = 60;

export type IntroPhaseState =
  | "idle"
  | "waitingBoot"
  | "pop"
  | "shine"
  | "fly"
  | "tagline"
  | "hold"
  | "curtain"
  | "done";

function shouldSkipIntro(): boolean {
  if (typeof window === "undefined") return true;
  if (window.location.pathname !== "/") return true;
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).has("replayIntro")) {
    sessionStorage.removeItem(INTRO_PLAYED_KEY);
    return false;
  }
  if (sessionStorage.getItem(INTRO_PLAYED_KEY) === "1") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

function lockScroll() {
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.body.style.overflow = "";
}

async function resolveGeometry(signal: AbortSignal, maxTries = 90): Promise<DockGeometry> {
  logIntroPhase("measureStart");
  for (let tries = 0; tries <= maxTries; tries++) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    const target = measureTarget();
    if (target) {
      const geo = geometryFromTarget(target);
      logIntroPhase("geoResolved", { tries, startScale: geo.startScale });
      return geo;
    }
    await waitFrames(1);
  }
  const geo = geometryFromTarget(fallbackTarget());
  logIntroPhase("geoResolved", { fallback: true, startScale: geo.startScale });
  return geo;
}

async function waitForRef<T extends HTMLElement>(
  getRef: () => T | null,
  signal: AbortSignal,
): Promise<T | null> {
  for (let i = 0; i < REF_POLL_MAX; i++) {
    if (signal.aborted) return null;
    const el = getRef();
    if (el) return el;
    await waitFrames(1);
  }
  return null;
}

export function useIntroSequence() {
  const [mounted, setMounted] = useState(false);
  const [skipIntro, setSkipIntro] = useState(true);
  const [geo, setGeo] = useState<DockGeometry | null>(null);
  const [phase, setPhase] = useState<IntroPhaseState>("idle");
  const [showText, setShowText] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);

  const dRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const skip = shouldSkipIntro();
    setSkipIntro(skip);
    if (skip) {
      logIntroPhase("skip");
      setDone(true);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const finish = () => {
      unlockScroll();
      sessionStorage.setItem(INTRO_PLAYED_KEY, "1");
      setPhase("done");
      logIntroPhase("done");
      setDone(true);
    };

    const safety = setTimeout(() => {
      if (!signal.aborted) {
        logIntroPhase("done", { reason: "safety-timeout" });
        finish();
      }
    }, SAFETY_MS);

    lockScroll();

    (async () => {
      try {
        await waitForImages(["/D.png", "/newlogo.png"]);
        const resolvedGeo = await resolveGeometry(signal);
        if (signal.aborted) return;

        setGeo(resolvedGeo);

        const dEl = await waitForRef(() => dRef.current, signal);
        if (signal.aborted || !dEl) {
          logIntroPhase("done", { reason: dEl ? "aborted" : "missing-d-ref" });
          finish();
          return;
        }

        await waitFrames(2);

        // Seed transform origin and starting position before pop
        dEl.style.transformOrigin = `${resolvedGeo.originX}px ${resolvedGeo.originY}px`;

        setPhase("waitingBoot");
        logIntroPhase("waitingBoot");
        await sleep(BOOT_DELAY_MS, signal);

        setPhase("pop");
        logIntroPhase("popStart");
        await animate(
          dEl,
          {
            x: resolvedGeo.startX,
            y: resolvedGeo.startY,
            scale: [0, resolvedGeo.startScale],
            opacity: [0, 1],
          },
          { duration: POP_MS / 1000, ease: [0.16, 1, 0.3, 1] },
        );
        logIntroElement(dEl, "after-pop");
        logIntroPhase("popEnd");
        setPhase("shine");

        const shineEl = shineRef.current;
        if (shineEl) {
          await animate(
            shineEl,
            { y: ["-130%", "130%"], opacity: [0, 1, 1, 0] },
            { duration: SHINE_MS / 1000, ease: "easeInOut", times: [0, 0.15, 0.85, 1] },
          );
        }
        await sleep(SHINE_PAUSE_MS, signal);
        logIntroPhase("shineEnd");
        setPhase("fly");

        await animate(
          dEl,
          {
            x: [resolvedGeo.startX, 0],
            y: [resolvedGeo.startY, 0],
            scale: [resolvedGeo.startScale, 1],
          },
          { duration: FLY_MS / 1000, ease: [0.65, 0, 0.35, 1] },
        );
        logIntroPhase("flyEnd");
        setPhase("tagline");

        setShowText(true);
        logIntroPhase("taglineShown");
        await waitForRef(() => textRef.current, signal);
        await waitFrames(1);

        const textEl = textRef.current;
        if (textEl) {
          await animate(
            textEl,
            { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], opacity: [0, 1] },
            { duration: TAGLINE_WIPE_MS / 1000, ease: [0.16, 1, 0.3, 1] },
          );
        } else {
          await sleep(TAGLINE_WIPE_MS, signal);
        }
        logIntroPhase("taglineEnd");
        setPhase("hold");

        await sleep(TAGLINE_HOLD_MS, signal);
        setPhase("curtain");

        logIntroPhase("curtainStart");
        setRevealing(true);
        await waitFrames(1);

        const curtainEl = curtainRef.current;
        const textFade = textEl
          ? animate(textEl, { opacity: 0 }, { duration: TEXT_FADE_MS / 1000, ease: "easeOut" })
          : Promise.resolve();

        const curtainFade = curtainEl
          ? animate(
              curtainEl,
              {
                opacity: [1, 0],
                clipPath: ["circle(150% at 50% 50%)", "circle(0% at 50% 50%)"],
              },
              { duration: CURTAIN_MS / 1000, ease: [0.65, 0, 0.35, 1] },
            )
          : sleep(CURTAIN_MS, signal);

        unlockScroll();
        await Promise.all([textFade, curtainFade]);
        finish();
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("[IntroOverlay] sequence error", err);
        finish();
      } finally {
        clearTimeout(safety);
      }
    })();

    return () => {
      controller.abort();
      clearTimeout(safety);
      unlockScroll();
    };
  }, [mounted]);

  return {
    mounted,
    skipIntro,
    geo,
    phase,
    showText,
    revealing,
    done,
    dRef,
    shineRef,
    textRef,
    curtainRef,
  };
}
