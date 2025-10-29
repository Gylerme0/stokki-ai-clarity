import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

export default function Giro() {
  const turnoverData = [
    { product: "Parafuso M8 x 50mm", turnover: 12.5, days: 29, status: "Excelente" },
    { product: "Porca M8", turnover: 8.3, days: 44, status: "Bom" },
    { product: "Cabo Elétrico 2.5mm", turnover: 6.2, days: 58, status: "Regular" },
    { product: "Arruela Lisa 10mm", turnover: 2.1, days: 171, status: "Baixo" },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Excelente": return "secondary";
      case "Bom": return "default";
      case "Regular": return "warning";
      case "Baixo": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Relatório - Giro de Estoque" />
        <main className="p-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Giro Médio Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                  <p className="text-3xl font-bold">7.3x</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Giros por ano
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dias Médios em Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">50 dias</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tempo médio de permanência
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Produtos com Baixo Giro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-8 w-8 text-destructive" />
                  <p className="text-3xl font-bold">1 item</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Requer atenção
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Análise de Giro por Produto</CardTitle>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Giro (vezes/ano)</TableHead>
                      <TableHead className="text-right">Dias em Estoque</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {turnoverData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell className="text-right font-bold">{item.turnover}x</TableCell>
                        <TableCell className="text-right">{item.days} dias</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(item.status) as any}>
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Interpretação:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><strong className="text-secondary">Giro Alto ({">"} 10x/ano):</strong> Produtos de alta rotatividade - Reabastecimento frequente necessário</li>
                  <li><strong className="text-foreground">Giro Bom (6-10x/ano):</strong> Rotatividade saudável</li>
                  <li><strong className="text-warning">Giro Regular (3-6x/ano):</strong> Monitore para evitar excesso de estoque</li>
                  <li><strong className="text-destructive">Giro Baixo ({"<"} 3x/ano):</strong> Possível excesso de estoque - Considere promoções</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
