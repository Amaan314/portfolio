"use client";

import * as React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"; // Import buttonVariants
import { cn } from "@/lib/utils";
// Button component is not used for these icons if we style Link directly

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    // This ensures new Date() is only called on the client after hydration
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="bg-muted/50 text-muted-foreground py-8">
      <div className="container mx-auto max-w-screen-2xl px-4 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link
            href="mailto:your.email@example.com"
            aria-label="Email"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:scale-110 transition-transform" 
            )}
          >
            <Mail className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:scale-110 transition-transform"
            )}
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:scale-110 transition-transform"
            )}
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Portfolio Pro. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}