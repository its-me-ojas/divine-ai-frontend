import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Menu, BookOpen, BookText, Bookmark, User, Award, Moon, Bell, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MenuSheetProps {
  isDarkMode: boolean;
  showNotifications: boolean;
  toggleDarkMode: () => void;
  setShowNotifications: (show: boolean) => void;
  prefersReducedMotion: boolean | null;
}

const MenuLink = ({ to, icon, children, onClick, badge }: { 
  to: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  onClick: () => void;
  badge?: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200",
        "hover:bg-accent/50 active:scale-[0.98]",
        isActive ? "text-primary font-medium bg-accent/30" : "text-foreground/80 hover:text-foreground"
      )}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium flex-1">{children}</span>
        {badge && (
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
            {badge}
          </Badge>
        )}
      </span>
    </Link>
  );
};

const RecentItem = ({ icon, title, time }: { 
  icon: React.ReactNode; 
  title: string; 
  time: string;
}) => (
  <div className="flex items-center gap-3 p-2 rounded-lg text-foreground/80">
    <span className="p-1.5 rounded-md bg-accent/20 text-foreground/70">
      {icon}
    </span>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium truncate">{title}</div>
    </div>
    <span className="text-xs text-foreground/50">{time}</span>
  </div>
);

const MenuSheet = ({
  isDarkMode,
  showNotifications,
  toggleDarkMode,
  setShowNotifications,
  prefersReducedMotion,
}: MenuSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="p-2.5 rounded-lg hover:bg-accent/50 transition-all duration-200 active:scale-95 touch-manipulation"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[280px] sm:w-[320px] bg-background/95 dark:bg-background/95 border-border backdrop-blur-xl p-6 overflow-y-auto max-h-[100svh]"
      >
        <motion.div 
          className="space-y-6 pb-safe"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Navigation */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold tracking-tight mb-3 text-foreground/90 px-3">
              Explore
            </h2>
            <MenuLink to="/verses" icon={<BookOpen size={18} />} onClick={() => setIsOpen(false)}>
              Verses
            </MenuLink>
            <MenuLink to="/wisdom" icon={<BookText size={18} />} onClick={() => setIsOpen(false)}>
              Wisdom
            </MenuLink>
            <MenuLink 
              to="/bookmarks" 
              icon={<Bookmark size={18} />} 
              onClick={() => setIsOpen(false)}
              badge="3 new"
            >
              Saved
            </MenuLink>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2 pt-4 border-t border-border/50">
            <h2 className="text-base font-semibold tracking-tight mb-3 text-foreground/90 px-3">
              Recent Activity
            </h2>
            <div className="space-y-1">
              <RecentItem
                icon={<BookOpen size={16} />}
                title="Chapter 2, Verse 47"
                time="2h"
              />
              <RecentItem
                icon={<Bookmark size={16} />}
                title="Saved: Karma Yoga"
                time="1d"
              />
            </div>
          </div>

          {/* Account */}
          <div className="space-y-2 pt-4 border-t border-border/50">
            <h2 className="text-base font-semibold tracking-tight mb-3 text-foreground/90 px-3">
              Account
            </h2>
            <MenuLink to="/profile" icon={<User size={18} />} onClick={() => setIsOpen(false)}>
              Profile
            </MenuLink>
            <MenuLink 
              to="/streaks" 
              icon={<Award size={18} />} 
              onClick={() => setIsOpen(false)}
              badge="7 days"
            >
              Streaks
            </MenuLink>
          </div>

          {/* Settings */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <h2 className="text-base font-semibold tracking-tight mb-3 text-foreground/90 px-3">
              Settings
            </h2>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent/30 transition-colors">
              <Label htmlFor="dark-mode" className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                <Moon size={18} className="text-foreground/70" />
                Dark Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent/30 transition-colors">
              <Label htmlFor="notifications" className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                <Bell size={18} className="text-foreground/70" />
                Notifications
              </Label>
              <Switch
                id="notifications"
                checked={showNotifications}
                onCheckedChange={setShowNotifications}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            <div className="py-2 px-3">
              <Label htmlFor="language" className="text-sm font-medium mb-2 block text-foreground/90">
                Language
              </Label>
              <Select
                defaultValue={i18n.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger 
                  id="language" 
                  className="bg-background/50 border-border/50 hover:bg-accent/30 transition-colors h-10 px-3"
                >
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50 max-h-[200px]">
                  <SelectItem value="en" className="hover:bg-accent/30 py-2.5">English</SelectItem>
                  <SelectItem value="hi" className="hover:bg-accent/30 py-2.5">हिंदी</SelectItem>
                  <SelectItem value="sa" className="hover:bg-accent/30 py-2.5">संस्कृतम्</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
