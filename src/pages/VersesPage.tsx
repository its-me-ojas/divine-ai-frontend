import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Play } from "lucide-react";
import { useEffect } from "react";

const VersesPage = () => {
  const prefersReducedMotion = useReducedMotion();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample verses data
  const verses = [
    {
      id: 1,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
      chapter: 2,
      verse: 47,
      category: "karma"
    },
    {
      id: 2,
      sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
      translation: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga.",
      chapter: 2,
      verse: 48,
      category: "yoga"
    },
    {
      id: 3,
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
      translation: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
      chapter: 4,
      verse: 7,
      category: "dharma"
    }
  ];

  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-dark text-divine-dark dark:text-white pb-16">
      <div className="container max-w-xl mx-auto px-3 sm:px-4">
        <Header />
        
        <main className="py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-mukti font-bold mb-4 sm:mb-6">Sacred Verses</h1>
          
          <Tabs defaultValue="all" className="w-full mb-4 sm:mb-6">
            <TabsList className="grid grid-cols-4 mb-4 sm:mb-6 bg-divine-cream/80 dark:bg-divine-dark/80">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="karma">Karma</TabsTrigger>
              <TabsTrigger value="yoga">Yoga</TabsTrigger>
              <TabsTrigger value="dharma">Dharma</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 sm:space-y-6">
              {verses.map((verse, index) => (
                <VerseCard 
                  key={verse.id} 
                  verse={verse}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion} 
                />
              ))}
            </TabsContent>
            
            <TabsContent value="karma" className="space-y-4 sm:space-y-6">
              {verses
                .filter((verse) => verse.category === "karma")
                .map((verse, index) => (
                  <VerseCard 
                    key={verse.id} 
                    verse={verse} 
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
            </TabsContent>
            
            <TabsContent value="yoga" className="space-y-4 sm:space-y-6">
              {verses
                .filter((verse) => verse.category === "yoga")
                .map((verse, index) => (
                  <VerseCard 
                    key={verse.id} 
                    verse={verse} 
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
            </TabsContent>
            
            <TabsContent value="dharma" className="space-y-4 sm:space-y-6">
              {verses
                .filter((verse) => verse.category === "dharma")
                .map((verse, index) => (
                  <VerseCard 
                    key={verse.id} 
                    verse={verse} 
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </main>
        
        <Navigation />
      </div>
    </div>
  );
};

interface VerseCardProps {
  verse: {
    id: number;
    sanskrit: string;
    translation: string;
    chapter: number;
    verse: number;
    category: string;
  };
  index: number;
  prefersReducedMotion: boolean;
}

const VerseCard = ({ verse, index, prefersReducedMotion }: VerseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: "easeOut"
      }}
      className="divine-card will-change-transform"
    >
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-start">
          <span className="text-xs sm:text-sm text-divine-dark/60 dark:text-white/60">
            Chapter {verse.chapter}, Verse {verse.verse}
          </span>
          <span className="text-xs bg-divine-saffron/20 text-divine-saffron dark:text-divine-gold px-2 py-1 rounded-full capitalize">
            {verse.category}
          </span>
        </div>
        
        <p className="text-xs sm:text-sm font-serif italic text-divine-dark dark:text-divine-cream">
          {verse.sanskrit}
        </p>
        
        <p className="text-sm sm:text-base font-serif text-divine-dark/90 dark:text-white/90">
          {verse.translation}
        </p>
        
        <div className="flex justify-between pt-2">
          <button className="divine-button-secondary text-xs sm:text-sm">
            <Play size={14} className="sm:w-4 sm:h-4" />
            <span>Listen</span>
          </button>
          
          <button className="divine-button-secondary text-xs sm:text-sm">
            <Bookmark size={14} className="sm:w-4 sm:h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VersesPage;
