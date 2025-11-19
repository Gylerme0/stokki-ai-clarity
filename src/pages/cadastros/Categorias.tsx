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

export default function Categorias() {
  const { loading, executeQuery, executeUpdate } = useDatabase();
  const [categories, setCategories] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const loadCategories = () => {
    if (!loading) {
      const results = executeQuery("SELECT * FROM categorias ORDER BY id");
      setCategories(results);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      executeUpdate(
        "UPDATE categorias SET name = ?, description = ? WHERE id = ?",
        [formData.name, formData.description, editingCategory.id]
      );
      toast.success("Categoria atualizada com sucesso!");
    } else {
      executeUpdate(
        "INSERT INTO categorias (name, description) VALUES (?, ?)",
        [formData.name, formData.description]
      );
      toast.success("Categoria criada com sucesso!");
    }
    loadCategories();
    setIsDialogOpen(false);
    setFormData({ name: "", description: "" });
    setEditingCategory(null);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description || "" });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    executeUpdate("DELETE FROM categorias WHERE id = ?", [id]);
    toast.success("Categoria excluída com sucesso!");
    loadCategories();
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setFormData({ name: "", description: "" });
      setEditingCategory(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header title="Gestão de Categorias" />
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
        <Header title="Gestão de Categorias" />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Categorias</h2>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? "Editar Categoria" : "Criar Nova Categoria"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Categoria *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Fixação"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      placeholder="Ex: Parafusos, porcas, arruelas"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => handleDialogChange(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingCategory ? "Atualizar" : "Salvar"} Categoria
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
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(category.id)}
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
