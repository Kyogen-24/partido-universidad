"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ejes } from "@/data/propuestas-detalle";
import {
  Building2,
  GraduationCap,
  FlaskConical,
  ChevronRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  building: Building2,
  graduation: GraduationCap,
  flask: FlaskConical,
};

const colorMap: Record<string, { bg: string; text: string; border: string; accent: string; dot: string }> = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    accent: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    accent: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  teal: {
    bg: "bg-teal-50 dark:bg-teal-950/30",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-200 dark:border-teal-800",
    accent: "text-teal-600 dark:text-teal-400",
    dot: "bg-teal-500",
  },
};

export function PropuestaDetalleAccordion() {
  return (
    <Accordion className="space-y-4">
      {ejes.map((eje, ejeIndex) => {
        const Icon = iconMap[eje.icono] ?? Building2;
        const colors = colorMap[eje.color] ?? colorMap.emerald;

        return (
          <AccordionItem
            key={ejeIndex}
            value={`eje-${ejeIndex}`}
            className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden`}
          >
            {/* Eje trigger — only the title is visible */}
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-3 text-left">
                <span className={`flex-shrink-0 rounded-xl p-2.5 ${colors.bg} border ${colors.border}`}>
                  <Icon className={`h-5 w-5 ${colors.accent}`} />
                </span>
                <span className={`font-heading text-base sm:text-lg font-bold ${colors.text}`}>
                  {eje.titulo}
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="px-5 pb-5">
                {/* Inner accordion for subsecciones */}
                <Accordion className="space-y-2">
                  {eje.subsecciones.map((sub, subIndex) => (
                    <AccordionItem
                      key={subIndex}
                      value={`${ejeIndex}-${subIndex}`}
                      className="rounded-xl border border-slate-200/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 overflow-hidden"
                    >
                      <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <span className="flex items-center gap-2 text-left">
                          <ChevronRight className={`h-3.5 w-3.5 ${colors.accent} transition-transform group-data-[state=open]/accordion-item:rotate-90`} />
                          {sub.titulo}
                          <span className="ml-2 text-xs font-normal text-muted-foreground whitespace-nowrap">
                            ({sub.items.length})
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <ul className="space-y-2 pb-1">
                          {sub.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                            >
                              <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.dot}`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
