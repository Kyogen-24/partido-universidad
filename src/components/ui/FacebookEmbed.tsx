interface FacebookEmbedProps {
  url: string;
  className?: string;
}

export default function FacebookEmbed({ url, className }: FacebookEmbedProps) {
  const isPost = url.includes("/posts/");
  const pluginUrl = isPost
    ? `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
        url
      )}&show_text=true&width=500`
    : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=false&width=360&height=640&appId`;

  return (
    <div
      className={`w-full overflow-hidden rounded-b-xl bg-slate-50 ${isPost ? "min-h-[400px]" : "aspect-[4/5]"} ${className ?? ""}`}
    >
      {isPost ? (
        <iframe
          src={pluginUrl}
          className="w-full border-0"
          style={{ height: "500px" }}
          scrolling="no"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Publicación de Facebook"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[4/5] w-full items-center justify-center">
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
      )}
    </div>
  );
}
