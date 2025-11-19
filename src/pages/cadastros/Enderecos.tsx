import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useDatabase } from "@/hooks/useDatabase";

export default function Enderecos() {
  const { loading, executeQuery, executeUpdate } = useDatabase();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    type: "",
    capacity: "",
    occupied: "0",
  });

  const loadAddresses = () => {
    if (!loading) {
      const results = executeQuery("SELECT * FROM enderecos ORDER BY id DESC");
      setAddresses(results);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentId) {
      executeUpdate(
        "UPDATE enderecos SET code = ?, type = ?, capacity = ?, occupied = ? WHERE id = ?",
        [formData.code, formData.type, parseInt(formData.capacity), parseInt(formData.occupied), currentId]
      );
      toast.success("Endereço atualizado com sucesso!");
    } else {
      executeUpdate(
        "INSERT INTO enderecos (code, type, capacity, occupied) VALUES (?, ?, ?, ?)",
        [formData.code, formData.type, parseInt(formData.capacity), parseInt(formData.occupied)]
      );
      toast.success("Endereço criado com sucesso!");
    }

    loadAddresses();
    setDialogOpen(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      code: "",
      type: "",
      capacity: "",
      occupied: "0",
    });
  };

  const handleEdit = (address: any) => {
    setFormData({
      code: address.code,
      type: address.type,
      capacity: address.capacity.toString(),
      occupied: address.occupied.toString(),
    });
    setCurrentId(address.id);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    executeUpdate("DELETE FROM enderecos WHERE id = ?", [id]);
    toast.success("Endereço excluído com sucesso!");
    loadAddresses();
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({
        code: "",
        type: "",
        capacity: "",
        occupied: "0",
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
        <Header title="Gestão de Endereços" />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Endereços de Armazém</h2>
            <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Endereço
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isEditing ? "Editar Endereço" : "Criar Novo Endereço"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código do Endereço *</Label>
                    <Input 
                      id="code" 
                      placeholder="Ex: 01-A-03" 
                      required 
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select 
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Prateleira">Prateleira</SelectItem>
                        <SelectItem value="Rack">Rack</SelectItem>
                        <SelectItem value="Picking">Picking</SelectItem>
                        <SelectItem value="Armazém">Armazém</SelectItem>
                        <SelectItem value="Expedição">Expedição</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacidade *</Label>
                    <Input 
                      id="capacity" 
                      type="number"
                      placeholder="100" 
                      required 
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupied">Ocupado</Label>
                    <Input 
                      id="occupied" 
                      type="number"
                      placeholder="0" 
                      value={formData.occupied}
                      onChange={(e) => setFormData({ ...formData, occupied: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => handleDialogChange(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {isEditing ? "Atualizar Endereço" : "Salvar Endereço"}
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
                  <TableHead>Tipo</TableHead>
                  <TableHead>Capacidade</TableHead>
                  <TableHead>Ocupado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.map((address) => (
                  <TableRow key={address.id}>
                    <TableCell className="font-medium">{address.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{address.type}</Badge>
                    </TableCell>
                    <TableCell>{address.capacity}</TableCell>
                    <TableCell>{address.occupied}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(address)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(address.id)}
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
