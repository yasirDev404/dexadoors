/**
 * Fractional bounding box of the "D" glyph inside each PNG (values 0..1,
 * measured against the image's intrinsic 1024x683 canvas).
 */
export const STANDALONE_D = { xMin: 0.352, xMax: 0.685, yMin: 0.227, yMax: 0.75 };
export const LOGO_D = { xMin: 0.195, xMax: 0.369, yMin: 0.34, yMax: 0.608 };
export const IMG_ASPECT = 1024 / 683;

export type Box = { left: number; top: number; width: number; height: number };

export type DockGeometry = {
  left: number;
  top: number;
  width: number;
  height: number;
  originX: number;
  originY: number;
  startX: number;
  startY: number;
  startScale: number;
};

export function geometryFromTarget(target: Box): DockGeometry {
  const width = target.width / (STANDALONE_D.xMax - STANDALONE_D.xMin);
  const height = width / IMG_ASPECT;

  const left = target.left - width * STANDALONE_D.xMin;
  const top = target.top - height * STANDALONE_D.yMin;

  const originX = (width * (STANDALONE_D.xMin + STANDALONE_D.xMax)) / 2;
  const originY = (height * (STANDALONE_D.yMin + STANDALONE_D.yMax)) / 2;

  const restCenterX = target.left + target.width / 2;
  const restCenterY = target.top + target.height / 2;
  const heroGlyphWidth = Math.min(window.innerWidth * 0.42, 340);
  const startScale = heroGlyphWidth / target.width;
  const startX = window.innerWidth / 2 - restCenterX;
  const startY = window.innerHeight / 2 - restCenterY;

  return { left, top, width, height, originX, originY, startX, startY, startScale };
}

export function measureTarget(): Box | null {
  const logo = document.getElementById("dexa-nav-logo");
  if (!logo) return null;
  const r = logo.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return null;
  return {
    left: r.left + r.width * LOGO_D.xMin,
    top: r.top + r.height * LOGO_D.yMin,
    width: r.width * (LOGO_D.xMax - LOGO_D.xMin),
    height: r.height * (LOGO_D.yMax - LOGO_D.yMin),
  };
}

export function fallbackTarget(): Box {
  const navPad = 32;
  const glyphW = Math.max(18, Math.min(window.innerWidth * 0.06, 28));
  const glyphH = glyphW * 1.2;
  return { left: navPad, top: 12, width: glyphW, height: glyphH };
}

export async function waitForImages(urls: string[]): Promise<void> {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            img.decode?.().then(() => resolve()).catch(() => resolve());
          };
          img.onerror = () => resolve();
          img.src = src;
        }),
    ),
  );
}

export function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

export async function waitFrames(count: number): Promise<void> {
  for (let i = 0; i < count; i++) {
    await nextFrame();
  }
}

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(id);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}
