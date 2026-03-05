import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2, Send, Tag, Link2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';

const CATEGORIES = [
  'Programming Languages', 'Data Structures & Algorithms', 'Web Development',
  'Backend Development', 'Databases', 'System Design', 'Operating Systems',
  'Computer Networks', 'Interview Prep', 'General'
];

export default function AskQuestionModal({ isOpen, onClose, onSubmit, currentCategory, currentTopic }) {
  const { isDark } = useTheme();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState(currentCategory || 'General');
  const [topic, setTopic] = useState(currentTopic || '');
  const [tags, setTags] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const analyzeQuestion = async () => {
    if (!title || !body) return;
    
    setIsAnalyzing(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this developer question and provide helpful suggestions:

Title: ${title}
Body: ${body}
Category: ${category}

Provide:
1. Suggested tags (max 5, relevant programming terms)
2. Related documentation topics that might help
3. A brief assessment of the question quality and any improvements needed
4. Check if this question is appropriate for a developer Q&A forum`,
        response_json_schema: {
          type: "object",
          properties: {
            suggested_tags: { type: "array", items: { type: "string" } },
            related_docs: { type: "array", items: { type: "string" } },
            quality_assessment: { type: "string" },
            is_appropriate: { type: "boolean" },
            improvement_tips: { type: "array", items: { type: "string" } }
          }
        }
      });
      setAiSuggestions(response);
      if (response.suggested_tags) {
        setTags(response.suggested_tags.join(', '));
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    
    setIsSubmitting(true);
    try {
      const user = await base44.auth.me();
      await onSubmit({
        title: title.trim(),
        body: body.trim(),
        category,
        topic: topic.trim(),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        author_name: user?.full_name || 'Anonymous',
        author_email: user?.email || '',
        suggested_docs: aiSuggestions?.related_docs || [],
        status: 'open',
        votes: 0,
        views: 0
      });
      onClose();
      setTitle('');
      setBody('');
      setTags('');
      setAiSuggestions(null);
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`
            w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl
            ${isDark ? 'bg-[#111827] border border-slate-700' : 'bg-white border border-slate-200'}
          `}
        >
          {/* Header */}
          <div className={`sticky top-0 flex items-center justify-between p-5 border-b ${isDark ? 'border-slate-700 bg-[#111827]' : 'border-slate-200 bg-white'}`}>
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ask a Question
            </h2>
            <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
              <X className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
          </div>

          {/* Form */}
          <div className="p-5 space-y-5">
            {/* Title */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Question Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your programming question?"
                className={`
                  w-full px-4 py-3 rounded-xl text-sm
                  ${isDark 
                    ? 'bg-slate-800 text-white placeholder:text-slate-500 border border-slate-700' 
                    : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
              />
            </div>

            {/* Body */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Details *
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Describe your question in detail. Include code examples if relevant..."
                rows={6}
                className={`
                  w-full px-4 py-3 rounded-xl text-sm resize-none
                  ${isDark 
                    ? 'bg-slate-800 text-white placeholder:text-slate-500 border border-slate-700' 
                    : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
              />
            </div>

            {/* Category & Topic */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`
                    w-full px-4 py-3 rounded-xl text-sm
                    ${isDark 
                      ? 'bg-slate-800 text-white border border-slate-700' 
                      : 'bg-slate-50 text-slate-900 border border-slate-200'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Topic (optional)
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., React Hooks, Binary Search"
                  className={`
                    w-full px-4 py-3 rounded-xl text-sm
                    ${isDark 
                      ? 'bg-slate-800 text-white placeholder:text-slate-500 border border-slate-700' 
                      : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Tags (comma separated)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="javascript, arrays, sorting"
                  className={`
                    flex-1 px-4 py-3 rounded-xl text-sm
                    ${isDark 
                      ? 'bg-slate-800 text-white placeholder:text-slate-500 border border-slate-700' 
                      : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                />
                <button
                  onClick={analyzeQuestion}
                  disabled={isAnalyzing || !title || !body}
                  className={`
                    px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium
                    ${isAnalyzing || !title || !body
                      ? 'bg-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    }
                    text-white
                  `}
                >
                  {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  AI Analyze
                </button>
              </div>
            </div>

            {/* AI Suggestions */}
            {aiSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'}`}
              >
                <h4 className={`font-medium mb-3 flex items-center gap-2 ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                  <Sparkles className="w-4 h-4" />
                  AI Analysis
                </h4>
                
                <p className={`text-sm mb-3 ${isDark ? 'text-purple-200/80' : 'text-purple-700'}`}>
                  {aiSuggestions.quality_assessment}
                </p>

                {aiSuggestions.improvement_tips?.length > 0 && (
                  <div className="mb-3">
                    <p className={`text-xs font-medium mb-1 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Tips:</p>
                    <ul className={`text-xs space-y-1 ${isDark ? 'text-purple-200/70' : 'text-purple-600'}`}>
                      {aiSuggestions.improvement_tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiSuggestions.related_docs?.length > 0 && (
                  <div>
                    <p className={`text-xs font-medium mb-1 flex items-center gap-1 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                      <Link2 className="w-3 h-3" /> Related Docs:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {aiSuggestions.related_docs.map((doc, i) => (
                        <span key={i} className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className={`sticky bottom-0 flex justify-end gap-3 p-5 border-t ${isDark ? 'border-slate-700 bg-[#111827]' : 'border-slate-200 bg-white'}`}>
            <button
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !body.trim()}
              className={`
                px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2
                ${isSubmitting || !title.trim() || !body.trim()
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                }
                text-white
              `}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Post Question
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}