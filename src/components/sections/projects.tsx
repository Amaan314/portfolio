
"use client"

import Image from "next/image"
import Link from "next/link"
import { projectsData, type Project } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription as ShadcnCardDescription } from "@/components/ui/card" // Renamed CardDescription to avoid conflict
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, X } from "lucide-react"
import { useRef, useState } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // This is Radix DialogDescription
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"


export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.1, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={cn("py-16 md:py-24 bg-background/80 backdrop-blur-sm",
                   "scroll-animate scroll-animate-fade-in", isVisible ? "scroll-animate-active" : "")}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 
          className={cn("mb-12 text-center text-3xl font-bold md:text-4xl scroll-animate scroll-animate-slide-up", isVisible ? "scroll-animate-active" : "")}
          style={{transitionDelay: '0.1s'}}
        >
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectsData.map((project: Project, index: number) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              delay={0.3 + index * 0.15}
              onViewDetails={() => setSelectedProject(project)}
            />
          ))}
        </div>
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
  const isCardVisible = useScrollAnimation(cardRef, { threshold: 0.2, triggerOnce: true });

  return (
    <Card 
      ref={cardRef}
      className={cn("flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-animate scroll-animate-zoom-in", isCardVisible ? "scroll-animate-active" : "")}
      style={{transitionDelay: `${delay}s`}}
    >
      <div className="relative h-56 w-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          data-ai-hint={project.imageHint}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
        <ShadcnCardDescription className="text-sm text-muted-foreground h-20 overflow-hidden">{project.description}</ShadcnCardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="mb-2 text-sm font-semibold">Tech Stack:</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <Button variant="default" size="sm" onClick={onViewDetails}>
          View Details
        </Button>
        <div className="flex gap-2">
          {project.liveUrl && (
            <Button variant="outline" size="icon" asChild className="h-8 w-8">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="icon" asChild className="h-8 w-8">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View Code">
                <Github className="h-4 w-4" />
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
      <DialogContent className="max-w-4xl w-full p-0 aspect-[27/22] max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-1 h-full relative bg-muted">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover rounded-l-lg"
              data-ai-hint={project.imageHint}
              sizes="33vw"
            />
          </div>
          <div className="col-span-2 p-6 flex flex-col h-full overflow-hidden bg-card">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-3xl font-bold text-primary">{project.title}</DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="flex-grow my-2 pr-3">
              <DialogDescription asChild>
                 <p className="text-sm text-muted-foreground whitespace-pre-line">
                   {project.detailedDescription}
                 </p>
              </DialogDescription>
            </ScrollArea>
            
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-semibold text-foreground">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-auto pt-6 border-t border-border/50">
              <div className="flex justify-end gap-3 w-full">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
