import { useEffect, useState } from "react";

import { INTRO_COMPLETE_EVENT, shouldSkipIntroSync } from "@/components/intro/intro-boot";

function getIntroCompleteInitial() {
  if (typeof window === "undefined") return true;
  return shouldSkipIntroSync();
}

/** True once the Dexa intro has finished or was skipped (return visit, reduced motion, etc.). */
export function useIntroComplete() {
  const [complete, setComplete] = useState(getIntroCompleteInitial);

  useEffect(() => {
    if (complete) return;

    const onComplete = () => setComplete(true);
    window.addEventListener(INTRO_COMPLETE_EVENT, onComplete);
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, onComplete);
  }, [complete]);

  return complete;
}
