import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  ClipboardList, 
  BarChart3, 
  Package, 
  ShieldCheck, 
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import stokkiLogo from "@/assets/stokki-logo.png";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  activeItem?: string;
  onAIChatToggle?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "movimentacoes", label: "Movimentações", icon: ArrowLeftRight, path: "/movimentacoes" },
  { id: "ordens", label: "Ordens de Separação", icon: ClipboardList, path: "/ordens" },
  { id: "relatorios", label: "Relatórios", icon: BarChart3, path: "/relatorios" },
  { id: "cadastros", label: "Cadastros", icon: Package, path: "/cadastros" },
  { id: "administracao", label: "Administração", icon: ShieldCheck, path: "/administracao" },
];

export const Sidebar = ({ onAIChatToggle }: SidebarProps) => {
  const location = useLocation();

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <Link
        key={item.id}
        to={item.path}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sidebar-foreground",
          isActive 
            ? "bg-sidebar-accent font-medium" 
            : "hover:bg-sidebar-primary/50"
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
        <img src={stokkiLogo} alt="Stokki Logo" className="h-10 w-10" />
        <div>
          <h1 className="text-xl font-bold text-sidebar-foreground">Stokki</h1>
          <p className="text-xs text-sidebar-foreground/70">WMS - Gestão Inteligente</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              {renderNavItem(item)}
            </li>
          ))}
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
