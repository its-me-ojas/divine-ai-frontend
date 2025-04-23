import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [shouldShowSplash, setShouldShowSplash] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Check if the splash screen has been shown in this session
    const splashShown = sessionStorage.getItem("splashScreenShown");
    
    if (splashShown === "true") {
      // If already shown in this session, skip the splash screen
      setShouldShowSplash(false);
      onComplete();
      return;
    }

    // Animation timing: 2s for display + 0.75s for fade out
    const timer = setTimeout(() => {
      setIsAnimating(false);
      const fadeOutTimer = setTimeout(() => {
        // Set the flag in sessionStorage (not localStorage, to persist only for this session)
        sessionStorage.setItem("splashScreenShown", "true");
        onComplete();
      }, 750); // 0.75s for fade out
      return () => clearTimeout(fadeOutTimer);
    }, 2000); // Show for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  // If splash shouldn't be shown, return null
  if (!shouldShowSplash) return null;

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className={`fixed inset-0 flex items-center justify-center ${
            isDarkMode ? 'bg-divine-dark' : 'bg-white'
          } z-[9999]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: isAnimating ? 0.8 : 0.5, 
            ease: "easeInOut" 
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                boxShadow: [
                  "0 0 0 rgba(255, 153, 51, 0)",
                  "0 0 20px rgba(255, 153, 51, 0.5)",
                  "0 0 40px rgba(255, 153, 51, 0.3)",
                  "0 0 20px rgba(255, 153, 51, 0.5)",
                  "0 0 0 rgba(255, 153, 51, 0)"
                ]
              }}
              transition={{ 
                duration: 2,
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }
              }}
              className={`w-24 h-24 rounded-full bg-divine-saffron/20 flex items-center justify-center will-change-transform`}
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-divine-saffron flex items-center justify-center will-change-transform"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white text-4xl font-mukti">ॐ</span>
              </motion.div>
            </motion.div>

            <div className="flex flex-col items-center space-y-4 z-[10000]">
              <h1 className={`text-3xl font-mukti font-bold ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Divine AI
              </h1>
              <p className={`text-lg ${
                isDarkMode ? 'text-white/90' : 'text-black/90'
              } font-serif`}>
                Your Personal Guide to Spiritual Wisdom
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
