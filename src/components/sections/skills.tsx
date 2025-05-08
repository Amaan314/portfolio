"use client"

import { skillsData, type Skill } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRef } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { cn } from "@/lib/utils"

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.1, triggerOnce: true });
  
  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={cn("py-16 md:py-24 bg-secondary/50 backdrop-blur-sm", // Added backdrop-blur
                   "scroll-animate scroll-animate-fade-in", isVisible ? "scroll-animate-active" : "")}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 
          className={cn("mb-12 text-center text-3xl font-bold md:text-4xl scroll-animate scroll-animate-slide-up", isVisible ? "scroll-animate-active" : "")} 
          style={{transitionDelay: '0.1s'}}
        >
          My Skillset
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <SkillCard 
              key={category} 
              category={category} 
              skills={skillsData.filter((skill) => skill.category === category)}
              delay={0.3 + index * 0.15} // Stagger animation
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface SkillCardProps {
  category: string;
  skills: Skill[];
  delay: number;
}

function SkillCard({ category, skills, delay }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardVisible = useScrollAnimation(cardRef, { threshold: 0.2, triggerOnce: true });

  return (
    <Card 
      ref={cardRef}
      className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-animate scroll-animate-zoom-in", isCardVisible ? "scroll-animate-active" : "")}
      style={{transitionDelay: `${delay}s`}}
    >
      <CardHeader>
        <CardTitle className="text-xl text-primary">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill: Skill) => (
            <Badge
              key={skill.name}
              variant="secondary"
              className="flex items-center gap-2 p-2 text-sm transition-transform hover:scale-105 cursor-default"
            >
              <skill.icon className="h-4 w-4 text-primary" />
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
