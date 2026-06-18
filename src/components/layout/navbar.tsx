"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#hero",       label: "Home" },
  { href: "#about",      label: "About" },
  { href: "#skills",     label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects" },
  { href: "#contact",    label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId]     = useState("hero");

  // Scroll-based background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) setActiveId(id);
          }
        });
      },
      { threshold: 0.45 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto max-w-6xl section-padding flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="text-white font-semibold tracking-tight text-lg hover:opacity-80 transition-opacity"
        >
          TS
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ href, label }) => {
            const id = href.replace("#", "");
            const active = activeId === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    "relative px-4 py-2 text-sm rounded-full transition-colors duration-200",
                    active ? "text-white" : "text-white/50 hover:text-white/80"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            Get in touch →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <ul
              className="flex flex-col section-padding py-4 gap-1"
              role="list"
            >
              {navLinks.map(({ href, label }) => {
                const id = href.replace("#", "");
                const active = activeId === id;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm transition-colors duration-200",
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
