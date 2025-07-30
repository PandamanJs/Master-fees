import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  Bell,
  Star,
  Heart,
  Zap,
  Trophy,
  Gift
} from "lucide-react";

interface EasterEggZone {
  id: string;
  element: string;
  reaction: string;
  sound?: string;
  special?: boolean;
}

export default function DashboardPreviewEnhanced() {
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);
  const [discoveredEggs, setDiscoveredEggs] = useState<Set<string>>(new Set());
  const [showSpecialReward, setShowSpecialReward] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Easter egg zones within the dashboard
  const easterEggs: EasterEggZone[] = [
    { id: 'revenue', element: 'Revenue Card', reaction: '🐼💰', sound: 'cha-ching' },
    { id: 'students', element: 'Students Card', reaction: '🐼🎒', sound: 'school-bell' },
    { id: 'growth', element: 'Growth Chart', reaction: '🐼📈', sound: 'success' },
    { id: 'calendar', element: 'Calendar', reaction: '🐼📅', sound: 'tick' },
    { id: 'notifications', element: 'Notifications', reaction: '🐼🔔', sound: 'notification' },
    { id: 'star-rating', element: 'Star Rating', reaction: '🐼⭐', sound: 'star', special: true },
    { id: 'panda-logo', element: 'Hidden Panda', reaction: '🐼🎉', sound: 'celebration', special: true },
    { id: 'payment-0', element: 'Payment Row', reaction: '🐼💳', sound: 'payment' },
    { id: 'payment-1', element: 'Payment Row', reaction: '🐼💸', sound: 'payment' },
    { id: 'payment-2', element: 'Payment Row', reaction: '🐼🏦', sound: 'payment' },
    { id: 'view-details', element: 'View Details Button', reaction: '🐼🔍', sound: 'click' }
  ];

  const handleEasterEggClick = (eggId: string) => {
    const egg = easterEggs.find(e => e.id === eggId);
    if (!egg) return;

    setCurrentReaction(egg.reaction);
    const newDiscovered = new Set(discoveredEggs);
    newDiscovered.add(eggId);
    setDiscoveredEggs(newDiscovered);

    // Check if all eggs discovered
    if (newDiscovered.size === easterEggs.length) {
      setTimeout(() => {
        setShowSpecialReward(true);
        setTimeout(() => setShowSpecialReward(false), 5000);
      }, 1000);
    }

    // Clear reaction after animation
    setTimeout(() => setCurrentReaction(null), 2000);
  };

  const stats = [
    {
      id: 'revenue',
      title: "Total Revenue",
      value: "₹2,34,567",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      id: 'students',
      title: "Active Students",
      value: "1,247",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      id: 'growth',
      title: "Monthly Growth",
      value: "23.4%",
      change: "+4.1%",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="relative">
      <Card ref={cardRef} className="bg-white dark:bg-gray-900 shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">School Dashboard</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEasterEggClick('notifications')}
                  className="relative p-2 text-gray-600 hover:text-brand-teal transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <button
                  onClick={() => handleEasterEggClick('calendar')}
                  className="p-2 text-gray-600 hover:text-brand-teal transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Hidden panda easter egg */}
            <div 
              className="absolute top-4 right-16 w-3 h-3 opacity-0 hover:opacity-100 cursor-pointer transition-all duration-300 hover:scale-150"
              onClick={() => handleEasterEggClick('panda-logo')}
              title="Secret panda! 🐼"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full animate-pulse-soft"></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleEasterEggClick(stat.id)}
                className="cursor-pointer easter-egg-hover"
              >
                <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 border-0 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                        <p className="text-sm text-emerald-600 font-medium">
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-white dark:bg-gray-800 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Payments</h4>
            <div className="space-y-3">
              {[
                { student: "Arjun Sharma", amount: "₹15,000", status: "Completed", time: "2 hours ago" },
                { student: "Priya Patel", amount: "₹12,500", status: "Pending", time: "5 hours ago" },
                { student: "Raj Kumar", amount: "₹18,000", status: "Completed", time: "1 day ago" }
              ].map((payment, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors easter-egg-hover"
                  onClick={() => handleEasterEggClick(`payment-${index}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-mint rounded-full flex items-center justify-center">
                      <span className="text-brand-teal font-bold text-sm">
                        {payment.student.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{payment.student}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{payment.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{payment.amount}</p>
                    <Badge 
                      variant={payment.status === 'Completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Star Rating Easter Egg */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">School Rating:</span>
              <div 
                className="flex space-x-1 cursor-pointer easter-egg-hover"
                onClick={() => handleEasterEggClick('star-rating')}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">4.9/5</span>
            </div>
            
            <Button 
              size="sm" 
              className="bg-brand-teal hover:bg-brand-teal/90 easter-egg-hover"
              onClick={() => handleEasterEggClick('view-details')}
            >
              View Details
            </Button>
          </div>

          {/* Discovery Progress */}
          {discoveredEggs.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-brand-mint/20 rounded-lg border border-brand-mint/30"
            >
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-brand-teal" />
                <span className="text-sm font-medium text-brand-teal">
                  Easter Eggs Found: {discoveredEggs.size}/{easterEggs.length}
                </span>
                {discoveredEggs.size === easterEggs.length && (
                  <Gift className="w-4 h-4 text-yellow-500 animate-bounce" />
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Floating Reaction */}
      <AnimatePresence>
        {currentReaction && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1, 0],
              y: -50
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl pointer-events-none z-10"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
          >
            {currentReaction}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Special Reward Animation */}
      <AnimatePresence>
        {showSpecialReward && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ 
              scale: [0, 2, 1],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-20"
          >
            <div className="text-center">
              <div className="text-8xl mb-4">🐼🏆✨</div>
              <div className="text-2xl font-bold text-brand-teal bg-white px-6 py-3 rounded-full shadow-lg">
                Master Explorer!
              </div>
              <div className="text-sm text-gray-600 mt-2">
                You found all the easter eggs!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}