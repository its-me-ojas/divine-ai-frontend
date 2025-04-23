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
            className="text-2xl font-mukti font-bold mb-6"
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
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col space-y-1",
                      message.role === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2 max-w-[80%] prose dark:prose-invert prose-p:my-0 prose-headings:my-0 prose-ul:my-0 prose-ol:my-0",
                        message.role === "user"
                          ? "bg-divine-saffron text-white"
                          : "bg-divine-cream/80 dark:bg-[#2A2A2A] text-divine-blue dark:text-white"
                      )}
                    >
                      {message.role === "user" ? (
                        message.content
                      ) : (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-divine-blue/50 dark:text-white/50"
                >
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }} />
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-divine-lightGold/30 dark:border-divine-gold/10">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("chat.placeholder")}
                  className="flex-1 bg-white/80 dark:bg-[#2A2A2A] border-divine-lightGold/30 dark:border-divine-gold/10"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
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