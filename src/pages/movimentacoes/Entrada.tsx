import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PackagePlus } from "lucide-react";
import { toast } from "sonner";

export default function Entrada() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Entrada registrada com sucesso!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Registrar Entrada" />
        <main className="p-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <PackagePlus className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Entrada de Material</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Fornecedor *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o fornecedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forn1">Fornecedor A Ltda</SelectItem>
                        <SelectItem value="forn2">Fornecedor B S.A.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product">Produto *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Buscar produto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prod1">PAR-M8-001 - Parafuso M8</SelectItem>
                        <SelectItem value="prod2">POR-M8-001 - Porca M8</SelectItem>
                        <SelectItem value="prod3">ARR-10-001 - Arruela Lisa 10mm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade Recebida *</Label>
                    <Input id="quantity" type="number" placeholder="0" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço de Destino *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o endereço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="addr1">01-A-01 (Picking)</SelectItem>
                        <SelectItem value="addr2">01-A-02 (Picking)</SelectItem>
                        <SelectItem value="addr3">02-B-01 (Armazém)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Input id="notes" placeholder="Notas adicionais sobre o recebimento" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline">Cancelar</Button>
                  <Button type="submit">Confirmar Entrada</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
