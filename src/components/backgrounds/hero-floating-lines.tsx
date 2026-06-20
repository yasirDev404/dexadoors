import { useEffect, useState } from "react";

import FloatingLines from "./floating-lines";

export function HeroFloatingLines() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <FloatingLines
      enabledWaves={["top", "middle", "bottom"]}
      lineCount={8}
      lineDistance={8}
      bendRadius={8}
      bendStrength={-2}
      interactive={false}
      parallax={true}
      animationSpeed={1}
      linesGradient={["#e945f5", "#6f6f6f", "#6a6a6a"]}
    />
  );
}
