"use client";

import { useState, useEffect } from "react";
import { useMousePosition } from "@/lib/hooks";

export function MouseGlow() {
  const [isMobile, setIsMobile] = useState(true);
  const { position } = useMousePosition();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background: `radial-gradient(400px at ${position.x}px ${position.y}px, rgba(212, 168, 67, 0.08), transparent 70%)`
      }}
    />
  );
}
