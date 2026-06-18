# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Turbopack, http://localhost:3000)
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint
npx tsc --noEmit   # Type-check without emitting
```

## Architecture

**Next.js 15 App Router** with TypeScript, Tailwind CSS, shadcn/ui primitives, and Framer Motion.

All routes are statically generated (`○` in build output). No API routes currently — the contact form simulates submission client-side and would need a route or third-party service (Resend, Formspree) to actually send email.

```
src/
  app/                     # Next.js App Router pages (server components by default)
    layout.tsx             # Root layout: Geist fonts, Navbar, Footer, metadata
    page.tsx               # Home
    about/page.tsx
    projects/page.tsx
    contact/page.tsx
    globals.css            # Tailwind base + CSS custom properties (dark theme vars)
  components/
    layout/                # Navbar (client — scroll state, active link pill), Footer
    home/                  # Hero, AnimatedBackground (canvas particle system), FeaturedProjects
    projects/              # ProjectCard, ProjectsClient (client — category filter state)
    about/                 # SkillsSection (animated bars), TimelineSection
    contact/               # ContactForm (client — form state machine)
    ui/                    # Primitive components: Button, Badge, Input, Textarea, Label, motion.tsx
  lib/
    utils.ts               # cn() helper (clsx + tailwind-merge)
    data.ts                # All portfolio content: projects, skills, timeline, social links
```

## Key patterns

**Server vs. client components:** Pages are server components. Interactive pieces (filter, form, animations) are extracted into `*-client.tsx` or dedicated client components with `"use client"`. Never import `framer-motion` or browser APIs directly in a server component file.

**Portfolio content** lives entirely in `src/lib/data.ts`. To update projects, skills, bio details, or social links, edit that file — nothing else needs to change.

**Styling conventions:**
- Custom utility classes are in `globals.css` (`.glass`, `.text-gradient`, `.section-padding`, etc.)
- Tailwind CSS variables map to shadcn/ui tokens via `hsl(var(--...))` in `tailwind.config.ts`
- Dark mode is forced via `<html class="dark">` — no toggle is implemented

**Animations:** `src/components/ui/motion.tsx` exports `fadeUp`, `fadeIn`, and `staggerContainer` variants for consistent Framer Motion usage across the site.
