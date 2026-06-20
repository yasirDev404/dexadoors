import { TAGLINE, useIntroSequence } from "./use-intro-sequence";

export function IntroOverlay() {
  const {
    mounted,
    skipIntro,
    geo,
    showText,
    revealing,
    done,
    dRef,
    shineRef,
    textRef,
    curtainRef,
  } = useIntroSequence();

  if (!mounted || skipIntro || done) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#050505]"
        style={{
          opacity: 1,
          clipPath: revealing ? "circle(150% at 50% 50%)" : undefined,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        {showText && (
          <div
            ref={textRef}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              clipPath: "inset(0 100% 0 0)",
              opacity: 0,
            }}
            className="max-w-3xl text-center text-3xl leading-tight text-white md:text-5xl"
          >
            {TAGLINE}
          </div>
        )}
      </div>

      {geo && (
        <div
          ref={dRef}
          id="intro-d"
          style={{
            position: "fixed",
            left: geo.left,
            top: geo.top,
            width: geo.width,
            height: geo.height,
            transformOrigin: `${geo.originX}px ${geo.originY}px`,
            opacity: 0,
          }}
        >
          <img
            src="/D.png"
            alt=""
            className="h-full w-full select-none object-contain"
            draggable={false}
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: "url(/D.png)",
              WebkitMaskImage: "url(/D.png)",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <div
              ref={shineRef}
              className="absolute inset-x-0 h-[60%] -translate-y-[130%] opacity-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 70%, transparent 100%)",
                filter: "blur(2px)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
