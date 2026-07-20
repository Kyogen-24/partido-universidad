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
            Estudiantes, docentes, administrativos y egresados comprometidos con la transformación universitaria. Haz clic en cada perfil para conocer sus propuestas.
          </p>
        </div>

        <div
          className="relative mt-4 sm:mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Responsive offset variable: larger separation on wider screens */}
          <div className="relative mx-auto h-[420px] max-w-[810px] xs:h-[440px] sm:h-[540px] sm:max-w-[900px] lg:h-[580px] lg:max-w-[990px] xl:max-w-[1200px] [--side-offset:42%] sm:[--side-offset:60%] md:[--side-offset:80%] lg:[--side-offset:105%] xl:[--side-offset:130%]">
            {representatives.map((rep, i) => {
              const styles = getCardStyles(i);
              const isCenter = ((i - currentIndex) % 3 + 3) % 3 === 0;

              return (
                <button
                  key={rep.id}
                  onClick={() => (isCenter ? openModal(rep) : goTo(i))}
                  className="absolute top-1/2 left-1/2 -ml-[89px] w-[178px] cursor-pointer text-left focus-visible:outline-none transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:-ml-[117px] sm:w-[234px] md:-ml-[130px] md:w-[261px] lg:-ml-[144px] lg:w-[288px] xl:-ml-[157px] xl:w-[315px]"
                  style={styles}
                >
                  <div className="group overflow-hidden rounded-2xl border border-border/40 bg-card shadow-lg transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/5">
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={rep.photo}
                        alt={rep.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                        {rep.badge}
                      </span>
                      <h3 className="mt-2 font-heading text-base font-semibold">
                        {rep.shortName}
                      </h3>
                      
                      {isCenter && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary transition-opacity">
                          <span>Ver perfil</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      )}
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
