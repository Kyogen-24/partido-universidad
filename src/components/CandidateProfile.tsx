import { motion } from "motion/react";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  FileText,
  GraduationCap,
  Microscope,
  Quote,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Representative } from "@/data/representatives";
import LinkButton from "./LinkButton";

interface Props {
  representative: Representative;
}

const STAT_ICONS = [FileText, TrendingUp, Star, Microscope, Users, Award, GraduationCap, CheckCircle2];

export default function CandidateProfile({ representative }: Props) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
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

      <div className="grid gap-10 sm:items-start sm:gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)]">
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
          className="space-y-10"
        >
          {/* Bio */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Quote className="h-4 w-4" />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">Biografía</h2>
            </div>
            <div className="rounded-2xl border border-border/40 bg-white p-6 sm:p-8 shadow-sm">
              {representative.fullBio.split("\n").filter((p) => p.trim()).map((paragraph, i) => (
                <p key={i} className="text-sm sm:text-base leading-relaxed text-muted-foreground [&:not(:last-child)]:mb-3">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </section>

          {/* Stats */}
          {representative.stats && representative.stats.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Cifras destacadas</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {representative.stats.map((stat, i) => {
                  const Icon = STAT_ICONS[i % STAT_ICONS.length];
                  return (
                    <div
                      key={i}
                      className="group rounded-2xl border border-border/40 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary/80 mb-2 transition-colors group-hover:text-primary" strokeWidth={1.5} />
                      <div className="text-2xl sm:text-3xl font-bold text-slate-900 leading-none">
                        {stat.value}
                      </div>
                      <div className="mt-1.5 text-[11px] sm:text-xs text-muted-foreground leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Highlights */}
          {representative.highlights && representative.highlights.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award className="h-4 w-4" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Logros y reconocimientos</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {representative.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border/40 bg-white p-3.5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-slate-700 leading-snug">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
}
