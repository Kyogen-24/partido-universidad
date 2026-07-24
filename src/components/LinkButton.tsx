import { Globe } from "@/lib/icons";
import { FaLinkedin, FaOrcid, FaFlask, FaCertificate } from "react-icons/fa6";
import { SiScopus } from "react-icons/si";
import type { RepresentativeLink } from "@/data/representatives";

const ICON_MAP: Record<RepresentativeLink["type"], React.ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedin,
  website: Globe,
  orcid: FaOrcid,
  scopus: SiScopus,
  ctivitae: FaCertificate,
  renacyt: FaFlask,
};

interface Props {
  link: RepresentativeLink;
  size?: "sm" | "lg";
}

export default function LinkButton({ link, size = "sm" }: Props) {
  const Icon = ICON_MAP[link.type];

  const sizes = {
  sm: "px-2 py-0.5 text-[10px] leading-none gap-1",
  lg: "px-2.5 py-1 text-xs gap-1.5",
};

const iconSizes = {
  sm: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-full border bg-primary border-primary text-primary-foreground font-medium transition-opacity hover:opacity-90 ${sizes[size]}`}
    >
      <Icon className={iconSizes[size]} />
      <span>{link.label}</span>
    </a>
  );
}
