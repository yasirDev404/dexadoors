import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ArrowRight,
  Layers,
  Code2,
  Palette,
  Search,
  Video,
  Bot,
  LifeBuoy,
  Compass,
  HeartHandshake,
  Sparkles,
  Mail,
  ExternalLink,
  Send,
  Clock,
  Wrench,
  Calendar,
  CalendarDays,
} from "lucide-react";

import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { HeroDeviceMockup } from "@/components/hero/hero-device-mockup";
import { MagicCard } from "@/components/ui/magic-card";

const clientNames = ["Deepsurf", "LichtLettersXXL", "Hoppaverhuur", "Zanny's Food"];

const projectCardNoise =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dexa Doors — We handle everything digital" },
      {
        name: "description",
        content:
          "Dexa Doors builds custom systems, apps, AI tools and marketing for businesses across the UK, Netherlands and beyond. One partner. Every digital need.",
      },
      { property: "og:title", content: "Dexa Doors — We handle everything digital" },
      {
        property: "og:description",
        content:
          "From custom platforms to AI-powered systems — we take over your entire digital presence so you stop worrying about technology and start seeing results.",
      },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Layers, name: "Custom Systems & Platforms", desc: "CRMs, booking systems, marketplaces. Built for how your business actually works." },
  { icon: Code2, name: "Web & App Development", desc: "From marketing sites to full iOS and Android apps. We ship things that work." },
  { icon: Palette, name: "UI/UX & Design", desc: "Design that converts visitors into customers, not just something that looks good." },
  { icon: Search, name: "SEO & Digital Marketing", desc: "We get your business found, followed, and remembered." },
  { icon: Video, name: "Video & Content", desc: "Content that stops the scroll and tells your story." },
  { icon: Bot, name: "AI Integration & Chatbots", desc: "We embed intelligence into your systems. Chatbots, automation, and AI tools that actually work for your business." },
  { icon: LifeBuoy, name: "Ongoing Support", desc: "We don't disappear after launch. We stay, we improve, we grow with you." },
];

const projects = [
  {
    name: "Deepsurf",
    desc: "AI-driven crypto analytics platform featuring Mavi, an intelligent chatbot that analyses live market data and guides users in real time.",
    tag: "Fintech · UK",
    href: "https://www.deepsurf.io",
  },
  {
    name: "LichtLettersXXL",
    desc: "Multi-role CRM and booking platform with an embedded AI chatbot serving admin, vendor and customer roles.",
    tag: "SaaS · Netherlands",
    href: "https://xxllichtletters.nl",
  },
  {
    name: "Hoppaverhuur",
    desc: "Full rental marketplace with inventory management, bookings and admin dashboard.",
    tag: "Marketplace · Netherlands",
    href: "https://www.hoppaverhuur.nl",
  },
  {
    name: "Zanny's Food",
    desc: "End-to-end food delivery ecosystem with iOS and Android apps for customers, vendors, drivers and admins.",
    tag: "Mobile App · UK",
    href: "https://www.zannysfood.co.uk",
  },
];

const differences = [
  { icon: Compass, title: "We think like owners", desc: "We ask what your business needs to grow, not just what you asked us to build." },
  { icon: HeartHandshake, title: "We deliver, then we stay", desc: "Launch is just the beginning. We're here for the long run." },
  { icon: Sparkles, title: "Full stack, full picture", desc: "Design, development, marketing, AI — one team, one vision, zero gaps." },
];

