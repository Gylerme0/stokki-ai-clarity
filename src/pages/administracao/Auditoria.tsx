import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

export default function Auditoria() {
  const auditLogs = [
    { id: 1, date: "29/10/2025 14:30:15", user: "João Silva", action: "Criação de Material", details: "SKU: PAR-M8-001" },
    { id: 2, date: "29/10/2025 10:15:45", user: "Maria Santos", action: "Exclusão de Usuário", details: "Usuário: Carlos Pereira" },
    { id: 3, date: "28/10/2025 16:45:30", user: "Pedro Costa", action: "Alteração de Preço", details: "Produto: Cabo Elétrico - R$ 50,00 → R$ 55,00" },
    { id: 4, date: "28/10/2025 09:20:10", user: "João Silva", action: "Ajuste de Inventário", details: "Produto: Parafuso M8 - Quantidade: -5 UN" },
    { id: 5, date: "27/10/2025 15:10:25", user: "Admin", action: "Criação de Usuário", details: "Novo usuário: Ana Oliveira" },
  ];

  const getActionColor = (action: string) => {
    if (action.includes("Criação")) return "secondary";
    if (action.includes("Exclusão")) return "destructive";
    if (action.includes("Alteração") || action.includes("Ajuste")) return "warning";
    return "default";
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Log de Auditoria" />
        <main className="p-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Registro de Ações Críticas</CardTitle>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Log
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="grid grid-cols-3 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Última semana</SelectItem>
                    <SelectItem value="month">Último mês</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por ação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="create">Criação</SelectItem>
                    <SelectItem value="delete">Exclusão</SelectItem>
                    <SelectItem value="edit">Alteração</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Ação Realizada</TableHead>
                      <TableHead>Detalhes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.date}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>
                          <Badge variant={getActionColor(log.action) as any}>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> Este log registra todas as ações críticas realizadas no sistema, 
                  incluindo criação/edição/exclusão de registros importantes e alterações de configurações sensíveis.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
