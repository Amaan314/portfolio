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
  const scrollViewportRef = useRef<HTMLDivElement>(null); // Ref for the viewport div

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Effect to assign ref to the viewport element once ScrollArea is mounted
  useEffect(() => {
    if (isOpen) {
      // Attempt to find the viewport after a short delay, as ScrollArea might not be fully rendered
      const timer = setTimeout(() => {
        const viewport = document.querySelector('.chatbot-message-scroll-area div[data-radix-scroll-area-viewport]');
        if (viewport) {
          scrollViewportRef.current = viewport as HTMLDivElement;
          // Initial scroll to bottom when panel opens
          scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
        }
      }, 100); // Adjust delay if needed
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
        "fixed left-6 bottom-[calc(1.5rem+3.5rem+0.5rem)]", 
        "w-[calc(100%-3rem)] sm:w-auto sm:min-w-[320px] sm:max-w-sm md:min-w-[350px]", 
        "max-h-[calc(100vh-10rem)]", 
        "flex flex-col z-40 space-y-2", 
        "transition-all duration-300 ease-out",
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none" 
      )}
    >
      {/* Messages Area: No background, messages flow bottom-up, fades at top */}
      <ScrollArea
        className="flex-grow max-h-[50vh] chatbot-message-scroll-area" // Removed background, added specific class
      >
        {/* Inner container for messages with bottom-up flow */}
        <div className="p-4 flex flex-col-reverse space-y-4">
          {/* isLoading indicator is last in DOM, so it appears at the visual bottom (top of flex-reversed-column) */}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="bg-muted p-2 rounded-lg inline-block shadow">
                <span className="italic text-muted-foreground">Typing...</span>
              </div>
            </div>
          )}
          {/* Messages are mapped in natural order; flex-col-reverse handles visual order */}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} sender={msg.sender} />
          ))}
        </div>
      </ScrollArea>

      {/* Input Form: Retains its background for clarity */}
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
