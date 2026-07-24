import { motion } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";
import type { Representative } from "@/data/representatives";
import LinkButton from "./LinkButton";

interface Props {
  representative: Representative;
}

export default function CandidateProfile({ representative }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <motion.a
        href="/#equipo"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al equipo
      </motion.a>

      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-12">
        <motion.div
          className="mx-auto w-full max-w-[320px] sm:mx-0 sm:max-w-none sm:w-[400px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border border-border/40 bg-white p-5 shadow-xl sm:p-6">
            <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              {representative.name}
            </h1>
            <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {representative.badge}
            </span>

            <div className="mt-4 overflow-hidden rounded-xl">
              <img
                src={representative.photo}
                alt={representative.name}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>

            {representative.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {representative.links.map((link) => (
                  <LinkButton key={link.url} link={link} size="lg" />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div>
            <h2 className="font-heading text-xl font-semibold">Descripción</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {representative.fullBio}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold">Propuestas</h2>
            <ul className="mt-3 space-y-2.5">
              {representative.proposals.map((proposal) => (
                <li
                  key={proposal}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span>{proposal}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
