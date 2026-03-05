import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Medal, Crown, Flame } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const BADGE_ICONS = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  award: Award,
  medal: Medal,
  crown: Crown,
  flame: Flame
};

export default function AchievementBadge({ badge, size = 'md', showDetails = true }) {
  const { isDark } = useTheme();
  const Icon = BADGE_ICONS[badge.badge_icon] || Trophy;

  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center"
    >
      <div className={`
        ${sizes[size]} rounded-full flex items-center justify-center
        bg-gradient-to-br ${badge.badge_color || 'from-amber-500 to-orange-500'}
        shadow-lg relative
      `}>
        <Icon className={`${iconSizes[size]} text-white`} />
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
      </div>
      
      {showDetails && (
        <div className="mt-2 text-center">
          <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {badge.badge_name}
          </p>
          {badge.badge_description && (
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {badge.badge_description}
            </p>
          )}
          {badge.xp_reward > 0 && (
            <p className="text-xs mt-1 text-amber-500">+{badge.xp_reward} XP</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

export const AVAILABLE_BADGES = [
  { id: 'first_step', name: 'First Steps', description: 'Complete your first topic', icon: 'star', color: 'from-blue-500 to-cyan-500', xp: 25 },
  { id: 'quiz_master', name: 'Quiz Master', description: 'Score 100% on a quiz', icon: 'zap', color: 'from-purple-500 to-pink-500', xp: 50 },
  { id: 'code_warrior', name: 'Code Warrior', description: 'Complete your first coding challenge', icon: 'target', color: 'from-green-500 to-emerald-500', xp: 50 },
  { id: 'path_complete', name: 'Path Complete', description: 'Complete a learning path', icon: 'trophy', color: 'from-amber-500 to-orange-500', xp: 100 },
  { id: 'streak_3', name: 'On Fire', description: 'Maintain a 3-day streak', icon: 'flame', color: 'from-red-500 to-orange-500', xp: 30 },
  { id: 'streak_7', name: 'Dedicated Learner', description: 'Maintain a 7-day streak', icon: 'flame', color: 'from-orange-500 to-yellow-500', xp: 75 },
  { id: 'beginner_done', name: 'Beginner Graduate', description: 'Complete all beginner paths', icon: 'medal', color: 'from-green-400 to-green-600', xp: 150 },
  { id: 'intermediate_done', name: 'Intermediate Master', description: 'Complete all intermediate paths', icon: 'award', color: 'from-blue-400 to-blue-600', xp: 250 },
  { id: 'advanced_done', name: 'Advanced Expert', description: 'Complete all advanced paths', icon: 'crown', color: 'from-purple-400 to-purple-600', xp: 500 },
  { id: 'xp_500', name: 'Rising Star', description: 'Earn 500 XP', icon: 'star', color: 'from-yellow-400 to-amber-500', xp: 50 },
  { id: 'xp_1000', name: 'Knowledge Seeker', description: 'Earn 1000 XP', icon: 'star', color: 'from-amber-400 to-orange-500', xp: 100 },
  { id: 'xp_5000', name: 'Grandmaster', description: 'Earn 5000 XP', icon: 'crown', color: 'from-yellow-500 to-yellow-300', xp: 250 }
];