
import { Share } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      // TODO: Add toast notification for clipboard copy
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="divine-card">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm text-divine-blue/60 dark:text-white/60">
              Today's Wisdom • Chapter {verse.chapter}, Verse {verse.verse}
            </h3>
          </div>
          
          <blockquote className="text-center italic text-lg font-serif text-divine-blue dark:text-divine-cream border-l-4 border-divine-gold/50 pl-4 py-1">
            {verse.sanskrit}
          </blockquote>
          
          <p className="text-base font-serif text-divine-blue/90 dark:text-white/90">
            {verse.translation}
          </p>
          
          <div className="text-sm text-divine-blue/70 dark:text-white/70 bg-divine-cream/50 dark:bg-divine-blue/30 p-3 rounded-lg">
            <p>{verse.explanation}</p>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleShare}
              className="divine-button-secondary"
            >
              <Share size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyVerse;
