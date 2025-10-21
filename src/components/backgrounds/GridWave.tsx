'use client';

import { useEffect, useRef } from 'react';

interface GridWaveProps {
  opacity?: number;
  color?: string;
}

/**
 * Vlnící se síť/grid pro Apps sekci
 * Minimalistické linky tvořící 3D efekt
 */
export default function GridWave({
  opacity = 0.03,
  color = '139, 92, 246' // violet RGB
}: GridWaveProps) {
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

    const gridSize = 40;
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;

    let animationId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Horizontální linie
      for (let i = 0; i < rows; i++) {
        ctx.beginPath();
        for (let j = 0; j < cols; j++) {
          const x = j * gridSize;
          const y = i * gridSize;

          // Vlna
          const wave = Math.sin(time + j * 0.1 + i * 0.05) * 10;

          if (j === 0) {
            ctx.moveTo(x, y + wave);
          } else {
            ctx.lineTo(x, y + wave);
          }
        }

        const alpha = opacity * (1 - i / rows) * 1.5;
        ctx.strokeStyle = `rgba(${color}, ${Math.max(0, alpha)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Vertikální linie
      for (let j = 0; j < cols; j++) {
        ctx.beginPath();
        for (let i = 0; i < rows; i++) {
          const x = j * gridSize;
          const y = i * gridSize;

          const wave = Math.sin(time + j * 0.1 + i * 0.05) * 10;

          if (i === 0) {
            ctx.moveTo(x, y + wave);
          } else {
            ctx.lineTo(x, y + wave);
          }
        }

        const alpha = opacity * (1 - j / cols) * 1.5;
        ctx.strokeStyle = `rgba(${color}, ${Math.max(0, alpha)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
