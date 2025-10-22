import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "warning" | "error" | "ai";
  actionLabel?: string;
  onAction?: () => void;
}

export const AlertCard = ({ 
  title, 
  description, 
  icon: Icon, 
  variant,
  actionLabel,
  onAction 
}: AlertCardProps) => {
  const variantStyles = {
    warning: {
      border: "border-l-4 border-l-warning",
      icon: "text-warning",
      bg: "bg-card",
    },
    error: {
      border: "border-l-4 border-l-destructive",
      icon: "text-destructive",
      bg: "bg-card",
    },
    ai: {
      border: "border-l-4 border-l-accent",
      icon: "text-accent",
      bg: "bg-card",
    },
  };

  const style = variantStyles[variant];

  return (
    <Card className={cn("p-4", style.border, style.bg)}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          <Icon className={cn("h-5 w-5", style.icon)} />
        </div>
        
        <div className="flex-1 space-y-2">
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          {actionLabel && (
            <Button
              onClick={onAction}
              size="sm"
              className="mt-2 bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
