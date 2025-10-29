import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

export default function CurvaABC() {
  const abcData = [
    { product: "Parafuso M8 x 50mm", class: "A", value: "R$ 45.000,00", percentage: "30%" },
    { product: "Porca M8", class: "A", value: "R$ 40.000,00", percentage: "26.7%" },
    { product: "Cabo Elétrico 2.5mm", class: "A", value: "R$ 35.000,00", percentage: "23.3%" },
    { product: "Arruela Lisa 10mm", class: "B", value: "R$ 15.000,00", percentage: "10%" },
    { product: "Chave Philips", class: "B", value: "R$ 10.000,00", percentage: "6.7%" },
    { product: "Fita Isolante", class: "C", value: "R$ 5.000,00", percentage: "3.3%" },
  ];

  const getClassVariant = (classType: string) => {
    switch (classType) {
      case "A": return "destructive";
      case "B": return "warning";
      case "C": return "secondary";
      default: return "default";
    }
  };

  const summary = {
    classA: { count: 3, percentage: "80%", color: "text-destructive" },
    classB: { count: 2, percentage: "15%", color: "text-warning" },
    classC: { count: 1, percentage: "5%", color: "text-secondary" },
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Relatório - Curva ABC" />
        <main className="p-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Classe A (Críticos)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-destructive">{summary.classA.count} itens</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {summary.classA.percentage} do valor total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Classe B (Importantes)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-warning">{summary.classB.count} itens</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {summary.classB.percentage} do valor total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Classe C (Normais)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-secondary">{summary.classC.count} itens</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {summary.classC.percentage} do valor total
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Análise de Curva ABC</CardTitle>
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
                      <TableHead>Classe</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                      <TableHead className="text-right">% Acumulado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {abcData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>
                          <Badge variant={getClassVariant(item.class) as any}>
                            Classe {item.class}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold">{item.value}</TableCell>
                        <TableCell className="text-right">{item.percentage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Interpretação:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><strong className="text-destructive">Classe A:</strong> Produtos de alto valor - Controle rigoroso e reabastecimento prioritário</li>
                  <li><strong className="text-warning">Classe B:</strong> Produtos de valor médio - Controle moderado</li>
                  <li><strong className="text-secondary">Classe C:</strong> Produtos de baixo valor - Controle simplificado</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
