
import { Home, BookOpen, Award, Bookmark, BookText } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { NavItem } from "./navigation/NavItem";
import { MenuSheet } from "./navigation/MenuSheet";
import { useTheme } from "@/hooks/useTheme";

const Navigation = () => {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(true);
  const prefersReducedMotion = useReducedMotion();

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

  const navItems = [
    { to: "/", icon: <Home size={20} />, label: "Home" },
    { to: "/verses", icon: <BookOpen size={20} />, label: "Verses" },
    { to: "/wisdom", icon: <BookText size={20} />, label: "Wisdom" },
    { to: "/streaks", icon: <Award size={20} />, label: "Streaks" },
    { to: "/bookmarks", icon: <Bookmark size={20} />, label: "Saved" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 dark:bg-background/80 border-t border-border backdrop-blur-lg flex items-center justify-around z-10">
      {navItems.map((item, index) => (
        <NavItem
          key={item.to}
          to={item.to}
          isActive={item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)}
          index={index}
          variants={navItemVariants}
          icon={item.icon}
          label={item.label}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
      
      <MenuSheet
        isDarkMode={isDarkMode}
        showNotifications={showNotifications}
        toggleDarkMode={toggleDarkMode}
        setShowNotifications={setShowNotifications}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  );
};

export default Navigation;
