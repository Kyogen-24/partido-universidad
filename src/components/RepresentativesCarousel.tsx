import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { representatives } from "@/data/representatives";
import RepresentativeModal from "./RepresentativeModal";

const AUTOPLAY_INTERVAL = 5000;

const cardColors = [
  "bg-gradient-to-b from-blue-100 to-blue-50",
  "bg-gradient-to-b from-purple-100 to-purple-50",
  "bg-gradient-to-b from-emerald-100 to-emerald-50",
];

function Card({ rep, bgColor, onClick }: { rep: typeof representatives[number]; bgColor: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer text-left focus-visible:outline-none"
    >
      <div className="overflow-hidden rounded-3xl bg-white border-6 border-white shadow-lg transition-shadow duration-500 hover:shadow-xl flex flex-col">

        {/* Photo area */}
        <div className={`relative overflow-hidden ${bgColor} h-[240px] sm:h-[290px] md:h-[310px] lg:h-[300px]`}>
          <img
            src={rep.photo}
            alt={rep.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Text body */}
        <div className="p-4 flex flex-col gap-1.5 bg-white">
          {/* Badge */}
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 leading-tight">
            {rep.badge}
          </p>

          {/* Name */}
          <h3 className="font-heading text-sm font-bold text-slate-800 leading-snug sm:text-base">
            {rep.shortName}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">
            {rep.tagline}
          </p>

          {/* CTA */}
          <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all duration-300">
            Conocer trayectoria
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

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
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
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
      transform: `translateY(-50%) translateX(${
        isCenter ? "0" : isRight ? "var(--side-offset)" : "calc(-1 * var(--side-offset))"
      }) scale(${isCenter ? 1 : 0.82})`,
      transformOrigin: "center",
      opacity: isCenter ? 1 : 0.55,
      zIndex: isCenter ? 30 : 20,
      filter: isCenter ? "none" : "grayscale(40%)",
    };
  };

  return (
    <section id="equipo" className="border-t border-border/40 bg-[#F3F9FF]">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-4 sm:pt-14 sm:pb-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            La fórmula del cambio
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            Estudiantes, docentes, administrativos y egresados comprometidos con la transformación universitaria.
            Haz clic en cada perfil para conocer sus propuestas.
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mt-12">
          {representatives.map((rep, i) => (
            <Card
              key={rep.id}
              rep={rep}
              bgColor={cardColors[i % cardColors.length]}
              onClick={() => openModal(rep)}
            />
          ))}
        </div>

        {/* Mobile/Tablet: Carousel */}
        <div
          className="relative mt-8 sm:mt-12 lg:hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative mx-auto h-[460px] max-w-[900px] sm:h-[500px] sm:max-w-[980px] [--side-offset:35%] sm:[--side-offset:50%] md:[--side-offset:65%]">
            {representatives.map((rep, i) => {
              const styles = getCardStyles(i);
              const offset = ((i - currentIndex) % 3 + 3) % 3;
              const isCenter = offset === 0;
              const bgColor = cardColors[i % cardColors.length];

              return (
                <button
                  key={rep.id}
                  onClick={() => (isCenter ? openModal(rep) : goTo(i))}
                  className="absolute top-1/2 left-1/2 -ml-[130px] w-[260px] cursor-pointer text-left focus-visible:outline-none transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:-ml-[155px] sm:w-[310px] md:-ml-[170px] md:w-[340px]"
                  style={styles}
                >
                  <div className="overflow-hidden rounded-3xl bg-white border-6 border-white shadow-lg transition-shadow duration-500 hover:shadow-xl flex flex-col">
                    {/* Photo area */}
                    <div className={`relative overflow-hidden ${bgColor} h-[240px] sm:h-[290px] md:h-[310px]`}>
                      <img
                        src={rep.photo}
                        alt={rep.name}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500"
                      />
                    </div>

                    {/* Text body */}
                    <div className="p-4 flex flex-col gap-1.5 bg-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 leading-tight">
                        {rep.badge}
                      </p>
                      <h3 className="font-heading text-sm font-bold text-slate-800 leading-snug sm:text-base">
                        {rep.shortName}
                      </h3>
          <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">
                        {rep.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600">
                        Conocer trayectoria
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls */}
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
                      ? "w-6 bg-blue-500"
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

        {/* Mascot */}
        <div className="hidden lg:flex justify-end mt-6 pointer-events-none select-none">
          <img
            src="/yupi-pixel1-sin fondo.png"
            alt="Mascota Yupi"
            className="h-20 lg:h-24 w-auto object-contain"
          />
        </div>
      </div>

      <RepresentativeModal
        representative={selectedRep}
        open={modalOpen}
        onOpenChange={(open) => { if (!open) closeModal(); }}
      />
    </section>
  );
}
