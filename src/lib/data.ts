import type { LucideIcon } from "lucide-react";
import { Code, Cpu, Database, Users, Brain, Paintbrush, Palette, GitBranch, Server, Smartphone, Cloud, Component } from "lucide-react";

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: "Frontend" | "Backend" | "DevOps" | "Design" | "Soft Skills" | "Other";
}

export const skillsData: Skill[] = [
  { name: "HTML5", icon: Code, category: "Frontend" },
  { name: "CSS3", icon: Palette, category: "Frontend" },
  { name: "JavaScript", icon: Code, category: "Frontend" },
  { name: "TypeScript", icon: Code, category: "Frontend" },
  { name: "React", icon: Component, category: "Frontend" },
  { name: "Next.js", icon: Component, category: "Frontend" },
  { name: "Tailwind CSS", icon: Paintbrush, category: "Frontend" },
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "Express.js", icon: Server, category: "Backend" },
  { name: "Python", icon: Code, category: "Backend" },
  { name: "SQL", icon: Database, category: "Backend" },
  { name: "MongoDB", icon: Database, category: "Backend" },
  { name: "Git", icon: GitBranch, category: "DevOps" },
  { name: "Docker", icon: Cloud, category: "DevOps" },
  { name: "Figma", icon: Paintbrush, category: "Design" },
  { name: "Problem Solving", icon: Brain, category: "Soft Skills" },
  { name: "Communication", icon: Users, category: "Soft Skills" },
  { name: "Teamwork", icon: Users, category: "Soft Skills" },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product listings, cart functionality, and user authentication. Built with a modern MERN stack.",
    imageUrl: "https://picsum.photos/seed/project1/600/400",
    imageHint: "e-commerce website",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "A collaborative task management application to help teams organize and track their work effectively. Features include drag-and-drop interface and real-time updates.",
    imageUrl: "https://picsum.photos/seed/project2/600/400",
    imageHint: "task manager app",
    techStack: ["Next.js", "TypeScript", "Firebase", "Shadcn UI"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "project-3",
    title: "Personal Blog",
    description: "A statically generated personal blog built with Next.js and Markdown for content. Optimized for SEO and performance.",
    imageUrl: "https://picsum.photos/seed/project3/600/400",
    imageHint: "blog website",
    techStack: ["Next.js", "Markdown", "Tailwind CSS", "Vercel"],
    githubUrl: "#",
  },
  {
    id: "project-4",
    title: "Weather Dashboard",
    description: "A sleek weather dashboard that provides real-time weather information for any city. Uses a third-party weather API.",
    imageUrl: "https://picsum.photos/seed/project4/600/400",
    imageHint: "weather app ui",
    techStack: ["React", "API Integration", "Chart.js", "CSS Modules"],
    liveUrl: "#",
  },
];
