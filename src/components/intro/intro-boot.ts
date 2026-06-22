export const INTRO_PLAYED_KEY = "dexadoors-intro-played";
export const INTRO_BOOT_CLASS = "intro-boot-pending";
export const INTRO_COMPLETE_EVENT = "dexadoors:intro-complete";

export function dispatchIntroComplete() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
}

/** Synchronous check — safe to call during first client render. */
export function shouldSkipIntroSync(): boolean {
  if (typeof window === "undefined") return true;
  if (window.location.pathname !== "/" && window.location.pathname !== "") return true;
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).has("replayIntro")) {
    sessionStorage.removeItem(INTRO_PLAYED_KEY);
    return false;
  }
  if (sessionStorage.getItem(INTRO_PLAYED_KEY) === "1") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

export function setIntroBootPending(active: boolean) {
  document.documentElement.classList.toggle(INTRO_BOOT_CLASS, active);
}

export function clearIntroBootPending() {
  setIntroBootPending(false);
}

/** Inline script injected in <head> — runs before body paints. */
export const INTRO_BOOT_SCRIPT = `
(function () {
  try {
    var path = location.pathname;
    if (path !== "/" && path !== "") return;
    if (sessionStorage.getItem("${INTRO_PLAYED_KEY}") === "1") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("${INTRO_BOOT_CLASS}");
  } catch (e) {}
})();
`.trim();

/** Critical CSS inlined in <head> so the cover applies before stylesheet download. */
export const INTRO_BOOT_CRITICAL_CSS = `
html.${INTRO_BOOT_CLASS} {
  background: #050505;
}
html.${INTRO_BOOT_CLASS} body {
  overflow: hidden;
  background: #050505;
}
html.${INTRO_BOOT_CLASS} #site-shell {
  visibility: hidden;
}
html.${INTRO_BOOT_CLASS} body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 199;
  background: #050505;
  pointer-events: none;
}
`.trim();
