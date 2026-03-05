import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Search, Filter, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';
import QuestionCard from './QuestionCard';
import QuestionDetail from './QuestionDetail';
import AskQuestionModal from './AskQuestionModal';
import { QuestionCardSkeleton } from '../ui/SkeletonLoaders';
import EmptyState from '../ui/EmptyState';

const CATEGORIES = [
  'All', 'Programming Languages', 'Data Structures & Algorithms', 'Web Development',
  'Backend Development', 'Databases', 'System Design', 'Operating Systems',
  'Computer Networks', 'Interview Prep', 'General'
];

export default function ForumSection({ currentCategory, currentTopic }) {
  const { isDark } = useTheme();
  const [questions, setQuestions] = useState([]);
  const [answerCounts, setAnswerCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const data = await base44.entities.Question.list('-createdAt', 50);
      setQuestions(data);
      
      // Answer counts are now included in the question object as answersCount
      // No need for separate loading
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskQuestion = async (questionData) => {
    try {
      await base44.entities.Question.create(questionData);
      loadQuestions();
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = !searchQuery || 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || q.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (selectedQuestion) {
    return (
      <QuestionDetail
        question={selectedQuestion}
        onBack={() => setSelectedQuestion(null)}
        onUpdate={(updated) => {
          setSelectedQuestion(updated);
          setQuestions(questions.map(q => q.id === updated.id ? updated : q));
        }}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Community Q&A
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Ask questions, share knowledge, get AI-powered answers
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAskModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Ask Question
        </button>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className={`
                w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                ${isDark 
                  ? 'bg-slate-700 text-white placeholder:text-slate-500 border border-slate-600' 
                  : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`
              px-4 py-2.5 rounded-xl text-sm
              ${isDark 
                ? 'bg-slate-700 text-white border border-slate-600' 
                : 'bg-slate-50 text-slate-900 border border-slate-200'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`
              px-4 py-2.5 rounded-xl text-sm
              ${isDark 
                ? 'bg-slate-700 text-white border border-slate-600' 
                : 'bg-slate-50 text-slate-900 border border-slate-200'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="answered">Answered</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <QuestionCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredQuestions.length === 0 ? (
        <EmptyState
          type="questions"
          title={searchQuery ? 'No matching questions' : 'No questions yet'}
          description={searchQuery ? 'Try different search terms or filters' : 'Be the first to ask a question!'}
          action={() => setShowAskModal(true)}
          actionLabel="Ask Question"
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <QuestionCard
                  question={question}
                  answerCount={question.answersCount || answerCounts[question.id] || 0}
                  onClick={() => setSelectedQuestion(question)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Ask Question Modal */}
      <AskQuestionModal
        isOpen={showAskModal}
        onClose={() => setShowAskModal(false)}
        onSubmit={handleAskQuestion}
        currentCategory={currentCategory}
        currentTopic={currentTopic}
      />
    </div>
  );
}