
import { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

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
  const prefersReducedMotion = useReducedMotion();
  
  // Sample responses
  const aiResponses = [
    "According to the Bhagavad Gita, self-realization comes through understanding our true nature beyond the material body.",
    "Krishna teaches that we should perform our duties without attachment to the results. This is the essence of Karma Yoga.",
    "The concept of dharma refers to one's righteous duties according to one's position in society and stage of life.",
    "In Chapter 2, verse 47, Lord Krishna says: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.'",
    "The path of devotion (Bhakti) is considered by many to be the easiest and most direct way to reach the Divine in this age."
  ];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
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

  // Animation variants for message bubbles
  const userBubbleVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      transition: { 
        duration: prefersReducedMotion ? 0.3 : 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  const aiBubbleVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      transition: { 
        type: "spring",
        damping: prefersReducedMotion ? 20 : 12,
        stiffness: prefersReducedMotion ? 300 : 200,
        duration: prefersReducedMotion ? 0.3 : 0.6
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: 0.2 }}
      className="flex flex-col h-full w-full"
    >
      <h2 className="text-xl font-mukti font-semibold mb-3 text-divine-blue dark:text-white">Ask the Divine</h2>
      
      <div className="flex-1 overflow-y-auto mb-3 divine-card">
        <div className="space-y-3 p-2">
          {messages.length === 0 ? (
            <div className="text-center py-4 sm:py-6 text-divine-blue/60 dark:text-white/60 italic">
              Ask any question about Hindu wisdom, spirituality, or the Bhagavad Gita
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                  variants={message.sender === 'user' ? userBubbleVariants : aiBubbleVariants}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2 ${
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
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: 0.3 }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about Hindu wisdom or spirituality..."
          className="flex-1 px-4 py-2 sm:py-3 rounded-full border border-divine-lightGold/30 dark:border-divine-gold/20 bg-white/80 dark:bg-divine-blue/40 focus:outline-none focus:ring-2 focus:ring-divine-gold/50 dark:focus:ring-divine-gold/30"
        />
        <motion.button
          onClick={handleSend}
          disabled={input.trim() === ''}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`divine-button ${input.trim() === '' ? 'opacity-70' : ''}`}
        >
          <SendHorizonal size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ChatInterface;
