import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-16 h-8 rounded-full p-1 transition-colors duration-500
        ${isDark 
          ? 'bg-slate-700 border border-slate-600' 
          : 'bg-slate-200 border border-slate-300'
        }
      `}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`
          absolute top-1 w-6 h-6 rounded-full flex items-center justify-center
          ${isDark ? 'bg-slate-900' : 'bg-white'}
          shadow-lg
        `}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 360 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-blue-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}