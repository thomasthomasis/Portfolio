import type { Metadata } from "next";
import { SkillsSection } from "@/components/about/skills-section";
import { TimelineSection } from "@/components/about/timeline-section";
import { about } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Thomas Sloane — software engineer, background, skills, and experience.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-6xl section-padding">
        {/* Bio */}
        <div className="mb-20">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
            About me
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-8">
            Crafting digital<br />
            <span className="text-white/30">experiences.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/me.webp"
                alt="Thomas Sloane"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bio text */}
            <div className="space-y-5 text-white/60 leading-relaxed">
              {about.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              <div className="grid grid-cols-2 gap-4 pt-4">
                {about.facts.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs text-white/25 uppercase tracking-widest mb-0.5">
                      {label}
                    </dt>
                    <dd className="text-sm text-white/70">{value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <SkillsSection />
        </div>

        {/* Timeline */}
        <TimelineSection />
      </div>
    </div>
  );
}
