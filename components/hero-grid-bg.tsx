"use client";

import { useEffect, useRef } from "react";

export function HeroGridBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const spacing = 40;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      // Draw grid lines
      ctx.strokeStyle =
        document.documentElement.classList.contains("dark")
          ? "rgba(255, 255, 255, 0.04)"
          : "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        const x = i * spacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let j = 0; j < rows; j++) {
        const y = j * spacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Animated glowing dots at intersections
      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          // Create a wave pattern
          const distFromCenter = Math.sqrt(
            Math.pow(x - w / 2, 2) + Math.pow(y - h / 2, 2)
          );
          const wave = Math.sin(distFromCenter * 0.008 - time * 0.02) * 0.5 + 0.5;
          const pulse = Math.sin(time * 0.03 + i * 0.5 + j * 0.3) * 0.5 + 0.5;
          const alpha = wave * pulse * 0.6;

          if (alpha > 0.05) {
            const radius = 1.5 + alpha * 1.5;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha * 0.5})`
              : `rgba(0, 0, 0, ${alpha * 0.3})`;
            ctx.fill();
          }
        }
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
