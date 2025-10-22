import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  BarChart3, 
  Settings, 
  Sparkles,
  ChevronDown,
  ChevronRight,
  FileText,
  Users,
  MapPin,
  Truck,
  Building2,
  FolderTree,
  PackagePlus,
  PackageMinus,
  ClipboardCheck,
  ClipboardList,
  ScanLine,
  MapPinned,
  SearchCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import stokkiLogo from "@/assets/stokki-logo.png";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  activeItem?: string;
  onAIChatToggle?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { 
    id: "cadastros", 
    label: "Cadastros", 
    icon: FileText,
    children: [
      { id: "cadastro-produtos", label: "Produtos", icon: Package },
      { id: "cadastro-usuarios", label: "Usuários", icon: Users },
      { id: "cadastro-enderecos", label: "Endereços", icon: MapPin },
      { id: "cadastro-fornecedores", label: "Fornecedores", icon: Truck },
      { id: "cadastro-categorias", label: "Categorias", icon: FolderTree },
    ]
  },
  { 
    id: "movimentacoes", 
    label: "Movimentações", 
    icon: ArrowLeftRight,
    children: [
      { id: "entrada-mercadorias", label: "Entrada de Mercadorias", icon: PackagePlus },
      { id: "saida-mercadorias", label: "Saída de Mercadorias", icon: PackageMinus },
      { id: "conferencia-entrada", label: "Conferência de Entrada", icon: ClipboardCheck },
      { id: "conferencia-saida", label: "Conferência de Saída", icon: ClipboardList },
      { id: "transferencias", label: "Transferências", icon: ArrowLeftRight },
    ]
  },
  { 
    id: "inventario", 
    label: "Inventário", 
    icon: ScanLine,
    children: [
      { id: "contagem-estoque", label: "Contagem de Estoque", icon: ClipboardCheck },
      { id: "enderecamento", label: "Endereçamento", icon: MapPinned },
      { id: "verificar-enderecamento", label: "Verificar Endereçamento", icon: SearchCheck },
      { id: "posicao-estoque", label: "Posição de Estoque", icon: Package },
    ]
  },
  { id: "relatorios", label: "Relatórios", icon: BarChart3 },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

export const Sidebar = ({ activeItem = "dashboard", onAIChatToggle }: SidebarProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>(["movimentacoes", "inventario"]);

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = item.id === activeItem;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus.includes(item.id);

    if (hasChildren) {
      return (
        <Collapsible
          key={item.id}
          open={isOpen}
          onOpenChange={() => toggleMenu(item.id)}
        >
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sidebar-foreground",
                isActive 
                  ? "bg-sidebar-accent font-medium" 
                  : "hover:bg-sidebar-primary/50"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm flex-1 text-left">{item.label}</span>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {item.children?.map((child) => {
              const ChildIcon = child.icon;
              const isChildActive = child.id === activeItem;
              
              return (
                <button
                  key={child.id}
                  className={cn(
                    "w-full flex items-center gap-3 pl-12 pr-4 py-2.5 rounded-lg transition-colors text-sidebar-foreground",
                    isChildActive 
                      ? "bg-sidebar-accent font-medium" 
                      : "hover:bg-sidebar-primary/50"
                  )}
                >
                  <ChildIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{child.label}</span>
                </button>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <button
        key={item.id}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sidebar-foreground",
          isActive 
            ? "bg-sidebar-accent font-medium" 
            : "hover:bg-sidebar-primary/50"
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm">{item.label}</span>
      </button>
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
