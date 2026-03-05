import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles, Loader2, Bug, Zap, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';

export default function AICodeReview({ code, language, onClose }) {
  const { isDark } = useTheme();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [review, setReview] = useState(null);

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an expert code reviewer. Analyze this code and provide a comprehensive review:

\`\`\`${language || 'code'}
${code}
\`\`\`

Provide:
1. Potential bugs or errors (critical issues that could cause failures)
2. Performance optimizations (ways to make the code faster/more efficient)
3. Style improvements (adherence to best practices and conventions)
4. Security concerns (if any)
5. Overall code quality score (1-10) with brief explanation

Be specific and actionable in your feedback.`,
        response_json_schema: {
          type: "object",
          properties: {
            bugs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  severity: { type: "string", enum: ["critical", "warning", "info"] },
                  line: { type: "string" },
                  issue: { type: "string" },
                  fix: { type: "string" }
                }
              }
            },
            optimizations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  area: { type: "string" },
                  suggestion: { type: "string" },
                  impact: { type: "string" }
                }
              }
            },
            style_issues: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  rule: { type: "string" },
                  suggestion: { type: "string" }
                }
              }
            },
            security_concerns: {
              type: "array",
              items: { type: "string" }
            },
            quality_score: { type: "number" },
            quality_summary: { type: "string" }
          }
        }
      });
      setReview(response);
    } catch (error) {
      console.error('Code review failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const severityColors = {
    critical: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200',
    warning: isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200',
    info: isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'
  };

  const getScoreColor = (score) => {
    if (score >= 8) return isDark ? 'text-green-400' : 'text-green-600';
    if (score >= 5) return isDark ? 'text-amber-400' : 'text-amber-600';
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl overflow-hidden ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200 shadow-sm'}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <Code2 className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>AI Code Review</h3>
        </div>
        <div className="flex items-center gap-2">
          {!review && (
            <button
              onClick={analyzeCode}
              disabled={isAnalyzing}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                ${isAnalyzing
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }
                text-white
              `}
            >
              {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
              <X className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
          )}
        </div>
      </div>

      {/* Review Results */}
      <AnimatePresence>
        {review && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 space-y-4"
          >
            {/* Quality Score */}
            <div className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
              <div className={`text-4xl font-bold ${getScoreColor(review.quality_score)}`}>
                {review.quality_score}/10
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Code Quality Score</p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{review.quality_summary}</p>
              </div>
            </div>

            {/* Bugs */}
            {review.bugs?.length > 0 && (
              <div>
                <h4 className={`flex items-center gap-2 font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Bug className="w-4 h-4 text-red-500" />
                  Potential Issues ({review.bugs.length})
                </h4>
                <div className="space-y-2">
                  {review.bugs.map((bug, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${severityColors[bug.severity]}`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-medium text-sm">{bug.issue}</span>
                        <span className={`text-xs px-2 py-0.5 rounded uppercase font-medium ${
                          bug.severity === 'critical' ? 'bg-red-500 text-white' :
                          bug.severity === 'warning' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                        }`}>{bug.severity}</span>
                      </div>
                      {bug.line && <p className={`text-xs mb-1 ${isDark ? 'opacity-70' : 'opacity-80'}`}>Line: {bug.line}</p>}
                      <p className={`text-sm ${isDark ? 'opacity-80' : 'opacity-90'}`}>💡 Fix: {bug.fix}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimizations */}
            {review.optimizations?.length > 0 && (
              <div>
                <h4 className={`flex items-center gap-2 font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Zap className="w-4 h-4 text-amber-500" />
                  Optimizations ({review.optimizations.length})
                </h4>
                <div className="space-y-2">
                  {review.optimizations.map((opt, i) => (
                    <div key={i} className={`p-3 rounded-lg ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
                      <p className={`font-medium text-sm mb-1 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>{opt.area}</p>
                      <p className={`text-sm ${isDark ? 'text-amber-200/80' : 'text-amber-700'}`}>{opt.suggestion}</p>
                      {opt.impact && <p className={`text-xs mt-1 ${isDark ? 'text-amber-300/60' : 'text-amber-600'}`}>Impact: {opt.impact}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Style Issues */}
            {review.style_issues?.length > 0 && (
              <div>
                <h4 className={`flex items-center gap-2 font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  Style Guidelines ({review.style_issues.length})
                </h4>
                <div className="space-y-2">
                  {review.style_issues.map((style, i) => (
                    <div key={i} className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                      <p className={`font-medium text-sm mb-1 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>{style.rule}</p>
                      <p className={`text-sm ${isDark ? 'text-blue-200/80' : 'text-blue-700'}`}>{style.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {review.security_concerns?.length > 0 && (
              <div>
                <h4 className={`flex items-center gap-2 font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Security Concerns
                </h4>
                <ul className={`space-y-1 ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                  {review.security_concerns.map((concern, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span>⚠️</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No Issues */}
            {!review.bugs?.length && !review.optimizations?.length && !review.style_issues?.length && !review.security_concerns?.length && (
              <div className={`text-center py-4 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Great code! No major issues found.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}