import { useState, useEffect, useRef } from "react";
import SplashScreen from "../components/SplashScreen";
import Header from "../components/Header";
import DailyVerse from "../components/DailyVerse";
// import ChatInterface from "../components/ChatInterface";
import Navigation from "../components/Navigation";
// import FloatingChatButton from "../components/FloatingChatButton";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  // const [showChat, setShowChat] = useState(false);
  const dailyVerseRef = useRef<HTMLDivElement>(null);
  // const chatRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  
  // Daily verse data
  const dailyVerse = {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.",
    explanation: "This verse from the Bhagavad Gita (Chapter 2, Verse 47) teaches us to focus on our actions rather than their results. By performing our duties without attachment to success or failure, we find inner peace.",
    chapter: 2,
    verse: 47
  };

  // Function to scroll to daily verse
  const scrollToDailyVerse = () => {
    if (dailyVerseRef.current) {
      dailyVerseRef.current.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Function to scroll to chat (commented out)
  /* const scrollToChat = () => {
    setShowChat(true);
    
    // Small delay to ensure chat is rendered before scrolling
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }, 100);
  }; */

  // Check if user is coming back to home page
  useEffect(() => {
    if (location.pathname === "/" && !showSplash) {
      // If animation has been shown already
      const hasShownHomeAnimation = localStorage.getItem("homeAnimationShown") === "true";
      
      if (hasShownHomeAnimation) {
        // Small delay to ensure components are rendered
        setTimeout(scrollToDailyVerse, 100);
      } else {
        // Mark home animation as shown
        localStorage.setItem("homeAnimationShown", "true");
      }
    }
  }, [location.pathname, showSplash]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-dark text-divine-dark dark:text-white pb-16">
        <div className="container max-w-xl mx-auto px-3 sm:px-4">
          <Header />
          
          <main className="py-3 sm:py-4">
            <div ref={dailyVerseRef}>
              <DailyVerse verse={dailyVerse} />
            </div>
            
            {/* Chat Interface (commented out)
            <AnimatePresence mode="wait">
              {showChat && (
                <motion.div 
                  ref={chatRef}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 sm:mt-6"
                >
                  <ChatInterface />
                </motion.div>
              )}
            </AnimatePresence>
            */}
          </main>
          
          <Navigation />
        </div>
      </div>
      
      {/* Floating chat button (commented out)
      {!showSplash && <FloatingChatButton onClick={scrollToChat} />}
      */}
    </>
  );
};

export default Index;
