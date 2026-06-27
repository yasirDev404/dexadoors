import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";

import { MagicCard } from "@/components/ui/magic-card";
import type { WorkProject } from "@/lib/work-projects";

type WorkProjectPageProps = {
  project: WorkProject;
};

export function WorkProjectPage({ project }: WorkProjectPageProps) {
  return (
    <div className="relative z-[1] min-h-screen text-[#F2F2F2] antialiased">
      <nav
        className="fixed inset-x-0 top-0 z-50 flex h-[52px] max-h-[52px] items-stretch overflow-visible px-4 md:px-6"
        style={{
          background: "rgba(8, 8, 8, 0.6)",
          backdropFilter: "blur(12px) saturate(150%)",
          WebkitBackdropFilter: "blur(12px) saturate(150%)",
        }}
      >
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center">
          <div className="relative flex h-full items-center overflow-visible">
            <Link to="/" className="block">
              <img
                src="/newlogo.png"
                alt="Dexa Doors"
                className="h-auto max-h-[52px] w-auto object-contain"
              />
            </Link>
          </div>
          <div className="hidden h-full items-center gap-7 md:flex">
            <Link
              to="/"
              hash="services"
              className="text-[13px] font-normal text-[#9a9a9a] transition-colors duration-150 hover:text-[#f2f2f2]"
            >
              Services
            </Link>
            <Link
              to="/"
              hash="work"
              className="text-[13px] font-normal text-[#9a9a9a] transition-colors duration-150 hover:text-[#f2f2f2]"
            >
              Work
            </Link>
            <Link
              to="/"
              hash="contact"
              className="text-[13px] font-normal text-[#9a9a9a] transition-colors duration-150 hover:text-[#f2f2f2]"
            >
              Contact
            </Link>
          </div>
          <div className="flex h-full items-center justify-end">
            <Link
              to="/"
              hash="contact"
              className="nav-cta rounded-full border border-[rgba(32,32,31,0.75)] px-4 py-1.5 text-[13px] font-medium transition-all duration-300"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
        <div className="nav-border-glow pointer-events-none absolute right-4 bottom-0 left-4 mx-auto max-w-6xl md:right-6 md:left-6" aria-hidden="true" />
      </nav>

      <main className="pt-[52px]">
        <section className="section-divider">
          <div className="mx-auto max-w-5xl px-6 py-[120px] md:py-[140px]">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-[10px] py-[2px] text-[11px] uppercase tracking-[0.07em] text-[#6B6B6B]">
                {project.tag}
              </span>
              <h1 className="mt-6 font-serif text-[48px] font-bold leading-[1.1] text-[#F2F2F2] md:text-[64px]">
                {project.name}
              </h1>
              <p className="mt-6 max-w-[640px] text-[18px] leading-[1.7] text-[#6B6B6B]">{project.tagline}</p>
            </div>
          </div>
        </section>

        {project.problem && (
          <section className="section-divider">
            <div className="mx-auto max-w-5xl px-6 py-[100px] md:py-[120px]">
              <h2 className="font-serif text-[32px] font-bold leading-[1.15] text-[#F2F2F2] md:text-[40px]">
                What They Needed
              </h2>
              <p className="mt-6 max-w-[640px] text-[16px] leading-[1.7] text-[#6B6B6B]">{project.problem}</p>
            </div>
          </section>
        )}

        {project.snapshots.length > 0 && (
          <section className="section-divider">
            <div className="mx-auto max-w-5xl px-6 py-[80px] md:py-[100px]">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {project.snapshots.map((snapshot) => (
                  <div
                    key={snapshot.label}
                    className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111111] px-6 py-5"
                  >
                    <div className="text-[11px] uppercase tracking-[0.07em] text-[#6B6B6B]">{snapshot.label}</div>
                    <div className="mt-2 text-[16px] font-medium text-[#F2F2F2]">{snapshot.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {project.features.length > 0 && (
          <section className="section-divider">
            <div className="mx-auto max-w-5xl px-6 py-[100px] md:py-[140px]">
              <div className="max-w-2xl">
                <h2 className="font-serif text-[32px] font-bold leading-[1.15] text-[#F2F2F2] md:text-[40px]">
                  What We Built
                </h2>
              </div>
              <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-[88px] lg:grid-cols-3">
                {project.features.map((feature) => (
                  <MagicCard key={feature.title} className="service-card" gradientColor="rgba(37, 99, 235, 0.08)">
                    <h3 className="text-[16px] font-medium text-[#F2F2F2]">{feature.title}</h3>
                    <p className="text-[14px] leading-relaxed text-[#6B6B6B]">{feature.description}</p>
                  </MagicCard>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-divider">
          <div className="mx-auto max-w-5xl px-6 py-[100px] md:py-[120px]">
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] px-5 py-2 text-[13px] text-[#F2F2F2] transition-[border-color] duration-200 hover:border-[rgba(255,255,255,0.2)]"
              >
                Visit Live Site <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {project.nextSlug && project.nextName && (
                <Link
                  to="/work/$slug"
                  params={{ slug: project.nextSlug }}
                  className="inline-flex items-center gap-2 text-[13px] text-[#6B6B6B] transition-colors hover:text-[#F2F2F2]"
                >
                  Next Project: {project.nextName}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <footer>
          <div className="mx-auto max-w-5xl px-6 py-[80px]">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <div className="text-[13px] tracking-[0.1em] text-white">DEXA DOORS</div>
                <div className="mt-2 text-[13px] text-[#6B6B6B]">We build what your business deserves.</div>
              </div>
              <div className="flex items-center gap-8">
                <Link to="/" hash="services" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-white">
                  Services
                </Link>
                <Link to="/" hash="work" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-white">
                  Work
                </Link>
                <Link to="/" hash="contact" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
            <div className="mt-12 border-t border-[rgba(255,255,255,0.06)] pt-8 text-[12px] text-[#6B6B6B]">
              Copyright © 2026 Dexa Doors. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
