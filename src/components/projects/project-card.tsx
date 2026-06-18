"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@/lib/data";

const categoryColors: Record<string, "blue" | "violet" | "green" | "default"> = {
  ai: "violet",
  web: "blue",
  mobile: "green",
  "open-source": "default",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group relative glass glass-hover rounded-2xl p-6 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={categoryColors[project.category] ?? "default"}>
            {project.category}
          </Badge>
          {project.featured && (
            <Badge variant="outline">Featured</Badge>
          )}
        </div>
        <span className="text-xs text-white/20 shrink-0">{project.year}</span>
      </div>

      {/* Body */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gradient-blue transition-all duration-300 flex items-center gap-1.5">
          {project.title}
          <ArrowUpRight
            size={14}
            className="opacity-0 group-hover:opacity-60 transition-opacity -mt-0.5"
          />
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

      {/* Footer links */}
      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.06]">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <Github size={13} />
            Source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors ml-auto"
          >
            <ExternalLink size={13} />
            Live demo
          </a>
        )}
      </div>
    </motion.article>
  );
}
