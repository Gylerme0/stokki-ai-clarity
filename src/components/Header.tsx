import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
      <h1 className="text-[32px] font-bold text-foreground">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar produtos, lotes, movimentações..." 
            className="pl-10 bg-background border-input"
          />
        </div>
        
        <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <User className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </header>
  );
};
