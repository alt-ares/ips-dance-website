"use client";

import { useEffect, useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion, useWebGLSupported } from "@/lib/hooks";
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  // Custom shader for radial halo with FBM-like noise
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;

    // Simple noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      
      // Animated noise
      float n = noise(vUv * 3.0 + uTime * 0.1);
      
      // Radial gradient with noise
      float halo = 1.0 - smoothstep(0.0, 0.8, dist);
      halo *= 0.6 + n * 0.4;
      
      // Orange color
      vec3 color = vec3(0.91, 0.31, 0.01); // #E85002
      
      gl_FragColor = vec4(color, halo * 0.5);
    }
  `;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4, 4, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
        }}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Fallback 2D canvas for reduced motion or no WebGL
function FallbackHalo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    // Draw radial gradient
    const gradient = ctx.createRadialGradient(400, 400, 0, 400, 400, 400);
    gradient.addColorStop(0, "rgba(232, 80, 2, 0.5)");
    gradient.addColorStop(0.4, "rgba(232, 80, 2, 0.2)");
    gradient.addColorStop(0.7, "rgba(232, 80, 2, 0.05)");
    gradient.addColorStop(1, "rgba(232, 80, 2, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 800);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain"
      style={{ filter: "blur(60px)" }}
    />
  );
}

export function HaloOrb() {
  const reducedMotion = useReducedMotion();
  const webGLSupported = useWebGLSupported();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Pause animation when tab is inactive
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Use fallback if reduced motion is preferred or WebGL is not supported
  if (reducedMotion || !webGLSupported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <FallbackHalo />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 opacity-40">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
          }}
          dpr={[1, 1.5]} // Limit pixel ratio for performance
        >
          <Suspense fallback={null}>
            <Orb />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}


