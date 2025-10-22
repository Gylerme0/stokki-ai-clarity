import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureSuggestionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  status?: "soon" | "beta" | "new";
  className?: string;
}

export const FeatureSuggestionCard = ({
  icon: Icon,
  title,
  description,
  status,
  className,
}: FeatureSuggestionCardProps) => {
  return (
    <div
      className={cn(
        "p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer",
        className
      )}
    >
      {/* Status Badge */}
      {status && (
        <div
          className={cn(
            "absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded",
            status === "soon" && "bg-muted text-muted-foreground",
            status === "beta" && "bg-accent/10 text-accent",
            status === "new" && "bg-secondary/10 text-secondary"
          )}
        >
          {status === "soon" && "Em Breve"}
          {status === "beta" && "Beta"}
          {status === "new" && "Novo"}
        </div>
      )}

      {/* Icon */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Content */}
      <h3 className="font-medium text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/20 rounded-lg transition-colors pointer-events-none" />
    </div>
  );
};
