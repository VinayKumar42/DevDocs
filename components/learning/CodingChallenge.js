import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Loader2, CheckCircle2, Play, Trophy, Lightbulb } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';

export default function CodingChallenge({ topic, path, onComplete, isCompleted }) {
  const { isDark } = useTheme();
  const [challenge, setChallenge] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const generateChallenge = async () => {
    setIsGenerating(true);
    setFeedback(null);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a coding challenge for "${topic.title}" at ${topic.level} level.

The challenge should:
1. Be practical and test real understanding
2. Be completable in 10-20 lines of code
3. Have clear requirements
4. Include test cases to verify the solution

Level: ${topic.level}
Category: ${path.category}`,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            requirements: { type: "array", items: { type: "string" } },
            starter_code: { type: "string" },
            hint: { type: "string" },
            test_cases: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  input: { type: "string" },
                  expected_output: { type: "string" }
                }
              }
            },
            solution_example: { type: "string" },
            xp_reward: { type: "number" }
          }
        }
      });
      setChallenge(response);
      setUserCode(response.starter_code || '');
    } catch (error) {
      console.error('Failed to generate challenge:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const evaluateCode = async () => {
    setIsEvaluating(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Evaluate this code submission for the coding challenge.

Challenge: ${challenge.title}
Requirements: ${challenge.requirements.join(', ')}
Test Cases: ${JSON.stringify(challenge.test_cases)}

User's Code:
\`\`\`
${userCode}
\`\`\`

Evaluate:
1. Does the code meet all requirements?
2. Would it pass the test cases?
3. Code quality and style
4. Suggest improvements if any

Be encouraging but honest.`,
        response_json_schema: {
          type: "object",
          properties: {
            passed: { type: "boolean" },
            score: { type: "number" },
            feedback: { type: "string" },
            test_results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  passed: { type: "boolean" },
                  message: { type: "string" }
                }
              }
            },
            improvements: { type: "array", items: { type: "string" } }
          }
        }
      });
      setFeedback(response);
      if (response.passed) {
        onComplete(challenge.xp_reward || 50);
      }
    } catch (error) {
      console.error('Failed to evaluate code:', error);
    } finally {
      setIsEvaluating(false);
    }
  };

  if (!challenge && !isGenerating) {
    return (
      <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
        <Code2 className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Coding Challenge
        </h3>
        <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Put your skills to the test with a practical coding challenge
        </p>
        {isCompleted && (
          <p className={`mb-4 text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            ✓ You've completed this challenge
          </p>
        )}
        <button
          onClick={generateChallenge}
          className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
        >
          {isCompleted ? 'Try Again' : 'Start Challenge'}
        </button>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'}`}>
        <Loader2 className={`w-12 h-12 mx-auto mb-4 animate-spin ${isDark ? 'text-green-400' : 'text-green-500'}`} />
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Generating challenge...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Challenge Info */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {challenge.title}
            </h3>
            <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {challenge.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
            <Trophy className="w-4 h-4" />
            {challenge.xp_reward || 50} XP
          </span>
        </div>

        {/* Requirements */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
          <h4 className={`font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Requirements:</h4>
          <ul className="space-y-1">
            {challenge.requirements.map((req, i) => (
              <li key={i} className={`text-sm flex items-start gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span className="text-green-500">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Test Cases */}
        {challenge.test_cases?.length > 0 && (
          <div className="mt-4">
            <h4 className={`font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Test Cases:</h4>
            <div className="space-y-2">
              {challenge.test_cases.map((tc, i) => (
                <div key={i} className={`text-sm p-2 rounded ${isDark ? 'bg-slate-900/50' : 'bg-slate-100'}`}>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Input: </span>
                  <code className={isDark ? 'text-blue-400' : 'text-blue-600'}>{tc.input}</code>
                  <span className={`ml-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>→ Expected: </span>
                  <code className={isDark ? 'text-green-400' : 'text-green-600'}>{tc.expected_output}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hint */}
        <button
          onClick={() => setShowHint(!showHint)}
          className={`mt-4 flex items-center gap-2 text-sm ${isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'}`}
        >
          <Lightbulb className="w-4 h-4" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-2 p-3 rounded-lg ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}
          >
            <p className={`text-sm ${isDark ? 'text-amber-200' : 'text-amber-700'}`}>{challenge.hint}</p>
          </motion.div>
        )}
      </div>

      {/* Code Editor */}
      <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-900'}`}>
        <div className={`flex items-center justify-between px-4 py-2 ${isDark ? 'bg-slate-800' : 'bg-slate-800'}`}>
          <span className="text-sm text-slate-400">Your Solution</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="w-full h-64 p-4 bg-slate-900 text-slate-100 font-mono text-sm resize-none focus:outline-none"
          placeholder="Write your code here..."
          spellCheck={false}
        />
      </div>

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl ${
            feedback.passed
              ? isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'
              : isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            {feedback.passed ? (
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            ) : (
              <Code2 className="w-8 h-8 text-red-500" />
            )}
            <div>
              <h4 className={`font-semibold ${feedback.passed ? 'text-green-500' : 'text-red-500'}`}>
                {feedback.passed ? 'Challenge Completed!' : 'Not Quite Right'}
              </h4>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Score: {feedback.score}%
              </p>
            </div>
            {feedback.passed && (
              <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                +{challenge.xp_reward || 50} XP
              </span>
            )}
          </div>

          <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {feedback.feedback}
          </p>

          {feedback.test_results?.length > 0 && (
            <div className="space-y-2 mb-4">
              {feedback.test_results.map((result, i) => (
                <div key={i} className={`flex items-center gap-2 text-sm ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                  {result.passed ? <CheckCircle2 className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                  {result.message}
                </div>
              ))}
            </div>
          )}

          {feedback.improvements?.length > 0 && !feedback.passed && (
            <div>
              <h5 className={`font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Suggestions:</h5>
              <ul className="space-y-1">
                {feedback.improvements.map((imp, i) => (
                  <li key={i} className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    • {imp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={evaluateCode}
          disabled={isEvaluating || !userCode.trim()}
          className={`
            px-6 py-3 rounded-xl font-medium flex items-center gap-2
            ${isEvaluating || !userCode.trim()
              ? 'bg-slate-600 cursor-not-allowed text-slate-400'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
            }
          `}
        >
          {isEvaluating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          {isEvaluating ? 'Evaluating...' : 'Submit Solution'}
        </button>
      </div>
    </motion.div>
  );
}