"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface NavJoinButtonProps {
  variant?: "desktop" | "mobile";
}

const CYCLE_INTERVAL = 3000;
const ANIMATION_DURATION = 600;
const CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
const TEXT = "Y tú, ¿ya ERES UNC? ";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/BX0OWcAWv0r0rX4nOtDW4s?s=qs&p=i&ilr=1";

function ScrambleText({ className }: { className?: string }) {
  const [displayText, setDisplayText] = useState<string[]>(() => TEXT.split(""));
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnimation = () => {
    if (!isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(startAnimation, CYCLE_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;

    if (isAnimating) {
      const maxIterations = TEXT.length;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

        iterationCount.current = progress * maxIterations;

        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === " "
              ? letter
              : index <= iterationCount.current
                ? TEXT[index]
                : CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)]
          )
        );

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAnimating]);

  return (
    <span className={cn("overflow-hidden", className)}>
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            key={index}
            className={cn("font-mono inline-block", letter === " " ? "w-1" : "")}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

export default function NavJoinButton({ variant = "desktop" }: NavJoinButtonProps) {
  if (variant === "mobile") {
    return (
      <a
        href={WHATSAPP_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/80 hover:shadow-primary/30"
      >
        <ScrambleText className="text-sm font-medium text-primary-foreground" />
      </a>
    );
  }

  return (
    <a
      id="join-button"
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 items-center gap-2 rounded-lg px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-all shadow-sm"
    >
      <ScrambleText className="text-xs sm:text-sm font-semibold" />
    </a>
  );
}
