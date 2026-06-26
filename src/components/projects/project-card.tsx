"use client";

import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Project } from "@/lib/data";

const categoryColors: Record<string, "blue" | "violet" | "green" | "default"> = {
  ai: "violet",
  web: "blue",
  mobile: "green",
  "open-source": "default",
};

const categoryGradients: Record<string, string> = {
  ai: "from-violet-500/20 via-violet-600/10 to-transparent",
  web: "from-blue-500/20 via-blue-600/10 to-transparent",
  mobile: "from-green-500/20 via-green-600/10 to-transparent",
  "open-source": "from-white/10 via-white/5 to-transparent",
};

interface ProjectCardProps {
  project: Project;
  size?: "default" | "large";
}

export function ProjectCard({ project, size = "default" }: ProjectCardProps) {
  const isLarge = size === "large";
  const gradient = categoryGradients[project.category] ?? "from-white/10 to-transparent";
  const primaryUrl = project.realUrl ?? project.githubUrl;

  const thumbnail = (
    <div
      className={cn(
        "relative overflow-hidden bg-white/[0.03] shrink-0",
        isLarge ? "h-44 lg:h-auto lg:w-2/5" : "h-36"
      )}
    >
      {project.thumbnailUrl ? (
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)}>
          <span className="absolute bottom-3 right-4 text-8xl font-bold text-white/[0.05] leading-none select-none">
            {project.title.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <article
      className={cn(
        "group relative glass glass-hover rounded-2xl overflow-hidden flex h-full",
        isLarge ? "flex-col lg:flex-row" : "flex-col"
      )}
    >
      {/* Stretched link — covers the whole card, sits below footer links */}
      {primaryUrl && (
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="absolute inset-0 z-0"
        />
      )}

      {thumbnail}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={categoryColors[project.category] ?? "default"}>
              {project.category}
            </Badge>
            {project.featured && <Badge variant="outline">Featured</Badge>}
          </div>
          <span className="text-xs text-white/20 shrink-0">{project.year}</span>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gradient-blue transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/[0.04] text-xs text-white/40 border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <Github size={13} />
              Source
            </a>
          )}
          {project.realUrl && (
            <a
              href={project.realUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors ml-auto"
            >
              <ExternalLink size={13} />
              Visit
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
