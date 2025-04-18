
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";

interface MenuSheetProps {
  isDarkMode: boolean;
  showNotifications: boolean;
  toggleDarkMode: () => void;
  setShowNotifications: (show: boolean) => void;
  prefersReducedMotion: boolean | null;
}

export const MenuSheet = ({
  isDarkMode,
  showNotifications,
  toggleDarkMode,
  setShowNotifications,
  prefersReducedMotion
}: MenuSheetProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <motion.div
      custom={5}
      initial="initial"
      animate="animate"
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
          className="bg-background/95 dark:bg-background/95 border-border backdrop-blur-xl"
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
  );
};
