
import { useState, useEffect } from "react";
import { throttle } from "lodash";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode");
    
    if (darkModePreference) {
      const shouldUseDarkMode = darkModePreference === "true";
      setIsDarkMode(shouldUseDarkMode);
      
      if (shouldUseDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, []);

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

  return { isDarkMode, toggleDarkMode };
};
