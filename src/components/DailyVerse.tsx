
import { Share } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface DailyVerseProps {
  verse: {
    sanskrit: string;
    translation: string;
    explanation: string;
    chapter: number;
    verse: number;
  };
}

const DailyVerse = ({ verse }: DailyVerseProps) => {
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Bhagavad Gita - Chapter ${verse.chapter}, Verse ${verse.verse}`,
          text: `${verse.translation}\n\n${verse.explanation}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(
        `Bhagavad Gita - Chapter ${verse.chapter}, Verse ${verse.verse}\n\n${verse.sanskrit}\n\n${verse.translation}\n\n${verse.explanation}`
      );
      toast({
        title: "Copied to clipboard",
        description: "The verse has been copied to your clipboard",
      });
    }
  };

  // Simplified animations if user prefers reduced motion
  const initialAnimation = prefersReducedMotion 
    ? { opacity: 0.9 } 
    : { opacity: 0, y: 20, scale: 0.98 };
  
  const animateProps = prefersReducedMotion 
    ? { opacity: 1 } 
    : { opacity: 1, y: 0, scale: 1 };

  const transitionProps = {
    duration: prefersReducedMotion ? 0.3 : 0.6,
    ease: "easeOut"
  };

  return (
    <motion.div
      initial={initialAnimation}
      animate={animateProps}
      transition={transitionProps}
      className="w-full will-change-transform"
    >
      <div className="divine-card">
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-xs sm:text-sm text-divine-blue/60 dark:text-white/60">
              Today's Wisdom • Chapter {verse.chapter}, Verse {verse.verse}
            </h3>
          </div>
          
          <blockquote className="text-center italic text-base sm:text-lg font-serif text-divine-blue dark:text-divine-cream border-l-4 border-divine-gold/50 pl-3 sm:pl-4 py-1">
            {verse.sanskrit}
          </blockquote>
          
          <p className="text-sm sm:text-base font-serif text-divine-blue/90 dark:text-white/90">
            {verse.translation}
          </p>
          
          <div className="text-xs sm:text-sm text-divine-blue/70 dark:text-white/70 bg-divine-cream/50 dark:bg-divine-blue/30 p-2 sm:p-3 rounded-lg">
            <p>{verse.explanation}</p>
          </div>
          
          <div className="flex justify-end">
            <motion.button 
              onClick={handleShare}
              className="divine-button-secondary"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Share size={16} />
              <span>Share</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyVerse;
