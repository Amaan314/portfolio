"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background text-center animated-gradient"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-10 dark:opacity-5"></div>
      <div className="container relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-16 md:py-24">
        <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Sparkles className="mr-2 h-4 w-4" />
          Welcome to My Digital Space
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I&apos;m <span className="text-primary">Your Name</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
          A passionate developer creating intuitive and dynamic web experiences. Explore my work and let&apos;s build something amazing together.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
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
          background-image: radial-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .dark .bg-dot-pattern {
          background-image: radial-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px);
        }
      `}</style>
    </section>
  )
}
