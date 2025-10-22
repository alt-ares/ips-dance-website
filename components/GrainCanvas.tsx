"use client";

import { useEffect, useRef } from "react";

export function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create grain noise pattern
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        const gray = Math.random() * 255;
        buffer[i] =
          (255 << 24) | // alpha
          (gray << 16) | // blue
          (gray << 8) | // green
          gray; // red
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animate grain
    let animationId: number;
    const animate = () => {
      createNoise();
      animationId = requestAnimationFrame(animate);
    };

    // Start with a slower frame rate for performance
    let lastTime = 0;
    const fps = 15; // Grain doesn't need to be super smooth
    const interval = 1000 / fps;

    const animateThrottled = (currentTime: number) => {
      animationId = requestAnimationFrame(animateThrottled);

      const deltaTime = currentTime - lastTime;

      if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);
        createNoise();
      }
    };

    animateThrottled(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-2"
      style={{ imageRendering: "pixelated" }}
    />
  );
}


