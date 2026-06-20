const DEV = import.meta.env.DEV;

export type IntroPhase =
  | "skip"
  | "measureStart"
  | "geoResolved"
  | "waitingBoot"
  | "popStart"
  | "popEnd"
  | "shineEnd"
  | "flyEnd"
  | "taglineShown"
  | "taglineEnd"
  | "curtainStart"
  | "done";

export function logIntroPhase(phase: IntroPhase, detail?: Record<string, unknown>) {
  if (!DEV) return;
  const payload = detail ? ` ${JSON.stringify(detail)}` : "";
  console.info(`[IntroOverlay] ${phase}${payload}`);
}

export function logIntroElement(el: HTMLElement | null, label: string) {
  if (!DEV || !el) return;
  const style = getComputedStyle(el);
  console.info(`[IntroOverlay] ${label}`, {
    opacity: style.opacity,
    transform: style.transform,
    display: style.display,
  });
}
