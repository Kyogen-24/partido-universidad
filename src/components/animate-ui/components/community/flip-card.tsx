'use client';

import { easeOut, motion } from 'motion/react';
import * as React from 'react';

export interface FlipCardData {
  title: string;
  desc: string;
  img: string;
}

interface FlipCardProps {
  data: FlipCardData;
}

export function FlipCard({ data }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [imgError, setImgError]   = React.useState(false);

  const isTouchDevice =
    typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleClick       = () => { if (isTouchDevice) setIsFlipped((v) => !v); };
  const handleMouseEnter  = () => { if (!isTouchDevice) setIsFlipped(true); };
  const handleMouseLeave  = () => { if (!isTouchDevice) setIsFlipped(false); };

  const cardVariants = {
    front: { rotateY: 0,   transition: { duration: 0.5, ease: easeOut } },
    back:  { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Aspect-ratio wrapper */}
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>

        {/* FRONT: imagen + título */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border border-border/30 shadow-sm bg-muted/50"
          animate={isFlipped ? 'back' : 'front'}
          variants={cardVariants}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {imgError ? (
            /* Placeholder bonito cuando no hay imagen */
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <svg className="h-8 w-8 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <img
              src={data.img}
              alt={data.title}
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          )}

          {/* Gradiente + título encima */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pb-3 pt-8">
            <p className="text-sm font-semibold text-white leading-snug drop-shadow">{data.title}</p>
          </div>
        </motion.div>

        {/* BACK: descripción */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl border border-primary/20 shadow-sm bg-gradient-to-br from-primary/10 via-background to-primary/5 flex flex-col items-center justify-center px-4 py-5 text-center gap-3"
          initial={{ rotateY: 180 }}
          animate={isFlipped ? 'front' : 'back'}
          variants={cardVariants}
          style={{ transformStyle: 'preserve-3d', rotateY: 180 }}
        >
          <h3 className="font-heading text-sm font-bold text-foreground leading-snug">{data.title}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{data.desc}</p>
        </motion.div>

      </div>
    </div>
  );
}
