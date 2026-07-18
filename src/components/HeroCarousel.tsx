import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "@/lib/icons";
import { RotatingTextContainer, RotatingText } from "@/components/animate-ui/primitives/texts/rotating";
import { RippleButton, RippleButtonRipples } from "@/components/animate-ui/components/buttons/ripple";

const images = ["/fondo1.jpg", "/fondo2.jpg", "/fondo3.jpg", "/fondo.jpg"];

const AUTOPLAY_INTERVAL = 4000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + images.length) % images.length);
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
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-20">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === currentIndex ? 1 : 0 }}
          >
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${src}')` }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/55" />

      {/* Bottom controls */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <button
          onClick={goPrev}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white/60 backdrop-blur-sm transition-all hover:bg-white/30 hover:text-white/80"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-white/80"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
        <button
          onClick={goNext}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white/60 backdrop-blur-sm transition-all hover:bg-white/30 hover:text-white/80"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="text-primary">ERES</span> la mejora continua
          </h1>
          <div className="mt-4 max-w-2xl mx-auto text-sm text-white/70 sm:text-base">
            Nuestra fórmula postula a{" "}
            <RotatingTextContainer
              text={["Rector", "Vicerrectora Académica", "Vicerrector de Investigación y RSU"]}
              inView
              className="inline-block align-bottom font-semibold text-white"
            >
              <RotatingText />
            </RotatingTextContainer>{" "}
            para transformar la UNC con innovación, transparencia y participación estudiantil.
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <RippleButton
              asChild
              variant="ghost"
              style={{ "--ripple-button-ripple-color": "rgba(255,255,255,0.5)" } as React.CSSProperties}
            >
              <a
                href="#propuesta"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-primary/30 bg-primary/20 px-6 text-sm font-medium text-white backdrop-blur-sm shadow-lg shadow-primary/20 transition-all hover:bg-primary/30 hover:shadow-primary/30"
              >
                Conoce la propuesta
                <ArrowRight className="h-4 w-4" />
                <RippleButtonRipples />
              </a>
            </RippleButton>
            <RippleButton
              asChild
              variant="ghost"
              style={{ "--ripple-button-ripple-color": "rgba(255,255,255,0.5)" } as React.CSSProperties}
            >
              <a
                href="#contacto"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Únete al movimiento
                <RippleButtonRipples />
              </a>
            </RippleButton>
          </div>
        </div>
      </div>
    </section>
  );
}
