import { Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Plus, List } from "lucide-react";

const ordens = [
  { title: "Monitor de Ordens", icon: Monitor, path: "/ordens/monitor" },
  { title: "Criar Nova Ordem", icon: Plus, path: "/ordens/criar" },
  { title: "Lista de Separação", icon: List, path: "/ordens/lista" },
];

export default function OrdensHub() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Ordens de Separação" />
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ordens.map((item) => {
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
