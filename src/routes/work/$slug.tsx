import { createFileRoute, notFound } from "@tanstack/react-router";

import { WorkProjectPage } from "@/components/work/work-project-page";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/work-projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.name} — Dexa Doors` },
      {
        name: "description",
        content: loaderData.tagline,
      },
      { property: "og:title", content: `${loaderData.name} — Dexa Doors` },
      {
        property: "og:description",
        content: loaderData.tagline,
      },
    ],
  }),
  component: WorkProjectRoute,
});

function WorkProjectRoute() {
  const project = Route.useLoaderData();
  return <WorkProjectPage project={project} />;
}

export function getWorkStaticPaths() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}
