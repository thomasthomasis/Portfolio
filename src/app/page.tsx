import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { SkillsSection } from "@/components/about/skills-section";
import { TimelineSection } from "@/components/about/timeline-section";
import { ProjectsSceneLazy as ProjectsScene } from "@/components/projects-3d/lazy";
import { ContactForm } from "@/components/contact/contact-form";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import PorfolioChat from "@/components/chat/PortfolioChat";

export const metadata: Metadata = {
  title: "Thomas Sloane",
  description:
    "Software engineer specialising in full stack web apps, mobile development, and systems programming.",
};

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/thomasthomasis",
    href: "https://github.com/thomasthomasis",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/thomas-sloane-115ab4172",
    href: "https://www.linkedin.com/in/thomas-sloane-115ab4172/",
  },
  {
    icon: Mail,
    label: "Email",
    value: "thomas.i.sloane@gmail.com",
    href: "mailto:thomas.i.sloane@gmail.com",
  },
];

export default function HomePage() {
  return (
    <>
      <div>

        {/* 1 · HERO ──────────────────────────────────────────────────────── */}
        <Hero />

        {/* 2 · ABOUT ─────────────────────────────────────────────────────── */}
        <section
          id="about"
          data-section="about"
          className="mx-auto max-w-6xl section-padding py-28"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
            About me
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-12">
            Crafting digital<br />
            <span className="text-white/30">experiences.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/me.webp"
                alt="Thomas Sloane"
                className="w-full h-auto block"
              />
            </div>

            {/* Bio */}
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

              <dl className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Location", value: "Toronto, ON" },
                  { label: "Availability", value: "Open to offers" },
                  { label: "Education", value: "University of Galway" },
                  
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs text-white/25 uppercase tracking-widest mb-0.5">{label}</dt>
                    <dd className="text-sm text-white/70">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-6xl section-padding">
          <div className="border-t border-white/[0.06]" />
        </div>

        {/* 3 · SKILLS ────────────────────────────────────────────────────── */}
        <section
          id="skills"
          data-section="skills"
          className="mx-auto max-w-6xl section-padding py-28"
        >
          <SkillsSection />
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-6xl section-padding">
          <div className="border-t border-white/[0.06]" />
        </div>

        {/* 4 · EXPERIENCE ─────────────────────────────────────────────────── */}
        <section
          id="experience"
          data-section="experience"
          className="mx-auto max-w-6xl section-padding py-28"
        >
          <TimelineSection />
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-6xl section-padding">
          <div className="border-t border-white/[0.06]" />
        </div>

        {/* 5 · PROJECTS ───────────────────────────────────────────────────── */}
        <section
          id="projects"
          data-section="projects"
          className="mx-auto max-w-6xl section-padding py-28"
        >
          <div className="mb-10">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
              My work
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
              Projects
            </h2>
            <p className="text-base text-white/40 max-w-lg leading-relaxed">
              A curated selection of things I&apos;ve built. Click on the orbs to open them up.
            </p>
          </div>
          <ProjectsScene />
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-6xl section-padding">
          <div className="border-t border-white/[0.06]" />
        </div>

        {/* 6 · CONTACT ────────────────────────────────────────────────────── */}
        <section
          id="contact"
          data-section="contact"
          className="mx-auto max-w-6xl section-padding py-28"
        >
          <div className="mb-14">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
              Say hello
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-base text-white/40 max-w-lg leading-relaxed">
              Have a project in mind, an opportunity to share, or just want to
              connect? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            <aside className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-widest mb-5">
                  Find me on
                </h3>
                <ul className="space-y-4" role="list">
                  {socialLinks.map(({ icon: Icon, label, value, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 group"
                      >
                        <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:text-white/70 group-hover:bg-white/10 transition-colors duration-200 shrink-0">
                          <Icon size={15} />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs text-white/25 mb-0.5">{label}</div>
                          <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors truncate">
                            {value}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-6 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/40 shrink-0">
                  <MapPin size={15} />
                </div>
                <div>
                  <div className="text-xs text-white/25 mb-0.5">Based in</div>
                  <div className="text-sm text-white/60">Toronto, ON</div>
                </div>
              </div>

              <p className="text-xs text-white/25 leading-relaxed px-1">
                I typically respond within 24 hours on weekdays.
              </p>
            </aside>
          </div>
        </section>

      </div>

      <PorfolioChat />
    </>
  );
}
