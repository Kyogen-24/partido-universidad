/** @jsxRuntime classic */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FacebookEmbed from "@/components/ui/FacebookEmbed";
import InstagramEmbed from "@/components/ui/InstagramEmbed";

type Post = { platform: "facebook" | "instagram"; url: string };

// Facebook's video plugin only resolves canonical URLs (facebook.com/reel/{id} or
// facebook.com/{page}/videos/{id}) — facebook.com/share/... links fail silently.
const posts: Post[] = [
  { platform: "facebook", url: "https://www.facebook.com/reel/1303982894857239" },
  { platform: "instagram", url: "https://www.instagram.com/p/Da3sePOH14Z/" },
  { platform: "facebook", url: "https://www.facebook.com/reel/1069452209007130" },
  { platform: "instagram", url: "https://www.instagram.com/reel/Da0H65znNXi/" },
  { platform: "facebook", url: "https://www.facebook.com/reel/1578505697123542" },
];

const AUTOPLAY_INTERVAL = 5000;
const GAP_PX = 16;

function getVisibleCards(width: number) {
  if (width < 640) return 1;
  if (width < 1024) return 3;
  return 5;
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
            className="w-[200px] shrink-0 snap-start select-none overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg shadow-slate-900/10 sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-64px)/5)]"
          >
            <div className={`flex items-center gap-2 px-3 pb-2 pt-3 ${post.platform === "facebook" ? "bg-[#1877f2]/10" : "bg-gradient-to-r from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10"}`}>
              {post.platform === "facebook" ? (
                <svg className="h-4 w-4 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-[#e1306c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              )}
              <span className={`text-xs font-semibold ${post.platform === "facebook" ? "text-[#1877f2]" : "text-[#e1306c]"}`}>
                {post.platform === "facebook" ? "Facebook" : "Instagram"}
              </span>
            </div>
            {post.platform === "facebook" ? (
              <FacebookEmbed url={post.url} />
            ) : (
              <InstagramEmbed url={post.url} />
            )}
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
