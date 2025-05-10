
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
  detailedDescription: string; // Added detailed description
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
    detailedDescription: `This E-commerce Platform is a comprehensive solution for online retail. 
Key features include:
- User registration and authentication (JWT-based).
- Product catalog with filtering and search.
- Shopping cart and checkout process.
- Admin panel for managing products, orders, and users.
- Responsive design for seamless experience across devices.

The backend is built with Node.js and Express, utilizing MongoDB for data storage. The frontend is a React SPA, styled with Tailwind CSS for a modern look and feel. State management is handled using Context API and reducers.
    `,
    imageUrl: "https://picsum.photos/seed/project1/600/400",
    imageHint: "e-commerce website",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "A collaborative task management application to help teams organize and track their work effectively. Features include drag-and-drop interface and real-time updates.",
    detailedDescription: `The Task Management App is designed for team collaboration and productivity.
Core functionalities:
- Create, assign, and track tasks.
- Kanban-style board with drag-and-drop for task status updates.
- Real-time updates using Firebase Firestore.
- User authentication and role-based access.
- Due dates, priorities, and commenting on tasks.

Built with Next.js for server-side rendering and static site generation benefits. TypeScript ensures type safety throughout the application. Shadcn UI components provide a polished and accessible user interface. Firebase handles authentication and real-time database needs.
    `,
    imageUrl: "https://picsum.photos/seed/project2/600/400",
    imageHint: "task manager app",
    techStack: ["Next.js", "TypeScript", "Firebase", "Shadcn UI", "Drag-and-Drop"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "project-3",
    title: "Personal Blog",
    description: "A statically generated personal blog built with Next.js and Markdown for content. Optimized for SEO and performance.",
    detailedDescription: `This Personal Blog platform leverages the power of Next.js for optimal performance and SEO.
Features:
- Content is written in Markdown and processed at build time.
- Static site generation (SSG) for fast load times.
- SEO-friendly URLs and metadata.
- Syntax highlighting for code blocks.
- Pagination for blog posts.
- Light and Dark mode support.

The blog is easily deployable on platforms like Vercel or Netlify. Tailwind CSS is used for styling, allowing for rapid UI development and customization. It's a lightweight and efficient solution for content creators.
    `,
    imageUrl: "https://picsum.photos/seed/project3/600/400",
    imageHint: "blog website",
    techStack: ["Next.js", "Markdown", "Tailwind CSS", "Vercel", "SEO"],
    githubUrl: "#",
  },
  {
    id: "project-4",
    title: "Weather Dashboard",
    description: "A sleek weather dashboard that provides real-time weather information for any city. Uses a third-party weather API.",
    detailedDescription: `The Weather Dashboard offers users up-to-date weather forecasts.
Highlights include:
- Search functionality for any city worldwide.
- Current weather conditions (temperature, humidity, wind speed).
- Hourly and daily forecasts.
- Interactive charts for temperature trends (using Chart.js).
- Geolocation support to fetch local weather.

This application is built with React and fetches data from a public weather API (e.g., OpenWeatherMap). CSS Modules are used for scoped styling, ensuring maintainability. The design focuses on clarity and ease of use.
    `,
    imageUrl: "https://picsum.photos/seed/project4/600/400",
    imageHint: "weather app ui",
    techStack: ["React", "API Integration", "Chart.js", "CSS Modules", "Geolocation"],
    liveUrl: "#",
  },
];
