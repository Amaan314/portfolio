"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"
import { useRef } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // For hero, we want it to animate immediately or with a slight delay, not on scroll usually
  // But to keep consistency with other sections, we can use it.
  // Alternatively, for Hero, you might want animations that trigger on load.
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.05, triggerOnce: true });


  return (
    <section
      id="hero"
      ref={sectionRef}
      className={cn(
        "relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background/80 via-secondary/20 to-background/80 text-center animated-gradient",
         // Ensure this section itself is animated if desired, or just its children
      )}
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-5 dark:opacity-3"></div> {/* Further reduced opacity */}
      <div className={cn("container relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-16 md:py-24 scroll-animate", isVisible ? "scroll-animate-active" : "")}>
        <div className={cn("mb-4 flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary scroll-animate scroll-animate-fade-in", isVisible ? "scroll-animate-active" : "")} style={{ transitionDelay: '0.2s' }}>
          <Sparkles className="mr-2 h-4 w-4" />
          Welcome to My Portfolio
        </div>
        <h1 className={cn("text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl scroll-animate scroll-animate-slide-up", isVisible ? "scroll-animate-active" : "")} style={{ transitionDelay: '0.4s' }}>
          Hi, I&apos;m <span className="text-primary">Amaan Poonawala</span>
        </h1>
        <p className={cn("mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl scroll-animate scroll-animate-slide-up", isVisible ? "scroll-animate-active" : "")} style={{ transitionDelay: '0.6s' }}>
          AI Developer | Data Science
        </p>
        <div className={cn("mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6 scroll-animate scroll-animate-fade-in", isVisible ? "scroll-animate-active" : "")} style={{ transitionDelay: '0.8s' }}>
          <Button size="lg" asChild className="shadow-lg transition-transform hover:scale-105">
            <Link href="#projects">
              View My Work
              <ArrowDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="shadow-lg transition-transform hover:scale-105">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
      <style jsx>{`
        .bg-dot-pattern {
          background-image: radial-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px); /* Reduced opacity */
          background-size: 16px 16px;
        }
        .dark .bg-dot-pattern {
          background-image: radial-gradient(hsl(var(--foreground) / 0.025) 1px, transparent 1px); /* Further reduced for dark */
        }
      `}</style>
    </section>
  )
}
