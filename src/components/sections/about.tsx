"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { cn } from "@/lib/utils"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2, triggerOnce: true });

  const imageRef = useRef<HTMLDivElement>(null);
  const isImageVisible = useScrollAnimation(imageRef, { threshold: 0.3, triggerOnce: true });
  
  const textRef = useRef<HTMLDivElement>(null);
  const isTextVisible = useScrollAnimation(textRef, { threshold: 0.3, triggerOnce: true });

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className={cn("py-16 md:py-24 bg-background/80 backdrop-blur-sm", // Added backdrop-blur for subtle effect over plasma
                   "scroll-animate scroll-animate-fade-in", isVisible ? "scroll-animate-active" : "")}
    >
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className={cn("mb-12 text-center text-3xl font-bold md:text-4xl scroll-animate scroll-animate-slide-up", isVisible ? "scroll-animate-active" : "")} style={{transitionDelay: '0.1s'}}>
          About Me
        </h2>
        <Card className={cn("overflow-hidden shadow-xl scroll-animate scroll-animate-zoom-in", isVisible ? "scroll-animate-active" : "")} style={{transitionDelay: '0.3s'}}>
          <CardContent className="p-0 md:p-0">
            <div className="md:grid md:grid-cols-3 md:gap-0 items-stretch">
              <div 
                ref={imageRef} 
                className={cn("md:col-span-1 relative h-64 md:h-auto scroll-animate scroll-animate-slide-in-left", isImageVisible ? "scroll-animate-active" : "")}
                style={{transitionDelay: '0.5s'}}
              >
                <Image
                  src="https://picsum.photos/seed/profile/400/600"
                  alt="Your Name - Profile Picture"
                  fill
                  className="object-cover"
                  data-ai-hint="profile portrait"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
              <div 
                ref={textRef} 
                className={cn("md:col-span-2 p-6 md:p-10 flex flex-col justify-center scroll-animate scroll-animate-slide-in-right", isTextVisible ? "scroll-animate-active" : "")}
                style={{transitionDelay: '0.5s'}}
              >
                <h3 className="mb-4 text-2xl font-semibold text-primary">
                  A Bit About My Journey
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Hello! I&apos;m [Your Name], a dedicated and results-oriented software developer with a passion for crafting elegant and efficient solutions. My journey into the world of technology began with a fascination for how software can transform ideas into reality.
                </p>
                <p className="mb-4 text-muted-foreground">
                  Over the years, I&apos;ve honed my skills in full-stack development, with a particular focus on modern JavaScript frameworks like React and Next.js. I enjoy tackling complex problems and continuously learning new technologies to stay at the forefront of innovation.
                </p>
                <p className="text-muted-foreground">
                  My goal is to contribute to meaningful projects that make a positive impact. I&apos;m always open to new challenges and collaborations. When I&apos;m not coding, I enjoy [Your Hobby 1], [Your Hobby 2], and exploring new [Your Interest].
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
