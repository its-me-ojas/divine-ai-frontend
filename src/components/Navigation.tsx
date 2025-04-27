import { Home, Book, MessageCircle, Menu } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import NavItem from "./navigation/NavItem";
import MenuSheet from "./navigation/MenuSheet";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem("showNotifications");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [shouldAnimate, setShouldAnimate] = useState(() => {
    const hasAnimated = sessionStorage.getItem("navAnimated");
    return !hasAnimated;
  });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  // Mark navigation as animated after first render
  useEffect(() => {
    if (shouldAnimate) {
      sessionStorage.setItem("navAnimated", "true");
      // Small delay to ensure animation plays
      const timer = setTimeout(() => setShouldAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  // Persist notification preference
  useEffect(() => {
    localStorage.setItem("showNotifications", JSON.stringify(showNotifications));
  }, [showNotifications]);

  const navItemVariants = shouldAnimate ? {
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
  } : {
    initial: { opacity: 1, y: 0 },
    animate: (_: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { duration: 0 }
    }),
    tap: prefersReducedMotion ? {} : { scale: 0.95 }
  };

  // Main navigation items
  const mainNavItems = [
    { to: "/", icon: <Home size={24} />, label: "Home" },
    { to: "/read", icon: <Book size={24} />, label: "Read" },
    { to: "/chat", icon: <MessageCircle size={24} />, label: "Ask" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/95 dark:bg-background/95 border-t border-border backdrop-blur-xl flex items-center justify-around z-10 pb-safe">
      {mainNavItems.map((item, index) => (
        <NavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
          isActive={item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)}
          variants={navItemVariants}
          custom={index}
        />
      ))}
      
      <MenuSheet
        isDarkMode={isDarkMode}
        showNotifications={showNotifications}
        toggleDarkMode={toggleDarkMode}
        setShowNotifications={setShowNotifications}
        prefersReducedMotion={prefersReducedMotion}
      />
    </nav>
  );
};

export default Navigation;
