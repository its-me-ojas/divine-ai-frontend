
import { useState, useEffect, useRef } from "react";
import SplashScreen from "../components/SplashScreen";
import Header from "../components/Header";
import DailyVerse from "../components/DailyVerse";
import ChatInterface from "../components/ChatInterface";
import Navigation from "../components/Navigation";
import FloatingChatButton from "../components/FloatingChatButton";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // Daily verse data
  const dailyVerse = {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.",
    explanation: "This verse from the Bhagavad Gita (Chapter 2, Verse 47) teaches us to focus on our actions rather than their results. By performing our duties without attachment to success or failure, we find inner peace.",
    chapter: 2,
    verse: 47
  };

  // Function to scroll to chat
  const scrollToChat = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if user is coming back to home page
  useEffect(() => {
    if (location.pathname === "/" && !showSplash) {
      // If animation has been shown already, automatically scroll to chat
      const hasShownHomeAnimation = localStorage.getItem("homeAnimationShown") === "true";
      
      if (hasShownHomeAnimation) {
        // Small delay to ensure components are rendered
        setTimeout(scrollToChat, 300);
      } else {
        // Mark home animation as shown
        localStorage.setItem("homeAnimationShown", "true");
      }
    }
  }, [location.pathname, showSplash]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-blue/95 text-divine-blue dark:text-white pb-20">
        <div className="container max-w-xl mx-auto px-4">
          <Header />
          
          <main className="py-4">
            <DailyVerse verse={dailyVerse} />
            <div ref={chatRef}>
              <ChatInterface />
            </div>
          </main>
          
          <Navigation />
        </div>
      </div>
      
      {/* Floating chat button */}
      {!showSplash && <FloatingChatButton onClick={scrollToChat} />}
    </>
  );
};

export default Index;
