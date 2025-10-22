import { LayoutDashboard, Package, ArrowLeftRight, BarChart3, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import stokkiLogo from "@/assets/stokki-logo.png";

interface SidebarProps {
  activeItem?: string;
  onAIChatToggle?: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "estoque", label: "Estoque", icon: Package },
  { id: "movimentacoes", label: "Movimentações", icon: ArrowLeftRight },
  { id: "relatorios", label: "Relatórios", icon: BarChart3 },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

export const Sidebar = ({ activeItem = "dashboard", onAIChatToggle }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
        <img src={stokkiLogo} alt="Stokki Logo" className="h-10 w-10" />
        <div>
          <h1 className="text-xl font-bold text-sidebar-foreground">Stokki</h1>
          <p className="text-xs text-sidebar-foreground/70">WMS - Gestão Inteligente</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem;
            
            return (
              <li key={item.id}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sidebar-foreground",
                    isActive 
                      ? "bg-sidebar-accent font-medium" 
                      : "hover:bg-sidebar-primary/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* AI Chat Toggle Button */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <button
          onClick={onAIChatToggle}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-sidebar-accent text-sidebar-accent-foreground hover:opacity-90"
        >
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium">Assistente IA</span>
        </button>
      </div>
    </aside>
  );
};
