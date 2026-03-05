import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Eye, CheckCircle2, Clock, Tag } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { format } from 'date-fns';

export default function QuestionCard({ question, answerCount, onClick }) {
  const { isDark } = useTheme();

  const statusColors = {
    open: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
    answered: isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700',
    closed: isDark ? 'bg-slate-500/20 text-slate-400' : 'bg-slate-100 text-slate-600'
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={`
        w-full text-left p-5 rounded-xl transition-all
        ${isDark 
          ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600' 
          : 'bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm'
        }
      `}
    >
      <div className="flex gap-4">
        {/* Stats */}
        <div className="hidden sm:flex flex-col items-center gap-2 text-center min-w-[60px]">
          <div className={`text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className="text-lg font-semibold">{question.votes || 0}</div>
            <div className="text-xs">votes</div>
          </div>
          <div className={`
            text-center px-2 py-1 rounded-lg
            ${answerCount > 0 
              ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
              : isDark ? 'text-slate-500' : 'text-slate-400'
            }
          `}>
            <div className="text-lg font-semibold">{answerCount}</div>
            <div className="text-xs">answers</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-semibold line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {question.title}
            </h3>
            <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[question.status]}`}>
              {question.status}
            </span>
          </div>

          <p className={`text-sm line-clamp-2 mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {question.body}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-0.5 rounded text-xs ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
              {question.category}
            </span>
            {question.topic && (
              <span className={`px-2 py-0.5 rounded text-xs ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                {question.topic}
              </span>
            )}
            {question.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className={`px-2 py-0.5 rounded text-xs ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {format(new Date(question.createdAt || question.created_date), 'MMM d, yyyy')}
            </span>
            <span>{question.author_name || 'Anonymous'}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {question.views || 0}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}