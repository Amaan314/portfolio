
"use client";

import React from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatbotToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatbotToggle({ isOpen, onToggle }: ChatbotToggleProps) {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn(
        "fixed h-14 w-14 rounded-full shadow-lg z-50 transition-all duration-300 ease-in-out transform hover:scale-110",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        // Conditional positioning:
        // When open on mobile, move to bottom-left, half-visible.
        // On sm+ screens, or when closed, use default position.
        isOpen
          ? "bottom-[-1.75rem] left-[-1.75rem] sm:bottom-6 sm:left-6" 
          : "bottom-6 left-6"
      )}
      onClick={onToggle}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
      <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
    </Button>
  );
}

