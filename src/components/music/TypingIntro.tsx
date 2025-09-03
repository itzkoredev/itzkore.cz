"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  lines: string[];
  speedMs?: number; // per character
  gapMs?: number; // between lines
  className?: string;
};

export default function TypingIntro({ lines, speedMs = 35, gapMs = 600, className = "" }: Props) {
  // Stabilize shallowly by cloning; depend directly on lines to satisfy ESLint
  const content = useMemo(() => (Array.isArray(lines) ? lines.slice() : []), [lines]);

  // Keep explicit completed lines and the single active line being typed
  const [completed, setCompleted] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);
  const runIdRef = useRef(0);

  useEffect(() => {
    // reset when content changes (deep-equal), not on every new array identity
    setCompleted([]);
    setCurrent("");
    setDone(false);
    runIdRef.current += 1; // invalidate previous runs (StrictMode-safe)
    const runId = runIdRef.current;
    let line = 0;
    let col = 0;

    function step() {
      if (runIdRef.current !== runId) return; // aborted
      if (!Array.isArray(content) || content.length === 0) {
        setDone(true);
        return;
      }
      if (line >= content.length) {
        setDone(true);
        return;
      }
      const target = content[line] ?? "";
      const nextCol = Math.min(col + 1, target.length);
      setCurrent(target.slice(0, nextCol));
      col = nextCol;
      if (col < target.length) {
        timerRef.current = window.setTimeout(step, speedMs);
      } else {
        // current line finished
        setCompleted((prev) => {
          if (prev.length > 0 && prev[prev.length - 1] === target) return prev;
          return [...prev, target];
        });
        setCurrent("");
        line++;
        col = 0;
        if (line < content.length) {
          timerRef.current = window.setTimeout(() => {
            if (runIdRef.current !== runId) return;
            step();
          }, gapMs);
        } else {
          setDone(true);
        }
      }
    }
  // Kick off typing — ensure the first line exists only when we start typing it
  timerRef.current = window.setTimeout(step, speedMs);
    return () => {
      runIdRef.current += 1; // cancel
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [content, speedMs, gapMs]);

  const combined = [...completed, current].filter(Boolean).join("\n");
  return (
    <div className={["font-mono leading-relaxed text-[15px] md:text-base text-cyan-100/95", className].join(" ")}
         aria-live="polite">
      <div className="whitespace-pre-wrap">
        {combined}
        {!done && <span className="typing-cursor" aria-hidden>█</span>}
      </div>
    </div>
  );
}
