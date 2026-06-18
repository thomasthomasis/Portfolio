"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/components/ui/motion";
import { projects } from "@/lib/data";

const featured = projects.filter((p) => p.featured);

const categoryColors: Record<string, "blue" | "violet" | "green" | "default"> = {
  ai: "violet",
  web: "blue",
  mobile: "green",
  "open-source": "default",
};

export function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-6xl section-padding py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2">
              Selected work
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Featured Projects
            </h2>
          </div>
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link href="/projects">
              All projects
              <ArrowRight size={14} />
            </Link>
          </Button>
        </motion.div>

        {/* Project cards */}
        <div className="grid gap-4">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              custom={i * 0.1}
              className="group relative glass glass-hover rounded-2xl p-6 sm:p-8 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Index */}
                <span className="text-4xl font-bold text-white/[0.04] select-none shrink-0 leading-none">
                  0{i + 1}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant={categoryColors[project.category] ?? "default"}>
                      {project.category}
                    </Badge>
                    <span className="text-xs text-white/20">{project.year}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white group-hover:text-gradient-blue transition-colors duration-300 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] text-xs text-white/40 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="p-2 text-white/30 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="p-2 text-white/30 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div variants={fadeUp} className="sm:hidden mt-6 text-center">
          <Button asChild variant="outline">
            <Link href="/projects">
              View all projects
              <ArrowRight size={14} />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
