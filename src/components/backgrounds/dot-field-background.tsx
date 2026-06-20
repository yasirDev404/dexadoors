import { useEffect, useState } from "react";

import DotField from "./dot-field";

export function DotFieldBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={14}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly={true}
        gradientFrom="#A855F7"
        gradientTo="#B497CF"
        glowColor="#120F17"
      />
    </div>
  );
}
