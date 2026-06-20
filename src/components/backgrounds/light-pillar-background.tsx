import { useEffect, useState } from "react";

import LightPillar from "./light-pillar";

export function LightPillarBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-[#0A0A0F]" aria-hidden />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0F]" aria-hidden>
      <LightPillar
        topColor="#2563EB"
        bottomColor="#1e3a8a"
        intensity={0.85}
        glowAmount={0.004}
        pillarWidth={2.8}
        quality="medium"
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-[#0A0A0F]/40" />
    </div>
  );
}
