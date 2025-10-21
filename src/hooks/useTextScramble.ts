'use client';

import { useEffect, useRef, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

export function useTextScramble(text: string, trigger: boolean = true) {
  const [displayText, setDisplayText] = useState(text);
  const rafId = useRef<number>();
  const frameCount = useRef(0);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const maxIterations = text.length;

    const scramble = () => {
      setDisplayText((current) => {
        return text
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });

      frameCount.current++;

      if (frameCount.current % 3 === 0) {
        iterations += 1 / 3;
      }

      if (iterations < maxIterations) {
        rafId.current = requestAnimationFrame(scramble);
      } else {
        setDisplayText(text);
      }
    };

    rafId.current = requestAnimationFrame(scramble);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [text, trigger]);

  return displayText;
}
