import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuSheetProps {
  isDarkMode: boolean;
  showNotifications: boolean;
  toggleDarkMode: () => void;
  setShowNotifications: (show: boolean) => void;
  prefersReducedMotion: boolean | null;
}

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
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[300px] sm:w-[400px] bg-background/95 dark:bg-background/95 border-border backdrop-blur-xl"
      >
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("common.settings")}</h2>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">{t("common.darkMode")}</Label>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">{t("common.notifications")}</Label>
              <Switch
                id="notifications"
                checked={showNotifications}
                onCheckedChange={setShowNotifications}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">{t("common.selectLanguage")}</Label>
              <Select
                value={i18n.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder={t("common.selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="sa">संस्कृतम्</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">{t("common.profile")}</h2>
            <Link
              to="/profile"
              className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t("profile.account")}
            </Link>
            <Link
              to="/streaks"
              className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t("common.streaks")}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
