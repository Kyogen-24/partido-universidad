import * as React from 'react';

/* ── Types ─────────────────────────────────────────────── */
interface Category {
  label: string;
  images: string[];
  fallbackGradient: string;
}

const CATEGORIES: Category[] = [
  {
    label: 'Encuentros',
    images: [
      '/galeria/Encuentros/e1.webp',
      '/galeria/Encuentros/e2.webp',
      '/galeria/Encuentros/e3.webp',
    ],
    fallbackGradient: 'linear-gradient(135deg,#10b981,#0f766e)',
  },
  {
    label: 'Reuniones',
    images: [
      '/galeria/Reuniones/r1.webp',
      '/galeria/Reuniones/r2.webp',
    ],
    fallbackGradient: 'linear-gradient(135deg,#60a5fa,#4f46e5)',
  },
  {
    label: 'Charlas',
    images: [
      '/galeria/Charlas/c1.webp',
      '/galeria/Charlas/c4.webp',
    ],
    fallbackGradient: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
  },
  {
    label: 'Actividades',
    images: [
      '/galeria/Actividades/a1.webp',
      '/galeria/Actividades/a2.webp',
      '/galeria/Actividades/a3.webp',
    ],
    fallbackGradient: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
  },
];

/* ── Single Image Cycler Card ───────────────────────────── */
interface CardProps {
  category: Category;
  interval?: number; // ms between transitions
  className?: string;
}

function ComunidadCard({ category, interval = 3500, className = '' }: CardProps) {
  const [current, setCurrent] = React.useState(0);
  const [fading, setFading]   = React.useState(false);
  const [loaded, setLoaded]   = React.useState<boolean[]>(() =>
    category.images.map(() => false)
  );

  // Preload all images once
  React.useEffect(() => {
    category.images.forEach((src, i) => {
      const img = new Image();
      img.onload  = () => setLoaded((prev: boolean[]) => { const n = [...prev]; n[i] = true; return n; });
      img.onerror = () => setLoaded((prev: boolean[]) => { const n = [...prev]; n[i] = false; return n; });
      img.src = src;
    });
  }, [category.images]);

  // Auto-cycle
  React.useEffect(() => {
    if (category.images.length < 2) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev: number) => (prev + 1) % category.images.length);
        setFading(false);
      }, 700);
    }, 5000);
    return () => clearInterval(timer);
  }, [category.images.length]);

  const prev =
    (current - 1 + category.images.length) % category.images.length;

  return (
    <div
      className={`relative overflow-hidden rounded-xl group cursor-pointer ${className}`}
      style={{ background: '#ffffff' }}
    >
      {/* Cross-fade: previous image stays visible while the new one fades in on top */}
      {category.images.map((src, i) => {
        const isLoaded = loaded[i];
        // i === current → incoming (fades in from 0 to 1, scales from 0.96 to 1)
        // i === prev   → outgoing (fades from 1 to 0, scales from 1 to 1.08)
        // anything else → hidden, scale 0.96 (off-stage)
        let opacity: number;
        let scale: number;
        if (i === current) {
          opacity = fading ? 0 : 1;
          scale = fading ? 0.96 : 1;
        } else if (i === prev) {
          opacity = fading ? 0 : 1;
          scale = fading ? 1.08 : 1;
        } else {
          opacity = 0;
          scale = 0.96;
        }
        return (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isLoaded ? opacity : 0,
              transform: `scale(${scale})`,
              transition: 'opacity 900ms ease-in-out, transform 1400ms ease-out',
              zIndex: i === current ? 2 : i === prev ? 1 : 0,
            }}
          />
        );
      })}

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.0) 100%)',
        }}
      />

      {/* Label + arrow */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-4 flex items-end justify-between">
        <span className="text-white font-bold text-sm sm:text-base drop-shadow">
          {category.label}
        </span>
        <span className="text-white/70 text-xs group-hover:text-white transition-colors">
          ↗
        </span>
      </div>

      {/* Dot indicators */}
      {category.images.length > 1 && (
        <div className="absolute top-3 right-3 z-20 flex gap-1">
          {category.images.map((_, i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-300"
              style={{
                width:   i === current ? 16 : 6,
                height:  6,
                background: i === current ? 'white' : 'rgba(255,255,255,0.45)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Section ───────────────────────────────────────── */
export function ComunidadGrid() {
  const [enc, reu, char, act] = CATEGORIES;
  // Stagger intervals so all cards aren't in sync
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Vivimos la{' '}
            <span className="text-emerald-600 dark:text-emerald-400">universidad</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Nuestro compromiso se construye junto a la comunidad universitaria.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-1 sm:gap-2 lg:[grid-template-columns:1fr_1fr_1.4fr] lg:[grid-template-rows:240px_200px]">
          {/* Encuentros: col 1, rows 1-2 */}
          <ComunidadCard
            category={enc}
            interval={3800}
            className="row-span-2 h-[280px] sm:h-[280px] lg:[grid-column:1] lg:[grid-row:1/3] lg:h-auto"
          />

          {/* Reuniones: col 2, row 1 */}
          <ComunidadCard
            category={reu}
            interval={4200}
            className="h-[138px] sm:h-[138px] lg:[grid-column:2] lg:[grid-row:1] lg:h-auto"
          />

          {/* Charlas: col 2, row 2 */}
          <ComunidadCard
            category={char}
            interval={3500}
            className="h-[138px] sm:h-[138px] lg:[grid-column:2] lg:[grid-row:2] lg:h-auto"
          />

          {/* Actividades: full width bottom */}
          <ComunidadCard
            category={act}
            interval={4600}
            className="col-span-2 h-[200px] sm:h-[200px] lg:[grid-column:3] lg:[grid-row:1/3] lg:col-span-1 lg:h-auto"
          />
        </div>

      </div>
    </section>
  );
}
