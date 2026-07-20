import { Globe, ExternalLink } from "@/lib/icons";
import { FaLinkedin } from "react-icons/fa6";
import type { RepresentativeLink } from "@/data/representatives";

const ICON_MAP: Record<RepresentativeLink["type"], React.ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedin,
  website: Globe,
  orcid: ExternalLink,
  scopus: ExternalLink,
  ctivitae: ExternalLink,
  renacyt: ExternalLink,
};

interface Props {
  link: RepresentativeLink;
}

export default function LinkButton({ link }: Props) {
  const Icon = ICON_MAP[link.type];

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted"
    >
      <Icon className="h-3 w-3" />
      <span>{link.label}</span>
    </a>
  );
}
