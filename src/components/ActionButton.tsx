import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export const ActionButton = ({ 
  label, 
  icon: Icon, 
  variant = "primary",
  onClick 
}: ActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={
        variant === "primary"
          ? "w-full h-14 bg-primary hover:bg-primary-hover text-primary-foreground justify-start gap-3 text-base font-medium"
          : "w-full h-14 bg-card border-2 border-border hover:bg-muted text-foreground justify-start gap-3 text-base font-medium"
      }
    >
      <Icon className="h-5 w-5" />
      {label}
    </Button>
  );
};
