"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "./animated-background";
import { fadeUp, staggerContainer } from "@/components/ui/motion";

export function Hero() {
  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl section-padding pt-32 pb-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >

          {/* Name */}
          <motion.div variants={fadeUp} custom={0.1} className="space-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gradient leading-none">
              Thomas Sloane
            </h1>
            <p className="text-xl sm:text-2xl text-white/40 font-light tracking-wide">
              Fullstack Software Engineer
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="max-w-xl text-base sm:text-lg text-white/50 leading-relaxed"
          >
            I build full stack applications, mobile experiences, and systems
            software. Currently based in Toronto — always looking for interesting
            problems to solve.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#projects">
                View my work
                <ArrowRight size={16} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">
                Get in touch
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="/TS_resume.pdf" download>
                <Download size={16} />
                Resume
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="flex items-center gap-8 pt-6 border-t border-white/[0.06] mt-4"
          >
            {[
              { value: "3+", label: "Years experience" },
              { value: "3+", label: "Projects shipped" },
              { value: "2", label: "Interns mentored" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-semibold text-white">{value}</div>
                <div className="text-xs text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-xs text-white/20 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
