import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Edit, User, Save } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";

const ProfilePage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(() => {
    const hasAnimated = sessionStorage.getItem("profileAnimated");
    return !hasAnimated;
  });

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
    }
  }, [user]);

  useEffect(() => {
    if (shouldAnimate) {
      sessionStorage.setItem("profileAnimated", "true");
      const timer = setTimeout(() => setShouldAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    // This would be implemented if you have an endpoint to update user profile
    setIsSaving(true);
    try {
      // Call the API to update the user profile
      await api.updateUserProfile({ full_name: fullName });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        duration: 3000,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Staggered animation for containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: shouldAnimate ? i * 0.2 : 0,
        duration: shouldAnimate ? 0.6 : 0,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: shouldAnimate ? 0.2 : 0
      }
    })
  };

  // Child animation variants
  const childVariants = {
    hidden: shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldAnimate ? 0.5 : 0 } 
    }
  };

  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-dark text-divine-dark dark:text-white pb-20">
      <div className="container max-w-xl mx-auto px-4">
        <Header />
        
        <main className="py-4 space-y-6">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="divine-card space-y-4 dark:bg-[#1E1E1E] dark:border-divine-gold/10"
          >
            <motion.div variants={childVariants} className="flex items-center justify-between">
              <h2 className="text-xl font-mukti font-semibold">Personal Information</h2>
              <Button variant="ghost" size="icon" onClick={handleEditToggle}>
                {isEditing ? (
                  <Save size={18} className="text-divine-blue/70 dark:text-white/70" />
                ) : (
                  <Edit size={18} className="text-divine-blue/70 dark:text-white/70" />
                )}
              </Button>
            </motion.div>
            
            <motion.div variants={childVariants} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-divine-gold/20 flex items-center justify-center">
                  <User size={32} className="text-divine-saffron" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{fullName || "User"}</h3>
                  <p className="text-divine-blue/70 dark:text-white/70">{user?.email || "email@example.com"}</p>
                </div>
              </div>
              
              {isEditing ? (
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={user?.email || ""}
                      disabled 
                      className="opacity-70"
                    />
                    <p className="text-xs text-divine-blue/60 dark:text-white/60">Email cannot be changed</p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Label className="text-divine-blue/70 dark:text-white/70">Full Name:</Label>
                    <span className="col-span-2">{fullName || "Not set"}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Label className="text-divine-blue/70 dark:text-white/70">Email:</Label>
                    <span className="col-span-2">{user?.email || "email@example.com"}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Label className="text-divine-blue/70 dark:text-white/70">Member Since:</Label>
                    <span className="col-span-2">
                      {user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })
                        : "N/A"}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
          
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="divine-card space-y-4 dark:bg-[#1E1E1E] dark:border-divine-gold/10"
          >
            <motion.h2 variants={childVariants} className="text-xl font-mukti font-semibold">
              App Settings
            </motion.h2>
            
            {[
              { id: "notifications", label: "Daily Verse Notification", defaultChecked: true },
              { id: "sound", label: "Sound Effects", defaultChecked: true },
              { id: "theme", label: "Dark Theme", checked: isDarkMode, onChange: toggleDarkMode }
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
                  checked={setting.checked}
                  onCheckedChange={setting.onChange}
                />
              </motion.div>
            ))}
            
            <motion.div 
              variants={childVariants}
              className="border-t border-divine-lightGold/30 dark:border-divine-gold/10 pt-4 mt-2"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full border-divine-saffron/70 text-divine-saffron hover:text-divine-saffron hover:bg-divine-saffron/10"
                  onClick={signOut}
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
