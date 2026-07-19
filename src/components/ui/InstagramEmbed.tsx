import { cn } from "@/lib/utils";

interface InstagramEmbedProps {
  url: string;
  className?: string;
}

const POST_PATTERN = /instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/;

export default function InstagramEmbed({ url, className }: InstagramEmbedProps) {
  const match = url.match(POST_PATTERN);

  if (!match) {
    return (
      <div
        className={cn(
          "flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-muted p-4 text-center",
          className
        )}
      >
        <p className="text-sm text-muted-foreground">No se pudo cargar la publicación.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary underline"
        >
          Ver en Instagram
        </a>
      </div>
    );
  }

  const [, type, postId] = match;
  const embedUrl = `https://www.instagram.com/${type}/${postId}/embed/captioned/`;

  return (
    <div className={cn("relative aspect-[4/5] w-full overflow-hidden bg-white", className)}>
      <iframe
        src={embedUrl}
        className="absolute inset-0 h-full w-full border-0"
        scrolling="no"
        title="Publicación de Instagram"
        loading="lazy"
      />
    </div>
  );
}
