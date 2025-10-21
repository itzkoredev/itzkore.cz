"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

export default function CinematicHero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Matrix rain columns
    const columns = 40;
    const rainElements: HTMLDivElement[] = [];

    for (let i = 0; i < columns; i++) {
      const column = document.createElement("div");
      column.className = "matrix-column";
      column.style.left = `${(i / columns) * 100}%`;
      column.style.animationDelay = `${Math.random() * 2}s`;
      column.style.animationDuration = `${2 + Math.random() * 3}s`;

      for (let j = 0; j < 20; j++) {
        const char = document.createElement("span");
        char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        char.style.opacity = String(Math.random() * 0.8 + 0.2);
        column.appendChild(char);
      }

      container.appendChild(column);
      rainElements.push(column);

      // Randomly update characters
      setInterval(() => {
        const chars = column.querySelectorAll("span");
        chars.forEach((char) => {
          if (Math.random() > 0.95) {
            char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        });
      }, 100);
    }

    // Title reveal animation
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial glitch flash
    if (glitchOverlayRef.current) {
      tl.to(glitchOverlayRef.current, {
        opacity: 1,
        duration: 0.05,
        repeat: 3,
        yoyo: true,
      });
    }

    // Title clip reveal
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          opacity: 0,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          onComplete: () => setIsRevealed(true),
        },
        "+=0.2"
      );

      // Glitch effect on reveal
      tl.to(
        titleRef.current,
        {
          x: -5,
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=0.3"
      );
    }

    return () => {
      rainElements.forEach((el) => el.remove());
    };
  }, []);

  const handleEnter = () => {
    // Fade out animation before navigation
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => router.push("/music/intro"),
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-background via-[#0D1117] to-background"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-secondary/15 blur-[120px]"
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none mix-blend-overlay noise-texture" />

      {/* Glitch overlay */}
      <div
        ref={glitchOverlayRef}
        className="absolute inset-0 bg-accent/10 pointer-events-none opacity-0 mix-blend-screen"
      />

      {/* Matrix rain container */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-50" />

      {/* Geometric grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Title with enhanced glitch */}
        <motion.div className="mb-16 relative">
          <motion.h1
            ref={titleRef}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-foreground font-mono glitch-text-enhanced relative"
            style={{
              textShadow:
                "0 0 30px var(--accent), 0 0 60px var(--accent), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            itzKORE
          </motion.h1>

          {/* Accent lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute -bottom-4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
          />
        </motion.div>

        {/* Subtitle */}
        {isRevealed && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground mb-12 font-mono tracking-wide text-center max-w-2xl"
          >
            <span className="text-accent">{">"}</span> Initializing immersive experience
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
          </motion.p>
        )}

        {/* Enter button with enhanced design */}
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "backOut" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px var(--accent), 0 0 80px var(--accent)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            className="relative px-16 py-5 text-xl font-bold tracking-widest uppercase overflow-hidden group"
          >
            {/* Background layers */}
            <div className="absolute inset-0 bg-surface-strong border-2 border-accent/30 backdrop-blur-xl transition-all group-hover:border-accent" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />

            <span className="relative z-10 text-foreground group-hover:text-accent transition-colors">
              Enter
            </span>
          </motion.button>
        )}

        {/* Status indicators */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-8 text-xs text-subtle-foreground font-mono"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-accent"
              />
              <span>SYSTEM READY</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-accent-secondary"
              />
              <span>AUDIO ONLINE</span>
            </div>
          </motion.div>
        )}

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10">
          <div className="scan-line" />
        </div>
      </div>
    </div>
  );
}
