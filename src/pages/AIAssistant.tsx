import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Send, Sparkles, TrendingUp, Package, AlertCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "chart" | "suggestions" | "actions";
  data?: any;
  timestamp: Date;
}

const mockChartData = [
  { mes: "Jan", entradas: 45, saidas: 32 },
  { mes: "Fev", entradas: 52, saidas: 38 },
  { mes: "Mar", entradas: 61, saidas: 45 },
  { mes: "Abr", entradas: 58, saidas: 52 },
  { mes: "Mai", entradas: 67, saidas: 48 },
  { mes: "Jun", entradas: 73, saidas: 61 },
];

const mockInventoryData = [
  { categoria: "Eletrônicos", quantidade: 245 },
  { categoria: "Perecíveis", quantidade: 189 },
  { categoria: "Ferramentas", quantidade: 156 },
  { categoria: "Materiais", quantidade: 312 },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Olá! Sou o assistente inteligente do Stokki. Estou aqui para ajudar você a gerenciar seu estoque de forma mais eficiente. Como posso ajudar hoje?",
    type: "text",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    role: "assistant",
    content: "Aqui está um resumo das movimentações dos últimos 6 meses:",
    type: "chart",
    data: { chartData: mockChartData, chartType: "line" },
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: "3",
    role: "assistant",
    content: "Identifiquei algumas oportunidades de otimização:",
    type: "suggestions",
    data: {
      suggestions: [
        { icon: AlertCircle, title: "3 itens em risco de vencimento", description: "Nos próximos 15 dias", color: "warning", link: "/relatorios/estoque" },
        { icon: TrendingUp, title: "Análise de Curva ABC", description: "Otimize seu estoque", color: "accent", link: "/relatorios/curva-abc" },
        { icon: Package, title: "5 itens com estoque baixo", description: "Sugerir pedido de compra", color: "destructive", link: "/cadastros/materiais" },
      ],
    },
    timestamp: new Date(Date.now() - 3400000),
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      type: "text",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulação de resposta da IA
    setTimeout(() => {
      const responses = [
        {
          content: "Analisando seus dados... Encontrei informações importantes sobre o estoque de eletrônicos.",
          type: "text" as const,
        },
        {
          content: "Aqui está a distribuição atual do seu inventário por categoria:",
          type: "chart" as const,
          data: { chartData: mockInventoryData, chartType: "bar" },
        },
        {
          content: "Baseado no histórico de consumo, recomendo as seguintes ações:",
          type: "actions" as const,
          data: {
            actions: [
              { title: "Criar Ordem de Compra", description: "Para 8 itens prioritários", link: "/ordens/criar" },
              { title: "Ajustar Estoque Mínimo", description: "3 categorias precisam revisão", link: "/cadastros/materiais" },
              { title: "Ver Relatório de Giro", description: "Análise detalhada disponível", link: "/relatorios/giro" },
            ],
          },
        },
      ];

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        ...responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const renderMessage = (msg: Message) => {
    if (msg.role === "user") {
      return (
        <div className="flex justify-end">
          <div className="max-w-[70%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3">
            <p className="text-sm">{msg.content}</p>
            <span className="text-xs opacity-70 mt-1 block">
              {msg.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-start">
        <div className="max-w-[85%]">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="h-4 w-4 text-accent-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              {msg.type === "text" && (
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <p className="text-sm text-foreground">{msg.content}</p>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {msg.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              )}

              {msg.type === "chart" && (
                <>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <p className="text-sm text-foreground">{msg.content}</p>
                  </div>
                  <Card className="p-4">
                    <ResponsiveContainer width="100%" height={250}>
                      {msg.data.chartType === "line" ? (
                        <LineChart data={msg.data.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Line type="monotone" dataKey="entradas" stroke="hsl(var(--secondary))" strokeWidth={2} />
                          <Line type="monotone" dataKey="saidas" stroke="hsl(var(--destructive))" strokeWidth={2} />
                        </LineChart>
                      ) : (
                        <BarChart data={msg.data.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="categoria" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="quantidade" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </Card>
                </>
              )}

              {msg.type === "suggestions" && (
                <>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <p className="text-sm text-foreground">{msg.content}</p>
                  </div>
                  <div className="grid gap-2">
                    {msg.data.suggestions.map((suggestion: any, idx: number) => {
                      const Icon = suggestion.icon;
                      return (
                        <Link key={idx} to={suggestion.link}>
                          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4" style={{ borderLeftColor: `hsl(var(--${suggestion.color}))` }}>
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg bg-${suggestion.color}/10`}>
                                <Icon className={`h-5 w-5 text-${suggestion.color}`} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-foreground">{suggestion.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}

              {msg.type === "actions" && (
                <>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <p className="text-sm text-foreground">{msg.content}</p>
                  </div>
                  <div className="grid gap-2">
                    {msg.data.actions.map((action: any, idx: number) => (
                      <Link key={idx} to={action.link}>
                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer hover:bg-accent/5">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-sm text-foreground">{action.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                            </div>
                            <Button size="sm" variant="outline">
                              Abrir
                            </Button>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Assistente Inteligente" />
        
        <main className="p-8 pt-24 h-screen flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Assistente Inteligente</h1>
              <p className="text-sm text-muted-foreground">Otimize seu estoque com inteligência artificial</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <Button variant="outline" className="justify-start gap-2" onClick={() => setInput("Mostre o relatório de estoque")}>
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Ver Relatórios</span>
            </Button>
            <Button variant="outline" className="justify-start gap-2" onClick={() => setInput("Quais itens estão com estoque baixo?")}>
              <Package className="h-4 w-4" />
              <span className="text-xs">Estoque Baixo</span>
            </Button>
            <Button variant="outline" className="justify-start gap-2" onClick={() => setInput("Analisar movimentações do mês")}>
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Análise Mensal</span>
            </Button>
            <Button variant="outline" className="justify-start gap-2" onClick={() => setInput("Itens próximos ao vencimento")}>
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs">Vencimentos</span>
            </Button>
          </div>

          {/* Chat Area */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id}>{renderMessage(msg)}</div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Pergunte sobre seu estoque, análises, relatórios..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={handleSend} disabled={isTyping || !input.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                O assistente pode analisar dados, gerar relatórios e sugerir ações estratégicas
              </p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
