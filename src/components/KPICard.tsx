import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "error";
}

export const KPICard = ({ title, value, icon: Icon, variant = "default" }: KPICardProps) => {
  const variantStyles = {
    default: "text-foreground",
    success: "text-secondary",
    warning: "text-warning",
    error: "text-destructive",
  };

  return (
    <Card className="p-6 bg-card border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-normal">{title}</p>
          <p className={cn("text-3xl font-bold", variantStyles[variant])}>
            {value}
          </p>
        </div>
        <div className="p-3 bg-background rounded-lg">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
};
