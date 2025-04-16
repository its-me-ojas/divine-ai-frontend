
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import { Award, Flame, Sparkles, Star } from "lucide-react";

const StreaksPage = () => {
  // Sample streak data
  const streakDays = 7;
  const longestStreak = 14;
  const achievements = [
    { id: 1, name: "First Step", description: "Read your first verse", completed: true, icon: <Sparkles size={24} className="text-divine-gold" /> },
    { id: 2, name: "Seeker", description: "Ask 5 questions", completed: true, icon: <Star size={24} className="text-divine-saffron" /> },
    { id: 3, name: "Devoted", description: "7 day streak", completed: true, icon: <Flame size={24} className="text-divine-saffron" /> },
    { id: 4, name: "Scholar", description: "Read 20 verses", completed: false, icon: <Award size={24} className="text-divine-gold" /> },
  ];
  
  // Generate week days for the streak calendar
  const weekDays = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    const isActive = i < streakDays;
    
    weekDays.push({ dayName, dayNumber, isActive });
  }

  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-blue/95 text-divine-blue dark:text-white pb-20">
      <div className="container max-w-xl mx-auto px-4">
        <Header />
        
        <main className="py-4">
          <h1 className="text-2xl font-mukti font-bold mb-6">Your Spiritual Journey</h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="divine-card mb-6"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-divine-cream dark:text-divine-blue/60 stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-divine-saffron stroke-current"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - streakDays / 30)}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Flame size={24} className="text-divine-saffron mb-1" />
                  <span className="text-3xl font-bold">{streakDays}</span>
                  <span className="text-sm">Day Streak</span>
                </div>
              </div>
              
              <div className="text-divine-blue/70 dark:text-white/70">
                <p>Longest Streak: {longestStreak} days</p>
                <p className="text-sm mt-1">Keep going on your spiritual journey!</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="divine-card mb-6"
          >
            <h2 className="text-xl font-mukti font-semibold mb-3">This Week</h2>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-xs text-divine-blue/70 dark:text-white/70">{day.dayName}</span>
                  <div className={`w-8 h-8 mt-1 rounded-full flex items-center justify-center ${day.isActive ? 'bg-divine-saffron text-white' : 'bg-divine-cream/70 dark:bg-divine-blue/70 text-divine-blue/60 dark:text-white/60'}`}>
                    {day.dayNumber}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="divine-card"
          >
            <h2 className="text-xl font-mukti font-semibold mb-3">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.completed ? 'bg-divine-cream/70 dark:bg-divine-blue/30' : 'bg-divine-cream/30 dark:bg-divine-blue/20 opacity-60'}`}>
                  {achievement.icon}
                  <div>
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-divine-blue/70 dark:text-white/70">{achievement.description}</p>
                  </div>
                  {achievement.completed && (
                    <div className="ml-auto">
                      <div className="w-6 h-6 rounded-full bg-divine-gold/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-divine-gold"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </main>
        
        <Navigation />
      </div>
    </div>
  );
};

export default StreaksPage;
