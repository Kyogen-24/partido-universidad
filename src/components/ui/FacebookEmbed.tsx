interface FacebookEmbedProps {
  url: string;
  className?: string;
}

export default function FacebookEmbed({ url, className }: FacebookEmbedProps) {
  const pluginUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=360&height=640&appId`;

  return (
    <div
      className={`flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-b-xl bg-slate-50 ${className ?? ""}`}
    >
      <div className="relative aspect-[9/16] h-full">
        <iframe
          src={pluginUrl}
          className="absolute inset-0 h-full w-full border-0"
          scrolling="no"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Video de Facebook"
          loading="lazy"
        />
      </div>
    </div>
  );
}
