
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Animation timing as specified: 2s for display + 0.75s for fade out
    const timer = setTimeout(() => {
      setIsAnimating(false);
      const fadeOutTimer = setTimeout(() => {
        onComplete();
      }, 750); // 0.75s for fade out
      return () => clearTimeout(fadeOutTimer);
    }, 2000); // Show for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-divine-cream dark:bg-divine-blue z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: isAnimating ? 1.5 : 0.75, 
            ease: "easeInOut" 
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="w-24 h-24 rounded-full bg-divine-gold/20 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-divine-saffron flex items-center justify-center">
                <span className="text-white text-4xl font-mukti">ॐ</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="text-3xl font-mukti font-bold text-divine-blue dark:text-white"
            >
              Welcome to Divine AI
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="text-lg text-divine-blue/80 dark:text-white/80 font-serif"
            >
              Your Personal Guide to Spiritual Wisdom
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
