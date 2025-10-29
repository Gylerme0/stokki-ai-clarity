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
          <Route path="/cadastros" element={<CadastrosHub />} />
          <Route path="/movimentacoes" element={<MovimentacoesHub />} />
          <Route path="/ordens" element={<OrdensHub />} />
          <Route path="/relatorios" element={<RelatoriosHub />} />
          <Route path="/administracao" element={<AdministracaoHub />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
