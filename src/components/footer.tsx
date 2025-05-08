import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 text-muted-foreground py-8">
      <div className="container mx-auto max-w-screen-2xl px-4 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:your.email@example.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Portfolio Pro. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
