import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, MapPin, Package } from "lucide-react";

export default function Lista() {
  const pickingList = [
    { address: "01-A-01", product: "Parafuso M8 x 50mm", sku: "PAR-M8-001", quantity: 50, unit: "UN" },
    { address: "01-A-03", product: "Porca M8", sku: "POR-M8-001", quantity: 50, unit: "UN" },
    { address: "01-A-05", product: "Arruela Lisa 10mm", sku: "ARR-10-001", quantity: 100, unit: "UN" },
    { address: "02-B-01", product: "Cabo Elétrico 2.5mm", sku: "CAB-25-001", quantity: 25, unit: "M" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Lista de Separação" />
        <main className="p-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Lista de Separação #OS-123</CardTitle>
                <Button>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Data: 29/10/2025 | Cliente: Cliente A | Total de itens: {pickingList.length}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pickingList.map((item, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">{index + 1}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span className="text-lg font-bold text-primary">{item.address}</span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{item.product}</span>
                            </div>
                            <p className="text-sm text-muted-foreground ml-6">SKU: {item.sku}</p>
                          </div>
                          
                          <div className="flex items-center gap-4 ml-6">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Quantidade:</span>
                              <span className="text-xl font-bold">{item.quantity} {item.unit}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                            <span className="text-xs text-muted-foreground text-center">Conferido</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Instruções:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>1. Siga a ordem dos endereços para otimizar o percurso</li>
                  <li>2. Confira a quantidade coletada antes de seguir para o próximo item</li>
                  <li>3. Marque a caixa "Conferido" após separar cada item</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
