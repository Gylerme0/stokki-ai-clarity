import { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface QuickReportLinkProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const QuickReportLink = ({ 
  label, 
  icon: Icon,
  onClick 
}: QuickReportLinkProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted hover:border-primary transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-background rounded">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  );
};
