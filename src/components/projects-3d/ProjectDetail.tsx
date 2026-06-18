"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Link2, ExternalLink } from "lucide-react";
import { useProjectStore } from "./store";
import { projects } from "@/lib/data";
import { ORB_COLORS } from "./constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectDetail() {
  const mode       = useProjectStore((s) => s.mode);
  const selectedId = useProjectStore((s) => s.selectedId);
  const back       = useProjectStore((s) => s.back);

  const project = projects.find((p) => p.id === selectedId) ?? null;
  const color   = selectedId ? (ORB_COLORS[selectedId] ?? "#ffffff") : "#ffffff";

  // Panel is visible from the moment an orb is selected so the user sees
  // it slide in while the camera is still animating.
  const visible = (mode === "focused" || mode === "detail") && project !== null;

  return (
    <AnimatePresence>
      {visible && project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 48 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.25, // short delay so camera starts moving first
          }}
          className="absolute right-0 top-0 bottom-0 flex items-center pr-4 sm:pr-6 pointer-events-none"
          style={{ zIndex: 20 }}
        >
          <div
            className="glass rounded-2xl p-6 w-72 sm:w-80 space-y-5 pointer-events-auto"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {/* Back ─────────────────────────────────────────────────────── */}
            <button
              onClick={back}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              <ArrowLeft size={12} />
              Back to projects
            </button>

            {/* Colour dot + title ────────────────────────────────────────── */}
            <div className="flex items-start gap-3">
              <span
                className="mt-1 w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}88` }}
              />
              <div>
                <h2 className="text-lg font-semibold text-white leading-snug">
                  {project.title}
                </h2>
                <span className="text-xs text-white/35">{project.year}</span>
              </div>
            </div>

            {/* Description ──────────────────────────────────────────────── */}
            <p className="text-sm text-white/55 leading-relaxed">
              {project.longDescription}
            </p>

            {/* Tech tags ────────────────────────────────────────────────── */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Links ────────────────────────────────────────────────────── */}
            <div className="flex gap-2.5 pt-1 border-t border-white/[0.06]">
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Link2 size={13} />
                    Visit
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild size="sm" className="flex-1">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={13} />
                    Live
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
