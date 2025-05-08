"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Github, Linkedin, Mail, Send } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { cn } from "@/lib/utils"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactSection() {
  const { toast } = useToast()
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.1, triggerOnce: true });

  const formCardRef = useRef<HTMLDivElement>(null);
  const isFormCardVisible = useScrollAnimation(formCardRef, { threshold: 0.2, triggerOnce: true });

  const infoCardsRef = useRef<HTMLDivElement>(null);
  const areInfoCardsVisible = useScrollAnimation(infoCardsRef, { threshold: 0.2, triggerOnce: true });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted:", data)
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })
    form.reset()
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={cn("py-16 md:py-24 bg-secondary/50 backdrop-blur-sm", // Added backdrop-blur
                   "scroll-animate scroll-animate-fade-in", isVisible ? "scroll-animate-active" : "")}
    >
      <div className="container mx-auto max-w-4xl px-4">
        <h2 
          className={cn("mb-12 text-center text-3xl font-bold md:text-4xl scroll-animate scroll-animate-slide-up", isVisible ? "scroll-animate-active" : "")}
          style={{transitionDelay: '0.1s'}}
        >
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card 
              ref={formCardRef}
              className={cn("shadow-lg scroll-animate scroll-animate-slide-in-left", isFormCardVisible ? "scroll-animate-active" : "")}
              style={{transitionDelay: '0.3s'}}
            >
              <CardHeader>
                <CardTitle className="text-xl text-primary">Send me a message</CardTitle>
                <CardDescription>I&apos;d love to hear from you!</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your message..." rows={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full shadow-md hover:scale-105 transition-transform" disabled={form.formState.isSubmitting}>
                       {form.formState.isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /> </>}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
             <div 
               ref={infoCardsRef}
               className={cn("space-y-6 scroll-animate scroll-animate-slide-in-right", areInfoCardsVisible ? "scroll-animate-active" : "")}
               style={{transitionDelay: '0.3s'}}
             >
                <Card className="shadow-lg" style={{transitionDelay: '0.4s'}}>
                    <CardHeader>
                        <CardTitle className="text-xl text-primary">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <a href="mailto:your.email@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                                your.email@example.com
                            </a>
                        </div>
                         <p className="text-sm text-muted-foreground">
                            Feel free to reach out directly via email or connect with me on social media.
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg" style={{transitionDelay: '0.5s'}}>
                    <CardHeader>
                        <CardTitle className="text-xl text-primary">Connect With Me</CardTitle>
                    </CardHeader>
                    <CardContent className="flex space-x-4">
                        <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                            <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github className="h-5 w-5" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                            <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  )
}
