import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Thomas Sloane. Open to new projects, collaborations, and opportunities.",
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

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-6xl section-padding">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
            Say hello
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Let&apos;s work together
          </h1>
          <p className="text-base text-white/40 max-w-lg leading-relaxed">
            Have a project in mind, an opportunity to share, or just want to
            connect? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form — wider column */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-8">
            {/* Contact details */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-sm font-medium text-white/50 uppercase tracking-widest mb-5">
                Find me on
              </h2>
              <ul className="space-y-4" role="list">
                {socialLinks.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
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

            {/* Location */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/40 shrink-0">
                <MapPin size={15} />
              </div>
              <div>
                <div className="text-xs text-white/25 mb-0.5">Based in</div>
                <div className="text-sm text-white/60">Toronto, ON</div>
              </div>
            </div>

            {/* Response time note */}
            <p className="text-xs text-white/25 leading-relaxed px-1">
              I typically respond within 24 hours on weekdays. For urgent
              matters, email is the fastest way to reach me.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
