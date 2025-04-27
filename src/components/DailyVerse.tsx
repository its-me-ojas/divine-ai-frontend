import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark, ArrowRight, BookmarkCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface DailyVerseProps {
  verse: {
    sanskrit: string;
    translation: string;
    explanation: string;
    chapter: number;
    verse: number;
  };
  shouldAnimate?: boolean;
}

const DailyVerse = ({ verse, shouldAnimate = false }: DailyVerseProps) => {
  const [isSaved, setIsSaved] = useState(() => {
    const saved = localStorage.getItem(`saved-verse-${verse.chapter}-${verse.verse}`);
    return saved === "true";
  });
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSave = () => {
    setIsSaved(!isSaved);
    localStorage.setItem(`saved-verse-${verse.chapter}-${verse.verse}`, (!isSaved).toString());
    toast({
      title: isSaved ? t("verses.unsavedToast") : t("verses.savedToast"),
      description: isSaved ? t("verses.unsavedDescription") : t("verses.savedDescription"),
      duration: 2000
    });
  };

  const handleShare = async () => {
    const text = `${verse.sanskrit}\n\n${verse.translation}\n\n${verse.explanation}\n\n${t("verses.bhagavadGita")} - ${t("verses.chapterVerse", { chapter: verse.chapter, verse: verse.verse })}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${t("verses.bhagavadGita")} - ${t("verses.chapterVerse", { chapter: verse.chapter, verse: verse.verse })}`,
          text,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: t("common.copiedToClipboard"),
        description: t("verses.verseCopied"),
        duration: 2000
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="daily-verse-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
          duration: 0.3
        }}
        className="divine-card space-y-6 dark:bg-[#1E1E1E] dark:border-divine-gold/10"
      >
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.3,
              delay: 0.1
            }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <motion.h2 
                className="text-sm font-medium text-divine-blue/70 dark:text-white/70"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {t("verses.verseOfTheDay")}
              </motion.h2>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Badge variant="secondary" className="bg-divine-gold/10 text-divine-saffron text-[10px] px-2 py-0.5">
                  {t("verses.daily")}
                </Badge>
              </motion.div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Share2 size={16} className="text-divine-blue/70 dark:text-white/70" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isSaved ? 'text-divine-saffron bg-divine-gold/10' : 'text-divine-blue/70 dark:text-white/70 hover:bg-accent/50'
                }`}
              >
                {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 0.4,
              delay: 0.2
            }}
            className="space-y-4"
          >
            <motion.div 
              className="border-l-2 border-divine-saffron pl-4 py-1"
              whileHover={{ scale: 1.01, x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <p className="text-lg font-mukti leading-relaxed text-divine-dark dark:text-white">
                {verse.sanskrit}
              </p>
            </motion.div>
            <div className="space-y-4">
              <motion.p 
                className="text-base text-divine-blue/90 dark:text-white/90 leading-relaxed"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {verse.translation}
              </motion.p>
              <motion.div 
                className="bg-divine-cream/30 dark:bg-white/5 p-4 rounded-lg border border-divine-saffron/10"
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <p className="text-sm text-divine-blue/70 dark:text-white/70 leading-relaxed">
                  {verse.explanation}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.4,
            delay: 0.3
          }}
          className="flex items-center justify-between pt-4 border-t border-divine-lightGold/30 dark:border-divine-gold/10"
        >
          <motion.div 
            className="text-sm text-divine-blue/70 dark:text-white/70"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {t("verses.chapterVerse", { chapter: verse.chapter, verse: verse.verse })}
          </motion.div>
          <Link to="/read">
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-divine-blue dark:text-white hover:bg-divine-gold/10 hover:text-divine-saffron"
              >
                {t("common.readMore")}
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyVerse;
