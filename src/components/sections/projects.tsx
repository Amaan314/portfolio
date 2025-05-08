import Image from "next/image"
import Link from "next/link"
import { projectsData, type Project } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectsData.map((project: Project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                <CardDescription className="text-sm text-muted-foreground h-20 overflow-hidden">{project.description}</CardDescription>
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
              <CardFooter className="flex justify-end gap-2 border-t pt-4">
                {project.liveUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
