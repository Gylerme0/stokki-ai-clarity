import { Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Package, History, TrendingUp, BarChart3 } from "lucide-react";

const relatorios = [
  { title: "Posição de Estoque", icon: Package, path: "/relatorios/estoque" },
  { title: "Rastreabilidade", icon: History, path: "/relatorios/rastreabilidade" },
  { title: "Curva ABC", icon: BarChart3, path: "/relatorios/curva-abc" },
  { title: "Giro de Estoque", icon: TrendingUp, path: "/relatorios/giro" },
];

export default function RelatoriosHub() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Relatórios" />
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatorios.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-12 space-y-4">
                      <Icon className="h-16 w-16 text-primary" />
                      <h3 className="text-xl font-medium text-center">{item.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
