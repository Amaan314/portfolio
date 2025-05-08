"use client";

import type { RefObject } from 'react';
import { useState, useEffect } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  options?: ScrollAnimationOptions
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.1, triggerOnce = true } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      // If the element is not yet available, or if running on server, don't set up observer
      // For server components or initial server render, isVisible will remain false.
      // On the client, once the ref is populated, the observer will be set up.
      return;
    }

    // Ensure IntersectionObserver is available (client-side only)
    if (typeof IntersectionObserver === 'undefined') {
        // Fallback for environments without IntersectionObserver (e.g., older browsers, or during SSR if not careful)
        // Or, if we want elements to be visible by default if IO is not supported:
        // setIsVisible(true); 
        return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else {
          if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, triggerOnce]);

  return isVisible;
}
