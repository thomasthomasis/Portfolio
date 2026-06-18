import type { Metadata } from "next";
import { ProjectsClient } from "@/components/projects/projects-client";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've built — web apps, mobile experiences, AI tools, and open-source work.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-6xl section-padding">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
            My work
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Projects
          </h1>
          <p className="text-base text-white/40 max-w-lg leading-relaxed">
            A curated selection of things I've built — from production web apps
            and mobile experiences to AI tools and open-source libraries.
          </p>
        </div>

        <ProjectsClient projects={projects} />
      </div>
    </div>
  );
}
