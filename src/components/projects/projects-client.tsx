"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";
import { type Project } from "@/lib/data";

type Category = "all" | Project["category"];

const filters: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "ai", label: "AI" },
  { value: "open-source", label: "Open Source" },
];

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter bar */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {filters.map(({ value, label }) => (
          <button
            key={value}
            role="tab"
            aria-selected={active === value}
            onClick={() => setActive(value)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all duration-200 border",
              active === value
                ? "bg-white text-black border-white font-medium"
                : "bg-transparent text-white/50 border-white/10 hover:text-white/80 hover:border-white/20"
            )}
          >
            {label}
            <span
              className={cn(
                "ml-1.5 text-xs",
                active === value ? "text-black/50" : "text-white/20"
              )}
            >
              {value === "all"
                ? projects.length
                : projects.filter((p) => p.category === value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Bento grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const isFirst = i === 0 && filtered.length > 1;
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className={cn("h-full", isFirst && "lg:col-span-2")}
              >
                <ProjectCard
                  project={project}
                  size={isFirst ? "large" : "default"}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-white/30 py-16">No projects found.</p>
      )}
    </>
  );
}
