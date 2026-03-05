import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 1 },
  { id: 'getting-started', title: 'Getting Started', level: 1 },
  { id: 'prerequisites', title: 'Prerequisites', level: 2 },
  { id: 'installation', title: 'Installation', level: 2 },
  { id: 'basic-concepts', title: 'Basic Concepts', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'simple-example', title: 'Simple Example', level: 2 },
  { id: 'advanced-example', title: 'Advanced Example', level: 2 },
  { id: 'best-practices', title: 'Best Practices', level: 1 },
  { id: 'references', title: 'References', level: 1 },
  { id: 'ai-generator', title: '🤖 AI Learning', level: 1 },
];

export default function TableOfContents() {
  const { isDark } = useTheme();
  const [activeId, setActiveId] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveId(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        sticky top-24 p-4 rounded-xl
        ${isDark 
          ? 'bg-slate-800/30 border border-slate-700/50' 
          : 'bg-slate-50 border border-slate-200'
        }
      `}
    >
      <div className="flex items-center gap-2 mb-4">
        <List className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          On this page
        </span>
      </div>

      <nav className="space-y-1">
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`
              block py-1.5 text-sm transition-all duration-200
              ${item.level === 2 ? 'pl-4' : ''}
              ${activeId === item.id
                ? isDark 
                  ? 'text-blue-400 font-medium border-l-2 border-blue-400 pl-3' 
                  : 'text-blue-600 font-medium border-l-2 border-blue-600 pl-3'
                : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }
            `}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </motion.div>
  );
}