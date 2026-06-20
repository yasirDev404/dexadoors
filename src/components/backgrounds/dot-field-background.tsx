import { useEffect, useState } from "react";

import DotField from "./dot-field";
import FloatingLines from "./floating-lines";

export function DotFieldBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0">
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

      <div
        className="absolute inset-0 opacity-75"
        style={{ mixBlendMode: "screen" }}
      >
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
          mixBlendMode="normal"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 72% 42%, rgba(168, 85, 247, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse 120% 100% at 50% 50%, transparent 25%, rgba(8, 8, 8, 0.35) 70%, rgba(8, 8, 8, 0.85) 100%)
          `,
        }}
      />
    </div>
  );
}
