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

      {/* Top Content: Title (just below navbar) */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:pt-28 sm:px-6 lg:px-8 w-full text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
          <span className="text-primary">ERES</span> la mejora continua
        </h1>
      </div>

      {/* Bottom Content: Description and Buttons (just above dots) */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 w-full text-center mt-auto">
        <p className="max-w-xl mx-auto text-sm text-white sm:text-white/90 sm:text-base drop-shadow-md font-medium leading-relaxed">
          Transformando la UNC con innovación, transparencia y participación estudiantil.
        </p>
        <div className="mt-5 flex flex-row justify-center items-center gap-3">
          <a
            href="#propuesta"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/80 hover:shadow-primary/30"
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
