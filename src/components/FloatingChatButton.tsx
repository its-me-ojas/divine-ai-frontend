
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide button when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-divine-saffron text-white rounded-full px-4 py-3 shadow-lg flex items-center gap-2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={18} />
      <span className="font-mukti text-sm">Chat with Divine AI</span>

      {/* Floating animation effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-divine-gold/20"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
    </motion.button>
  );
};

export default FloatingChatButton;
