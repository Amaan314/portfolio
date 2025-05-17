
"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
}

export function ChatMessage({ message, sender }: ChatMessageProps) {
  const isUser = sender === 'user';

  // By removing the custom 'components' prop from ReactMarkdown,
  // we allow Tailwind Prose (applied on the parent div for bot messages)
  // to style the Markdown elements like code, links, lists, etc.
  // This often leads to more consistent and correct rendering.
  const markdownComponents: Components = {
    // Example: Customize link styling if needed, otherwise Prose handles it.
    // a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,

    // Prose will handle p, ul, ol, li, blockquote, table, th, td, pre, code
    // If specific overrides are still needed, they can be added here.
    // For instance, if code blocks need very specific styling not covered by Prose:
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match) {
        return (
          <div className="my-2 overflow-hidden rounded-md border bg-muted">
            <div className="bg-slate-700 px-3 py-1 text-xs text-slate-100">
              {match[1]}
            </div>
            <pre className="overflow-x-auto p-3 text-sm">
              <code {...props} className={className}>
                {children}
              </code>
            </pre>
          </div>
        );
      }
      return (
        <code {...props} className={cn("px-1 py-0.5 bg-muted rounded-sm text-sm", className)}>
          {children}
        </code>
      );
    },
  };


  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] p-3 rounded-lg shadow-md overflow-hidden break-words", // Added shadow-md and break-words
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border border-border prose dark:prose-invert prose-sm sm:prose-base max-w-none" // Added max-w-none for prose to take full available width
                                                                                                                        // and prose-sm sm:prose-base for responsive typography
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents} // Using refined components, mainly for code blocks
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
}
