import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Trophy, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

export default function LearningPathCard({ path, progress, onClick, delay = 0 }) {
  const { isDark } = useTheme();
  
  const completedCount = progress?.completed_topics?.length || 0;
  const totalTopics = path.topics?.length || 0;
  const progressPercent = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;
  const isCompleted = progress?.status === 'completed';
  const isStarted = progress?.status === 'in_progress';

  const difficultyColors = {
    beginner: 'from-green-500 to-emerald-500',
    intermediate: 'from-amber-500 to-orange-500',
    advanced: 'from-red-500 to-pink-500'
  };

  const difficultyLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full text-left p-5 rounded-2xl relative overflow-hidden
        transition-all duration-300
        ${isDark 
          ? 'bg-slate-800/50 border border-slate-700 hover:border-slate-600' 
          : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg'
        }
      `}
    >
      {/* Progress bar background */}
      <div 
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${path.color || difficultyColors[path.difficulty]} transition-all duration-500`}
        style={{ width: `${progressPercent}%` }}
      />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`
          w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
          bg-gradient-to-br ${path.color || difficultyColors[path.difficulty]}
        `}>
          {isCompleted ? (
            <CheckCircle2 className="w-7 h-7 text-white" />
          ) : (
            <BookOpen className="w-7 h-7 text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {path.title}
            </h3>
            {isCompleted && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                Completed
              </span>
            )}
          </div>
          
          <p className={`text-sm line-clamp-2 mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {path.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className={`px-2 py-1 rounded-full font-medium bg-gradient-to-r ${difficultyColors[path.difficulty]} text-white`}>
              {difficultyLabels[path.difficulty]}
            </span>
            <span className={`flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              <Clock className="w-3 h-3" />
              {path.estimated_hours || '?'}h
            </span>
            <span className={`flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              <BookOpen className="w-3 h-3" />
              {totalTopics} topics
            </span>
            {path.total_xp > 0 && (
              <span className={`flex items-center gap-1 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                <Trophy className="w-3 h-3" />
                {path.total_xp} XP
              </span>
            )}
          </div>

          {/* Progress */}
          {isStarted && !isCompleted && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Progress</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{completedCount}/{totalTopics}</span>
              </div>
              <div className={`h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${path.color || difficultyColors[path.difficulty]} transition-all duration-500`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
      </div>
    </motion.button>
  );
}