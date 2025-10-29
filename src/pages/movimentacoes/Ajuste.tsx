import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardEdit } from "lucide-react";
import { toast } from "sonner";

export default function Ajuste() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Ajuste de inventário salvo com sucesso!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Ajuste de Inventário" />
        <main className="p-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <ClipboardEdit className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>Ajuste de Inventário</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
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
                    <Label htmlFor="address">Endereço *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="addr1">01-A-01 (Picking)</SelectItem>
                        <SelectItem value="addr2">01-A-02 (Picking)</SelectItem>
                        <SelectItem value="addr3">02-B-01 (Armazém)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Saldo Sistema</Label>
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted">
                      <span className="text-sm font-medium">150 UN</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="counted">Quantidade Física Contada *</Label>
                    <Input id="counted" type="number" placeholder="0" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Diferença</Label>
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted">
                      <span className="text-sm font-medium text-warning">-5 UN (Falta)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="reason">Motivo do Ajuste *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sobra">Sobra (Contagem Física)</SelectItem>
                        <SelectItem value="falta">Falta (Contagem Física)</SelectItem>
                        <SelectItem value="contagem">Contagem Cíclica</SelectItem>
                        <SelectItem value="avaria">Avaria Identificada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Input id="notes" placeholder="Detalhes adicionais sobre o ajuste" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline">Cancelar</Button>
                  <Button type="submit">Salvar Ajuste</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
