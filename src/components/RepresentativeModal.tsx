import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Representative } from "@/data/representatives";
import { Check, ChevronRight } from "lucide-react";
import LinkButton from "./LinkButton";

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
  if (!representative) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 border-2 border-slate-200">
        {/* Hero con imagen y nombre */}
        <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={representative.photo}
              alt={representative.name}
              className="h-24 w-auto aspect-[3/4] rounded-2xl object-contain ring-2 ring-white shadow-md bg-slate-100"
            />
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-xl leading-tight">
                {representative.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm">
                {representative.badge}
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="px-6 py-5 space-y-6">
          {/* Links */}
          {representative.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {representative.links.map((link) => (
                <LinkButton key={link.url} link={link} />
              ))}
            </div>
          )}

          {/* Propuestas */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              Propuestas principales
            </h3>
            <ul className="space-y-2.5">
              {representative.proposals.map((proposal, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-3 text-sm text-slate-700 leading-relaxed"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white mt-0.5">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span>{proposal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA fijo abajo */}
        <div className="px-6 pb-6 pt-2">
          <a
            href={`/candidato/${representative.slug}`}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Ver perfil completo
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
