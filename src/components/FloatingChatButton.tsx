
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();

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
      className="fixed bottom-20 right-4 z-50 bg-divine-saffron dark:bg-divine-gold text-white dark:text-divine-blue rounded-full p-3 shadow-lg flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.5 }}
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
    >
      <MessageCircle size={24} />
      
      {/* Floating animation effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-full bg-divine-gold/20 dark:bg-divine-saffron/20"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      )}
    </motion.button>
  );
};

export default FloatingChatButton;
