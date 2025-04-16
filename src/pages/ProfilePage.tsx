
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Edit, User } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-blue/95 text-divine-blue dark:text-white pb-20">
      <div className="container max-w-xl mx-auto px-4">
        <Header />
        
        <main className="py-4">
          <h1 className="text-2xl font-mukti font-bold mb-6">Your Profile</h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="divine-card mb-6"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-divine-cream dark:bg-divine-blue flex items-center justify-center shadow-md border-2 border-divine-lightGold/30 dark:border-divine-gold/20">
                  <User size={40} className="text-divine-blue/70 dark:text-white/70" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-divine-saffron rounded-full flex items-center justify-center shadow-sm">
                  <Edit size={16} className="text-white" />
                </button>
              </div>
              
              <div>
                <h2 className="text-xl font-mukti font-semibold">Namaste, Seeker</h2>
                <p className="text-sm text-divine-blue/70 dark:text-white/70">Joined April 2023</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="divine-card mb-6 space-y-4"
          >
            <h2 className="text-xl font-mukti font-semibold">Personal Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value="Seeker" className="bg-white/80 dark:bg-divine-blue/40 border-divine-lightGold/30 dark:border-divine-gold/20" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="seeker@example.com" className="bg-white/80 dark:bg-divine-blue/40 border-divine-lightGold/30 dark:border-divine-gold/20" />
            </div>
            
            <Button className="divine-button w-full mt-2">
              Save Changes
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="divine-card space-y-4"
          >
            <h2 className="text-xl font-mukti font-semibold">App Settings</h2>
            
            <div className="flex items-center justify-between py-2">
              <Label htmlFor="notifications">Daily Verse Notification</Label>
              <Switch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <Label htmlFor="sound">Sound Effects</Label>
              <Switch id="sound" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <Label htmlFor="theme">Dark Theme</Label>
              <Switch id="theme" />
            </div>
            
            <div className="border-t border-divine-lightGold/30 dark:border-divine-gold/20 pt-4 mt-2">
              <Button variant="outline" className="w-full border-divine-saffron/70 text-divine-saffron hover:text-divine-saffron hover:bg-divine-saffron/10">
                Log Out
              </Button>
            </div>
          </motion.div>
        </main>
        
        <Navigation />
      </div>
    </div>
  );
};

export default ProfilePage;
