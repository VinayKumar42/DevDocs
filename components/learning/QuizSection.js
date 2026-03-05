import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, Loader2, Trophy, RefreshCw } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';

export default function QuizSection({ topic, path, onComplete, previousScore }) {
  const { isDark } = useTheme();
  const [quiz, setQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = async () => {
    setIsGenerating(true);
    setShowResults(false);
    setSelectedAnswers({});
    setCurrentQuestion(0);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a quiz with 5 multiple choice questions about "${topic.title}" at ${topic.level} level in ${path.category}.

Each question should:
- Test understanding of key concepts
- Have 4 options with only 1 correct answer
- Include a brief explanation for the correct answer
- Be progressively more challenging

Make questions practical and relevant.`,
        response_json_schema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: { type: "array", items: { type: "string" } },
                  correct_index: { type: "number" },
                  explanation: { type: "string" }
                }
              }
            }
          }
        }
      });
      setQuiz(response);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct_index) correct++;
    });
    const finalScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    if (finalScore >= 70) {
      onComplete(finalScore);
    }
  };

  const getXPReward = (score) => {
    if (score === 100) return 100;
    if (score >= 80) return 75;
    if (score >= 70) return 50;
    return 0;
  };

  if (!quiz && !isGenerating) {
    return (
      <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
        <Sparkles className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Test Your Knowledge
        </h3>
        <p className={`mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Take a quiz to reinforce your learning on {topic.title}
        </p>
        {previousScore !== undefined && (
          <p className={`mb-4 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            Previous best: {previousScore}%
          </p>
        )}
        <button
          onClick={generateQuiz}
          className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'}`}>
        <Loader2 className={`w-12 h-12 mx-auto mb-4 animate-spin ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Generating quiz questions...</p>
      </div>
    );
  }

  if (showResults) {
    const passed = score >= 70;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}
      >
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
          passed ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          {passed ? (
            <Trophy className="w-12 h-12 text-green-500" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500" />
          )}
        </div>
        
        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {passed ? 'Congratulations!' : 'Keep Practicing!'}
        </h3>
        
        <p className={`text-4xl font-bold mb-4 ${
          score >= 80 ? 'text-green-500' : score >= 70 ? 'text-amber-500' : 'text-red-500'
        }`}>
          {score}%
        </p>

        {passed && (
          <p className={`mb-6 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
            +{getXPReward(score)} XP earned!
          </p>
        )}

        <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {passed 
            ? 'You passed the quiz! You can now proceed to the next topic.'
            : 'You need at least 70% to pass. Review the material and try again.'}
        </p>

        {/* Review answers */}
        <div className="text-left max-w-2xl mx-auto px-4 mb-6">
          {quiz.questions.map((q, i) => (
            <div key={i} className={`p-4 rounded-lg mb-3 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
              <p className={`font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {i + 1}. {q.question}
              </p>
              <div className="flex items-center gap-2 text-sm">
                {selectedAnswers[i] === q.correct_index ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Correct: {q.options[q.correct_index]}
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {q.explanation}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={generateQuiz}
          className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto ${
            passed
              ? isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          {passed ? 'Retake Quiz' : 'Try Again'}
        </button>
      </motion.div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Question {currentQuestion + 1} of {quiz.questions.length}
        </span>
        <div className="flex gap-1">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-2 rounded-full ${
                i < currentQuestion
                  ? selectedAnswers[i] === quiz.questions[i].correct_index
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : i === currentQuestion
                    ? 'bg-blue-500'
                    : isDark ? 'bg-slate-700' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(currentQuestion, i)}
                disabled={hasAnswered}
                className={`
                  w-full text-left p-4 rounded-xl transition-all
                  ${selectedAnswers[currentQuestion] === i
                    ? hasAnswered
                      ? i === question.correct_index
                        ? 'bg-green-500/20 border-2 border-green-500'
                        : 'bg-red-500/20 border-2 border-red-500'
                      : isDark ? 'bg-blue-500/20 border-2 border-blue-500' : 'bg-blue-50 border-2 border-blue-500'
                    : hasAnswered && i === question.correct_index
                      ? 'bg-green-500/20 border-2 border-green-500'
                      : isDark
                        ? 'bg-slate-700/50 border border-slate-600 hover:border-slate-500'
                        : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`
                    w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium
                    ${selectedAnswers[currentQuestion] === i
                      ? 'bg-blue-500 text-white'
                      : isDark ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-600'
                    }
                  `}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-slate-100'}`}
            >
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          disabled={!hasAnswered}
          className={`
            px-6 py-2.5 rounded-xl font-medium
            ${hasAnswered
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
              : isDark ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </motion.div>
  );
}