import { type ReactNode } from "react";

import StarBorder from "./ui/star-border";

type GlowCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function GlowCta({ href, children, className = "" }: GlowCtaProps) {
  return (
    <StarBorder
      as="a"
      href={href}
      color="#2563EB"
      speed="5s"
      thickness={1}
      className={`rounded-full shadow-[0_0_24px_rgba(37,99,235,0.45)] ${className}`}
    >
      <span className="block rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white">
        {children}
      </span>
    </StarBorder>
  );
}
