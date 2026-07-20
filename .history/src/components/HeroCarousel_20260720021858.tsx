import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  { src: "/fondo1.jpg", isPanoramic: false },
  { src: "/fondo2.jpg", isPanoramic: true },
  { src: "/fondo3.jpg", isPanoramic: false },
  { src: "/fondo.jpg", isPanoramic: false },
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
      className="relative isolate overflow-hidden min-h-[55vh] sm:min-h-[90vh] flex flex-col justify-between w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-20 bg-slate-950">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === currentIndex ? 1 : 0 }}
          >
            {slide.isPanoramic ? (
              /* Cover image focused on the upper 20% (candidates' faces) to avoid cropping them */
              <div
                className="h-full w-full bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url('${slide.src}')`,
                  backgroundPosition: "center 20%",
                }}
              />
            ) : (
              <div
                className="h-full w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${slide.src}')` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/35" />



      {/* Bottom Content: Title + Buttons */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-4xl px-4 pb-20 text-center sm:pb-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-black/35 px-5 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-8 sm:py-7">
        <h1 className="mb-6 font-heading text-3xl font-bold leading-tight tracking-tight text-white/95 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] sm:text-4xl lg:text-5xl">
          <span
            className="font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.35)]"
            style={{ WebkitTextStroke: "0.6px white" }}
          >
            ERES
          </span>{" "}
          <span className="text-white/95">la mejora continua</span>
        </h1>
        <div className="flex flex-row items-center justify-center gap-3">
          <a
            href="#propuesta"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-white/25 bg-white/20 px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-white/30"
          >
            Propuesta
          </a>
          <a
            href="#equipo"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-white/25 bg-white/20 px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-white/30"
          >
            Equipo
          </a>
        </div>
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
