import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AIAssistant from "./pages/AIAssistant";
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
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/assistente-ia" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          
            {/* Cadastros */}
            <Route path="/cadastros" element={<ProtectedRoute><CadastrosHub /></ProtectedRoute>} />
            <Route path="/cadastros/materiais" element={<ProtectedRoute><Materiais /></ProtectedRoute>} />
            <Route path="/cadastros/fornecedores" element={<ProtectedRoute><Fornecedores /></ProtectedRoute>} />
            <Route path="/cadastros/enderecos" element={<ProtectedRoute><Enderecos /></ProtectedRoute>} />
            <Route path="/cadastros/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
            <Route path="/cadastros/unidades" element={<ProtectedRoute><Unidades /></ProtectedRoute>} />
            
            {/* Movimentações */}
            <Route path="/movimentacoes" element={<ProtectedRoute><MovimentacoesHub /></ProtectedRoute>} />
            <Route path="/movimentacoes/entrada" element={<ProtectedRoute><Entrada /></ProtectedRoute>} />
            <Route path="/movimentacoes/saida" element={<ProtectedRoute><Saida /></ProtectedRoute>} />
            <Route path="/movimentacoes/transferencia" element={<ProtectedRoute><Transferencia /></ProtectedRoute>} />
            <Route path="/movimentacoes/ajuste" element={<ProtectedRoute><Ajuste /></ProtectedRoute>} />
            
            {/* Ordens */}
            <Route path="/ordens" element={<ProtectedRoute><OrdensHub /></ProtectedRoute>} />
            <Route path="/ordens/monitor" element={<ProtectedRoute><Monitor /></ProtectedRoute>} />
            <Route path="/ordens/criar" element={<ProtectedRoute><Criar /></ProtectedRoute>} />
            <Route path="/ordens/lista" element={<ProtectedRoute><Lista /></ProtectedRoute>} />
            
            {/* Relatórios */}
            <Route path="/relatorios" element={<ProtectedRoute><RelatoriosHub /></ProtectedRoute>} />
            <Route path="/relatorios/estoque" element={<ProtectedRoute><Estoque /></ProtectedRoute>} />
            <Route path="/relatorios/rastreabilidade" element={<ProtectedRoute><Rastreabilidade /></ProtectedRoute>} />
            <Route path="/relatorios/curva-abc" element={<ProtectedRoute><CurvaABC /></ProtectedRoute>} />
            <Route path="/relatorios/giro" element={<ProtectedRoute><Giro /></ProtectedRoute>} />
            
            {/* Administração */}
            <Route path="/administracao" element={<ProtectedRoute><AdministracaoHub /></ProtectedRoute>} />
            <Route path="/administracao/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
            <Route path="/administracao/auditoria" element={<ProtectedRoute><Auditoria /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
