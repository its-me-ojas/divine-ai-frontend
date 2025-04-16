
import { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample responses
  const aiResponses = [
    "According to the Bhagavad Gita, self-realization comes through understanding our true nature beyond the material body.",
    "Krishna teaches that we should perform our duties without attachment to the results. This is the essence of Karma Yoga.",
    "The concept of dharma refers to one's righteous duties according to one's position in society and stage of life.",
    "In Chapter 2, verse 47, Lord Krishna says: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.'",
    "The path of devotion (Bhakti) is considered by many to be the easiest and most direct way to reach the Divine in this age."
  ];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI thinking with a delay
    setTimeout(() => {
      // Get random response
      const responseText = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full w-full mt-4">
      <h2 className="text-xl font-mukti font-semibold mb-4 text-divine-blue dark:text-white">Ask the Divine</h2>
      
      <div className="flex-1 overflow-y-auto mb-4 divine-card">
        <div className="space-y-4 p-2">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-divine-blue/60 dark:text-white/60 italic">
              Ask any question about Hindu wisdom, spirituality, or the Bhagavad Gita
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-divine-saffron/90 text-white rounded-br-none'
                        : 'bg-divine-cream dark:bg-divine-blue/80 text-divine-blue dark:text-white rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about Hindu wisdom or spirituality..."
          className="flex-1 px-4 py-3 rounded-full border border-divine-lightGold/30 dark:border-divine-gold/20 bg-white/80 dark:bg-divine-blue/40 focus:outline-none focus:ring-2 focus:ring-divine-gold/50 dark:focus:ring-divine-gold/30"
        />
        <button
          onClick={handleSend}
          disabled={input.trim() === ''}
          className={`divine-button ${input.trim() === '' ? 'opacity-70' : ''}`}
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
