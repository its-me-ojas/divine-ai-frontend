
import { Home, BookOpen, Award, Bookmark, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Navigation = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-divine-blue border-t border-divine-lightGold/30 dark:border-divine-gold/20 flex items-center justify-around z-10">
        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/verses" className={`nav-item ${location.pathname === "/verses" ? "active" : ""}`}>
          <BookOpen size={20} />
          <span className="text-xs mt-1">Verses</span>
        </Link>
        
        <Link to="/streaks" className={`nav-item ${location.pathname === "/streaks" ? "active" : ""}`}>
          <Award size={20} />
          <span className="text-xs mt-1">Streaks</span>
        </Link>
        
        <Link to="/bookmarks" className={`nav-item ${location.pathname === "/bookmarks" ? "active" : ""}`}>
          <Bookmark size={20} />
          <span className="text-xs mt-1">Saved</span>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="nav-item">
              <Menu size={20} />
              <span className="text-xs mt-1">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-divine-cream/95 dark:bg-divine-blue border-divine-lightGold/30 dark:border-divine-gold/20">
            <div className="flex flex-col space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-full bg-divine-gold/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-divine-saffron flex items-center justify-center">
                    <span className="text-white text-2xl font-mukti">ॐ</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-mukti font-bold text-divine-blue dark:text-white">Divine AI</h3>
                  <p className="text-sm text-divine-blue/70 dark:text-white/70">Personal Wisdom Guide</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20">
                  <div className="flex items-center gap-3">
                    <Label className="text-divine-blue dark:text-white">Dark Mode</Label>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20">
                  <div className="flex items-center gap-3">
                    <Label className="text-divine-blue dark:text-white">Notifications</Label>
                  </div>
                  <Switch checked={showNotifications} onCheckedChange={setShowNotifications} />
                </div>
                
                <Link to="/profile" className="block py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20 text-divine-blue dark:text-white">
                  Profile Settings
                </Link>
                
                <Link to="/offline" className="block py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20 text-divine-blue dark:text-white">
                  Offline Mode
                </Link>
                
                <Link to="/language" className="block py-3 border-b border-divine-lightGold/30 dark:border-divine-gold/20 text-divine-blue dark:text-white">
                  Language Settings
                </Link>
                
                <Link to="/about" className="block py-3 text-divine-blue dark:text-white">
                  About Divine AI
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navigation;
