import { useState } from "react";
import { representatives, type Representative } from "@/data/representatives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const borderColors = ["border-eres-blue", "border-eres-amber", "border-eres-green"];
const badgeColors = ["bg-eres-blue", "bg-eres-amber", "bg-eres-green"];

export default function FormulaCambio() {
  const [selected, setSelected] = useState<Representative | null>(null);

  return (
    <>
      <section id="candidatos" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-eres-green px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              Equipo
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              LA FÓRMULA DEL CAMBIO
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Conoce a nuestros candidatos a la rectoría y vicerrectorías
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {representatives.map((rep, i) => (
              <button
                key={rep.id}
                type="button"
                onClick={() => setSelected(rep)}
                className="text-center group cursor-pointer"
              >
                <div
                  className={`mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 transition-transform duration-300 group-hover:scale-105 ${borderColors[i]}`}
                >
                  <img
                    src={rep.photo}
                    alt={rep.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 font-heading text-base font-bold uppercase text-foreground">
                  {rep.position}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {rep.shortName} - {rep.career}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-full border-3 ${
                    borderColors[representatives.indexOf(selected)]
                  }`}
                >
                  <img
                    src={selected.photo}
                    alt={selected.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <DialogTitle className="text-lg">{selected.name}</DialogTitle>
                  <DialogDescription>
                    <span
                      className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                        badgeColors[representatives.indexOf(selected)]
                      }`}
                    >
                      {selected.badge}
                    </span>
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                {selected.fullBio}
              </p>

              <div>
                <h4 className="mb-2 font-heading text-sm font-bold uppercase text-foreground">
                  Propuestas clave
                </h4>
                <ul className="space-y-2">
                  {selected.proposals.map((proposal, j) => (
                    <li key={j} className="flex items-start gap-2 text-muted-foreground">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        badgeColors[representatives.indexOf(selected)]
                      }`} />
                      {proposal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
