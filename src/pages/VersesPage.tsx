import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";

const VersesPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const categories = [
    { id: "all", label: t("verses.categories.all") },
    { id: "karma", label: t("verses.categories.karma") },
    { id: "yoga", label: t("verses.categories.yoga") },
    { id: "bhakti", label: t("verses.categories.bhakti") },
    { id: "dharma", label: t("verses.categories.dharma") },
    { id: "peace", label: t("verses.categories.peace") },
    { id: "wisdom", label: t("verses.categories.wisdom") }
  ];

  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-dark text-divine-dark dark:text-white pb-20">
      <div className="container max-w-xl mx-auto px-4">
        <Header />
        
        <main className="py-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-mukti font-bold mb-6"
          >
            {t("verses.title")}
          </motion.h1>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "whitespace-nowrap",
                  selectedCategory === category.id
                    ? "bg-divine-saffron hover:bg-divine-saffron/90 text-white"
                    : "hover:bg-divine-cream dark:hover:bg-divine-dark/50"
                )}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Verse cards */}
          <div className="space-y-4">
            {verses.map((verse) => (
              <motion.div
                key={verse.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="divine-card">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs font-medium text-divine-saffron">
                        {t("verses.chapterVerse", { chapter: verse.chapter, verse: verse.verse })}
                      </div>
                      <Badge variant="outline" className="bg-divine-saffron/10">
                        {t(`verses.categories.${verse.category}`)}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <p className="font-mukti text-lg">{verse.sanskrit}</p>
                      <p className="text-divine-blue/80 dark:text-white/80">{verse.translation}</p>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm" className="text-divine-blue/70 dark:text-white/70">
                      <Share2 size={16} className="mr-1" />
                      {t("verses.share")}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-divine-blue/70 dark:text-white/70">
                      <Bookmark size={16} className="mr-1" />
                      {t("verses.bookmark")}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>

        <Navigation />
      </div>
    </div>
  );
};

export default VersesPage;
