
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50); // Small delay to ensure DOM updates are complete
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading, isOpen]); // Rerun when messages, isLoading or isOpen changes

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
        "fixed z-40 flex flex-col space-y-2 overflow-hidden",
        // Mobile positioning: bottom-6 (1.5rem), left-6 (1.5rem)
        "bottom-6 left-6", 
        "w-[calc(100%_-_theme(spacing.12))]", // Mobile width: 100% - 3rem (1.5rem padding on each side)
        // Desktop/sm+ positioning:
        "sm:bottom-6 sm:left-[calc(theme(spacing.6)_+_theme(spacing.14)_+_theme(spacing.2))]", // sm:bottom-6 (1.5rem), sm:left-[5.5rem]
        "sm:w-auto sm:min-w-[320px] sm:max-w-sm md:min-w-[350px]", // Desktop width
        "h-[calc(100dvh-5rem)]", // Consistent height
        "transition-all duration-300 ease-out",
        isOpen
          ? "opacity-100 translate-y-0 sm:translate-x-0 pointer-events-auto" // Open state: fully visible, at final position
          : "opacity-0 translate-y-4 sm:translate-y-0 sm:-translate-x-4 pointer-events-none" // Closed state: invisible, slightly translated
      )}
      aria-hidden={!isOpen}
    >
      <ScrollArea
        className="h-full flex-grow min-h-0 chatbot-message-scroll-area" 
      >
        <div className="p-4 flex flex-col space-y-4 h-full justify-end"> {/* Ensures messages stack from bottom */}
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
          <div ref={messagesEndRef} /> {/* Anchor for scrolling to bottom */}
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
