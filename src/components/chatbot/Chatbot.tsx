"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatbotToggle } from './ChatbotToggle';
import { ChatbotPanel } from './ChatbotPanel';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const CHATBOT_API_URL = "https://amaanp314-portfolio-chatbot-api.hf.space/chat";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Generate a unique session ID when the component mounts
    setSessionId(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    // Initial bot message
    setMessages([
      { id: 'initial-bot-message', text: "Hello! I'm a chatbot assistant. How can I help you with information about this portfolio?", sender: 'bot' }
    ]);
  }, []);

  const toggleChatbot = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      sender: 'user',
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(CHATBOT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputText, session_id: sessionId }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: data.response || "Sorry, I couldn't process that.",
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      toast({
        title: "Chatbot Error",
        description: "Could not connect to the chatbot service.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatbotToggle isOpen={isOpen} onToggle={toggleChatbot} />
      <ChatbotPanel
        isOpen={isOpen}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </>
  );
}
