import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { KPICard } from "@/components/KPICard";
import { ActionButton } from "@/components/ActionButton";
import { AIChatPanel } from "@/components/AIChatPanel";
import { Package, AlertTriangle, XCircle, Target, PackagePlus, PackageMinus, ArrowLeftRight, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const recentOrders = [
    { id: "OS-001", status: "Pendente", date: "29/10/2025", client: "Cliente A" },
    { id: "OS-002", status: "Em Separação", date: "29/10/2025", client: "Cliente B" },
    { id: "OS-003", status: "Separado", date: "28/10/2025", client: "Cliente C" },
    { id: "OS-004", status: "Pendente", date: "28/10/2025", client: "Cliente D" },
    { id: "OS-005", status: "Em Separação", date: "27/10/2025", client: "Cliente E" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente": return "warning";
      case "Em Separação": return "default";
      case "Separado": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onAIChatToggle={() => setIsAIChatOpen(!isAIChatOpen)} />
      
      <div className="flex-1 ml-64">
        <Header title="Dashboard" />
        
        <main className="p-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Valor Total do Inventário"
              value="R$ 150.432,00"
              icon={Package}
              variant="default"
            />
            <KPICard
              title="Itens em Alerta"
              value="12 Itens"
              icon={AlertTriangle}
              variant="warning"
            />
            <KPICard
              title="Itens Esgotados"
              value="3 Itens"
              icon={XCircle}
              variant="error"
            />
            <KPICard
              title="Ordens Pendentes"
              value="5 Ordens"
              icon={Target}
              variant="default"
            />
          </div>

          {/* Ações Rápidas */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ActionButton
                  label="Registrar Entrada"
                  icon={PackagePlus}
                  variant="primary"
                />
                <ActionButton
                  label="Registrar Saída"
                  icon={PackageMinus}
                  variant="secondary"
                />
                <ActionButton
                  label="Transferir Estoque"
                  icon={ArrowLeftRight}
                  variant="secondary"
                />
                <ActionButton
                  label="Nova Ordem"
                  icon={ClipboardList}
                  variant="primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Monitor de Ordens */}
          <Card>
            <CardHeader>
              <CardTitle>Monitor de Ordens</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Ordem</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.client}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {isAIChatOpen && (
        <AIChatPanel isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
      )}
    </div>
  );
}
