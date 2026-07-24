'use client';

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
      '/comunidad/encuentros1.jpg',
      '/comunidad/encuentros2.jpg',
      '/comunidad/encuentros3.jpg',
    ],
    fallbackGradient: 'linear-gradient(135deg,#10b981,#0f766e)',
  },
  {
    label: 'Actividades',
    images: [
      '/comunidad/actividades1.jpg',
      '/comunidad/actividades2.jpg',
      '/comunidad/actividades3.jpg',
    ],
    fallbackGradient: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
  },
  {
    label: 'Charlas',
    images: [
      '/comunidad/charlas1.jpg',
      '/comunidad/charlas2.jpg',
      '/comunidad/charlas3.jpg',
    ],
    fallbackGradient: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
  },
  {
    label: 'Reuniones',
    images: [
      '/comunidad/reuniones1.jpg',
      '/comunidad/reuniones2.jpg',
      '/comunidad/reuniones3.jpg',
    ],
    fallbackGradient: 'linear-gradient(135deg,#60a5fa,#4f46e5)',
  },
  {
    label: 'Visitas',
    images: [
      '/comunidad/visitas1.jpg',
      '/comunidad/visitas2.jpg',
      '/comunidad/visitas3.jpg',
    ],
    fallbackGradient: 'linear-gradient(135deg,#2dd4bf,#0891b2)',
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
  const [next, setNext]       = React.useState(1);
  const [fading, setFading]   = React.useState(false);
  const [loaded, setLoaded]   = React.useState<boolean[]>(() =>
    category.images.map(() => false)
  );

  // Preload all images once
  React.useEffect(() => {
    category.images.forEach((src, i) => {
      const img = new Image();
      img.onload  = () => setLoaded(prev => { const n = [...prev]; n[i] = true; return n; });
      img.onerror = () => setLoaded(prev => { const n = [...prev]; n[i] = false; return n; });
      img.src = src;
    });
  }, [category.images]);

  // Auto-cycle
  React.useEffect(() => {
    if (category.images.length < 2) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % category.images.length);
        setNext(prev => (prev + 1) % category.images.length);
        setFading(false);
      }, 600);
    }, interval);
    return () => clearInterval(timer);
  }, [category.images.length, interval]);

  const anyLoaded = loaded.some(Boolean);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
      style={{ background: category.fallbackGradient }}
    >
      {/* Current image */}
      {category.images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: loaded[i] && i === current ? (fading ? 0 : 1) : 0,
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

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
  const [enc, act, char, reu, vis] = CATEGORIES;
  // Stagger intervals so all cards aren't in sync
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#F3F9FF' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-emerald-500" />
            Nuestra comunidad
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Vivimos la{' '}
            <span className="text-emerald-600 dark:text-emerald-400">universidad</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Nuestro compromiso se construye junto a la comunidad universitaria.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="grid gap-3 sm:gap-4"
          style={{
            gridTemplateColumns: '1fr 1fr 1.4fr',
            gridTemplateRows: '240px 200px 140px',
          }}
        >
          {/* Encuentros: col 1, rows 1–2 */}
          <ComunidadCard
            category={enc}
            interval={3800}
            className="[grid-column:1] [grid-row:1/3]"
          />

          {/* Actividades: col 2, row 1 */}
          <ComunidadCard
            category={act}
            interval={4200}
            className="[grid-column:2] [grid-row:1]"
          />

          {/* Charlas: col 2, row 2 */}
          <ComunidadCard
            category={char}
            interval={3500}
            className="[grid-column:2] [grid-row:2]"
          />

          {/* Reuniones: col 3, rows 1–2 */}
          <ComunidadCard
            category={reu}
            interval={4600}
            className="[grid-column:3] [grid-row:1/3]"
          />

          {/* Visitas: cols 1–2, row 3 */}
          <ComunidadCard
            category={vis}
            interval={3200}
            className="[grid-column:1/3] [grid-row:3]"
          />
        </div>

      </div>
    </section>
  );
}
