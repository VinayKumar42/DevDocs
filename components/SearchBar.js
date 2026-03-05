import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, FileText, Code2, ArrowRight, MessageSquare, BookOpen, Loader2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useDebounce } from '../hooks/useDebounce';

// Fallback static data for initial display
const defaultResults = [
  { category: 'Programming Languages', title: 'JavaScript', type: 'doc' },
  { category: 'Programming Languages', title: 'Python', type: 'doc' },
  { category: 'Data Structures & Algorithms', title: 'Arrays', type: 'doc' },
  { category: 'Data Structures & Algorithms', title: 'Linked Lists', type: 'doc' },
  { category: 'Web Development', title: 'React', type: 'doc' },
];

export default function SearchBar({ onSelectResult }) {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  
  const debouncedQuery = useDebounce(query, 300);

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}&type=all`);
        const data = await res.json();
        
        if (data.success) {
          const combinedResults = [
            ...data.docs.map(d => ({ ...d, type: 'doc' })),
            ...data.questions.map(q => ({ ...q, type: 'question' })),
            ...data.learningPaths.map(p => ({ ...p, type: 'learningPath' }))
          ];
          setResults(combinedResults);
        }
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const displayResults = query ? results : defaultResults;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, displayResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && displayResults[selectedIndex]) {
      onSelectResult(displayResults[selectedIndex]);
      setIsOpen(false);
      setQuery('');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'question':
        return <MessageSquare className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />;
      case 'learningPath':
        return <BookOpen className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />;
      case 'code':
        return <Code2 className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />;
      default:
        return <FileText className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'question':
        return isDark ? 'bg-blue-500/20' : 'bg-blue-100';
      case 'learningPath':
        return isDark ? 'bg-purple-500/20' : 'bg-purple-100';
      case 'code':
        return isDark ? 'bg-green-500/20' : 'bg-green-100';
      default:
        return isDark ? 'bg-cyan-500/20' : 'bg-cyan-100';
    }
  };

  return (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-xl
          transition-all duration-200 w-full max-w-md
          ${isDark 
            ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400' 
            : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500'
          }
        `}
      >
        <Search className="w-4 h-4" />
        <span className="text-sm flex-1 text-left">Search documentation...</span>
        <div className={`
          flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
          ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-500'}
        `}>
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`
                fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50
                rounded-2xl overflow-hidden shadow-2xl
                ${isDark 
                  ? 'bg-[#111827] border border-slate-700' 
                  : 'bg-white border border-slate-200'
                }
              `}
            >
              {/* Search Input */}
              <div className={`
                flex items-center gap-4 px-5 py-4 border-b
                ${isDark ? 'border-slate-700' : 'border-slate-200'}
              `}>
                <Search className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNavigation}
                  placeholder="Search docs, components, guides..."
                  className={`
                    flex-1 bg-transparent outline-none text-lg
                    ${isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'}
                  `}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className={`
                    p-1.5 rounded-lg transition-colors
                    ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
                  `}
                >
                  <X className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto p-2">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className={`w-6 h-6 animate-spin ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  </div>
                ) : displayResults.length > 0 ? (
                  <div className="space-y-1">
                    {displayResults.map((result, index) => (
                      <motion.button
                        key={`${result.type}-${result.id || result.title}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => {
                          onSelectResult(result);
                          setIsOpen(false);
                          setQuery('');
                        }}
                        className={`
                          w-full flex items-center gap-4 px-4 py-3 rounded-xl
                          transition-all duration-150
                          ${selectedIndex === index
                            ? isDark 
                              ? 'bg-blue-500/20 border border-blue-500/30' 
                              : 'bg-blue-50 border border-blue-200'
                            : isDark
                              ? 'hover:bg-slate-800/50 border border-transparent'
                              : 'hover:bg-slate-50 border border-transparent'
                          }
                        `}
                      >
                        <div className={`p-2 rounded-lg ${getIconBg(result.type)}`}>
                          {getIcon(result.type)}
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {result.title}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {result.category} {result.type === 'question' && `• ${result.answersCount || 0} answers`}
                            {result.type === 'learningPath' && `• ${result.difficulty}`}
                          </p>
                        </div>
                        <ArrowRight className={`
                          w-4 h-4 transition-transform
                          ${selectedIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}
                          ${isDark ? 'text-blue-400' : 'text-blue-500'}
                        `} />
                      </motion.button>
                    ))}
                  </div>
                ) : query ? (
                  <div className={`
                    text-center py-12
                    ${isDark ? 'text-slate-400' : 'text-slate-500'}
                  `}>
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No results found for "{query}"</p>
                  </div>
                ) : null}
              </div>

              {/* Footer */}
              <div className={`
                flex items-center justify-between px-5 py-3 border-t
                ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}
              `}>
                <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span className="flex items-center gap-1">
                    <kbd className={`px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className={`px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>↵</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className={`px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>esc</kbd>
                    Close
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}