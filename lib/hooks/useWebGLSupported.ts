"use client";

import { useState, useEffect } from "react";

export function useWebGLSupported(): boolean {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setIsSupported(!!context);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}


