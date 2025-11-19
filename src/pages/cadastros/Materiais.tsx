import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useDatabase } from "@/hooks/useDatabase";

export default function Materiais() {
  const { loading, executeQuery, executeUpdate } = useDatabase();
  const [materials, setMaterials] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    sku: "",
    description: "",
    category: "",
    stock: "0",
    unit: "",
    supplier: "",
    picking_address: "",
  });

  const loadMaterials = () => {
    if (!loading) {
      const results = executeQuery("SELECT * FROM materiais ORDER BY id DESC");
      setMaterials(results);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentId) {
      executeUpdate(
        "UPDATE materiais SET sku = ?, description = ?, category = ?, stock = ?, unit = ?, supplier = ?, picking_address = ? WHERE id = ?",
        [formData.sku, formData.description, formData.category, parseInt(formData.stock), formData.unit, formData.supplier, formData.picking_address, currentId]
      );
      toast.success("Material atualizado com sucesso!");
    } else {
      executeUpdate(
        "INSERT INTO materiais (sku, description, category, stock, unit, supplier, picking_address) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [formData.sku, formData.description, formData.category, parseInt(formData.stock), formData.unit, formData.supplier, formData.picking_address]
      );
      toast.success("Material criado com sucesso!");
    }

    loadMaterials();
    setDialogOpen(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      sku: "",
      description: "",
      category: "",
      stock: "0",
      unit: "",
      supplier: "",
      picking_address: "",
    });
  };

  const handleEdit = (material: any) => {
    setFormData({
      sku: material.sku,
      description: material.description,
      category: material.category,
      stock: material.stock.toString(),
      unit: material.unit,
      supplier: material.supplier || "",
      picking_address: material.picking_address || "",
    });
    setCurrentId(material.id);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    executeUpdate("DELETE FROM materiais WHERE id = ?", [id]);
    toast.success("Material excluído com sucesso!");
    loadMaterials();
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({
        sku: "",
        description: "",
        category: "",
        stock: "0",
        unit: "",
        supplier: "",
        picking_address: "",
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Gestão de Materiais" />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Materiais</h2>
            <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Material
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{isEditing ? "Editar Material" : "Criar Novo Material"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU *</Label>
                      <Input 
                        id="sku" 
                        placeholder="Ex: PAR-M8-001" 
                        required 
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição *</Label>
                      <Input 
                        id="description" 
                        placeholder="Ex: Parafuso M8" 
                        required 
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <Select 
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fixação">Fixação</SelectItem>
                          <SelectItem value="Ferramentas">Ferramentas</SelectItem>
                          <SelectItem value="Elétrica">Elétrica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unidade de Medida *</Label>
                      <Select 
                        value={formData.unit}
                        onValueChange={(value) => setFormData({ ...formData, unit: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UN">Unidade (UN)</SelectItem>
                          <SelectItem value="KG">Quilograma (KG)</SelectItem>
                          <SelectItem value="M">Metro (M)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Estoque Inicial</Label>
                      <Input 
                        id="stock" 
                        type="number" 
                        placeholder="0" 
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Fornecedor Padrão</Label>
                      <Input 
                        id="supplier" 
                        placeholder="Nome do fornecedor" 
                        value={formData.supplier}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="picking_address">Endereço de Picking</Label>
                      <Input 
                        id="picking_address" 
                        placeholder="Ex: A01-01-01" 
                        value={formData.picking_address}
                        onChange={(e) => setFormData({ ...formData, picking_address: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => handleDialogChange(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {isEditing ? "Atualizar Material" : "Salvar Material"}
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
                  <TableHead>SKU</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.sku}</TableCell>
                    <TableCell>{material.description}</TableCell>
                    <TableCell>{material.category}</TableCell>
                    <TableCell>{material.stock}</TableCell>
                    <TableCell>{material.unit}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(material)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(material.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
