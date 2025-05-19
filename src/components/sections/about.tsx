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
                  I&apos;m Amaan Poonawala, and over the past two years, I’ve built a solid foundation in software development, data science, and AI through a hands-on, structured, and project-driven approach.
                </p>
                <p className="mb-4 text-muted-foreground">
                  <strong>Full-Stack Foundations:</strong> I began with full-stack web development (HTML, CSS, JavaScript, React, Node.js, MongoDB) to understand how real-world systems are built and deployed.
                </p>
                <p className="mb-4 text-muted-foreground">
                  <strong>Deep Dive into JavaScript & Python:</strong> I strengthened my JavaScript skills (closures, async programming, OOP) and then transitioned to Python, focusing on core programming concepts and data structures.
                </p>
                <p className="mb-4 text-muted-foreground">
                  <strong>Data Science Specialization:</strong> I explored web scraping (Selenium, Scrapy), data analysis (Pandas, NumPy, Seaborn), and SQL (MySQL, joins, subqueries) while building tools like a YouTube analytics app and IMDb data explorer.
                </p>
                <p className="mb-4 text-muted-foreground">
                  <strong>Machine & Deep Learning:</strong> I studied ML algorithms (regression, clustering, decision trees), built models for fraud detection and audiobook prediction, and gained hands-on experience with neural networks using TensorFlow and PyTorch.
                </p>
                <p className="mb-4 text-muted-foreground">
                  <strong>Advanced AI & NLP:</strong> I delved into Transformers and LLMs through research and experimentation. I built a sentiment analysis model fine-tuned on 1M+ YouTube comments and integrated it into a recommendation system.
                </p>
                <p className="text-muted-foreground">
                  <strong>AI Application Development:</strong> Most recently, I’ve worked with LangChain and LlamaIndex to develop full-stack AI products like an IELTS essay evaluator, leveraging advanced RAG pipelines and prompt engineering. This journey has helped me combine system-level thinking with deep learning and NLP expertise — enabling me to build impactful AI-powered applications from scratch.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
