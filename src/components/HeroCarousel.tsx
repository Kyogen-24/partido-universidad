import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  { src: "/fondo2.webp", isPanoramic: true },
  { src: "/fondo.webp", isPanoramic: false },
];

const AUTOPLAY_INTERVAL = 4000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

  return (
    <section
      className="relative isolate w-full min-h-[60vh] sm:min-h-[90vh] flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div
        className="absolute inset-0 -z-20"
        style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)' }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === currentIndex ? 1 : 0 }}
          >
            <img
              src={slide.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: slide.isPanoramic ? "center 25%" : "center",
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/35" />



      {/* Bottom Content: Title + Buttons */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:pb-24 sm:px-6 lg:px-8 w-full text-center mt-auto">
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-lg leading-tight mb-6">
          <span className="text-primary">ERES</span>{" "}
          <span className="text-white">la mejora continua</span>
        </h1>
        <div className="flex flex-row justify-center items-center gap-3">
          <a
            href="#propuesta"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 px-5 text-xs font-semibold text-white border border-white/25 backdrop-blur-xs transition-all"
          >
            Propuesta
          </a>
          <a
            href="#equipo"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 px-5 text-xs font-semibold text-white border border-white/25 backdrop-blur-xs transition-all"
          >
            Equipo
          </a>
        </div>
      </div>

      {/* Left Arrow (absolute left, no bg) */}
      <button
        onClick={goPrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-all duration-300 p-2 cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
      </button>

      {/* Right Arrow (absolute right, no bg) */}
      <button
        onClick={goNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-all duration-300 p-2 cursor-pointer"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
      </button>

      {/* Bottom controls: Dots only */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-white/80"
                : "w-1.5 bg-white/45 hover:bg-white/70"
            }`}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
