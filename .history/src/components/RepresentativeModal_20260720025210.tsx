import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Representative } from "@/data/representatives";
import { Check, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Props {
  representative: Representative | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
