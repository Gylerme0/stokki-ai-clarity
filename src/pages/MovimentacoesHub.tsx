import { Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { PackagePlus, PackageMinus, ArrowLeftRight, ClipboardEdit } from "lucide-react";

const movimentacoes = [
  { title: "Registrar Entrada", icon: PackagePlus, path: "/movimentacoes/entrada", variant: "success" },
  { title: "Registrar Saída", icon: PackageMinus, path: "/movimentacoes/saida", variant: "error" },
  { title: "Transferência Interna", icon: ArrowLeftRight, path: "/movimentacoes/transferencia", variant: "default" },
  { title: "Ajuste de Inventário", icon: ClipboardEdit, path: "/movimentacoes/ajuste", variant: "warning" },
];

export default function MovimentacoesHub() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Movimentações" />
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movimentacoes.map((item) => {
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
