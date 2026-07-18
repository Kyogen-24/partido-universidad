import { BubbleBackground } from "./animate-ui/components/backgrounds/bubble";
import { GravityStarsBackground } from "./animate-ui/components/backgrounds/gravity-stars";

export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <BubbleBackground
        interactive
        className="pointer-events-auto bg-gradient-to-br from-white via-sky-50 to-emerald-50"
        colors={{
          first: "191,219,254",
          second: "165,243,252",
          third: "187,247,208",
          fourth: "224,242,254",
          fifth: "209,250,229",
          sixth: "147,197,253",
        }}
      >
        <GravityStarsBackground
          className="absolute inset-0 text-sky-400/70"
          starsCount={130}
          starsSize={2.5}
          starsOpacity={0.55}
          glowIntensity={11}
          movementSpeed={0.25}
        />
      </BubbleBackground>
    </div>
  );
}
