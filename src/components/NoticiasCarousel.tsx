/** @jsxRuntime classic */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FacebookEmbed from "@/components/ui/FacebookEmbed";

type Post = { platform: "facebook"; url: string };

const posts: Post[] = [
  { platform: "facebook", url: "https://www.facebook.com/eres.unc.cajamarca/posts/pfbid02NwzmumCLYbmNizp56mTVxSMx3wQH56kx999poxpHzakcHaJikjBTU5wSvZk2zSJcl" },
  { platform: "facebook", url: "https://www.facebook.com/reel/1583980636418181" },
  { platform: "facebook", url: "https://www.facebook.com/eres.unc.cajamarca/posts/pfbid02prQB9s5t8EdoRswzdtnEPkyef98GhAtLco1AyusD7WWTYspWdXyRxXp3hf4p4nz9l" },
  { platform: "facebook", url: "https://www.facebook.com/reel/28203836059220508" },
  { platform: "facebook", url: "https://www.facebook.com/reel/1083704407567011" },
];

const AUTOPLAY_INTERVAL = 5000;
const GAP_PX = 16;

function getVisibleCards(width: number) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export default function NoticiasCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const maxSlide = Math.max(posts.length - visibleCards, 0);

  const getStep = useCallback(() => {
    const cardWidth = firstCardRef.current?.offsetWidth ?? 0;
    return cardWidth + GAP_PX;
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), maxSlide);
      carouselRef.current?.scrollTo({ left: clamped * getStep(), behavior: "smooth" });
      setCurrentSlide(clamped);
    },
    [maxSlide, getStep]
  );

  const goNext = useCallback(
    () => goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1),
    [currentSlide, maxSlide, goToSlide]
  );
  const goPrev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  // Responsive visible-card count
  useEffect(() => {
    const updateVisibleCards = () => setVisibleCards(getVisibleCards(window.innerWidth));
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Autoplay
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

  // Sync dots when the user scrolls/swipes natively
  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el || isDragging.current) return;
    const step = getStep();
    if (!step) return;
    const index = Math.round(el.scrollLeft / step);
    setCurrentSlide(Math.min(Math.max(index, 0), maxSlide));
  }, [getStep, maxSlide]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = carouselRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !carouselRef.current) return;
    const delta = e.pageX - dragStartX.current;
    carouselRef.current.scrollLeft = dragStartScroll.current - delta;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    handleScroll();
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
      >
        {posts.map((post, i) => (
          <div
            key={post.url}
            ref={i === 0 ? firstCardRef : undefined}
            className="w-[300px] shrink-0 snap-start select-none overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg shadow-slate-900/10 sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]"
          >
            <div className="flex items-center gap-2 px-3 pb-2 pt-3 bg-[#1877f2]/10">
              <svg className="h-4 w-4 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-xs font-semibold text-[#1877f2]">Facebook</span>
            </div>
            <FacebookEmbed url={post.url} />
          </div>
        ))}
      </div>

      {maxSlide > 0 && (
        <>
          <button
            onClick={goPrev}
            className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-900/15 sm:-left-6 sm:flex lg:hidden"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-900/15 sm:-right-6 sm:flex lg:hidden"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-2 flex justify-center gap-1.5 lg:hidden">
            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentSlide ? "w-5 bg-[#1877f2]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Ir al grupo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
