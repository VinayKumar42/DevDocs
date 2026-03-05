import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function CodeBlock({ code, language = 'javascript', title }) {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting
  const highlightCode = (code) => {
    const keywords = /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|new|this|true|false|null|undefined)\b/g;
    const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
    const numbers = /\b(\d+\.?\d*)\b/g;
    const functions = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;

    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    highlighted = highlighted.replace(comments, '<span class="text-slate-500">$1</span>');
    highlighted = highlighted.replace(strings, '<span class="text-green-400">$&</span>');
    highlighted = highlighted.replace(keywords, '<span class="text-purple-400">$1</span>');
    highlighted = highlighted.replace(numbers, '<span class="text-amber-400">$1</span>');
    highlighted = highlighted.replace(functions, '<span class="text-blue-400">$1</span>(');

    return highlighted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-xl overflow-hidden
        ${isDark 
          ? 'bg-[#0d1117] border border-slate-700/50' 
          : 'bg-slate-900 border border-slate-200'
        }
      `}
    >
      {/* Header */}
      <div className={`
        flex items-center justify-between px-4 py-3
        ${isDark ? 'bg-slate-800/50' : 'bg-slate-800'}
        border-b border-slate-700/50
      `}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Terminal className="w-4 h-4" />
              <span>{title}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 uppercase font-medium">{language}</span>
          <motion.button
            onClick={handleCopy}
            whileTap={{ scale: 0.9 }}
            className={`
              p-2 rounded-lg transition-colors
              ${copied 
                ? 'bg-green-500/20 text-green-400' 
                : 'hover:bg-slate-700 text-slate-400 hover:text-white'
              }
            `}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Code */}
      <div className="relative overflow-x-auto">
        <pre className="p-5 text-sm leading-7 whitespace-pre-wrap break-words">
          <code 
            className="text-slate-300 font-mono block"
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>
      </div>
    </motion.div>
  );
}