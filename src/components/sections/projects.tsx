"use client"

import Image from "next/image"
import Link from "next/link"
import { projectsData, type Project, type ProjectCategory } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription as ShadcnCardDescription } from "@/components/ui/card" 
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react" 
import { useRef, useState } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, 
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"


export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.05, triggerOnce: true }); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsByCategory = projectsData.reduce((acc, project) => {
    const category = project.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<ProjectCategory | "Other", Project[]>);

  const categoryOrder: (ProjectCategory | "Other")[] = ["Web Development", "Machine Learning", "Artificial Intelligence", "Web Scraping", "Other"];


  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={cn("py-16 md:py-24 bg-background/80 backdrop-blur-sm",
                   "scroll-animate scroll-animate-fade-in", isVisible ? "scroll-animate-active" : "")}
    >
      <div className="container mx-auto max-w-7xl px-4"> 
        <h2 
          className={cn("mb-12 text-center text-3xl font-bold md:text-4xl scroll-animate scroll-animate-slide-up", isVisible ? "scroll-animate-active" : "")}
          style={{transitionDelay: '0.1s'}}
        >
          Featured Projects
        </h2>
        
        {categoryOrder.map((category) => {
          const projects = projectsByCategory[category];
          if (!projects || projects.length === 0) return null;

          return (
            <div key={category} className="mb-16">
              <h3 
                className={cn("mb-8 text-2xl font-semibold md:text-3xl text-primary scroll-animate scroll-animate-slide-up", isVisible ? "scroll-animate-active" : "")}
                style={{transitionDelay: '0.2s'}} 
              >
                {category}
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project: Project, index: number) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    delay={0.3 + index * 0.1} 
                    onViewDetails={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>
          );
        })}

      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

interface ProjectCardProps {
  project: Project;
  delay: number;
  onViewDetails: () => void;
}

function ProjectCard({ project, delay, onViewDetails }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardVisible = useScrollAnimation(cardRef, { threshold: 0.1, triggerOnce: true }); 

  return (
    <Card 
      ref={cardRef}
      className={cn("flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer scroll-animate scroll-animate-zoom-in", isCardVisible ? "scroll-animate-active" : "")}
      style={{transitionDelay: `${delay}s`}}
      onClick={onViewDetails} 
    >
      <div className="relative h-48 w-full"> 
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          data-ai-hint={project.imageHint}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
        />
      </div>
      <CardHeader className="p-4"> 
        <CardTitle className="text-lg text-primary">{project.title}</CardTitle> 
        <ShadcnCardDescription className="text-xs text-muted-foreground h-16 overflow-hidden"> 
          {project.description}
        </ShadcnCardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0"> 
        <h4 className="mb-2 text-xs font-semibold">Tech Stack:</h4> 
        <div className="flex flex-wrap gap-1"> 
          {project.techStack.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs px-1.5 py-0.5"> 
              {tech}
            </Badge>
          ))}
           {project.techStack.length > 5 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">...</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t p-3"> 
        <Button variant="default" size="sm" onClick={(e) => { e.stopPropagation(); onViewDetails();}} className="text-xs"> 
          View Details
        </Button>
        <div className="flex gap-1"> 
          {project.liveUrl && (
            <Button variant="outline" size="icon" asChild className="h-7 w-7">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" onClick={(e) => e.stopPropagation()}>
                <ExternalLink className="h-3.5 w-3.5" /> 
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="icon" asChild className="h-7 w-7">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View Code" onClick={(e) => e.stopPropagation()}>
                <Github className="h-3.5 w-3.5" /> 
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Dialog open={!!project} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 md:aspect-[27/22] max-h-[90vh] md:max-h-auto overflow-hidden shadow-2xl">
        <div className="md:grid md:grid-cols-3 h-full">
          <div className="hidden md:block md:col-span-1 h-full relative bg-muted md:rounded-l-lg">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover md:rounded-l-lg"
              data-ai-hint={project.imageHint}
              sizes="md:33vw"
            />
          </div>
          {/* Content Panel: takes full height of its grid cell, flex column layout, scrollable via ScrollArea */}
          <div className="col-span-3 md:col-span-2 flex flex-col h-full bg-card rounded-lg md:rounded-none md:rounded-r-lg max-h-[90vh] md:max-h-none">
            <ScrollArea className="h-full w-full">
              {/* Inner div for padding and to ensure flex column works for footer positioning */}
              <div className="p-6 flex flex-col min-h-full"> 
                <DialogHeader className="mb-4 shrink-0">
                  <DialogTitle className="text-3xl font-bold text-primary">{project.title}</DialogTitle>
                </DialogHeader>
                
                {/* Description wrapper: flex-grow pushes tech stack & footer down if content is short */}
                <div className="flex-grow my-4">
                  <DialogDescription asChild>
                     <p className="text-sm text-muted-foreground whitespace-pre-line">
                       {project.detailedDescription}
                     </p>
                  </DialogDescription>
                </div>
                
                {/* Tech Stack: part of scrollable content */}
                <div className="mt-4 shrink-0">
                  <h4 className="mb-2 text-sm font-semibold text-foreground">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Footer: at the end of scrollable content */}
                <DialogFooter className="mt-6 pt-6 border-t border-border/50 shrink-0">
                  <div className="flex flex-wrap justify-end gap-3 w-full"> 
                    {project.liveUrl && (
                      <Button variant="outline" asChild className="shadow-sm hover:scale-105 transition-transform">
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" asChild className="shadow-sm hover:scale-105 transition-transform">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> View Code
                        </Link>
                      </Button>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                       <p className="text-sm text-muted-foreground italic">No external links available for this project.</p>
                    )}
                     <DialogClose asChild>
                        <Button variant="ghost" className="hover:scale-105 transition-transform">Close</Button>
                      </DialogClose>
                  </div>
                </DialogFooter>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
