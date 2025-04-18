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
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-divine-dark/80 dark:text-white/90">
              Today's Wisdom • Chapter {verse.chapter}, Verse {verse.verse}
            </h3>
          </div>
          
          <div className="border-l-[3px] border-divine-saffron pl-4">
            <p className="text-lg sm:text-xl font-serif italic text-divine-dark dark:text-divine-cream">
              {verse.sanskrit}
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-base sm:text-lg font-serif text-divine-dark dark:text-white/95 leading-relaxed tracking-wide">
              {verse.translation}
            </p>
            
            <div className="bg-divine-cream/30 dark:bg-white/5 p-4 rounded-lg border border-divine-saffron/10">
              <p className="text-sm sm:text-base text-divine-dark/90 dark:text-white/80 leading-relaxed">
                {verse.explanation}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
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
