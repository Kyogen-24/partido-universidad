import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { representatives } from "@/data/representatives";
import RepresentativeModal from "./RepresentativeModal";

const AUTOPLAY_INTERVAL = 5000;

export default function RepresentativesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRep, setSelectedRep] = useState<typeof representatives[number] | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + representatives.length) % representatives.length);
  }, []);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    if (isPaused || isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, isHovered, goNext]);

  const openModal = (rep: typeof representatives[number]) => {
    setSelectedRep(rep);
    setModalOpen(true);
    setIsPaused(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsPaused(false);
  };

  const getCardStyles = (index: number) => {
    const offset = ((index - currentIndex) % 3 + 3) % 3;
    const isCenter = offset === 0;
    const isRight = offset === 1;

    return {
      transform: `translateY(-50%) translateX(${isCenter ? "0" : isRight ? "var(--side-offset)" : "calc(-1 * var(--side-offset))"}) scale(${isCenter ? 1 : 0.8})`,
      transformOrigin: "center",
      opacity: isCenter ? 1 : 0.5,
      zIndex: isCenter ? 30 : 20,
    };
  };

  return (
    <section id="equipo" className="border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-4 sm:pt-10 sm:pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            La fórmula del cambio
          </h2>
          <p className="mt-4 text-muted-foreground">
            Estudiantes y docentes comprometidos con la transformación universitaria. Haz clic en cada perfil para conocer sus propuestas.
          </p>
        </div>

        <div
          className="relative mt-4 sm:mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Responsive offset variable: larger separation on wider screens */}
          <div className="relative mx-auto h-[420px] max-w-[810px] xs:h-[440px] sm:h-[540px] sm:max-w-[900px] lg:h-[580px] lg:max-w-[990px] xl:max-w-[1200px] [--side-offset:42%] sm:[--side-offset:62%] md:[--side-offset:75%] lg:[--side-offset:78%] xl:[--side-offset:82%]">
            {representatives.map((rep, i) => {
              const styles = getCardStyles(i);
              const isCenter = ((i - currentIndex) % 3 + 3) % 3 === 0;

              return (
                <button
                  key={rep.id}
                  onClick={() => (isCenter ? openModal(rep) : goTo(i))}
                  className="absolute top-1/2 left-1/2 -ml-[95px] w-[190px] cursor-pointer text-left focus-visible:outline-none transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:-ml-[130px] sm:w-[260px] md:-ml-[140px] md:w-[280px] lg:-ml-[155px] lg:w-[310px] xl:-ml-[170px] xl:w-[340px]"
                  style={styles}
                >
                  <div className={`group relative flex flex-col overflow-hidden rounded-[20px] border bg-card transition-all duration-500 ${isCenter ? "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20" : "border-border/40 shadow-md"}`}>
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={rep.photo}
                        alt={rep.name}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between min-h-[90px] sm:min-h-[130px]">
                      <div>
                        <span className="block text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5 sm:mb-1">
                          {rep.badge}
                        </span>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-foreground sm:text-lg">
                          {rep.shortName}
                        </h3>
                      </div>
                      <div className="mt-3 sm:mt-4">
                        <div className="inline-block rounded-lg border border-primary/60 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-primary transition-colors group-hover:bg-primary/5">
                          Ver perfil
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={goPrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {representatives.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIndex
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-border hover:bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir a representante ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <RepresentativeModal
        representative={selectedRep}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      />
    </section>
  );
}
