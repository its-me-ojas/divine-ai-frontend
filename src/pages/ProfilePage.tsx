
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Edit, User, Save } from "lucide-react";

const ProfilePage = () => {
  // Staggered animation for containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    })
  };

  // Child animation variants
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-blue/95 text-divine-blue dark:text-white pb-20">
      <div className="container max-w-xl mx-auto px-4">
        <Header />
        
        <main className="py-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-mukti font-bold mb-6"
          >
            Your Profile
          </motion.h1>
          
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="divine-card mb-6"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div 
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <div className="w-24 h-24 rounded-full bg-divine-cream dark:bg-divine-blue flex items-center justify-center shadow-md border-2 border-divine-lightGold/30 dark:border-divine-gold/20">
                  <User size={40} className="text-divine-blue/70 dark:text-white/70" />
                </div>
                <motion.button 
                  className="absolute bottom-0 right-0 w-8 h-8 bg-divine-saffron rounded-full flex items-center justify-center shadow-sm"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Edit size={16} className="text-white" />
                </motion.button>
              </motion.div>
              
              <motion.div variants={childVariants}>
                <h2 className="text-xl font-mukti font-semibold">Namaste, Seeker</h2>
                <p className="text-sm text-divine-blue/70 dark:text-white/70">Joined April 2023</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="divine-card mb-6 space-y-4"
          >
            <motion.h2 variants={childVariants} className="text-xl font-mukti font-semibold">
              Personal Information
            </motion.h2>
            
            <motion.div variants={childVariants} className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value="Seeker" className="bg-white/80 dark:bg-divine-blue/40 border-divine-lightGold/30 dark:border-divine-gold/20" />
            </motion.div>
            
            <motion.div variants={childVariants} className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="seeker@example.com" className="bg-white/80 dark:bg-divine-blue/40 border-divine-lightGold/30 dark:border-divine-gold/20" />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button className="divine-button w-full mt-2 gap-2">
                  <Save size={16} />
                  Save Changes
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="divine-card space-y-4"
          >
            <motion.h2 variants={childVariants} className="text-xl font-mukti font-semibold">
              App Settings
            </motion.h2>
            
            {[
              { id: "notifications", label: "Daily Verse Notification", defaultChecked: true },
              { id: "sound", label: "Sound Effects", defaultChecked: true },
              { id: "theme", label: "Dark Theme", defaultChecked: false }
            ].map((setting, index) => (
              <motion.div 
                key={setting.id}
                variants={childVariants}
                custom={index}
                className="flex items-center justify-between py-2"
              >
                <Label htmlFor={setting.id}>{setting.label}</Label>
                <Switch 
                  id={setting.id} 
                  defaultChecked={setting.defaultChecked} 
                />
              </motion.div>
            ))}
            
            <motion.div 
              variants={childVariants}
              className="border-t border-divine-lightGold/30 dark:border-divine-gold/20 pt-4 mt-2"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full border-divine-saffron/70 text-divine-saffron hover:text-divine-saffron hover:bg-divine-saffron/10"
                >
                  Log Out
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>
        
        <Navigation />
      </div>
    </div>
  );
};

export default ProfilePage;
