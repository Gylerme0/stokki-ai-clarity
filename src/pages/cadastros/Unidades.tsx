import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useDatabase } from "@/hooks/useDatabase";

export default function Unidades() {
  const { loading, executeQuery, executeUpdate } = useDatabase();
  const [units, setUnits] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<any>(null);
  const [formData, setFormData] = useState({ code: "", name: "", description: "" });

  const loadUnits = () => {
    if (!loading) {
      const results = executeQuery("SELECT * FROM unidades ORDER BY id");
      setUnits(results);
    }
  };

  useEffect(() => {
    loadUnits();
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUnit) {
      executeUpdate(
        "UPDATE unidades SET code = ?, name = ?, description = ? WHERE id = ?",
        [formData.code, formData.name, formData.description, editingUnit.id]
      );
      toast.success("Unidade atualizada com sucesso!");
    } else {
      executeUpdate(
        "INSERT INTO unidades (code, name, description) VALUES (?, ?, ?)",
        [formData.code, formData.name, formData.description]
      );
      toast.success("Unidade criada com sucesso!");
    }
    loadUnits();
    setIsDialogOpen(false);
    setFormData({ code: "", name: "", description: "" });
    setEditingUnit(null);
  };

  const handleEdit = (unit: any) => {
    setEditingUnit(unit);
    setFormData({ code: unit.code, name: unit.name, description: unit.description || "" });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    executeUpdate("DELETE FROM unidades WHERE id = ?", [id]);
    toast.success("Unidade excluída com sucesso!");
    loadUnits();
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setFormData({ code: "", name: "", description: "" });
      setEditingUnit(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header title="Gestão de Unidades de Medida" />
          <main className="p-8">
            <div className="text-center">Carregando...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Gestão de Unidades de Medida" />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Unidades de Medida</h2>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Unidade
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingUnit ? "Editar Unidade" : "Criar Nova Unidade"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código *</Label>
                    <Input
                      id="code"
                      placeholder="Ex: UN"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Unidade"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      placeholder="Ex: Unidade individual"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => handleDialogChange(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingUnit ? "Atualizar" : "Salvar"} Unidade
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-card rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.code}</TableCell>
                    <TableCell>{unit.name}</TableCell>
                    <TableCell>{unit.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(unit)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(unit.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
