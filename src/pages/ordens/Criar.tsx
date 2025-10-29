import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Criar() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const pendingOrders = [
    { id: "PED-001", client: "Cliente A", items: 5, date: "29/10/2025" },
    { id: "PED-002", client: "Cliente B", items: 8, date: "29/10/2025" },
    { id: "PED-003", client: "Cliente C", items: 3, date: "28/10/2025" },
    { id: "PED-004", client: "Cliente D", items: 12, date: "28/10/2025" },
  ];

  const toggleOrder = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleCreate = () => {
    if (selectedOrders.length === 0) {
      toast.error("Selecione pelo menos um pedido");
      return;
    }
    toast.success(`Ordem de separação criada com ${selectedOrders.length} pedido(s)!`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Criar Ordem de Separação" />
        <main className="p-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Panel - Pending Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Pedido</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Itens</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={() => toggleOrder(order.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.client}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Right Panel - New Order */}
            <Card>
              <CardHeader>
                <CardTitle>Nova Ordem de Separação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 border-2 border-dashed border-border rounded-lg">
                  {selectedOrders.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                      <ArrowRight className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Selecione pedidos ao lado para criar uma ordem de separação</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Pedidos selecionados:</span>
                        <span className="text-lg font-bold">{selectedOrders.length}</span>
                      </div>
                      <div className="space-y-2">
                        {selectedOrders.map(orderId => {
                          const order = pendingOrders.find(o => o.id === orderId);
                          return (
                            <div key={orderId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div>
                                <p className="font-medium">{order?.id}</p>
                                <p className="text-sm text-muted-foreground">{order?.client}</p>
                              </div>
                              <span className="text-sm">{order?.items} itens</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCreate}
                  disabled={selectedOrders.length === 0}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agrupar e Criar Ordem
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
