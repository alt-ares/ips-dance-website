"use client";

import { useState, useEffect } from "react";

export function useWebGLSupported(): boolean {
  const [isSupported, setIsSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setIsSupported(!!context);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  // Return true during SSR to avoid hydration mismatch
  return isClient ? isSupported : true;
}


