import { motion } from "motion/react";

import { cn } from "@/lib/utils";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-primary"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

type BackgroundPathsProps = {
  title?: string;
  className?: string;
};

function BackgroundPaths({
  title = "Background Paths",
  className,
}: BackgroundPathsProps) {
  const words = title.split(" ");

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 px-4 text-center md:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-heading text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl"
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="mr-3 inline-block last:mr-0 sm:mr-4">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: wordIndex * 0.1 + letterIndex * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
      </div>
    </div>
  );
}

export { BackgroundPaths, type BackgroundPathsProps };
