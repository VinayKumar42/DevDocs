import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ThumbsUp, MessageSquare, Sparkles, Loader2, 
  CheckCircle2, Clock, User, Link2, Send, Bot, Code2
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import AICodeReview from './AICodeReview';

export default function QuestionDetail({ question, onBack, onUpdate }) {
  const { isDark } = useTheme();
  const [answers, setAnswers] = useState([]);
  const [isLoadingAnswers, setIsLoadingAnswers] = useState(true);
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showQuestionReview, setShowQuestionReview] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState({});

  const extractCode = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const matches = [];
    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
      matches.push({ language: match[1] || 'code', code: match[2] });
    }
    return matches;
  };

  const questionCode = extractCode(question.body);
  const hasQuestionCode = questionCode.length > 0;

  useEffect(() => {
    loadAnswers();
    incrementViews();
  }, [question.id]);

  const loadAnswers = async () => {
    setIsLoadingAnswers(true);
    try {
      const data = await base44.entities.Answer.filter({ question_id: question.id }, '-votes');
      setAnswers(data);
    } catch (error) {
      console.error('Failed to load answers:', error);
    } finally {
      setIsLoadingAnswers(false);
    }
  };

  const incrementViews = async () => {
    try {
      await base44.entities.Question.update(question.id, { views: (question.views || 0) + 1 });
    } catch (error) {
      console.error('Failed to increment views:', error);
    }
  };

  const handleVoteQuestion = async (delta) => {
    try {
      const direction = delta > 0 ? 'up' : 'down';
      const result = await base44.entities.Question.vote(question.id, direction);
      if (result) {
        onUpdate({ ...question, votes: result.votes });
      }
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  const handleVoteAnswer = async (answerId, currentVotes, delta) => {
    try {
      const direction = delta > 0 ? 'up' : 'down';
      const result = await base44.entities.Answer.vote(answerId, direction);
      if (result) {
        setAnswers(answers.map(a => a.id === answerId ? { ...a, votes: result.votes } : a));
      }
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  const submitAnswer = async () => {
    if (!newAnswer.trim()) return;
    
    setIsSubmitting(true);
    try {
      const user = await base44.auth.me();
      await base44.entities.Answer.create({
        question_id: question.id,
        body: newAnswer.trim(),
        author_name: user?.full_name || 'Anonymous',
        author_email: user?.email || '',
        votes: 0,
        is_accepted: false,
        is_ai_generated: false
      });
      
      if (question.status === 'open') {
        await base44.entities.Question.update(question.id, { status: 'answered' });
        onUpdate({ ...question, status: 'answered' });
      }
      
      setNewAnswer('');
      loadAnswers();
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    setIsGeneratingAI(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a helpful programming expert. Answer this developer question:

Title: ${question.title}
Category: ${question.category}
Topic: ${question.topic || 'General'}

Question:
${question.body}

Provide a comprehensive, accurate, and helpful answer. Include code examples if relevant. Format using markdown.`,
        add_context_from_internet: true
      });

      const user = await base44.auth.me();
      await base44.entities.Answer.create({
        question_id: question.id,
        body: response,
        author_name: 'AI Assistant',
        author_email: user?.email || '',
        votes: 0,
        is_accepted: false,
        is_ai_generated: true
      });

      if (question.status === 'open') {
        await base44.entities.Question.update(question.id, { status: 'answered' });
        onUpdate({ ...question, status: 'answered' });
      }

      loadAnswers();
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const acceptAnswer = async (answerId) => {
    try {
      await base44.entities.Answer.update(answerId, { is_accepted: true });
      setAnswers(answers.map(a => ({ ...a, is_accepted: a.id === answerId })));
    } catch (error) {
      console.error('Accept failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Questions
      </button>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200 shadow-sm'}`}
      >
        <div className="flex gap-4">
          {/* Voting */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => handleVoteQuestion(1)}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
            >
              <ThumbsUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {question.votes || 0}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {question.title}
            </h1>

            <div className={`prose prose-sm max-w-none mb-4 ${isDark ? 'prose-invert' : ''}`}>
              <ReactMarkdown>{question.body}</ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                {question.category}
              </span>
              {question.topic && (
                <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                  {question.topic}
                </span>
              )}
              {question.tags?.map((tag) => (
                <span key={tag} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Suggested Docs */}
            {question.suggested_docs?.length > 0 && (
              <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                <p className={`text-xs font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                  <Link2 className="w-3 h-3" /> Related Documentation:
                </p>
                <div className="flex flex-wrap gap-1">
                  {question.suggested_docs.map((doc, i) => (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded cursor-pointer ${isDark ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}>
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className={`flex items-center justify-between ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {question.author_name || 'Anonymous'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {format(new Date(question.created_date), 'MMM d, yyyy')}
                </span>
              </div>
              {hasQuestionCode && (
                <button
                  onClick={() => setShowQuestionReview(!showQuestionReview)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                    showQuestionReview
                      ? 'bg-purple-500/20 text-purple-400'
                      : isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  AI Code Review
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Code Review for Question */}
        {showQuestionReview && hasQuestionCode && (
          <div className="mt-4">
            <AICodeReview
              code={questionCode.map(c => c.code).join('\n\n')}
              language={questionCode[0]?.language}
              onClose={() => setShowQuestionReview(false)}
            />
          </div>
        )}
      </motion.div>

      {/* Answers Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {answers.length} Answer{answers.length !== 1 ? 's' : ''}
          </h2>
          <button
            onClick={generateAIAnswer}
            disabled={isGeneratingAI}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
              ${isGeneratingAI
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              }
              text-white
            `}
          >
            {isGeneratingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate AI Answer
          </button>
        </div>

        {/* Answers List */}
        {isLoadingAnswers ? (
          <div className="flex justify-center py-8">
            <Loader2 className={`w-6 h-6 animate-spin ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          </div>
        ) : answers.length === 0 ? (
          <div className={`text-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            No answers yet. Be the first to answer!
          </div>
        ) : (
          <div className="space-y-4">
            {answers.map((answer) => {
              const answerCode = extractCode(answer.body);
              const hasAnswerCode = answerCode.length > 0;
              
              return (
                <motion.div
                  key={answer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    p-5 rounded-xl
                    ${answer.is_accepted 
                      ? isDark ? 'bg-green-500/10 border-2 border-green-500/30' : 'bg-green-50 border-2 border-green-200'
                      : isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-white border border-slate-200'
                    }
                  `}
                >
                  <div className="flex gap-4">
                    {/* Voting */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleVoteAnswer(answer.id, answer.votes || 0, 1)}
                        className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                      </button>
                      <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {answer.votes || 0}
                      </span>
                      {answer.is_accepted && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {answer.is_ai_generated && (
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                            <Bot className="w-3 h-3" />
                            AI Generated
                          </div>
                        )}
                        {hasAnswerCode && (
                          <button
                            onClick={() => setShowAnswerReview({ ...showAnswerReview, [answer.id]: !showAnswerReview[answer.id] })}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                              showAnswerReview[answer.id]
                                ? 'bg-purple-500/20 text-purple-400'
                                : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <Code2 className="w-3 h-3" />
                            Review Code
                          </button>
                        )}
                      </div>
                      
                      <div className={`prose prose-sm max-w-none ${isDark ? 'prose-invert' : ''}`}>
                        <ReactMarkdown>{answer.body}</ReactMarkdown>
                      </div>

                      {/* Code Review for Answer */}
                      {showAnswerReview[answer.id] && hasAnswerCode && (
                        <div className="mt-4">
                          <AICodeReview
                            code={answerCode.map(c => c.code).join('\n\n')}
                            language={answerCode[0]?.language}
                            onClose={() => setShowAnswerReview({ ...showAnswerReview, [answer.id]: false })}
                          />
                        </div>
                      )}

                      <div className={`flex items-center justify-between mt-4 pt-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                        <div className={`flex items-center gap-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span>{answer.author_name || 'Anonymous'}</span>
                          <span>{format(new Date(answer.created_date), 'MMM d, yyyy')}</span>
                        </div>
                        {!answer.is_accepted && (
                          <button
                            onClick={() => acceptAnswer(answer.id)}
                            className={`text-xs px-3 py-1 rounded-lg ${isDark ? 'hover:bg-green-500/20 text-green-400' : 'hover:bg-green-100 text-green-600'}`}
                          >
                            Accept Answer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Add Answer */}
        <div className={`mt-6 p-5 rounded-xl ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
          <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Your Answer
          </h3>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer here... Markdown is supported."
            rows={5}
            className={`
              w-full px-4 py-3 rounded-xl text-sm resize-none mb-3
              ${isDark 
                ? 'bg-slate-800 text-white placeholder:text-slate-500 border border-slate-700' 
                : 'bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
          <button
            onClick={submitAnswer}
            disabled={isSubmitting || !newAnswer.trim()}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
              ${isSubmitting || !newAnswer.trim()
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
              }
              text-white
            `}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Post Answer
          </button>
        </div>
      </div>
    </div>
  );
}