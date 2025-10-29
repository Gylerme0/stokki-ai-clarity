import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Monitor() {
  const navigate = useNavigate();
  
  const orders = [
    { id: "OS-001", status: "Pendente", date: "29/10/2025", client: "Cliente A", items: 5 },
    { id: "OS-002", status: "Em Separação", date: "29/10/2025", client: "Cliente B", items: 8 },
    { id: "OS-003", status: "Separado", date: "28/10/2025", client: "Cliente C", items: 3 },
    { id: "OS-004", status: "Pendente", date: "28/10/2025", client: "Cliente D", items: 12 },
    { id: "OS-005", status: "Em Separação", date: "27/10/2025", client: "Cliente E", items: 6 },
    { id: "OS-006", status: "Cancelado", date: "27/10/2025", client: "Cliente F", items: 4 },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Pendente": return "warning";
      case "Em Separação": return "default";
      case "Separado": return "secondary";
      case "Cancelado": return "destructive";
      default: return "default";
    }
  };

  const filterOrders = (status?: string) => {
    if (!status) return orders;
    return orders.filter(o => o.status === status);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Ordens de Separação" />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Monitor de Ordens</h2>
            <Button onClick={() => navigate("/ordens/criar")}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Ordem
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todas ({orders.length})</TabsTrigger>
              <TabsTrigger value="pendente">Pendente ({filterOrders("Pendente").length})</TabsTrigger>
              <TabsTrigger value="separacao">Em Separação ({filterOrders("Em Separação").length})</TabsTrigger>
              <TabsTrigger value="separado">Separado ({filterOrders("Separado").length})</TabsTrigger>
              <TabsTrigger value="cancelado">Cancelado ({filterOrders("Cancelado").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="bg-card rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nº Ordem</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Cliente/Pedido</TableHead>
                      <TableHead>Itens</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status) as any}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.client}</TableCell>
                        <TableCell>{order.items} itens</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status !== "Cancelado" && order.status !== "Separado" && (
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {["pendente", "separacao", "separado", "cancelado"].map(tab => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <div className="bg-card rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nº Ordem</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Cliente/Pedido</TableHead>
                        <TableHead>Itens</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterOrders(tab === "pendente" ? "Pendente" : tab === "separacao" ? "Em Separação" : tab === "separado" ? "Separado" : "Cancelado").map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(order.status) as any}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.client}</TableCell>
                          <TableCell>{order.items} itens</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {order.status !== "Cancelado" && order.status !== "Separado" && (
                              <Button variant="ghost" size="sm">
                                <X className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
