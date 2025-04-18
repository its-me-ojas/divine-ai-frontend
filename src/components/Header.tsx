
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-4 flex items-center justify-between"
    >
      <Link to="/" className="flex items-center gap-2">
        <motion.div 
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
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
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl font-mukti font-bold text-divine-blue dark:text-white"
        >
          Divine AI
        </motion.h1>
      </Link>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.4
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link to="/profile" className="w-9 h-9 rounded-full bg-divine-cream dark:bg-divine-blue flex items-center justify-center shadow-sm border border-divine-lightGold/30 dark:border-divine-gold/20">
          <User size={18} className="text-divine-blue dark:text-white" />
        </Link>
      </motion.div>
    </motion.header>
  );
};

export default Header;
