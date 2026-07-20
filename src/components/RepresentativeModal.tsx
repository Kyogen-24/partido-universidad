import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type {
  Representative,
  RepresentativeLink,
  RepresentativeLinkType,
} from "@/data/representatives";
import {
  Award,
  BookOpen,
  Check,
  ExternalLink,
  Globe,
  X,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Props {
  representative: Representative | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#0a66c2"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
      />
    </svg>
  );
}

function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="128" cy="128" r="128" fill="#a6ce39" />
      <path
        fill="#fff"
        d="M86.3 186.2H70.9V79.1h15.4zM78.6 67.5c-5.1 0-9.2-4.1-9.2-9.2s4.1-9.2 9.2-9.2 9.2 4.1 9.2 9.2c.1 5.1-4.1 9.2-9.2 9.2zM188.1 186.2h-15.4v-9.6c-3.6 6.1-10.7 11.4-21.7 11.4-15.4 0-26.3-10.5-26.3-30.2v-46.7H140v43.5c0 11.4 3.6 17.8 13.4 17.8 9.4 0 14.5-6.5 14.5-17.8v-43.5h15.4v74.1zM104.7 108.7c-3.6 0-6.5 2.9-6.5 6.5v48.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5v-48.5c0-3.6-2.9-6.5-6.5-6.5z"
      />
      <path
        fill="#fff"
        d="M120.2 79.1H95.7v107.1h24.5c29.1 0 45.3-19.6 45.3-53.6s-16.2-53.5-45.3-53.5zm-1.6 92.5h-10.4V93.7h10.4c20.4 0 31.7 12.9 31.7 38.9 0 26.1-11.3 39-31.7 39z"
      />
    </svg>
  );
}

function ScopusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#e9711c"
        d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm0 21.6c-.5 0-1-.04-1.5-.12-3.43-.55-5.7-3.93-5.7-7.38 0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8c0 1.3-1.1 2.4-2.4 2.4s-2.4-1.1-2.4-2.4c0-.4.3-.7.7-.7s.7.3.7.7c0 .55.45 1 1 1s1-.45 1-1c0-1.93-1.57-3.5-3.5-3.5S4 11.07 4 13c0 2.93 1.94 5.93 4.93 6.43.5.08 1.02.13 1.54.13 4.1 0 7.43-3.33 7.43-7.43S14.57 4.7 10.47 4.7c-2.85 0-5.32 1.6-6.55 3.95-.2.36-.04.82.32 1.02.36.2.82.04 1.02-.32 1.04-1.97 3.1-3.25 5.5-3.25 3.4 0 6.16 2.76 6.16 6.16 0 3.4-2.76 6.16-6.16 6.16z"
      />
    </svg>
  );
}

const linkIconMap: Record<
  RepresentativeLinkType,
  { Icon: React.ComponentType<{ className?: string }>; className?: string }
> = {
  linkedin: { Icon: LinkedinIcon },
  orcid: { Icon: OrcidIcon },
  scopus: { Icon: ScopusIcon },
  ctivitae: { Icon: BookOpen, className: "text-primary" },
  renacyt: { Icon: Award, className: "text-primary" },
  website: { Icon: Globe, className: "text-primary" },
};

function LinkButton({ link }: { link: RepresentativeLink }) {
  const { Icon, className } = linkIconMap[link.type];
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary sm:px-3 sm:py-1.5 sm:text-xs"
    >
      <Icon className={`h-3.5 w-3.5 ${className ?? ""}`} />
      <span>{link.label}</span>
      <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-90" />
    </a>
  );
}

export default function RepresentativeModal({
  representative,
  open,
  onOpenChange,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    if (!open) return;
    setShowBlur(false);
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowBlur(scrollHeight - scrollTop - clientHeight > 40);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [open]);

  if (!representative) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(90vh,42rem)] w-full max-w-[calc(100%-1rem)] flex-col overflow-hidden rounded-2xl border border-border/40 bg-background p-0 shadow-2xl sm:max-w-2xl sm:rounded-3xl">
        {/* Header with photo */}
        <div className="relative shrink-0">
          <div className="aspect-[16/6] w-full overflow-hidden bg-muted sm:aspect-[16/7]">
            <img
              src={representative.photo}
              alt={representative.name}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-[10px] font-medium text-primary backdrop-blur-sm sm:text-xs">
              {representative.badge}
            </span>
            <DialogTitle className="mt-1.5 text-lg font-bold leading-tight sm:mt-2 sm:text-3xl">
              {representative.name}
            </DialogTitle>

            {/* Perfiles académicos y profesionales */}
            {representative.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {representative.links.map((link) => (
                  <LinkButton key={link.url} link={link} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="relative min-h-0 flex-1">
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto px-4 pb-5 sm:px-6 sm:pb-6"
          >
            {/* Bio */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {representative.fullBio}
            </p>

            {/* Propuestas */}
            <div className="mt-5 space-y-3 sm:mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Propuestas principales
              </p>
              <ul className="space-y-2">
                {representative.proposals.map((proposal) => (
                  <li
                    key={proposal}
                    className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-muted/30 p-3 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{proposal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Progressive blur at bottom */}
          <div
            className={`pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent transition-opacity duration-300 sm:h-20 ${
              showBlur ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
