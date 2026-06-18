"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { fadeUp, staggerContainer } from "@/components/ui/motion";
import { timeline } from "@/lib/data";
import { cn } from "@/lib/utils";

export function TimelineSection() {
  return (
    <section>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-10">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-2">
            Journey
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-white/[0.06]" aria-hidden="true" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.company}`}
                variants={fadeUp}
                custom={i * 0.1}
                className="relative pl-14"
              >
                {/* Icon */}
                <div
                  className={cn(
                    "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border",
                    item.type === "work"
                      ? "bg-white/5 border-white/10 text-white/60"
                      : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  )}
                >
                  {item.type === "work" ? (
                    <Briefcase size={14} />
                  ) : (
                    <GraduationCap size={14} />
                  )}
                </div>

                {/* Content */}
                <div className="glass rounded-xl p-5">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-white/30">
                      {item.year}
                    </span>
                    <span className="text-xs text-white/20">·</span>
                    <span className="text-xs text-white/40">{item.company}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
