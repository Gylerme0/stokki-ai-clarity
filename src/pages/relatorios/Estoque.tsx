import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download } from "lucide-react";

export default function Estoque() {
  const stockData = [
    { product: "Parafuso M8 x 50mm", sku: "PAR-M8-001", address: "01-A-01", stock: 500, category: "Fixação" },
    { product: "Porca M8", sku: "POR-M8-001", address: "01-A-03", stock: 450, category: "Fixação" },
    { product: "Arruela Lisa 10mm", sku: "ARR-10-001", address: "01-A-05", stock: 300, category: "Fixação" },
    { product: "Cabo Elétrico 2.5mm", sku: "CAB-25-001", address: "02-B-01", stock: 250, category: "Elétrica" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Relatório - Posição de Estoque" />
        <main className="p-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Posição de Estoque</CardTitle>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar produto..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="fixacao">Fixação</SelectItem>
                    <SelectItem value="eletrica">Elétrica</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os endereços" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="picking">Picking</SelectItem>
                    <SelectItem value="armazem">Armazém</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Endereço</TableHead>
                      <TableHead className="text-right">Saldo Atual</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockData.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-medium">{item.sku}</TableCell>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell className="text-right font-bold">{item.stock} UN</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
