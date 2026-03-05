import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function DocCard({ title, description, icon: Icon, gradient, delay = 0, onClick }) {
  const { isDark } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative group text-left p-6 rounded-2xl overflow-hidden
        transition-all duration-300
        ${isDark 
          ? 'bg-[#111827] border border-slate-800 hover:border-slate-700' 
          : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg'
        }
      `}
    >
      {/* Gradient glow effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-br ${gradient} blur-xl
      `} style={{ opacity: 0.1 }} />

      {/* Content */}
      <div className="relative z-10">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-4
          bg-gradient-to-br ${gradient}
          shadow-lg
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className={`
          font-semibold text-lg mb-2 flex items-center gap-2
          ${isDark ? 'text-white' : 'text-slate-900'}
        `}>
          {title}
          <ArrowRight className={`
            w-4 h-4 transition-transform duration-300
            group-hover:translate-x-1
            ${isDark ? 'text-slate-400' : 'text-slate-500'}
          `} />
        </h3>

        <p className={`
          text-sm leading-relaxed
          ${isDark ? 'text-slate-400' : 'text-slate-600'}
        `}>
          {description}
        </p>
      </div>

      {/* Border gradient on hover */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-gradient-to-br ${gradient}
      `} style={{ 
        padding: '1px',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude'
      }} />
    </motion.button>
  );
}