
import { Home, BookOpen, Award, Bookmark, Menu, BookText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { throttle } from "lodash";

const Navigation = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Check system and local storage preferences for dark mode on initial load
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode");
    
    if (darkModePreference) {
      // If explicit preference exists in local storage
      const shouldUseDarkMode = darkModePreference === "true";
      setIsDarkMode(shouldUseDarkMode);
      
      if (shouldUseDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Check system preference if no local storage preference exists
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Throttled toggle function to prevent rapid state changes
  const toggleDarkMode = throttle(() => {
    const newDarkModeValue = !isDarkMode;
    setIsDarkMode(newDarkModeValue);
    
    if (newDarkModeValue) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("darkMode", String(newDarkModeValue));
  }, 300);

  // Animation variants for nav items (simplified if reduced motion is preferred)
  const navItemVariants = {
    initial: prefersReducedMotion ? { opacity: 0.9 } : { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.05,
        duration: prefersReducedMotion ? 0.2 : 0.3,
        ease: "easeOut"
      }
    }),
    tap: prefersReducedMotion ? {} : { scale: 0.95 }
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-divine-blue border-t border-divine-lightGold/30 dark:border-divine-gold/20 flex items-center justify-around z-10">
        <NavItem 
          to="/"
          isActive={location.pathname === "/"} 
          index={0}
          variants={navItemVariants}
          icon={<Home size={20} />}
          label="Home"
          prefersReducedMotion={prefersReducedMotion}
        />
        
        <NavItem 
          to="/verses"
          isActive={location.pathname === "/verses"} 
          index={1}
          variants={navItemVariants}
          icon={<BookOpen size={20} />}
          label="Verses"
          prefersReducedMotion={prefersReducedMotion}
        />
        
        <NavItem 
          to="/wisdom"
          isActive={location.pathname.startsWith("/wisdom")} 
          index={2}
          variants={navItemVariants}
          icon={<BookText size={20} />}
          label="Wisdom"
          prefersReducedMotion={prefersReducedMotion}
        />
        
        <NavItem 
          to="/streaks"
          isActive={location.pathname === "/streaks"} 
          index={3}
          variants={navItemVariants}
          icon={<Award size={20} />}
          label="Streaks"
          prefersReducedMotion={prefersReducedMotion}
        />
        
        <NavItem 
          to="/bookmarks"
          isActive={location.pathname === "/bookmarks"} 
          index={4}
          variants={navItemVariants}
          icon={<Bookmark size={20} />}
          label="Saved"
          prefersReducedMotion={prefersReducedMotion}
        />
        
        <motion.div
          custom={5}
          initial="initial"
          animate="animate"
          variants={navItemVariants}
          whileTap="tap"
        >
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="nav-item">
                <motion.div 
                  whileHover={prefersReducedMotion ? {} : { y: -3 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                >
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
                      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
                      className="flex items-center justify-between"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-divine-gold/20 flex items-center justify-center">
                        <motion.div 
                          initial={{ rotate: prefersReducedMotion ? 0 : -180, scale: prefersReducedMotion ? 1 : 0.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-divine-saffron flex items-center justify-center"
                        >
                          <span className="text-white text-xl sm:text-2xl font-mukti">ॐ</span>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 0.1 }}
                      >
                        <h3 className="text-lg sm:text-xl font-mukti font-bold text-divine-blue dark:text-white">Divine AI</h3>
                        <p className="text-xs sm:text-sm text-divine-blue/70 dark:text-white/70">Personal Wisdom Guide</p>
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
                          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: prefersReducedMotion ? 0.1 : 0.2 + (0.05 * index) }}
                          className="flex items-center justify-between py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20"
                        >
                          <div className="flex items-center gap-3">
                            <Label className="text-divine-blue dark:text-white">{setting.label}</Label>
                          </div>
                          <Switch checked={setting.value} onCheckedChange={setting.setter} />
                        </motion.div>
                      ))}
                      
                      {/* Menu links */}
                      {[
                        { label: "Profile Settings", path: "/profile" },
                        { label: "Offline Mode", path: "/offline" },
                        { label: "Language Settings", path: "/language" },
                        { label: "About Divine AI", path: "/about" }
                      ].map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: prefersReducedMotion ? 0.2 : 0.3 + (0.05 * index) }}
                        >
                          <Link 
                            to={link.path} 
                            className="block py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20 text-divine-blue dark:text-white"
                            onClick={() => setIsSheetOpen(false)}
                          >
                            <motion.div 
                              whileHover={prefersReducedMotion ? {} : { x: 5 }} 
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

// Extracted NavItem component to reduce redundancy
interface NavItemProps {
  to: string;
  isActive: boolean;
  index: number;
  variants: {
    initial: any;
    animate: (i: number) => any;
    tap: any;
  };
  icon: React.ReactNode;
  label: string;
  prefersReducedMotion: boolean;
}

const NavItem = ({ to, isActive, index, variants, icon, label, prefersReducedMotion }: NavItemProps) => (
  <motion.div
    custom={index}
    initial="initial"
    animate="animate"
    variants={variants}
    whileTap="tap"
  >
    <Link to={to} className={`nav-item ${isActive ? "active" : ""}`}>
      <motion.div 
        whileHover={prefersReducedMotion ? {} : { y: -3 }} 
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </motion.div>
    </Link>
  </motion.div>
);

export default Navigation;
