'use client';

import { easeOut, motion } from 'motion/react';
import * as React from 'react';

export interface FlipCardData {
  title: string;
  summary: string;
  desc: string;
  img: string;
}

interface FlipCardProps {
  data: FlipCardData;
}

export function FlipCard({ data }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const cardVariants = {
    front: { rotateY: 0, transition: { duration: 0.5, ease: easeOut } },
    back: { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
  };

  const backVariants = {
    front: { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
    back: { rotateY: 360, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <div
      className="relative w-full h-[200px] sm:h-[215px] select-none"
      style={{ perspective: '1000px' }}
    >
      <div className="relative w-full h-full">

        {/* FRONT SIDE - imagen ocupa toda la card */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm cursor-pointer"
          animate={isFlipped ? 'back' : 'front'}
          variants={cardVariants}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={() => setIsFlipped(true)}
        >
          {imgError ? (
            /* Placeholder cuando no hay imagen */
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-800 to-teal-900">
              <span className="text-white font-bold text-sm text-center px-4">
                {data.title}
              </span>
            </div>
          ) : (
            <img
              src={data.img}
              alt={data.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}

          {/* Gradiente oscuro en la parte inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Título + botón superpuestos */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 flex flex-col gap-1.5">
            <h3 className="font-heading text-sm sm:text-base font-bold text-white leading-snug drop-shadow">
              {data.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-white/80 font-semibold text-[11px] sm:text-xs group-hover:text-white transition-colors">
              <span>Explorar iniciativa</span>
              <span>→</span>
            </span>
          </div>
        </motion.div>

        {/* BACK SIDE */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-2xl sm:rounded-3xl border border-emerald-500/40 shadow-md bg-gradient-to-br from-emerald-50/95 via-white to-teal-50/95 dark:from-emerald-950/95 dark:via-slate-900 dark:to-teal-950/95 p-3 sm:p-3.5 flex flex-col justify-between"
          initial={{ rotateY: 180 }}
          animate={isFlipped ? 'back' : 'front'}
          variants={backVariants}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="overflow-y-auto scrollbar-hide pr-1">
            <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground mb-1 leading-snug">
              {data.title}
            </h3>

            <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] mb-1 leading-snug">
              {data.summary}
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {data.desc}
            </p>
          </div>

          <div className="pt-1.5 mt-1 border-t border-emerald-200/60 dark:border-emerald-900/40 text-right">
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px] sm:text-[11px] hover:underline cursor-pointer"
            >
              <span>← Volver</span>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}




