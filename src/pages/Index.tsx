
import { useState, useEffect } from "react";
import SplashScreen from "../components/SplashScreen";
import Header from "../components/Header";
import DailyVerse from "../components/DailyVerse";
import ChatInterface from "../components/ChatInterface";
import Navigation from "../components/Navigation";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  // Daily verse data
  const dailyVerse = {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.",
    explanation: "This verse from the Bhagavad Gita (Chapter 2, Verse 47) teaches us to focus on our actions rather than their results. By performing our duties without attachment to success or failure, we find inner peace.",
    chapter: 2,
    verse: 47
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-blue/95 text-divine-blue dark:text-white pb-20">
        <div className="container max-w-xl mx-auto px-4">
          <Header />
          
          <main className="py-4">
            <DailyVerse verse={dailyVerse} />
            <ChatInterface />
          </main>
          
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default Index;
