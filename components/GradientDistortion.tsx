"use client";

import { useIsMobile } from "@/lib/hooks";
import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export function GradientDistortion() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const materialRef = useRef<THREE.ShaderMaterial>();
  const animationRef = useRef<number>();
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });
  const lastMouseTimeRef = useRef<number>(0);

  // Vertex shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader with gradient and distortion
  const fragmentShader = `
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    uniform float u_time;
    varying vec2 vUv;

    // Generate liquid distortion
    vec2 distort(vec2 uv, vec2 mouse, float time) {
      vec2 delta = uv - mouse;
      float dist = length(delta);
      float influence = smoothstep(0.3, 0.0, dist);
      
      float angle = atan(delta.y, delta.x);
      float wave = sin(dist * 15.0 - time * 3.0) * influence * 0.08;
      
      vec2 offset = vec2(cos(angle), sin(angle)) * wave;
      return uv + offset;
    }

    // Create the gradient
    vec3 getGradient(vec2 uv) {
      // Base colors
      vec3 black = vec3(0.0);
      vec3 orange = vec3(0.91, 0.31, 0.01); // #E85002
      vec3 white = vec3(0.976, 0.976, 0.976); // #F9F9F9
      
      // Radial gradients for corners (black)
      float corner1 = 1.0 - smoothstep(0.0, 0.6, length(uv - vec2(0.0, 0.0)));
      float corner2 = 1.0 - smoothstep(0.0, 0.6, length(uv - vec2(1.0, 0.0)));
      float corner3 = 1.0 - smoothstep(0.0, 0.6, length(uv - vec2(0.0, 1.0)));
      float corner4 = 1.0 - smoothstep(0.0, 0.6, length(uv - vec2(1.0, 1.0)));
      
      // Additional corner gradients
      float corner5 = 1.0 - smoothstep(0.0, 0.4, length(uv - vec2(0.2, 0.1)));
      float corner6 = 1.0 - smoothstep(0.0, 0.4, length(uv - vec2(0.8, 0.9)));
      
      // Orange radial gradients
      float orange1 = 1.0 - smoothstep(0.0, 0.5, length(uv - vec2(0.3, 0.2)));
      float orange2 = 1.0 - smoothstep(0.0, 0.5, length(uv - vec2(0.7, 0.8)));
      float orange3 = 1.0 - smoothstep(0.0, 0.7, length(uv - vec2(0.5, 0.5)));
      
      // White radial gradient
      float white1 = 1.0 - smoothstep(0.0, 0.5, length(uv - vec2(0.7, 0.8)));
      
      // Linear gradient base
      vec3 linearGrad = mix(black, orange, smoothstep(0.0, 0.2, uv.x + uv.y));
      linearGrad = mix(linearGrad, white, smoothstep(0.2, 0.6, uv.x + uv.y));
      linearGrad = mix(linearGrad, black, smoothstep(0.6, 1.0, uv.x + uv.y));
      
      // Mix all layers
      vec3 finalColor = linearGrad;
      
      // Add corner blacks
      finalColor = mix(finalColor, black, corner1 * 0.8);
      finalColor = mix(finalColor, black, corner2 * 0.8);
      finalColor = mix(finalColor, black, corner3 * 0.8);
      finalColor = mix(finalColor, black, corner4 * 0.8);
      finalColor = mix(finalColor, black, corner5 * 0.6);
      finalColor = mix(finalColor, black, corner6 * 0.6);
      
      // Add orange highlights
      finalColor = mix(finalColor, orange, orange1 * 0.7);
      finalColor = mix(finalColor, orange, orange2 * 0.7);
      finalColor = mix(finalColor, orange, orange3 * 0.5);
      
      // Add white highlight
      finalColor = mix(finalColor, white, white1 * 0.6);
      
      return finalColor;
    }

    void main() {
      vec2 uv = vUv;
      
      // Apply distortion
      vec2 distortedUv = distort(uv, u_mouse, u_time);
      
      // Clamp UV coordinates
      distortedUv = clamp(distortedUv, 0.0, 1.0);
      
      // Get gradient color with distortion
      vec3 color = getGradient(distortedUv);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Smooth mouse tracking with easing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMouseTimeRef.current < 16) return; // Throttle to ~60fps
    lastMouseTimeRef.current = now;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for WebGL

    // Update target position for smooth interpolation
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });

    // Set renderer size
    const resizeRenderer = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    resizeRenderer();
    window.addEventListener('resize', resizeRenderer);

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_time: { value: 0.0 }
      },
      transparent: true
    });

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add to DOM
    container.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    materialRef.current = material;

    // Animation loop
    const animate = () => {
      const now = Date.now() * 0.001; // Convert to seconds
      
      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Update uniforms
      if (materialRef.current) {
        materialRef.current.uniforms.u_mouse.value.set(mouse.x, mouse.y);
        materialRef.current.uniforms.u_time.value = now;
        
        const rect = container.getBoundingClientRect();
        materialRef.current.uniforms.u_resolution.value.set(rect.width, rect.height);
      }

      // Render
      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeRenderer);
      container.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, [isMobile, handleMouseMove]);

  // Disable on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto overflow-hidden"
      style={{ 
        zIndex: 1
      }}
    />
  );
}
