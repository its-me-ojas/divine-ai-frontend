import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Header = () => {
  const [shouldAnimate, setShouldAnimate] = useState(() => {
    const hasAnimated = sessionStorage.getItem("headerAnimated");
    return !hasAnimated;
  });

  useEffect(() => {
    if (shouldAnimate) {
      sessionStorage.setItem("headerAnimated", "true");
      const timer = setTimeout(() => setShouldAnimate(false), 800);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  return (
    <motion.header 
      initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? -20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldAnimate ? 0.6 : 0 }}
      className="py-4 flex items-center justify-between"
    >
      <Link to="/" className="flex items-center gap-2">
        <motion.div 
          initial={{ 
            rotate: shouldAnimate ? -10 : 0, 
            scale: shouldAnimate ? 0.9 : 1 
          }}
          animate={{ rotate: 0, scale: 1 }}
          transition={shouldAnimate ? { 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          } : { duration: 0 }}
          whileHover={{ 
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.6 }
          }}
          className="w-10 h-10 rounded-full bg-divine-gold/20 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full bg-divine-saffron flex items-center justify-center">
            <span className="text-white text-lg font-mukti">ॐ</span>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: shouldAnimate ? 0 : 1, x: shouldAnimate ? -10 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldAnimate ? 0.5 : 0, delay: shouldAnimate ? 0.3 : 0 }}
          className="text-xl font-mukti font-bold text-divine-dark dark:text-white"
        >
          Divine AI
        </motion.h1>
      </Link>
      
      <motion.div
        initial={{ opacity: shouldAnimate ? 0 : 1, scale: shouldAnimate ? 0.8 : 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={shouldAnimate ? { 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.4
        } : { duration: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link to="/profile" className="w-9 h-9 rounded-full bg-divine-cream dark:bg-divine-dark flex items-center justify-center shadow-sm border border-divine-lightGold/30 dark:border-divine-gold/20">
          <User size={18} className="text-divine-dark dark:text-white" />
        </Link>
      </motion.div>
    </motion.header>
  );
};

export default Header;
