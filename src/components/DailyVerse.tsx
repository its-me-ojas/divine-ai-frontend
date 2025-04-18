
import { Share } from "lucide-react";
import { motion } from "framer-motion";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full"
    >
      <div className="divine-card">
        <div className="flex flex-col space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-between items-start"
          >
            <h3 className="text-sm text-divine-blue/60 dark:text-white/60">
              Today's Wisdom • Chapter {verse.chapter}, Verse {verse.verse}
            </h3>
          </motion.div>
          
          <motion.blockquote 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center italic text-lg font-serif text-divine-blue dark:text-divine-cream border-l-4 border-divine-gold/50 pl-4 py-1"
          >
            {verse.sanskrit}
          </motion.blockquote>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base font-serif text-divine-blue/90 dark:text-white/90"
          >
            {verse.translation}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-sm text-divine-blue/70 dark:text-white/70 bg-divine-cream/50 dark:bg-divine-blue/30 p-3 rounded-lg"
          >
            <p>{verse.explanation}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex justify-end"
          >
            <motion.button 
              onClick={handleShare}
              className="divine-button-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Share size={16} />
              <span>Share</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyVerse;
