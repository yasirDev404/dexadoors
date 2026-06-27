import deepsurfMd from "../../ourWorkContext/deepsurf.md?raw";
import evenlyoMd from "../../ourWorkContext/evenlyo.md?raw";
import hoppaverhuurMd from "../../ourWorkContext/hoppaVerhurr.md?raw";
import lichtlettersMd from "../../ourWorkContext/lichtletters.md?raw";
import zannysfoodMd from "../../ourWorkContext/zannysfood.md?raw";

import { parseWorkMd, type ParsedWorkContent, type WorkFeature, type WorkSnapshot } from "./parse-work-md";

export type WorkProjectMeta = {
  slug: string;
  name: string;
  tag: string;
  liveUrl: string;
  cardDesc: string;
};

export type WorkProject = WorkProjectMeta &
  ParsedWorkContent & {
    nextSlug: string | null;
    nextName: string | null;
  };

const PROJECT_REGISTRY: (WorkProjectMeta & { md: string })[] = [
  {
    slug: "deepsurf",
    name: "Deepsurf",
    tag: "Fintech · RUSS",
    liveUrl: "https://www.deepsurf.io",
    cardDesc:
      "AI-driven crypto analytics platform featuring Mavi, an intelligent chatbot that analyses live market data and guides users in real time.",
    md: deepsurfMd,
  },
  {
    slug: "lichtletters",
    name: "LichtLettersXXL",
    tag: "SaaS · Netherlands",
    liveUrl: "https://xxllichtletters.nl",
    cardDesc:
      "Multi-role CRM and booking platform with an embedded AI chatbot serving admin, vendor and customer roles.",
    md: lichtlettersMd,
  },
  {
    slug: "hoppaverhuur",
    name: "Hoppaverhuur",
    tag: "Marketplace · Netherlands",
    liveUrl: "https://www.hoppaverhuur.nl",
    cardDesc: "Full rental marketplace with inventory management, bookings and admin dashboard.",
    md: hoppaverhuurMd,
  },
  {
    slug: "zannysfood",
    name: "Zanny's Food",
    tag: "iOS Android Mobile and Web App · UK",
    liveUrl: "https://www.zannysfood.co.uk",
    cardDesc:
      "End-to-end food delivery ecosystem with iOS and Android apps for customers, vendors, drivers and admins.",
    md: zannysfoodMd,
  },
  {
    slug: "evenlyo",
    name: "Evenlyo",
    tag: "Marketplace · Netherlands",
    liveUrl: "https://www.evenlyo.nl",
    cardDesc:
      "Event services marketplace connecting clients with vendors for bookings, payments, and order tracking across the Netherlands.",
    md: evenlyoMd,
  },
];

function buildProject(meta: (typeof PROJECT_REGISTRY)[number], next: WorkProjectMeta | null): WorkProject {
  const parsed = parseWorkMd(meta.md, meta.tag);
  return {
    slug: meta.slug,
    name: meta.name,
    tag: meta.tag,
    liveUrl: meta.liveUrl,
    cardDesc: meta.cardDesc,
    ...parsed,
    nextSlug: next?.slug ?? null,
    nextName: next?.name ?? null,
  };
}

const HOMEPAGE_SLUGS = ["deepsurf", "lichtletters", "hoppaverhuur", "zannysfood"] as const;

export function getHomepageProjects(): WorkProjectMeta[] {
  return HOMEPAGE_SLUGS.map((slug) => {
    const meta = PROJECT_REGISTRY.find((p) => p.slug === slug);
    if (!meta) throw new Error(`Missing homepage project: ${slug}`);
    return {
      slug: meta.slug,
      name: meta.name,
      tag: meta.tag,
      liveUrl: meta.liveUrl,
      cardDesc: meta.cardDesc,
    };
  });
}

export function getAllProjectSlugs(): string[] {
  return PROJECT_REGISTRY.map((p) => p.slug);
}

export function getProjectBySlug(slug: string): WorkProject | null {
  const index = PROJECT_REGISTRY.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const homepageIndex = HOMEPAGE_SLUGS.indexOf(slug as (typeof HOMEPAGE_SLUGS)[number]);
  let next: WorkProjectMeta | null = null;

  if (homepageIndex !== -1) {
    const nextSlug = HOMEPAGE_SLUGS[(homepageIndex + 1) % HOMEPAGE_SLUGS.length];
    const nextMeta = PROJECT_REGISTRY.find((p) => p.slug === nextSlug);
    next = nextMeta
      ? { slug: nextMeta.slug, name: nextMeta.name, tag: nextMeta.tag, liveUrl: nextMeta.liveUrl, cardDesc: nextMeta.cardDesc }
      : null;
  } else {
    const nextMeta = PROJECT_REGISTRY.find((p) => p.slug === HOMEPAGE_SLUGS[0]);
    next = nextMeta
      ? { slug: nextMeta.slug, name: nextMeta.name, tag: nextMeta.tag, liveUrl: nextMeta.liveUrl, cardDesc: nextMeta.cardDesc }
      : null;
  }

  return buildProject(PROJECT_REGISTRY[index], next);
}

export type { WorkFeature, WorkSnapshot };