function Home() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollAnimations(mainRef);

  return (
    <div className="relative z-[1] min-h-screen text-[#F2F2F2] antialiased">
      {/* NAV */}
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
            <a href="#top" className="block">
              <img
                id="dexa-nav-logo"
                src="/newlogo.png"
                alt="Dexa Doors"
                className="h-auto max-h-[52px] w-auto object-contain"
              />
            </a>
          </div>
          <div className="hidden h-full items-center gap-7 md:flex">
            <a
              href="#services"
              className="text-[13px] font-normal text-[#9a9a9a] transition-colors duration-150 hover:text-[#f2f2f2]"
            >
              Services
            </a>
            <a
              href="#work"
              className="text-[13px] font-normal text-[#9a9a9a] transition-colors duration-150 hover:text-[#f2f2f2]"
            >
              Work
            </a>
            <a
              href="#contact"
              className="text-[13px] font-normal text-[#9a9a9a] transition-colors duration-150 hover:text-[#f2f2f2]"
            >
              Contact
            </a>
          </div>
          <div className="flex h-full items-center justify-end">
            <a
              href="#contact"
              className="nav-cta rounded-full border border-[rgba(32,32,31,0.75)] px-4 py-1.5 text-[13px] font-medium transition-all duration-300"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
        <div className="nav-border-glow pointer-events-none absolute right-4 bottom-0 left-4 mx-auto max-w-6xl md:right-6 md:left-6" aria-hidden="true" />
      </nav>

      <main id="top" ref={mainRef}>
        <section className="relative flex min-h-screen items-center overflow-x-clip pt-[52px]">
          <div className="hero-glow-orb pointer-events-none" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
            <HeroDeviceMockup />
          </div>
          <div className="relative z-[1] mx-auto grid w-full max-w-5xl px-6 py-[120px] lg:grid-cols-2 lg:py-[140px]">
            <div className="w-full max-w-xl text-left">
              <h1 className="hero-title font-serif text-[48px] font-bold leading-[1.1] text-[#F2F2F2] will-change-transform md:text-[72px]">
                Your business deserves more than just a website.
              </h1>
              <p className="mt-8 max-w-[520px] text-[18px] leading-[1.7] text-[#6B6B6B]">
                From custom platforms to AI-powered systems — we take over your entire digital presence so you stop worrying about technology and start seeing results.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-2.5 text-[14px] text-white transition-opacity hover:opacity-90"
                >
                  Start a Project <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.08)] px-6 py-2.5 text-[14px] text-[#F2F2F2] transition-colors hover:border-[rgba(255,255,255,0.16)]"
                >
                  See Our Work
                </a>
              </div>
              <p className="mt-10 text-[13px] text-[#6B6B6B]">
                Trusted by businesses in the UK, Netherlands & beyond.
              </p>
            </div>
          </div>
          <div className="hero-beam pointer-events-none" aria-hidden="true" />
        </section>

        <section aria-label="Trusted clients" className="border-y border-[rgba(255,255,255,0.06)] py-12">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-[13px] tracking-[0.04em] text-[#6B6B6B]">
              Trusted by businesses across the UK, Netherlands & beyond.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-12">
              {clientNames.map((name) => (
                <span
                  key={name}
                  className="text-[13px] font-medium uppercase tracking-[0.08em] text-[rgba(242,242,242,0.25)]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-divider">
          <div className="mx-auto max-w-5xl px-6 py-[140px]">
            <div className="section-intro relative z-[2] max-w-2xl">
              <h2 className="section-heading font-serif text-[36px] font-bold leading-[1.15] text-[#F2F2F2] md:text-[52px]">
                Tired of managing agencies that don't talk to each other?
              </h2>
              <p className="mt-6 max-w-[480px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                Most businesses juggle 5 different agencies. We handle it all under one roof.
              </p>
            </div>

            <div className="section-cards relative z-[1] mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-[88px] md:translate-y-3 lg:grid-cols-3">
              {services.map(({ icon: Icon, name, desc }) => (
                <MagicCard
                  key={name}
                  className="service-card"
                  gradientColor="rgba(37, 99, 235, 0.08)"
                >
                  <Icon className="h-5 w-5 text-[#6B6B6B]" />
                  <h3 className="text-[16px] font-medium text-[#F2F2F2]">{name}</h3>
                  <p className="text-[14px] leading-relaxed text-[#6B6B6B]">{desc}</p>
                </MagicCard>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="section-divider">
          <div className="mx-auto max-w-5xl px-6 py-[140px]">
            <div className="section-intro relative z-[2] max-w-2xl">
              <h2 className="section-heading font-serif text-[36px] font-bold leading-[1.15] text-[#F2F2F2] md:text-[52px]">
                Real projects. Real businesses.
              </h2>
            </div>
            <div className="section-cards relative z-[1] mt-20 grid grid-cols-1 gap-6 md:mt-[88px] md:translate-y-3 md:grid-cols-2">
              {projects.map((p) => (
                <div
                  key={p.name}
                  className="project-card group relative flex flex-col rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111111] transition-[border-color] duration-200 hover:border-[rgba(255,255,255,0.14)]"
                >
                  <div
                    className="pointer-events-none absolute inset-0 z-0 rounded-xl opacity-[0.025]"
                    style={{ backgroundImage: projectCardNoise }}
                    aria-hidden
                  />
                  <div className="px-8 pt-8">
                    <span className="inline-flex rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-[10px] py-[2px] text-[11px] uppercase tracking-[0.07em] text-[#6B6B6B]">
                      {p.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-8 pb-8 pt-4">
                    <h3 className="text-[20px] font-medium text-[#F2F2F2]">{p.name}</h3>
                    <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[#6B6B6B]">{p.desc}</p>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] px-5 py-2 text-[13px] text-[#F2F2F2] transition-[border-color] duration-200 hover:border-[rgba(255,255,255,0.2)]"
                    >
                      Visit Live Site <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFFERENCE */}
        <section className="section-divider">
          <div className="mx-auto max-w-5xl px-6 py-[140px]">
            <div className="section-intro relative z-[2] max-w-3xl">
              <h2 className="section-heading font-serif text-[36px] font-bold leading-[1.15] text-[#F2F2F2] md:text-[52px]">
                You're not hiring a vendor. You're gaining a partner.
              </h2>
            </div>
            <div className="section-cards relative z-[1] mt-20 grid grid-cols-1 gap-6 md:mt-[88px] md:translate-y-3 md:grid-cols-3">
              {differences.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111111] p-8 transition-[border-color] duration-200 hover:border-[rgba(255,255,255,0.14)]"
                >
                  <Icon className="h-5 w-5 text-[#6B6B6B]" />
                  <h3 className="text-[16px] font-medium text-[#F2F2F2]">{title}</h3>
                  <p className="text-[14px] leading-[1.7] text-[#6B6B6B]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section-divider">
          <div className="mx-auto max-w-5xl px-6 py-[140px]">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="section-heading font-serif text-[36px] font-bold leading-[1.15] text-[#F2F2F2] md:text-[52px]">
                Get In Touch
              </h2>
              <p className="mx-auto mt-6 max-w-[480px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                Have a project in mind? Let's build something amazing together.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-[20px] font-medium text-[#F2F2F2]">Let's Talk</h3>
                <p className="mt-5 max-w-md text-[14px] leading-[1.7] text-[#6B6B6B]">
                  Whether you need a custom platform, a full digital overhaul, or AI baked into your business — we're here to help.
                </p>

                <a
                  href="mailto:dexadoors@gmail.com"
                  className="mt-10 flex items-center gap-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111111] p-6 transition-[border-color] duration-200 hover:border-[rgba(255,255,255,0.14)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#080808]">
                    <Mail className="h-4 w-4 text-[#6B6B6B]" />
                  </div>
                  <div>
                    <div className="text-[12px] text-[#6B6B6B]">Email</div>
                    <div className="text-[14px] text-[#F2F2F2]">dexadoors@gmail.com</div>
                  </div>
                </a>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = String(fd.get("name") || "").slice(0, 100);
                  const email = String(fd.get("email") || "").slice(0, 255);
                  const message = String(fd.get("message") || "").slice(0, 2000);
                  const body = `From: ${name} <${email}>%0D%0A%0D%0A${encodeURIComponent(message)}`;
                  window.location.href = `mailto:dexadoors@gmail.com?subject=${encodeURIComponent("New project enquiry from " + name)}&body=${body}`;
                }}
                className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111111] p-8"
              >
                <label className="block text-[13px] text-[#6B6B6B]">Your Name</label>
                <input
                  name="name"
                  required
                  maxLength={100}
                  placeholder="John Doe"
                  className="mt-2 h-11 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#080808] px-4 text-[14px] text-[#F2F2F2] placeholder:text-[#6B6B6B] focus:border-[#2563EB] focus:outline-none"
                />

                <label className="mt-6 block text-[13px] text-[#6B6B6B]">Your Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  placeholder="john@example.com"
                  className="mt-2 h-11 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#080808] px-4 text-[14px] text-[#F2F2F2] placeholder:text-[#6B6B6B] focus:border-[#2563EB] focus:outline-none"
                />

                <label className="mt-6 block text-[13px] text-[#6B6B6B]">Your Message</label>
                <textarea
                  name="message"
                  required
                  maxLength={2000}
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="mt-2 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#080808] px-4 py-3 text-[14px] text-[#F2F2F2] placeholder:text-[#6B6B6B] focus:border-[#2563EB] focus:outline-none"
                />

                <button
                  type="submit"
                  className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] text-[14px] text-white transition-opacity hover:opacity-90"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* BOOK A CALL */}
        <section id="book" className="section-divider">
          <div className="mx-auto max-w-5xl px-6 py-[140px]">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="section-heading font-serif text-[36px] font-bold leading-[1.15] text-[#F2F2F2] md:text-[52px]">
                Or Book A Call With Us
              </h2>
              <p className="mx-auto mt-6 max-w-[480px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                Prefer to talk? Schedule a 30-minute call to discuss your project in detail.
              </p>
            </div>

            <div className="mt-20 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111111] p-8 md:p-10">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div>
                  <h3 className="text-[16px] font-medium text-[#F2F2F2]">What We'll Cover:</h3>
                  <ul className="mt-8 space-y-5">
                    {[
                      { icon: Video, label: "Your project requirements & goals" },
                      { icon: Clock, label: "Timeline and delivery estimates" },
                      { icon: Wrench, label: "Technical approach & stack" },
                      { icon: Calendar, label: "Pricing & next steps" },
                    ].map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#080808]">
                          <Icon className="h-4 w-4 text-[#6B6B6B]" />
                        </div>
                        <span className="text-[14px] text-[#F2F2F2]">{label}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex items-center gap-2 text-[13px] text-[#6B6B6B]">
                    <Clock className="h-3.5 w-3.5" />
                    30 minutes · Free consultation
                  </div>
                </div>

                <div className="flex flex-col md:items-start">
                  <div className="text-[13px] text-[#6B6B6B]">Available for calls:</div>
                  <div className="mt-3 font-serif text-[24px] font-bold text-[#F2F2F2]">Monday – Saturday</div>
                  <div className="mt-2 text-[14px] text-[#6B6B6B]">9:00 AM – 9:00 PM PKT</div>

                  <a
                    href="https://calendly.com/dexadoors/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-3 text-[14px] text-white transition-opacity hover:opacity-90"
                  >
                    Schedule A Call Now <CalendarDays className="h-4 w-4" />
                  </a>
                  <p className="mt-3 text-[13px] text-[#6B6B6B]">
                    You'll be redirected to Calendly to pick a convenient time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="mx-auto max-w-5xl px-6 py-[80px]">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <div className="text-[13px] tracking-[0.1em] text-white">DEXA DOORS</div>
                <div className="mt-2 text-[13px] text-[#6B6B6B]">We build what your business deserves.</div>
              </div>
              <div className="flex items-center gap-8">
                <a href="#services" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-white">Services</a>
                <a href="#work" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-white">Work</a>
                <a href="#contact" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-white">Contact</a>
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
