"use client";

import { useEffect, useRef } from "react";

interface SparkGridProps {
  className?: string;
}

export default function SparkGrid({ className }: SparkGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Store mouse in a ref to avoid re-renders, default off-screen
  const mouseRef = useRef({ x: -5000, y: -5000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Configuration
    const CONFIG = {
      spacing: 30, // Denser grid
      baseLen: 15,
      maxLen: 40, // Lines grow when active
      colorWait: "rgba(120, 130, 140, 0.6)", // Much more visible/stronger idle color
      colorActive: "#D6FF00", // BIO LIME for active
      colorSecondary: "#00E0FF", // Cyan for semi-active
      mouseRadius: 400,
      lerpSpeed: 0.1, // Smoothness (lower = heavier/smoother)
    };

    // State for each grid point
    interface Point {
      x: number;
      y: number;
      angle: number;
      targetAngle: number;
      len: number;
    }
    
    let points: Point[] = [];
    let cols = 0;
    let rows = 0;

    const initGrid = () => {
      points = [];
      cols = Math.ceil(canvas.width / CONFIG.spacing);
      rows = Math.ceil(canvas.height / CONFIG.spacing);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push({
            x: i * CONFIG.spacing,
            y: j * CONFIG.spacing,
            angle: 0,
            targetAngle: 0,
            len: CONFIG.baseLen
          });
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initGrid();
      }
    };
    
    window.addEventListener("resize", resize);
    resize();

    // Track mouse relative to the viewport/canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };
    
    const handleMouseLeave = () => {
       mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave); // Clear on exit

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const draw = () => {
      // Create trails effect by not clearing completely (optional, creates smear)
      // ctx.fillStyle = 'rgba(17, 17, 17, 0.3)';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      points.forEach(p => {
        // Calculate distance to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Target Logic
        if (mouse.active && dist < CONFIG.mouseRadius) {
          // Point towards mouse and PERPENDICULAR (create swirls) or DIRECT?
          // Naver style is often "Flow". Let's point TOWARDS mouse for magnetic feel.
          const angleToMouse = Math.atan2(dy, dx);
          p.targetAngle = angleToMouse;
          
          // Grow length based on proximity
          const proximity = 1 - Math.min(dist / CONFIG.mouseRadius, 1);
          p.len = lerp(p.len, CONFIG.baseLen + (CONFIG.maxLen * proximity), 0.1);
        } else {
          // Idle Wave Motion
          // Create a noise-like field using sin/cos based on position and time
          const noise = Math.sin(p.x * 0.005 + time * 0.01) + Math.cos(p.y * 0.005 + time * 0.02);
          p.targetAngle = noise * 0.5; // Gentle rotation
          p.len = lerp(p.len, CONFIG.baseLen, 0.05); // Return to base length
        }

        // Apply Physics (Lerp current angle to target)
        // Handle wrap-around for angles to prevent spinning 360 unnecessarily
        // (Simple lerp is fine for mostly directional needles)
        p.angle = lerp(p.angle, p.targetAngle, CONFIG.lerpSpeed);

        // Drawing
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Determine Color
        if (mouse.active && dist < CONFIG.mouseRadius) {
           const proximity = 1 - Math.min(dist / CONFIG.mouseRadius, 1);
           // Mix colors: Cyan outer ring, Lime center
           if (dist < 150) {
             ctx.strokeStyle = CONFIG.colorActive;
             ctx.globalAlpha = proximity + 0.2; // Brighter center
             ctx.lineWidth = 2; 
           } else {
             ctx.strokeStyle = CONFIG.colorSecondary;
             ctx.globalAlpha = proximity * 0.5;
             ctx.lineWidth = 1.5;
           }
        } else {
           ctx.strokeStyle = CONFIG.colorWait;
           ctx.globalAlpha = 0.5; // Stronger base visibility
           ctx.lineWidth = 1.5; // Thicker lines
        }

        ctx.beginPath();
        // Draw centered line
        ctx.moveTo(-p.len / 2, 0);
        ctx.lineTo(p.len / 2, 0);
        ctx.stroke();

        ctx.restore();
      });

      time++;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={className} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        pointerEvents: 'none' // Let clicks pass through, mousemove is global
      }} 
    />
  );
}
