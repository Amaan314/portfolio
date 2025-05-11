
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
}

const parseMarkdown = (markdown: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  let keyIndex = 0;

  // Split by code blocks first
  const parts = markdown.split(/(```[\s\S]*?```)/g);

  parts.forEach((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const codeContent = part.substring(3, part.length - 3).trim();
      // Attempt to detect language (simple check for a word before newline)
      const langMatch = codeContent.match(/^(\w+)\n/);
      const language = langMatch ? langMatch[1] : '';
      const actualCode = langMatch ? codeContent.substring(langMatch[0].length) : codeContent;
      
      elements.push(
        <pre key={`code-${keyIndex++}`} className="bg-muted p-2 rounded-md text-sm overflow-x-auto my-2">
          {language && <div className="text-xs text-muted-foreground mb-1">{language}</div>}
          <code>{actualCode}</code>
        </pre>
      );
    } else {
      // Process non-code parts
      const lines = part.split('\n\n'); // Split by paragraphs
      lines.forEach((line, lineIndex) => {
        if (line.trim() === '') return;

        const inlineElements: React.ReactNode[] = [];
        // Regex for bold, italic, inline code
        const inlineRegex = /(\*\*[\s\S]+?\*\*|\*[\s\S]+?\*|_[\s\S]+?_|`[\s\S]+?`)/g;
        let lastIndex = 0;
        let match;

        while ((match = inlineRegex.exec(line)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            inlineElements.push(line.substring(lastIndex, match.index));
          }
          // Add the formatted element
          const matchedText = match[0];
          if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
            inlineElements.push(<strong key={`strong-${keyIndex++}`}>{matchedText.substring(2, matchedText.length - 2)}</strong>);
          } else if ((matchedText.startsWith('*') && matchedText.endsWith('*')) || (matchedText.startsWith('_') && matchedText.endsWith('_'))) {
            inlineElements.push(<em key={`em-${keyIndex++}`}>{matchedText.substring(1, matchedText.length - 1)}</em>);
          } else if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
            inlineElements.push(<code key={`code-inline-${keyIndex++}`} className="bg-muted px-1 py-0.5 rounded text-sm">{matchedText.substring(1, matchedText.length - 1)}</code>);
          }
          lastIndex = inlineRegex.lastIndex;
        }
        // Add any remaining text after the last match
        if (lastIndex < line.length) {
          inlineElements.push(line.substring(lastIndex));
        }
        
        // Wrap lines (potentially multiple if separated by single \n) in a p, then join single newlines with <br />
        const paragraphContent = inlineElements.reduce<React.ReactNode[]>((acc, el, i) => {
          if (typeof el === 'string') {
            const subLines = el.split('\n').map((subLine, subIdx) => (
              <React.Fragment key={`subline-${keyIndex++}-${subIdx}`}>
                {subLine}
                {subIdx < el.split('\n').length - 1 && <br />}
              </React.Fragment>
            ));
            return acc.concat(subLines);
          }
          return acc.concat(el);
        }, []);


        elements.push(<p key={`p-${keyIndex++}-${lineIndex}`} className="my-1">{paragraphContent}</p>);
      });
    }
  });

  return elements;
};


export function ChatMessage({ message, sender }: ChatMessageProps) {
  const isUser = sender === 'user';
  const parsedContent = parseMarkdown(message);

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] p-3 rounded-lg shadow",
          isUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground border border-border"
        )}
      >
        {parsedContent}
      </div>
    </div>
  );
}
