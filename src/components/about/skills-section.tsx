"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/components/ui/motion";
import { skills, type Skill } from "@/lib/data";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiHtml5,
  SiCss,
  SiPython,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";
import { Globe, Zap, Cloud } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type AnyIcon = IconType | LucideIcon;

const iconMap: Record<string, AnyIcon> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Angular: SiAngular,
  "React Native": SiReact,
  HTML5: SiHtml5,
  CSS3: SiCss,
  Python: SiPython,
  Django: SiDjango,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  AWS: Cloud,
  Kubernetes: SiKubernetes,
  REST: Globe,
  WebSockets: Zap,
};

const colorMap: Record<string, string> = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "Next.js": "rgba(255,255,255,0.8)",
  Angular: "#DD0031",
  "React Native": "#61DAFB",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  Python: "#3776AB",
  Django: "#44B78B",
  "Node.js": "#339933",
  Express: "rgba(255,255,255,0.8)",
  PostgreSQL: "#4169E1",
  Git: "#F05032",
  GitHub: "rgba(255,255,255,0.8)",
  Docker: "#2496ED",
  AWS: "#FF9900",
  Kubernetes: "#326CE5",
  REST: "rgba(255,255,255,0.6)",
  WebSockets: "rgba(255,255,255,0.6)",
};

const categories: { key: Skill["category"]; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools & DevOps" },
  { key: "API styles", label: "API Styles" },
];

function SkillChip({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.name];
  const color = colorMap[skill.name] ?? "rgba(255,255,255,0.6)";

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-colors min-w-[72px]">
      {Icon && <Icon size={26} style={{ color }} />}
      <span className="text-[11px] text-white/50 whitespace-nowrap">{skill.name}</span>
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
        className="space-y-8"
      >
        <motion.div variants={fadeUp}>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-2">
            Expertise
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Skills
          </h2>
        </motion.div>

        {categories.map(({ key, label }) => {
          const categorySkills = skills.filter((s) => s.category === key);
          return (
            <motion.div key={key} variants={fadeUp} className="space-y-3">
              <h3 className="text-xs font-medium text-white/30 uppercase tracking-widest">
                {label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
