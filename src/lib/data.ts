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
  level: number;
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
    id: "ulti-tracker",
    title: "Ulti Tracker",
    description: "Mobile app for sports clubs worldwide to track workouts and manage teams.",
    longDescription: "A React Native application built for sports clubs to coordinate training sessions, log workouts, and manage rosters. Features offline-first architecture with Realm for local storage and MongoDB for cloud synchronization.",
    category: "mobile",
    tags: ["React Native", "TypeScript", "MongoDB", "Realm"],
    githubUrl: "https://github.com/thomasthomasis",
    featured: true,
    year: 2024,
  },
  {
    id: "manhunt",
    title: "Manhunt",
    description: "Real-time multiplayer mobile game — a location-based hide and seek experience.",
    longDescription: "A multiplayer mobile game built with React Native on the client and a real-time game server powered by Colyseus (Node.js) and Nakama (Go). Designed with robust DevOps infrastructure for scalability and reliability.",
    category: "mobile",
    tags: ["React Native", "Colyseus", "Nakama", "Go", "Node.js"],
    githubUrl: "https://github.com/thomasthomasis",
    featured: true,
    year: 2025,
  },
  {
    id: "typing-99",
    title: "Typing 99",
    description: "Large-scale multiplayer battle royale typing game — Tetris 99 meets speed typing.",
    longDescription: "A full stack real-time web application where players compete in a battle royale format based on typing speed. Built with React.js and Node.js, with CI/CD pipelines and DevOps infrastructure for a robust, scalable architecture.",
    category: "web",
    tags: ["React.js", "Node.js", "WebSockets", "CI/CD"],
    githubUrl: "https://github.com/thomasthomasis",
    featured: true,
    year: 2025,
  },
  {
    id: "typemaker",
    title: "TypeMaker",
    description: "Full stack typing speed web app inspired by TypeRacer, MonkeyType, and TenFastFingers.",
    longDescription: "A competitive typing platform built with a Node.js/Express backend, MongoDB database, and EJS-rendered frontend. Users can race against others, track personal bests, and climb leaderboards.",
    category: "web",
    tags: ["Node.js", "Express.js", "MongoDB", "JavaScript"],
    githubUrl: "https://github.com/thomasthomasis",
    featured: false,
    year: 2023,
  },
  {
    id: "music-generator",
    title: "Neural Music Generator",
    description: "University final year project — a neural network that trains on MIDI data to generate musical note sequences.",
    longDescription: "A deep learning project using TensorFlow to train an LSTM model on MIDI data and generate novel musical sequences. Built a JavaScript frontend that lets users interactively trigger generation and hear output in the browser.",
    category: "ai",
    tags: ["Python", "TensorFlow", "JavaScript", "HTML/CSS"],
    githubUrl: "https://github.com/thomasthomasis",
    featured: false,
    year: 2023,
  },
];

export const skills: Skill[] = [
  { name: "JavaScript / TypeScript", level: 90, category: "frontend" },
  { name: "React / Next.js", level: 90, category: "frontend" },
  { name: "Angular", level: 65, category: "frontend" },
  { name: "React Native", level: 85, category: "frontend" },
  { name: "HTML / CSS", level: 92, category: "frontend" },
  { name: "Python / Django", level: 85, category: "backend" },
  { name: "TypeScript / JavaScript", level: 85, category: "backend" },
  { name: "Node.js / Express", level: 85, category: "backend" },
  { name: "SQL / Databases", level: 80, category: "backend" },
  { name: "Git / GitHub", level: 92, category: "tools" },
  { name: "Docker", level: 78, category: "tools" },
  { name: "AWS", level: 70, category: "tools" },
  { name: "Kubernetes", level: 65, category: "tools" },
  { name: "RESTful APIs", level: 90, category: "API styles" },
  { name: "WebSockets", level: 80, category: "API styles" },
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

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/thomasthomasis", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/thomas-sloane-115ab4172/", icon: "linkedin" },
  { name: "Email", url: "mailto:thomas.i.sloane@gmail.com", icon: "mail" },
];
