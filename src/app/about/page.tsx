import type { Metadata } from "next";
import { SkillsSection } from "@/components/about/skills-section";
import { TimelineSection } from "@/components/about/timeline-section";

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
            {/* Photo placeholder */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden glass flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-white/10">
                <svg
                  className="w-24 h-24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
                <span className="text-xs">Professional photo</span>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                Hey, I&apos;m Thomas — a software engineer based in Toronto with a
                background spanning full stack web applications, mobile development,
                and low-level systems programming.
              </p>
              <p>
                Most recently I built full stack tooling and C++ device drivers for
                optical ground stations at MBRYONICS in Galway. Before that I
                co-founded an indie game studio and completed internships at Joulica
                and Ericsson. I graduated with a B.Sc. in Computer Science from the
                University of Galway in 2023.
              </p>
              <p>
                Outside of work I&apos;m building side projects — currently Manhunt
                (a real-time multiplayer mobile game) and Typing 99 (a battle royale
                typing game). I&apos;m always looking for interesting problems to solve.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Location", value: "Toronto, ON" },
                  { label: "Availability", value: "Open to offers" },
                  { label: "Education", value: "University of Galway" },
                  { label: "Pronouns", value: "He / Him" },
                ].map(({ label, value }) => (
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
