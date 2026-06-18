import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/thomasthomasis", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/thomas-sloane-115ab4172/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:thomas.i.sloane@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-32">
      <div className="mx-auto max-w-6xl section-padding py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-semibold text-white tracking-tight">
              Thomas Sloane
            </span>
            <span className="text-xs text-white/30">
              Fullstack Software Engineer
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-white/30 hover:text-white/70 transition-colors duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Thomas Sloane
          </p>
        </div>
      </div>
    </footer>
  );
}
