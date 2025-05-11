"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ScrollAreaPrimitive } from '@radix-ui/react-scroll-area'; // Import type for ref
import { ChatMessage } from './ChatMessage';
import type { Message } from './Chatbot';
import { cn } from '@/lib/utils';

interface ChatbotPanelProps {
  isOpen: boolean;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatbotPanel({ isOpen, messages, onSendMessage, isLoading }: ChatbotPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollArea>>(null); // Ref for the ScrollArea component
  const scrollViewportRef = useRef<HTMLDivElement | null>(null); // Ref for the viewport div

  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      // Attempt to get the viewport ref shortly after the panel opens and scrollAreaRef is available
      const timer = setTimeout(() => {
        if (scrollAreaRef.current) { // Double check ref is still current
          const viewport = scrollAreaRef.current.querySelector<HTMLDivElement>('div[data-radix-scroll-area-viewport]');
          if (viewport) {
            scrollViewportRef.current = viewport;
            // Initial scroll to bottom when panel opens with existing messages
            viewport.scrollTop = viewport.scrollHeight;
          }
        }
      }, 50); // A small delay to allow Radix internals to render
      return () => clearTimeout(timer);
    } else if (!isOpen) {
      // Clear viewport ref when panel is closed
      scrollViewportRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollViewportRef.current && isOpen) {
      // Scroll to bottom when new messages arrive or loading state changes, only if panel is open
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div
      className={cn(
        "fixed z-40 flex flex-col space-y-2",
        // Mobile positioning: above the toggle
        "bottom-[calc(theme(spacing.6)_+_theme(spacing.14)_+_theme(spacing.2))] left-6", 
        "w-[calc(100%_-_theme(spacing.12))]", // width for mobile (100% - 2 * 1.5rem margins)
        // Desktop (sm+) positioning: to the right of the toggle
        "sm:bottom-6 sm:left-[calc(theme(spacing.6)_+_theme(spacing.14)_+_theme(spacing.2))]",
        "sm:w-auto sm:min-w-[320px] sm:max-w-sm md:min-w-[350px]", // Desktop widths
        "max-h-[calc(100dvh-12rem)]", // Max height with clearance for top/bottom elements
        "transition-all duration-300 ease-out",
        isOpen
          ? "opacity-100 translate-y-0 sm:translate-x-0 pointer-events-auto"
          : "opacity-0 translate-y-4 sm:translate-y-0 sm:-translate-x-4 pointer-events-none" 
      )}
      aria-hidden={!isOpen}
    >
      <ScrollArea
        ref={scrollAreaRef} // Assign ref to the ScrollArea component
        className="flex-grow min-h-0 chatbot-message-scroll-area" 
      >
        <div className="p-4 flex flex-col space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} sender={msg.sender} />
          ))}
          {isLoading && (
            <div className="flex justify-start w-full"> 
              <div className="bg-card text-card-foreground border border-border p-2 rounded-lg inline-block shadow">
                <span className="italic text-muted-foreground">Typing...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="p-3 bg-card/80 backdrop-blur-md shadow-xl rounded-lg border border-border"
        aria-label="Chat input form"
      >
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-background/70 focus:ring-primary rounded-md shadow-inner"
            disabled={isLoading}
            aria-label="Chat input"
            aria-hidden={!isOpen} 
            tabIndex={isOpen ? 0 : -1} 
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
            className="rounded-md shadow-md"
            aria-hidden={!isOpen}
            tabIndex={isOpen ? 0 : -1}
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
