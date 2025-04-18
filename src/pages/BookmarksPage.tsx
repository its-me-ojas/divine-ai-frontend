
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BookmarksPage = () => {
  // Sample bookmarked verses
  const bookmarks = [
    {
      id: 1,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
      translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
      chapter: 2,
      verse: 47,
      isFavorite: true,
      category: "karma"
    },
    {
      id: 2,
      sanskrit: "श्री भगवानुवाच प्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान्।",
      translation: "The Supreme Lord said: When a man gives up all varieties of desire for sense gratification, which arise from mental concoction, and when his mind...",
      chapter: 2,
      verse: 55,
      isFavorite: false,
      category: "peace"
    },
    {
      id: 3,
      sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।",
      translation: "Those who worship Me with devotion, meditating on My transcendental form—to them I carry what they lack and preserve what they have.",
      chapter: 9,
      verse: 22,
      isFavorite: true,
      category: "bhakti"
    }
  ];

  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-blue/95 text-divine-blue dark:text-white pb-20">
      <div className="container max-w-xl mx-auto px-4">
        <Header />
        
        <main className="py-4">
          <h1 className="text-2xl font-mukti font-bold mb-4">My Shlokas</h1>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-divine-blue/60 dark:text-white/60" size={18} />
            <Input 
              placeholder="Search saved verses..." 
              className="pl-10 bg-white/80 dark:bg-divine-blue/40 border-divine-lightGold/30 dark:border-divine-gold/20"
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList className="grid grid-cols-4 mb-6 bg-divine-cream/80 dark:bg-divine-blue/80">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="karma">Karma</TabsTrigger>
              <TabsTrigger value="bhakti">Bhakti</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} />
              ))}
            </TabsContent>
            
            <TabsContent value="favorites" className="space-y-4">
              {bookmarks
                .filter((bookmark) => bookmark.isFavorite)
                .map((bookmark) => (
                  <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
            </TabsContent>
            
            <TabsContent value="karma" className="space-y-4">
              {bookmarks
                .filter((bookmark) => bookmark.category === "karma")
                .map((bookmark) => (
                  <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
            </TabsContent>
            
            <TabsContent value="bhakti" className="space-y-4">
              {bookmarks
                .filter((bookmark) => bookmark.category === "bhakti")
                .map((bookmark) => (
                  <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
            </TabsContent>
          </Tabs>
        </main>
        
        <Navigation />
      </div>
    </div>
  );
};

interface BookmarkCardProps {
  bookmark: {
    id: number;
    sanskrit: string;
    translation: string;
    chapter: number;
    verse: number;
    isFavorite: boolean;
    category: string;
  };
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="divine-card"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-sm text-divine-blue/60 dark:text-white/60">
            Chapter {bookmark.chapter}, Verse {bookmark.verse}
          </span>
          <button>
            <Heart
              size={18}
              className={bookmark.isFavorite ? "fill-divine-saffron text-divine-saffron" : "text-divine-blue/60 dark:text-white/60"}
            />
          </button>
        </div>
        
        <p className="text-sm font-serif italic text-divine-blue dark:text-divine-cream">
          {bookmark.sanskrit}
        </p>
        
        <p className="text-base font-serif text-divine-blue/90 dark:text-white/90">
          {bookmark.translation}
        </p>
        
        <div className="flex justify-start pt-1">
          <span className="text-xs bg-divine-saffron/20 text-divine-saffron dark:text-divine-gold px-2 py-1 rounded-full capitalize">
            {bookmark.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookmarksPage;
