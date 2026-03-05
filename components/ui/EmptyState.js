import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeProvider';
import { FileQuestion, Search, BookOpen, MessageSquare, AlertCircle } from 'lucide-react';

const icons = {
  questions: MessageSquare,
  search: Search,
  learning: BookOpen,
  error: AlertCircle,
  default: FileQuestion
};

export default function EmptyState({
  type = 'default',
  title,
  description,
  action,
  actionLabel,
  icon: CustomIcon
}) {
  const { isDark } = useTheme();
  const Icon = CustomIcon || icons[type] || icons.default;
  
  const defaultContent = {
    questions: {
      title: 'No questions found',
      description: 'Be the first to ask a question!'
    },
    search: {
      title: 'No results found',
      description: 'Try adjusting your search or filters'
    },
    learning: {
      title: 'No learning paths yet',
      description: 'Start your learning journey!'
    },
    error: {
      title: 'Something went wrong',
      description: 'Please try again later'
    },
    default: {
      title: 'Nothing here yet',
      description: 'Check back later'
    }
  };

  const content = defaultContent[type] || defaultContent.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div
        className={`
          w-16 h-16 rounded-2xl flex items-center justify-center mb-4
          ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}
        `}
      >
        <Icon className={`w-8 h-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
      </div>
      
      <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title || content.title}
      </h3>
      
      <p className={`text-sm max-w-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {description || content.description}
      </p>
      
      {action && actionLabel && (
        <button
          onClick={action}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
