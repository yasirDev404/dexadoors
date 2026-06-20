import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { GlowCta } from "./glow-cta";
import GlassSurface from "./ui/glass-surface";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.div
        className="pointer-events-auto w-full"
        animate={{
          maxWidth: scrolled ? 720 : "100%",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={999}
          backgroundOpacity={0.12}
          blur={14}
          className="w-full"
        >
          <motion.nav
            className="flex h-14 w-full items-center justify-between"
            animate={{
              paddingLeft: scrolled ? 16 : 48,
              paddingRight: scrolled ? 16 : 48,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <a
              href="#top"
              className="shrink-0 text-sm font-semibold tracking-[0.18em] text-foreground transition-opacity hover:opacity-80"
            >
              DEXA DOORS
            </a>

            <motion.div
              className={`hidden items-center md:flex ${scrolled ? "" : "flex-1 justify-center"}`}
              animate={{ gap: scrolled ? 16 : 32 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>

            <GlowCta href="#contact" className="shrink-0">
              Let&apos;s Talk
            </GlowCta>
          </motion.nav>
        </GlassSurface>
      </motion.div>
    </div>
  );
}
