'use client';

import { useEffect, useRef } from 'react';

interface AudioSpectrumProps {
  opacity?: number;
  barCount?: number;
  color?: string;
}

/**
 * Animované audio spektrum pro Music sekci
 * Minimalistické pruhy představující audio frekvence
 */
export default function AudioSpectrum({
  opacity = 0.05,
  barCount = 40,
  color = '16, 185, 129' // emerald RGB
}: AudioSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simulované audio frekvence
    const bars: { height: number; target: number; velocity: number }[] = [];
    for (let i = 0; i < barCount; i++) {
      bars.push({
        height: Math.random() * 0.3,
        target: Math.random() * 0.8,
        velocity: 0,
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / barCount;
      const maxHeight = canvas.height * 0.6;

      bars.forEach((bar, i) => {
        // Spring physics pro smooth pohyb
        const diff = bar.target - bar.height;
        bar.velocity += diff * 0.02;
        bar.velocity *= 0.85; // damping
        bar.height += bar.velocity;

        // Random změna target
        if (Math.random() > 0.98) {
          bar.target = Math.random() * 0.8 + 0.2;
        }

        const x = i * barWidth;
        const height = bar.height * maxHeight;
        const y = canvas.height - height;

        // Gradient bar
        const gradient = ctx.createLinearGradient(x, y, x, canvas.height);
        gradient.addColorStop(0, `rgba(${color}, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${color}, ${opacity})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, height);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [opacity, barCount, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
