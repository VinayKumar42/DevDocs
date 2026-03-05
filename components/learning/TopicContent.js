import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Play, BookOpen, Code2, Sparkles, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock';

export default function TopicContent({ topic, path, isUnlocked, isCompleted, onComplete }) {
  const { isDark } = useTheme();
  const [content, setContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate comprehensive learning content for the topic "${topic.title}" in the "${path.category}" category at ${topic.level} level.

Include:
1. A clear explanation of the concept (2-3 paragraphs)
2. Key points to remember (bullet points)
3. A practical code example with detailed explanation
4. Common mistakes to avoid
5. Real-world applications

Format using markdown. Make it engaging and educational.`,
        response_json_schema: {
          type: "object",
          properties: {
            explanation: { type: "string" },
            key_points: { type: "array", items: { type: "string" } },
            code_example: { type: "string" },
            code_language: { type: "string" },
            code_explanation: { type: "string" },
            common_mistakes: { type: "array", items: { type: "string" } },
            real_world_applications: { type: "array", items: { type: "string" } }
          }
        }
      });
      setContent(response);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className={`text-center py-16 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <Lock className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Topic Locked</h3>
        <p>Complete the previous topics to unlock this one.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Topic Header */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Play className="w-6 h-6 text-blue-500" />
              )}
              <span className={`text-sm px-2 py-0.5 rounded-full ${
                topic.level === 'beginner' ? 'bg-green-500/20 text-green-500' :
                topic.level === 'intermediate' ? 'bg-amber-500/20 text-amber-500' :
                'bg-red-500/20 text-red-500'
              }`}>
                {topic.level}
              </span>
            </div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {topic.title}
            </h2>
            <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {topic.description}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-2 mt-6 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
          {['learn', 'examples'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? isDark ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600'
                  : isDark ? 'border-transparent text-slate-400 hover:text-slate-300' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'learn' ? 'Learn' : 'Code Examples'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {!content && !isGenerating && (
        <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
          <Sparkles className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Generate Learning Content
          </h3>
          <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            AI will create personalized content for this topic
          </p>
          <button
            onClick={generateContent}
            className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Generate Content
          </button>
        </div>
      )}

      {isGenerating && (
        <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'}`}>
          <Loader2 className={`w-12 h-12 mx-auto mb-4 animate-spin ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Generating personalized content...</p>
        </div>
      )}

      {content && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {activeTab === 'learn' && (
            <>
              {/* Explanation */}
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Understanding {topic.title}
                </h3>
                <div className={`prose prose-sm max-w-none ${isDark ? 'prose-invert' : ''}`}>
                  <ReactMarkdown>{content.explanation}</ReactMarkdown>
                </div>
              </div>

              {/* Key Points */}
              {content.key_points?.length > 0 && (
                <div className={`p-6 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                    📌 Key Points
                  </h3>
                  <ul className="space-y-2">
                    {content.key_points.map((point, i) => (
                      <li key={i} className={`flex items-start gap-2 ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {content.common_mistakes?.length > 0 && (
                <div className={`p-6 rounded-xl ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                    ⚠️ Common Mistakes to Avoid
                  </h3>
                  <ul className="space-y-2">
                    {content.common_mistakes.map((mistake, i) => (
                      <li key={i} className={`${isDark ? 'text-amber-200' : 'text-amber-700'}`}>
                        • {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Real World Applications */}
              {content.real_world_applications?.length > 0 && (
                <div className={`p-6 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-green-300' : 'text-green-800'}`}>
                    🌍 Real-World Applications
                  </h3>
                  <ul className="space-y-2">
                    {content.real_world_applications.map((app, i) => (
                      <li key={i} className={`${isDark ? 'text-green-200' : 'text-green-700'}`}>
                        • {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {activeTab === 'examples' && content.code_example && (
            <div className="space-y-4">
              <CodeBlock
                code={content.code_example}
                language={content.code_language || 'javascript'}
                title="Code Example"
              />
              {content.code_explanation && (
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>{content.code_explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Mark Complete Button */}
          {!isCompleted && (
            <div className="flex justify-center pt-4">
              <button
                onClick={onComplete}
                className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Mark as Complete & Continue
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}