"use client";

import { useEffect, useRef } from "react";

interface CodeRainProps {
  color?: string;
  speed?: number;
  fontSize?: number;
}

export default function CodeRainBackground({ 
    color = "#00FFC2", 
    speed = 30, // Lower is faster (ms per frame)
    fontSize = 14 
}: CodeRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Configuration
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    
    // Characters to display (Binary + Matrix style + Special chars for "Tech" feel)
    const chars = "PLOLUX010101<>[]{}/*-+=^$#@&HTMLCSSJS";
    const charArray = chars.split("");

    const draw = () => {
      // Semi-transparent black background to create trail effect
      // Using the brand secondary color for the trail fade to match theme
      // But clearing with very low opacity gives the "trail"
      ctx.fillStyle = "rgba(10, 25, 47, 0.1)"; // secondary color with opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`; // Monospace font for code feel

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the character
        ctx.fillText(text, x, y);

        // Reset drop to top randomly or if it goes off screen
        // Adding randomness to reset makes it look less uniform "rain"
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, speed);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color, fontSize, speed]);

  return (
    <canvas 
        ref={canvasRef} 
        style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            zIndex: 0, // Behind content
            opacity: 0.3 // Subtle effect
        }} 
    />
  );
}
