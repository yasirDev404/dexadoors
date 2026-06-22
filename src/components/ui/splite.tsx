import { Suspense, lazy, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

function SplineFallback({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-[#6B6B6B]" aria-hidden />
    </div>
  );
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SplineFallback className={className} />;
  }

  return (
    <Suspense fallback={<SplineFallback className={className} />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
