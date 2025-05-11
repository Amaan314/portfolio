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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

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
        "max-h-[calc(100vh-10rem)]", // Max height
        "flex flex-col z-40 space-y-2", // Vertical stack for message area and input
        "transition-all duration-300 ease-out",
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none" // Slide up and fade
      )}
    >
      {/* Messages Area */}
      <ScrollArea
        className="flex-grow max-h-[50vh] bg-card/80 backdrop-blur-md shadow-xl rounded-lg border border-border"
        ref={scrollAreaRef}
      >
        <div className="p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} sender={msg.sender} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-2 rounded-lg inline-block">
                <span className="italic text-muted-foreground">Typing...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Form */}
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
