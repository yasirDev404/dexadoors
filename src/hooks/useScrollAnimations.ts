import { type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import { useIntroComplete } from "@/hooks/use-intro-complete";

gsap.registerPlugin(ScrollTrigger);

function parseStatValue(raw: string) {
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  return { target: m ? Number(m[1]) : 0, suffix: m?.[2] ?? "" };
}

export function useScrollAnimations(containerRef: RefObject<HTMLElement | null>) {
  const introComplete = useIntroComplete();

  useGSAP(
    () => {
      if (!introComplete || !containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scope = containerRef.current!;
        const splits: SplitType[] = [];

        const setupHeadings = () => {
          splits.forEach((split) => split.revert());
          splits.length = 0;

          scope.querySelectorAll<HTMLElement>(".section-heading").forEach((el) => {
            const split = new SplitType(el, { types: "lines", lineClass: "split-line" });
            splits.push(split);

            if (!split.lines?.length) return;

            gsap.set(split.lines, { y: 60, opacity: 0, willChange: "transform" });

            gsap.to(split.lines, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            });
          });
        };

        setupHeadings();

        gsap.set(".service-card", { y: 40, opacity: 0, willChange: "transform" });

        ScrollTrigger.batch(".service-card", {
          start: "top 85%",
          onEnter: (els) =>
            gsap.to(els, {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.7,
              ease: "power2.out",
              overwrite: true,
            }),
        });

        ScrollTrigger.create({
          trigger: "#stats",
          start: "top 85%",
          once: true,
          onEnter: () => {
            scope.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
              const { target, suffix } = parseStatValue(
                el.dataset.value ?? el.textContent ?? "0",
              );
              const counter = { val: 0 };
              gsap.to(counter, {
                val: target,
                duration: 1.5,
                snap: { val: 1 },
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = `${Math.round(counter.val)}${suffix}`;
                },
              });
            });
          },
        });

        gsap.set(".project-card", {
          y: 50,
          scale: 0.96,
          opacity: 0,
          willChange: "transform",
        });

        ScrollTrigger.batch(".project-card", {
          start: "top 85%",
          onEnter: (els) =>
            gsap.to(els, {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              overwrite: true,
            }),
        });

        const heroSection = scope.querySelector("section");
        const heroTitle = scope.querySelector(".hero-title");

        if (heroSection && heroTitle) {
          gsap.to(heroTitle, {
            y: () => -(heroSection as HTMLElement).offsetHeight * 0.3,
            ease: "none",
            willChange: "transform",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        ScrollTrigger.refresh();

        const onResize = () => {
          setupHeadings();
          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          splits.forEach((split) => split.revert());
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [introComplete] },
  );
}
