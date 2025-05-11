
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const scrollViewportRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (scrollViewportRef.current) {
      // Scroll to bottom when messages change or loading state changes
      // This ensures the latest message or typing indicator is visible
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]); // Added isOpen to ensure scroll on open

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        // Query for the specific viewport div of the ScrollArea
        const viewport = document.querySelector('.chatbot-message-scroll-area > div[data-radix-scroll-area-viewport]');
        if (viewport) {
          scrollViewportRef.current = viewport as HTMLDivElement;
          // Initial scroll to bottom when panel opens and viewport is found
          if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
          }
        }
      }, 100); // Small delay to ensure DOM is updated
      return () => clearTimeout(timer);
    }
  }, [isOpen]);


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
        "fixed left-6 bottom-[calc(1.5rem+3.5rem+0.5rem)]", // Positioned above the toggle button
        "w-[calc(100%-3rem)] sm:w-auto sm:min-w-[320px] sm:max-w-sm md:min-w-[350px]", // Responsive width
        "max-h-[calc(100vh-10rem)]", // Max height to not overlap navbar too much
        "flex flex-col z-40 space-y-2", // Flex column layout
        "transition-all duration-300 ease-out",
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none" // Animation for open/close
      )}
    >
      {/* Message display area */}
      <ScrollArea
        className="flex-grow chatbot-message-scroll-area" // flex-grow allows it to take available space, removed max-h-[50vh]
      >
        {/* Inner div for padding and flex-col-reverse */}
        <div className="p-4 flex flex-col-reverse space-y-4">
          {/* 
            With flex-col-reverse, the DOM order of elements is reversed for display.
            To have the typing indicator appear at the *visual bottom*, it must be the *last* item
            in this block in terms of DOM order if not reversed, or the *first* if reversed.
            So, messages are mapped first (oldest to newest in DOM), then the typing indicator.
            flex-col-reverse will display:
            - Typing indicator (visual bottom)
            - Newest message
            - ...
            - Oldest message (visual top)
          */}
          
          {/* Typing indicator: Rendered after all messages in DOM order. */}
          {/* Due to flex-col-reverse, this will appear at the visual bottom if isLoading is true. */}
          {isLoading && (
            <div className="flex justify-start w-full"> {/* Bot messages are typically aligned left */}
              <div className="bg-card text-card-foreground border border-border p-2 rounded-lg inline-block shadow">
                <span className="italic text-muted-foreground">Typing...</span>
              </div>
            </div>
          )}

          {/* Messages: Mapped in natural order (oldest to newest). */}
          {/* Due to flex-col-reverse, newest messages will appear visually lower (closer to bottom). */}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} sender={msg.sender} />
          ))}
        </div>
      </ScrollArea>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-card/80 backdrop-blur-md shadow-xl rounded-lg border border-border"
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
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
            className="rounded-md shadow-md"
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}

