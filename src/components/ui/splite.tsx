import { Suspense, lazy, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useIntroComplete } from "@/hooks/use-intro-complete";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** Defer Spline load until the homepage intro animation finishes. */
  waitForIntro?: boolean;
}

function SplineFallback({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-[#6B6B6B]" aria-hidden />
    </div>
  );
}

export function SplineScene({ scene, className, waitForIntro = false }: SplineSceneProps) {
  const introComplete = useIntroComplete();
  const [mounted, setMounted] = useState(false);
  const ready = !waitForIntro || introComplete;

  useEffect(() => {
    if (ready) setMounted(true);
  }, [ready]);

  if (!ready) {
    return <div className={cn("overflow-visible", className)} aria-hidden />;
  }

  if (!mounted) {
    return <SplineFallback className={className} />;
  }

  return (
    <Suspense fallback={<SplineFallback className={className} />}>
      <div className={cn("overflow-visible", className)}>
        <Spline scene={scene} className="h-full w-full" />
      </div>
    </Suspense>
  );
}
