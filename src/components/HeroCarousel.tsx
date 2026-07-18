import { ArrowRight } from "lucide-react";

import { BackgroundPaths } from "@/components/ui/background-paths";

export default function HeroCarousel() {
  return (
    <section className="relative isolate overflow-hidden min-h-screen flex flex-col">

      {/* Content */}
      <div className="relative z-10 mx-auto flex flex-1 w-full max-w-7xl flex-col px-4 pt-24 pb-8 sm:px-6 sm:pt-32 sm:pb-12 lg:px-8">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-black/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Elecciones UNC 2026
            </div>
            <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
              La mejora continua en <span className="text-primary">tiempos de cambio</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-black/70 sm:text-base lg:mx-0">
              <strong className="text-black">E</strong>xperiencia,{" "}
              <strong className="text-black">R</strong>esponsabilidad,{" "}
              <strong className="text-black">E</strong>sfuerzo y{" "}
              <strong className="text-black">S</strong>ervicio: cuatro valores para
              construir la universidad que merecemos.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
              <a
                href="#propuesta"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-primary/30 bg-primary/20 px-6 text-sm font-medium text-black backdrop-blur-sm shadow-lg shadow-primary/20 transition-all hover:bg-primary/30 hover:shadow-primary/30"
              >
                Conoce nuestras propuestas
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#calendario"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-medium text-black backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Ver calendario
              </a>
            </div>

            {/* Tagline secundario */}
            <p className="mt-8 text-[11px] font-medium tracking-[0.2em] uppercase text-black/35 lg:text-left text-center">
              Cajamarca &nbsp;·&nbsp; UNC &nbsp;·&nbsp; 2026–2031
            </p>
          </div>

          {/* Logo con animación orbital */}
          <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center sm:h-[340px] sm:w-[340px]">
            <svg
              viewBox="0 0 480 480"
              className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite]"
              aria-hidden="true"
            >
              <circle
                cx="240"
                cy="240"
                r="200"
                fill="none"
                stroke="var(--primary)"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeDasharray="6 14"
              />
              <circle cx="240" cy="40" r="8" fill="var(--primary)" />
              <circle cx="440" cy="240" r="6" fill="var(--secondary)" />
              <circle cx="240" cy="440" r="5" fill="var(--primary)" fillOpacity="0.6" />
            </svg>
            <div className="absolute h-[68%] w-[68%] rounded-full bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-md" />
            <img
              src="/logo.png"
              alt="Logo ERES UNC"
              className="relative h-[55%] w-[55%] rounded-full object-cover shadow-xl animate-float"
            />
          </div>
        </div>

        {/* Scroll indicator — visible only when there is remaining viewport height */}
        <div className="flex justify-center pt-6 pb-2">
          <a
            href="#por-que-eres"
            aria-label="Ir a la siguiente sección"
            className="group flex flex-col items-center gap-1.5 text-black/30 transition-colors hover:text-primary/60"
          >
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">
              Descubre más
            </span>
            {/* Animated chevron stack */}
            <span className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 animate-[bounce_1.6s_ease-in-out_infinite]"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 -mt-3 opacity-50 animate-[bounce_1.6s_ease-in-out_0.2s_infinite]"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
