import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { KPICard } from "@/components/KPICard";
import { ActionButton } from "@/components/ActionButton";
import { AlertCard } from "@/components/AlertCard";
import { QuickReportLink } from "@/components/QuickReportLink";
import { AIChatPanel } from "@/components/AIChatPanel";
import { FeatureSuggestionCard } from "@/components/FeatureSuggestionCard";
import { 
  DollarSign, 
  AlertTriangle, 
  XCircle, 
  Target,
  Plus,
  TrendingUp,
  ClipboardCheck,
  ArrowLeftRight,
  BarChart3,
  TrendingDown,
  Package,
  AlertCircle,
  Lightbulb,
  Calendar,
  QrCode,
  Bell,
  LineChart,
  Smartphone,
  Truck,
} from "lucide-react";

const Index = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        activeItem="dashboard" 
        onAIChatToggle={() => setIsAIChatOpen(!isAIChatOpen)}
      />
      
      <div className="flex-1 ml-64">
        <Header title="Dashboard" />
        
        <div className="flex gap-6 p-8">
          {/* Main Dashboard Panel - Center Column */}
          <main className="flex-1 space-y-8">
            {/* KPI Section */}
            <section>
              <div className="grid grid-cols-2 gap-4">
                <KPICard
                  title="Valor do Inventário"
                  value="R$ 150.432,00"
                  icon={DollarSign}
                  variant="default"
                />
                <KPICard
                  title="Itens em Alerta"
                  value="15 Itens"
                  icon={AlertTriangle}
                  variant="warning"
                />
                <KPICard
                  title="Itens Esgotados"
                  value="3 Itens"
                  icon={XCircle}
                  variant="error"
                />
                <KPICard
                  title="Acuracidade Média"
                  value="99.2%"
                  icon={Target}
                  variant="success"
                />
              </div>
            </section>

            {/* Quick Actions Section */}
            <section className="space-y-4">
              <h2 className="text-[20px] font-medium text-foreground">Ações Rápidas</h2>
              <div className="grid grid-cols-2 gap-3">
                <ActionButton
                  label="Receber Mercadoria"
                  icon={Plus}
                  variant="primary"
                />
                <ActionButton
                  label="Registrar Saída"
                  icon={TrendingUp}
                  variant="primary"
                />
                <ActionButton
                  label="Realizar Contagem"
                  icon={ClipboardCheck}
                  variant="secondary"
                />
                <ActionButton
                  label="Transferir Estoque"
                  icon={ArrowLeftRight}
                  variant="secondary"
                />
              </div>
            </section>

            {/* Quick Reports Section */}
            <section className="space-y-4">
              <h2 className="text-[20px] font-medium text-foreground">Análises Gerenciais</h2>
              <div className="space-y-3">
                <QuickReportLink
                  label="Análise de Curva ABC"
                  icon={BarChart3}
                />
                <QuickReportLink
                  label="Análise de Giro de Estoque"
                  icon={TrendingDown}
                />
                <QuickReportLink
                  label="Posição de Estoque Completa"
                  icon={Package}
                />
              </div>
            </section>

            {/* Future Features Section */}
            <section className="space-y-4">
              <h2 className="text-[20px] font-medium text-foreground">Funcionalidades Futuras</h2>
              <div className="grid grid-cols-2 gap-4">
                <FeatureSuggestionCard
                  icon={Calendar}
                  title="Previsão de Demanda"
                  description="IA prevê demanda futura baseada em histórico e sazonalidade"
                  status="soon"
                />
                <FeatureSuggestionCard
                  icon={QrCode}
                  title="Etiquetas QR Code"
                  description="Geração automática de etiquetas para rastreamento"
                  status="beta"
                />
                <FeatureSuggestionCard
                  icon={Bell}
                  title="Alertas Personalizados"
                  description="Configure notificações customizadas por item ou categoria"
                  status="soon"
                />
                <FeatureSuggestionCard
                  icon={LineChart}
                  title="Análise Preditiva"
                  description="Identifica tendências e oportunidades de otimização"
                  status="new"
                />
                <FeatureSuggestionCard
                  icon={Smartphone}
                  title="App Mobile"
                  description="Gestão de estoque direto do celular ou tablet"
                  status="soon"
                />
                <FeatureSuggestionCard
                  icon={Truck}
                  title="Integração com Transportadoras"
                  description="Rastreamento automático de entregas e recebimentos"
                  status="beta"
                />
              </div>
            </section>
          </main>

          {/* AI Action Feed Panel - Right Column */}
          <aside className="w-96 space-y-6">
            <h2 className="text-[20px] font-medium text-foreground">Alertas e Ações (IA)</h2>
            
            <div className="space-y-4">
              <AlertCard
                title="Estoque Mínimo Atingido"
                description="O item 'Parafuso M8' (50 un) atingiu o estoque mínimo de 50 un."
                icon={AlertTriangle}
                variant="warning"
                actionLabel="Sugerir Pedido de Compra"
              />

              <AlertCard
                title="Guardião de Validade (IA)"
                description="O Lote #1234 (Leite) vence em 10 dias. O giro médio é de 30 dias. Alto risco de perda."
                icon={Lightbulb}
                variant="ai"
                actionLabel="Sugerir Promoção / Ação"
              />

              <AlertCard
                title="Ruptura de Estoque"
                description="O item 'Produto X' está zerado. 3 pedidos foram afetados."
                icon={AlertCircle}
                variant="error"
                actionLabel="Ver Pedidos Afetados"
              />
            </div>
          </aside>
        </div>
      </div>

      {/* AI Chat Panel */}
      <AIChatPanel isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
};

export default Index;
