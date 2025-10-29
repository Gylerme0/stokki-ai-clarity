import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import CadastrosHub from "./pages/CadastrosHub";
import MovimentacoesHub from "./pages/MovimentacoesHub";
import OrdensHub from "./pages/OrdensHub";
import RelatoriosHub from "./pages/RelatoriosHub";
import AdministracaoHub from "./pages/AdministracaoHub";
import Materiais from "./pages/cadastros/Materiais";
import Fornecedores from "./pages/cadastros/Fornecedores";
import Enderecos from "./pages/cadastros/Enderecos";
import Categorias from "./pages/cadastros/Categorias";
import Unidades from "./pages/cadastros/Unidades";
import Entrada from "./pages/movimentacoes/Entrada";
import Saida from "./pages/movimentacoes/Saida";
import Transferencia from "./pages/movimentacoes/Transferencia";
import Ajuste from "./pages/movimentacoes/Ajuste";
import Monitor from "./pages/ordens/Monitor";
import Criar from "./pages/ordens/Criar";
import Lista from "./pages/ordens/Lista";
import Estoque from "./pages/relatorios/Estoque";
import Rastreabilidade from "./pages/relatorios/Rastreabilidade";
import CurvaABC from "./pages/relatorios/CurvaABC";
import Giro from "./pages/relatorios/Giro";
import Usuarios from "./pages/administracao/Usuarios";
import Auditoria from "./pages/administracao/Auditoria";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          
          {/* Cadastros */}
          <Route path="/cadastros" element={<CadastrosHub />} />
          <Route path="/cadastros/materiais" element={<Materiais />} />
          <Route path="/cadastros/fornecedores" element={<Fornecedores />} />
          <Route path="/cadastros/enderecos" element={<Enderecos />} />
          <Route path="/cadastros/categorias" element={<Categorias />} />
          <Route path="/cadastros/unidades" element={<Unidades />} />
          
          {/* Movimentações */}
          <Route path="/movimentacoes" element={<MovimentacoesHub />} />
          <Route path="/movimentacoes/entrada" element={<Entrada />} />
          <Route path="/movimentacoes/saida" element={<Saida />} />
          <Route path="/movimentacoes/transferencia" element={<Transferencia />} />
          <Route path="/movimentacoes/ajuste" element={<Ajuste />} />
          
          {/* Ordens */}
          <Route path="/ordens" element={<OrdensHub />} />
          <Route path="/ordens/monitor" element={<Monitor />} />
          <Route path="/ordens/criar" element={<Criar />} />
          <Route path="/ordens/lista" element={<Lista />} />
          
          {/* Relatórios */}
          <Route path="/relatorios" element={<RelatoriosHub />} />
          <Route path="/relatorios/estoque" element={<Estoque />} />
          <Route path="/relatorios/rastreabilidade" element={<Rastreabilidade />} />
          <Route path="/relatorios/curva-abc" element={<CurvaABC />} />
          <Route path="/relatorios/giro" element={<Giro />} />
          
          {/* Administração */}
          <Route path="/administracao" element={<AdministracaoHub />} />
          <Route path="/administracao/usuarios" element={<Usuarios />} />
          <Route path="/administracao/auditoria" element={<Auditoria />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
