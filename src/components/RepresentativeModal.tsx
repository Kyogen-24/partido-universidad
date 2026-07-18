import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Representative } from "@/data/representatives";
import { GraduationCap, Check, Award } from "@/lib/icons";

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
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <img
              src={representative.photo}
              alt={representative.name}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-border"
            />
            <div>
              <DialogTitle className="text-lg">
                {representative.name}
              </DialogTitle>
              <DialogDescription className="mt-0.5">
                {representative.badge}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4" />
            <span>{representative.career}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {representative.fullBio}
          </p>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Propuestas principales
            </p>
            <ul className="space-y-1.5">
              {representative.proposals.map((proposal) => (
                <li
                  key={proposal}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                  <span>{proposal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
