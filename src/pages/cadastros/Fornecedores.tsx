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

export default function Fornecedores() {
  const { loading, executeQuery, executeUpdate } = useDatabase();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    razao_social: "",
    cnpj: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  const loadSuppliers = () => {
    if (!loading) {
      const results = executeQuery("SELECT * FROM fornecedores ORDER BY id DESC");
      setSuppliers(results);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentId) {
      executeUpdate(
        "UPDATE fornecedores SET razao_social = ?, cnpj = ?, telefone = ?, email = ?, endereco = ? WHERE id = ?",
        [formData.razao_social, formData.cnpj, formData.telefone, formData.email, formData.endereco, currentId]
      );
      toast.success("Fornecedor atualizado com sucesso!");
    } else {
      executeUpdate(
        "INSERT INTO fornecedores (razao_social, cnpj, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)",
        [formData.razao_social, formData.cnpj, formData.telefone, formData.email, formData.endereco]
      );
      toast.success("Fornecedor criado com sucesso!");
    }

    loadSuppliers();
    setDialogOpen(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      razao_social: "",
      cnpj: "",
      telefone: "",
      email: "",
      endereco: "",
    });
  };

  const handleEdit = (supplier: any) => {
    setFormData({
      razao_social: supplier.razao_social,
      cnpj: supplier.cnpj,
      telefone: supplier.telefone,
      email: supplier.email,
      endereco: supplier.endereco || "",
    });
    setCurrentId(supplier.id);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    executeUpdate("DELETE FROM fornecedores WHERE id = ?", [id]);
    toast.success("Fornecedor excluído com sucesso!");
    loadSuppliers();
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({
        razao_social: "",
        cnpj: "",
        telefone: "",
        email: "",
        endereco: "",
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
        <Header title="Gestão de Fornecedores" />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Fornecedores</h2>
            <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Fornecedor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{isEditing ? "Editar Fornecedor" : "Criar Novo Fornecedor"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="razao_social">Razão Social *</Label>
                      <Input 
                        id="razao_social" 
                        placeholder="Ex: Fornecedor A Ltda" 
                        required 
                        value={formData.razao_social}
                        onChange={(e) => setFormData({ ...formData, razao_social: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ *</Label>
                      <Input 
                        id="cnpj" 
                        placeholder="00.000.000/0000-00" 
                        required 
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input 
                        id="telefone" 
                        placeholder="(00) 00000-0000" 
                        required 
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="contato@fornecedor.com" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input 
                        id="endereco" 
                        placeholder="Rua, Número, Bairro, Cidade - UF" 
                        value={formData.endereco}
                        onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => handleDialogChange(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {isEditing ? "Atualizar Fornecedor" : "Salvar Fornecedor"}
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
                  <TableHead>Razão Social</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.razao_social}</TableCell>
                    <TableCell>{supplier.cnpj}</TableCell>
                    <TableCell>{supplier.telefone}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(supplier)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(supplier.id)}
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
