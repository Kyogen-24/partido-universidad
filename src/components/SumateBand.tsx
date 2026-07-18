import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { RippleButton, RippleButtonRipples } from "@/components/animate-ui/components/buttons/ripple";

const ERES_BUBBLE_COLORS = {
  first: "66,133,244",
  second: "52,168,83",
  third: "251,188,5",
  fourth: "234,67,53",
  fifth: "66,133,244",
  sixth: "52,168,83",
};

export default function SumateBand() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border/40">
      <BubbleBackground colors={ERES_BUBBLE_COLORS} className="absolute inset-0 -z-10" />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Sumate al cambio
        </h2>
        <p className="mt-4 text-white/80">
          Estudiantes, docentes y personal administrativo: la UNC que queremos la construimos juntos.
        </p>
        <div className="mt-8 flex justify-center">
          <RippleButton
            asChild
            variant="ghost"
            style={{ "--ripple-button-ripple-color": "rgba(255,255,255,0.5)" } as React.CSSProperties}
          >
            <a
              href="#contacto"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Quiero sumarme
              <RippleButtonRipples />
            </a>
          </RippleButton>
        </div>
      </div>
    </section>
  );
}
