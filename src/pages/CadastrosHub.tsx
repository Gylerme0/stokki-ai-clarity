import { Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, MapPin, FolderTree, Ruler } from "lucide-react";

const cadastros = [
  { title: "Gerenciar Materiais", icon: Package, path: "/cadastros/materiais" },
  { title: "Gerenciar Fornecedores", icon: Truck, path: "/cadastros/fornecedores" },
  { title: "Gerenciar Endereços", icon: MapPin, path: "/cadastros/enderecos" },
  { title: "Gerenciar Categorias", icon: FolderTree, path: "/cadastros/categorias" },
  { title: "Gerenciar Unidades de Medida", icon: Ruler, path: "/cadastros/unidades" },
];

export default function CadastrosHub() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Cadastros" />
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cadastros.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                      <Icon className="h-12 w-12 text-primary" />
                      <h3 className="text-lg font-medium text-center">{item.title}</h3>
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
