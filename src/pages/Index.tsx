import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SplashScreen from "../components/SplashScreen";
import Header from "../components/Header";
import DailyVerse from "../components/DailyVerse";
import Navigation from "../components/Navigation";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [showSplash, setShowSplash] = useState(() => {
    const hasShownSplash = sessionStorage.getItem("splashShown");
    return !hasShownSplash;
  });
  const [shouldAnimate, setShouldAnimate] = useState(() => {
    const hasAnimated = sessionStorage.getItem("homeAnimated");
    return !hasAnimated;
  });
  const dailyVerseRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (shouldAnimate) {
      sessionStorage.setItem("homeAnimated", "true");
      const timer = setTimeout(() => setShouldAnimate(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  const dailyVerse = {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.",
    explanation: "This verse from the Bhagavad Gita (Chapter 2, Verse 47) teaches us to focus on our actions rather than their results. By performing our duties without attachment to success or failure, we find inner peace.",
    chapter: 2,
    verse: 47
  };

  // Check if user is coming back to home page
  useEffect(() => {
    if (location.pathname === "/" && !showSplash) {
      // If animation has been shown already
      const hasShownHomeAnimation = localStorage.getItem("homeAnimationShown") === "true";
      
      if (hasShownHomeAnimation) {
        // Small delay to ensure components are rendered
        setTimeout(() => {
          if (dailyVerseRef.current) {
            dailyVerseRef.current.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          }
        }, 100);
      } else {
        // Mark home animation as shown
        localStorage.setItem("homeAnimationShown", "true");
      }
    }
  }, [location.pathname, showSplash, prefersReducedMotion]);

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => {
          setShowSplash(false);
          sessionStorage.setItem("splashShown", "true");
        }} />
      )}
      
      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-divine-cream/50 dark:bg-divine-dark text-divine-dark dark:text-white pb-16"
        >
          <div className="container max-w-xl mx-auto px-3 sm:px-4">
            <Header />
            
            <main className="py-3 sm:py-4">
              <div ref={dailyVerseRef}>
                <DailyVerse verse={dailyVerse} />
              </div>
            </main>
            
            <Navigation />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Index;
