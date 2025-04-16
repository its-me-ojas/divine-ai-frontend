
import { Home, BookOpen, Award, Bookmark, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Animation variants for nav items
  const navItemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    tap: { scale: 0.95 }
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-divine-blue border-t border-divine-lightGold/30 dark:border-divine-gold/20 flex items-center justify-around z-10">
        <motion.div
          custom={0}
          initial="initial"
          animate="animate"
          variants={navItemVariants}
          whileTap="tap"
        >
          <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </motion.div>
          </Link>
        </motion.div>
        
        <motion.div
          custom={1}
          initial="initial"
          animate="animate"
          variants={navItemVariants}
          whileTap="tap"
        >
          <Link to="/verses" className={`nav-item ${location.pathname === "/verses" ? "active" : ""}`}>
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
              <BookOpen size={20} />
              <span className="text-xs mt-1">Verses</span>
            </motion.div>
          </Link>
        </motion.div>
        
        <motion.div
          custom={2}
          initial="initial"
          animate="animate"
          variants={navItemVariants}
          whileTap="tap"
        >
          <Link to="/streaks" className={`nav-item ${location.pathname === "/streaks" ? "active" : ""}`}>
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
              <Award size={20} />
              <span className="text-xs mt-1">Streaks</span>
            </motion.div>
          </Link>
        </motion.div>
        
        <motion.div
          custom={3}
          initial="initial"
          animate="animate"
          variants={navItemVariants}
          whileTap="tap"
        >
          <Link to="/bookmarks" className={`nav-item ${location.pathname === "/bookmarks" ? "active" : ""}`}>
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
              <Bookmark size={20} />
              <span className="text-xs mt-1">Saved</span>
            </motion.div>
          </Link>
        </motion.div>
        
        <motion.div
          custom={4}
          initial="initial"
          animate="animate"
          variants={navItemVariants}
          whileTap="tap"
        >
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="nav-item">
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Menu size={20} />
                  <span className="text-xs mt-1">Menu</span>
                </motion.div>
              </button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="bg-divine-cream/95 dark:bg-divine-blue border-divine-lightGold/30 dark:border-divine-gold/20"
            >
              <AnimatePresence>
                {isSheetOpen && (
                  <div className="flex flex-col space-y-6 pt-6">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="w-14 h-14 rounded-full bg-divine-gold/20 flex items-center justify-center">
                        <motion.div 
                          initial={{ rotate: -180, scale: 0.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="w-12 h-12 rounded-full bg-divine-saffron flex items-center justify-center"
                        >
                          <span className="text-white text-2xl font-mukti">ॐ</span>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <h3 className="text-xl font-mukti font-bold text-divine-blue dark:text-white">Divine AI</h3>
                        <p className="text-sm text-divine-blue/70 dark:text-white/70">Personal Wisdom Guide</p>
                      </motion.div>
                    </motion.div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          label: "Dark Mode",
                          value: isDarkMode,
                          setter: toggleDarkMode
                        },
                        {
                          label: "Notifications",
                          value: showNotifications,
                          setter: setShowNotifications
                        }
                      ].map((setting, index) => (
                        <motion.div
                          key={setting.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + (0.1 * index) }}
                          className="flex items-center justify-between py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20"
                        >
                          <div className="flex items-center gap-3">
                            <Label className="text-divine-blue dark:text-white">{setting.label}</Label>
                          </div>
                          <Switch checked={setting.value} onCheckedChange={setting.setter} />
                        </motion.div>
                      ))}
                      
                      {[
                        { label: "Profile Settings", path: "/profile" },
                        { label: "Offline Mode", path: "/offline" },
                        { label: "Language Settings", path: "/language" },
                        { label: "About Divine AI", path: "/about" }
                      ].map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + (0.1 * index) }}
                        >
                          <Link 
                            to={link.path} 
                            className="block py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20 text-divine-blue dark:text-white"
                            onClick={() => setIsSheetOpen(false)}
                          >
                            <motion.div 
                              whileHover={{ x: 5 }} 
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {link.label}
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </>
  );
};

export default Navigation;
