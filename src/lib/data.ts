export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "web" | "mobile" | "ai" | "open-source";
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "API styles";
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education";
}

export const projects: Project[] = [
  {
    id: "deckify",
    title: "Deckify",
    description: "AI integrated web app for creating and sharing flashcard decks. Powered by Next.js, TypeScript, and OpenAI's API for content generation.",
    longDescription: "AI integrated web app for creating and sharing flashcard decks, inspired by Spotify.",
    category: "web",
    tags: ["Next.js", "TypeScript", "Supabase", "OpenAI"],
    githubUrl: "https://github.com/thomasthomasis/Deckify",
    featured: true,
    year: 2026,
  },
  {
    id: "type-master",
    title: "Typer Master",
    description: "Real-time multiplayer web game.",
    longDescription: "A multiplayer battle royale web game built with React on the client and a real-time game server powered by Nakama (Go). Designed with robust DevOps infrastructure for scalability and reliability.",
    category: "web",
    tags: ["React", "Nakama", "Go", "Node.js"],
    githubUrl: "https://github.com/thomasthomasis/TypeMaster",
    featured: true,
    year: 2025,
  },
  {
    id: "IAIYH",
    title: "It's All in Your Head",
    description: "Singleplayer platformer game where you play as Brian Nomed. A man who has to make the decision between living with grief, or becoming the hero.",
    longDescription: "Singleplayer platformer game where you play as Brian Nomed. A man who has to make the decision between living with grief, or becoming the hero.",
    category: "web",
    tags: ["C#", "Unity"],
    githubUrl: "https://www.delimitstudios.com/IAIYH",
    featured: true,
    year: 2022,
  }
];

export const skills: Skill[] = [
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Angular", category: "frontend" },
  { name: "React Native", category: "frontend" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "Python", category: "backend" },
  { name: "Django", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "AWS", category: "tools" },
  { name: "Kubernetes", category: "tools" },
  { name: "REST", category: "API styles" },
  { name: "WebSockets", category: "API styles" },
];

export const timeline: TimelineItem[] = [
  {
    year: "2024–2026",
    title: "Systems Software Engineer",
    company: "MBRYONICS",
    description: "Developed a full stack web application using Django and React to let users remotely control optical ground stations. Built C++ and C device drivers using the INDI Astronomy protocol, created internal tooling in Python and SQL for project funding tracking, and mentored two software engineering interns.",
    type: "work",
  },
  {
    year: "2022–2023",
    title: "Co-Founder & Lead Programmer",
    company: "Delimit Studios",
    description: "Co-founded an indie game studio and led development of \"It's All in Your Head\" — a Unity game written in C#. Managed a cross-functional team of up to 5 programmers, 2 artists, and an audio engineer.",
    type: "work",
  },
  {
    year: "2022",
    title: "Software Engineering Intern",
    company: "Joulica",
    description: "Built an Angular web application exposing Joulica's in-house analytics APIs. Maintained Kubernetes Ingress configuration and worked across the stack with AWS, Java, and TypeScript.",
    type: "work",
  },
  {
    year: "2021",
    title: "Software Engineering Intern",
    company: "Ericsson",
    description: "Performed manual UI testing for features developed by the engineering team and maintained internal user-base systems used across multiple teams.",
    type: "work",
  },
  {
    year: "2023",
    title: "B.Sc. Computer Science",
    company: "University of Galway",
    description: "Graduated with a Bachelor of Computer Science. Final year project: a neural network trained on MIDI data to generate musical sequences, with a browser-based playback interface.",
    type: "education",
  },
];

export const about = {
  bio: [
    "Hey, I'm Thomas — a software engineer based in Toronto with a background spanning full stack web applications, mobile development, and game development.",
    "Most recently I built full stack web applications for optical terminal management at MBRYONICS in Galway. Before that I co-founded an indie game studio and completed internships at Joulica and Ericsson. I graduated with a B.Sc. in Computer Science from the University of Galway in 2023.",
    "Outside of work I'm building side projects — currently Deckify (a Spotify inspired flashcard app) and Type Master (a battle royale typing game). I'm always looking for interesting problems to solve.",
  ],
  facts: [
    { label: "Location", value: "Toronto, ON" },
    { label: "Availability", value: "Open to offers" },
    { label: "Education", value: "University of Galway" },
  ],
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/thomasthomasis", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/thomas-sloane-115ab4172/", icon: "linkedin" },
  { name: "Email", url: "mailto:thomas.i.sloane@gmail.com", icon: "mail" },
];
