import React, { useState } from "react";

interface FacebookEmbedProps {
  url: string;
  isDragging?: boolean;
  className?: string;
}

export default function FacebookEmbed({ url, isDragging = false, className = "" }: FacebookEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  const isReel = url.includes("/reel/");
  const isVideo = url.includes("/videos/") || url.includes("watch");
  const isPost = !isReel && !isVideo;

  // Facebook plugin parameters:
  // Post width 320px targets mobile viewports cleanly without right-side clipping
  const pluginUrl = isPost
    ? `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
        url
      )}&show_text=true&width=320`
    : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=false&width=320&height=560&appId`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-b-2xl bg-slate-50 flex flex-col justify-between h-[480px] ${className}`}
    >
      {/* Skeleton de carga animado */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50/95 p-4 animate-pulse rounded-b-2xl">
          <div className="h-10 w-10 rounded-full bg-slate-200 mb-3 flex items-center justify-center">
            <svg className="h-5 w-5 text-[#1877f2] opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <div className="h-3 w-3/4 rounded bg-slate-200 mb-2"></div>
          <div className="h-3 w-1/2 rounded bg-slate-200 mb-4"></div>
          <span className="text-xs text-slate-400 font-medium">Cargando {isReel ? "Reel" : "Publicación"}...</span>
        </div>
      )}

      {/* Contenedor del Iframe con desactivación de puntero durante drag */}
      <div
        className={`relative w-full flex-1 overflow-hidden flex items-center justify-center bg-white rounded-b-2xl ${
          isDragging ? "pointer-events-none select-none" : ""
        }`}
      >
        <iframe
          src={pluginUrl}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0 rounded-b-2xl"
          scrolling="no"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title={isReel ? "Reel de Facebook" : isVideo ? "Video de Facebook" : "Publicación de Facebook"}
          loading="lazy"
        />
      </div>
    </div>
  );
}


