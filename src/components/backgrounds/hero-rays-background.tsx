import { useEffect, useState } from "react";

import SideRays from "./side-rays";

/** SideRays scoped to a hero section — scrolls away with the page, does not follow the viewport. */
export function HeroRaysBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
    </div>
  );
}
