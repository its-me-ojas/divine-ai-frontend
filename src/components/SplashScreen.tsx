
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      const fadeOutTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(fadeOutTimer);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-divine-cream dark:bg-divine-blue z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 rounded-full bg-divine-gold/20 flex items-center justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-divine-saffron flex items-center justify-center">
            <span className="text-white text-4xl font-mukti">ॐ</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl font-mukti font-bold text-divine-blue dark:text-white"
        >
          Welcome to Divine AI
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg text-divine-blue/80 dark:text-white/80 font-serif"
        >
          Your Personal Guide to Spiritual Wisdom
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
