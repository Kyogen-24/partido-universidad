import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
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

      <div className="grid gap-10 sm:items-start sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border border-border/40 bg-white p-4 shadow-xl sm:p-5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {representative.name}
            </h1>
            <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
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
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {representative.links.map((link) => (
                  <LinkButton key={link.url} link={link} size="lg" />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight">Biografía</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {representative.fullBio}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
