"use client";

import { useState, useEffect } from "react";
import { useReducedMotionSafe } from "@/lib/hooks";

export function BlueFire() {
  const prefersReducedMotion = useReducedMotionSafe();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (prefersReducedMotion || isMobile) return null;

  return (
    <div className="blue-fire">
      <div className="fire-tongue" />
      <div className="fire-tongue" />
      <div className="fire-tongue" />
      <div className="fire-tongue" />
      <div className="fire-tongue" />
      <div className="fire-tongue" />
      <div className="spark" />
      <div className="spark" />
      <div className="spark" />
      <div className="spark" />
      <div className="spark" />
      <div className="spark" />
    </div>
  );
}
