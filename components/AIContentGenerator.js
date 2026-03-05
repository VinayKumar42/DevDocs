import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Loader2, 
  Code2, 
  BookOpen, 
  Cpu, 
  RefreshCw,
  ChevronDown,
  Zap
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from './ThemeProvider';
import CodeBlock from './CodeBlock';
import { getTopicInfo } from '../utils/topicData';

const LANGUAGES = ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go'];

const CONTENT_TYPES = [
  { id: 'explanation', label: 'Detailed Explanation', icon: BookOpen },
  { id: 'algorithm', label: 'Algorithm Walkthrough', icon: Cpu },
  { id: 'code', label: 'Code Examples', icon: Code2 },
];

export default function AIContentGenerator({ topic, category }) {
  const { isDark } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState('explanation');
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const generateContent = async () => {
    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      // Get topic-specific information from our data
      const topicInfo = getTopicInfo(topic);
      const topicContext = topicInfo 
        ? `Focus specifically on ${topic}. Category: ${topicInfo.category}. Description: ${topicInfo.description}. Key topics to cover: ${topicInfo.keyTopics.join(', ')}. Context: ${topicInfo.context}. IMPORTANT: Only provide information directly related to ${topic} - do not include unrelated content.`
        : `Topic: ${topic}. Category: ${category}. IMPORTANT: Only provide information specifically about ${topic} - stay focused on this topic only.`;

      let prompt = '';
      let schema = {};

      if (selectedType === 'explanation') {
        prompt = `Generate a comprehensive, beginner-friendly explanation ONLY for "${topic}".
        
        ${topicContext}
        ${customPrompt ? `Additional context: ${customPrompt}` : ''}

        CRITICAL INSTRUCTIONS:
        - Focus EXCLUSIVELY on ${topic}
        - Do NOT include information about other topics or general concepts unless directly related to ${topic}
        - Stay within the scope of ${topic} at all times
        - Provide specific examples and use cases for ${topic}

        Return the result as a JSON object with ALL of the following keys (do not omit any key, even if empty):
        - title (string) - Should be "${topic}"
        - definition (string) - Clear definition specific to ${topic}
        - importance (string) - Why ${topic} is important in its specific context
        - applications (array of strings) - Real-world applications of ${topic}
        - keyConcepts (array of objects with name and description) - Core concepts of ${topic}
        - misconceptions (array of strings) - Common misconceptions about ${topic}
        - tips (array of strings) - Practical tips for working with ${topic}

        If you do not know the value for a field, return an empty string or empty array for that field. Do NOT omit any field.
        Make it engaging and easy to understand for software engineering students.`;
        
        schema = {
          type: "object",
          properties: {
            title: { type: "string" },
            definition: { type: "string" },
            importance: { type: "string" },
            applications: { type: "array", items: { type: "string" } },
            keyConcepts: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" }
                }
              }
            },
            misconceptions: { type: "array", items: { type: "string" } },
            tips: { type: "array", items: { type: "string" } }
          }
        };
      } else if (selectedType === 'algorithm') {
        prompt = `Create a detailed algorithm walkthrough ONLY for "${topic}".
        
        ${topicContext}
        ${customPrompt ? `Additional context: ${customPrompt}` : ''}
        
        CRITICAL INSTRUCTIONS:
        - Focus EXCLUSIVELY on ${topic}
        - Do NOT include information about other algorithms or topics
        - Provide specific implementation details for ${topic}
        
        Include:
        1. Problem statement specific to ${topic}
        2. Approach explanation for ${topic}
        3. Step-by-step breakdown of ${topic}
        4. Time and space complexity analysis of ${topic}
        5. When to use ${topic} specifically
        6. Common variations of ${topic}
        
        Make it practical and interview-focused.`;
        
        schema = {
          type: "object",
          properties: {
            title: { type: "string" },
            problemStatement: { type: "string" },
            approach: { type: "string" },
            steps: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  step: { type: "number" },
                  description: { type: "string" },
                  explanation: { type: "string" }
                }
              }
            },
            timeComplexity: { type: "string" },
            spaceComplexity: { type: "string" },
            whenToUse: { type: "array", items: { type: "string" } },
            variations: { type: "array", items: { type: "string" } }
          }
        };
      } else if (selectedType === 'code') {
        prompt = `Generate production-quality code examples ONLY for "${topic}" in ${selectedLanguage}.
        
        ${topicContext}
        ${customPrompt ? `Additional context: ${customPrompt}` : ''}
        
        CRITICAL INSTRUCTIONS:
        - Focus EXCLUSIVELY on ${topic}
        - Do NOT include code for other topics or general examples
        - All code examples must demonstrate ${topic} specifically
        
        IMPORTANT FORMATTING RULES:
        - Write COMPLETE code, show EVERY line clearly
        - DO NOT add any comments inside the code
        - NO inline comments, NO header comments, NO explanatory comments in the code
        - Keep the code CLEAN without any // or /* */ or # comments
        - Use proper indentation (2 or 4 spaces)
        - Include blank lines between logical sections
        - Make variable and function names descriptive and self-explanatory
        
        Provide:
        1. A basic implementation of ${topic} (no comments in code)
        2. An advanced/optimized version of ${topic} (no comments in code)
        3. A practical real-world example using ${topic} (no comments in code)
        
        Put all explanations in the "explanation" field, NOT inside the code itself.`;
        
        schema = {
          type: "object",
          properties: {
            title: { type: "string" },
            language: { type: "string" },
            basicExample: {
              type: "object",
              properties: {
                title: { type: "string" },
                code: { type: "string" },
                explanation: { type: "string" }
              }
            },
            advancedExample: {
              type: "object",
              properties: {
                title: { type: "string" },
                code: { type: "string" },
                explanation: { type: "string" }
              }
            },
            practicalExample: {
              type: "object",
              properties: {
                title: { type: "string" },
                code: { type: "string" },
                explanation: { type: "string" }
              }
            }
          }
        };
      }

      let response;
      try {
        const res = await fetch('/api/openai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            response_json_schema: schema,
            add_context_from_internet: true
          }),
        });
        response = await res.json();
      } catch (err) {
        response = { type: 'error', message: 'Failed to contact backend.' };
      }

      // Log raw response for debugging
      if (typeof window !== 'undefined') {
        window.__lastAIResponse = response;
      }

      // If explanation type and required fields are missing, retry with a simpler prompt (no schema)
      if (
        selectedType === 'explanation' &&
        (
          !response.definition ||
          !response.applications ||
          !Array.isArray(response.applications) || response.applications.length === 0 ||
          !response.keyConcepts ||
          !Array.isArray(response.keyConcepts) || response.keyConcepts.length === 0 ||
          !response.tips ||
          !Array.isArray(response.tips) || response.tips.length === 0
        )
      ) {
        const fallbackPrompt = `Explain the following topic for software engineering students. Return a JSON object with keys: title, definition, importance, applications (array), keyConcepts (array of objects with name and description), misconceptions (array), tips (array). Topic: "${topic}". Context: ${category}.`;
        try {
          const res = await fetch('/api/openai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: fallbackPrompt }),
          });
          response = await res.json();
          if (typeof window !== 'undefined') {
            window.__lastAIResponse_fallback = response;
          }
        } catch (err) {
          response = { type: 'error', message: 'Failed to contact backend.' };
        }
      }

      setGeneratedContent({ type: selectedType, data: response });
    } catch (error) {
      console.error('Generation failed:', error);
      setGeneratedContent({ type: 'error', message: 'Failed to generate content. Please try again.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderExplanation = (data) => {
    // Fallbacks for missing fields
    const missingFields = [];
    if (!data.definition) missingFields.push('Definition');
    if (!data.applications || !Array.isArray(data.applications) || data.applications.length === 0) missingFields.push('Applications');
    if (!data.keyConcepts || !Array.isArray(data.keyConcepts) || data.keyConcepts.length === 0) missingFields.push('Key Concepts');
    if (!data.tips || !Array.isArray(data.tips) || data.tips.length === 0) missingFields.push('Tips');

    return (
      <div className="space-y-6">
        <div>
          <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {data.title || topic}
          </h3>
          <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {data.definition || <span className="italic text-red-500">No definition provided.</span>}
          </p>
        </div>

        <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
          <h4 className={`font-semibold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
            Why It's Important
          </h4>
          <p className={`text-sm ${isDark ? 'text-blue-200/80' : 'text-blue-700'}`}>
            {data.importance || <span className="italic text-red-500">No importance provided.</span>}
          </p>
        </div>

        {(data.applications && data.applications.length > 0) ? (
          <div>
            <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Real-World Applications
            </h4>
            <div className="grid gap-2">
              {data.applications.map((app, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                  <Zap className={`w-4 h-4 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{app}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="italic text-red-500">No applications provided.</div>
        )}

        {(data.keyConcepts && data.keyConcepts.length > 0) ? (
          <div>
            <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Key Concepts
            </h4>
            <div className="space-y-3">
              {data.keyConcepts.map((concept, i) => (
                <div key={i} className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h5 className={`font-medium mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {concept.name}
                  </h5>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {concept.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="italic text-red-500">No key concepts provided.</div>
        )}

        {(data.tips && data.tips.length > 0) ? (
          <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
            <h4 className={`font-semibold mb-3 ${isDark ? 'text-green-300' : 'text-green-800'}`}>
              💡 Pro Tips
            </h4>
            <ul className="space-y-2">
              {data.tips.map((tip, i) => (
                <li key={i} className={`text-sm ${isDark ? 'text-green-200/80' : 'text-green-700'}`}>
                  • {tip}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="italic text-red-500">No tips provided.</div>
        )}

        {missingFields.length > 0 && (
          <div className="mt-4 p-3 rounded bg-yellow-100 text-yellow-800 border border-yellow-300">
            <strong>Warning:</strong> Some fields were missing from the AI response: {missingFields.join(', ')}. <br />
            <span className="text-xs">Check your OpenAI API usage or see <code>window.__lastAIResponse</code> in the browser console for the raw response.</span>
          </div>
        )}
      </div>
    );
  };

  const renderAlgorithm = (data) => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {data.title || topic}
        </h3>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
          <h4 className={`font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Problem Statement
          </h4>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.problemStatement}
          </p>
        </div>
      </div>

      <div>
        <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Approach
        </h4>
        <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {data.approach}
        </p>
      </div>

      {data.steps?.length > 0 && (
        <div>
          <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Step-by-Step Walkthrough
          </h4>
          <div className="space-y-4">
            {data.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex gap-4 p-4 rounded-xl border ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200'}`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}
                `}>
                  {step.step || i + 1}
                </div>
                <div>
                  <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {step.description}
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {step.explanation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'}`}>
          <h4 className={`font-medium mb-2 ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
            ⏱️ Time Complexity
          </h4>
          <p className={`text-lg font-mono ${isDark ? 'text-purple-200' : 'text-purple-700'}`}>
            {data.timeComplexity}
          </p>
        </div>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-200'}`}>
          <h4 className={`font-medium mb-2 ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>
            💾 Space Complexity
          </h4>
          <p className={`text-lg font-mono ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>
            {data.spaceComplexity}
          </p>
        </div>
      </div>

      {data.whenToUse?.length > 0 && (
        <div>
          <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            When to Use
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.whenToUse.map((use, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                {use}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCode = (data) => (
    <div className="space-y-8">
      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {data.title || `${topic} in ${data.language || selectedLanguage}`}
      </h3>

      {data.basicExample && (
        <div className={`p-5 rounded-xl ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
          <h4 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
            🎯 {data.basicExample.title || 'Basic Implementation'}
          </h4>
          <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.basicExample.explanation}
          </p>
          <CodeBlock 
            code={data.basicExample.code} 
            language={selectedLanguage.toLowerCase()} 
            title={`${selectedLanguage} - Basic`}
          />
        </div>
      )}

      {data.advancedExample && (
        <div className={`p-5 rounded-xl ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
          <h4 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
            🚀 {data.advancedExample.title || 'Advanced Implementation'}
          </h4>
          <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.advancedExample.explanation}
          </p>
          <CodeBlock 
            code={data.advancedExample.code} 
            language={selectedLanguage.toLowerCase()} 
            title={`${selectedLanguage} - Advanced`}
          />
        </div>
      )}

      {data.practicalExample && (
        <div className={`p-5 rounded-xl ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
          <h4 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
            💼 {data.practicalExample.title || 'Real-World Example'}
          </h4>
          <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.practicalExample.explanation}
          </p>
          <CodeBlock 
            code={data.practicalExample.code} 
            language={selectedLanguage.toLowerCase()} 
            title={`${selectedLanguage} - Practical`}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-white border border-slate-200 shadow-lg'}`}>
      {/* Header */}
      <div className={`p-6 border-b ${isDark ? 'border-slate-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10' : 'border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Content Generator
            </h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Generate detailed explanations, algorithms, and code examples
            </p>
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CONTENT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${selectedType === type.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }
              `}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </div>

        {/* Language Selection (for code type) */}
        {selectedType === 'code' && (
          <div className="relative mb-4">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className={`
                flex items-center justify-between w-full sm:w-48 px-4 py-2 rounded-xl text-sm
                ${isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-white text-slate-700 border border-slate-200'}
              `}
            >
              <span>{selectedLanguage}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showLanguageDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`
                    absolute top-full mt-2 w-full sm:w-48 rounded-xl overflow-hidden z-10 shadow-xl
                    ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}
                  `}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      className={`
                        w-full px-4 py-2 text-left text-sm transition-colors
                        ${selectedLanguage === lang
                          ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                          : isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-50'
                        }
                      `}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Custom Prompt */}
        <div className="mb-4">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Add specific requirements or questions (optional)..."
            className={`
              w-full px-4 py-3 rounded-xl text-sm resize-none h-20
              ${isDark 
                ? 'bg-slate-800 text-white placeholder:text-slate-500 border border-slate-700 focus:border-blue-500' 
                : 'bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500'
              }
              outline-none transition-colors
            `}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateContent}
          disabled={isGenerating}
          className={`
            w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium
            transition-all duration-200
            ${isGenerating
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
            }
            text-white
          `}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Content for "{topic}"
            </>
          )}
        </button>
      </div>

      {/* Generated Content */}
      <AnimatePresence mode="wait">
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6"
          >
            {generatedContent.type === 'error' ? (
              <div className={`p-4 rounded-xl ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                  {generatedContent.message}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    ✨ AI Generated Content
                  </span>
                  <button
                    onClick={generateContent}
                    disabled={isGenerating}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                      ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}
                    `}
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </button>
                </div>

                {generatedContent.type === 'explanation' && renderExplanation(generatedContent.data)}
                {generatedContent.type === 'algorithm' && renderAlgorithm(generatedContent.data)}
                {generatedContent.type === 'code' && renderCode(generatedContent.data)}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}