import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ChatPage = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.askQuestion(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error asking question:", error);
      // Handle error by showing an error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-[#121212] text-divine-blue dark:text-white pb-20">
      <div className="container max-w-xl mx-auto px-4">
        <Header />
        
        <main className="py-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-mukti font-bold mb-6 text-center"
          >
            {t("chat.greeting")}
          </motion.h1>

          <div className="divine-card mb-6 dark:bg-[#1E1E1E] dark:border-divine-gold/10 min-h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-divine-blue/50 dark:text-white/50 mt-8">
                  <p className="text-lg font-mukti">🕉️ {t("chat.greeting")}</p>
                  <p className="mt-2">{t("chat.welcomeMessage")}</p>
                  <p className="mt-1 text-sm">{t("chat.description")}</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-4",
                        message.role === "user"
                          ? "bg-divine-saffron/10 text-divine-blue dark:text-white"
                          : "bg-divine-cream dark:bg-[#1E1E1E] text-divine-blue dark:text-white"
                      )}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-divine-gold/10 dark:border-divine-gold/20">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("chat.placeholder")}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="divine-button"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <Navigation />
      </div>
    </div>
  );
};

export default ChatPage; 