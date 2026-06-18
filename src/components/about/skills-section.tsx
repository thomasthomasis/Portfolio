"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/components/ui/motion";
import { skills, type Skill } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories: { key: Skill["category"]; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools & DevOps" },
  { key: "API styles", label: "API Styles" },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/70">{skill.name}</span>
        <span className="text-xs text-white/30">{skill.level}%</span>
      </div>
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-white/60 to-white/30 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
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
            Expertise
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {categories.map(({ key, label }) => {
            const categorySkills = skills.filter((s) => s.category === key);
            return (
              <motion.div key={key} variants={fadeUp}>
                <h3 className="text-xs font-medium text-white/30 uppercase tracking-widest mb-4">
                  {label}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} delay={i * 0.05} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
