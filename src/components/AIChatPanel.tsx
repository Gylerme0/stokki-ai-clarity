import { useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatPanel = ({ isOpen, onClose }: AIChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o assistente inteligente do Stokki. Como posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulação de resposta da IA
    setTimeout(() => {
      const responses = [
        "Posso sugerir um pedido de compra baseado no histórico de consumo.",
        "Identifiquei 3 itens com risco de vencimento nos próximos 15 dias.",
        "A análise de Curva ABC mostra oportunidades de otimização no seu estoque.",
        "Detectei padrões de consumo sazonal. Deseja ver um relatório detalhado?",
      ];
      const aiMessage: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-64 w-80 h-[500px] bg-card border-l border-t border-border shadow-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h3 className="font-medium">Assistente IA</h3>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-primary-hover rounded p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              "p-3 rounded-lg text-sm",
              msg.role === "user"
                ? "bg-primary text-primary-foreground ml-8"
                : "bg-secondary/10 text-foreground mr-8"
            )}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Pergunte sobre seu estoque..."
            className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
