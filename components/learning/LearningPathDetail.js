import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Lock, Play, BookOpen, 
  Trophy, Sparkles, Clock, Target
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';
import TopicContent from './TopicContent';
import QuizSection from './QuizSection';
import CodingChallenge from './CodingChallenge';
import AchievementBadge, { AVAILABLE_BADGES } from './AchievementBadge';

export default function LearningPathDetail({ path, progress, onBack, onProgressUpdate }) {
  const { isDark } = useTheme();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeSection, setActiveSection] = useState('content');
  const [newBadge, setNewBadge] = useState(null);

  const completedTopics = progress?.completed_topics || [];
  const quizScores = progress?.quiz_scores || {};
  const challengeCompletions = progress?.challenge_completions || [];

  const isTopicUnlocked = (topicIndex) => {
    if (topicIndex === 0) return true;
    const prevTopicId = path.topics[topicIndex - 1]?.id;
    return completedTopics.includes(prevTopicId);
  };

  const isTopicCompleted = (topicId) => completedTopics.includes(topicId);

  const handleTopicComplete = async (topicId) => {
    try {
      const user = await base44.auth.me();
      const newCompleted = [...completedTopics, topicId];
      const xpEarned = 25;
      
      const updates = {
        completed_topics: newCompleted,
        total_xp: (progress?.total_xp || 0) + xpEarned,
        last_activity: new Date().toISOString(),
        status: newCompleted.length === path.topics.length ? 'completed' : 'in_progress'
      };

      if (newCompleted.length === path.topics.length) {
        updates.completed_at = new Date().toISOString();
      }

      if (progress?.id) {
        await base44.entities.UserProgress.update(progress.id, updates);
      } else {
        await base44.entities.UserProgress.create({
          user_email: user.email,
          path_id: path.id,
          started_at: new Date().toISOString(),
          ...updates
        });
      }

      // Check for badges
      if (newCompleted.length === 1) {
        await awardBadge(user.email, 'first_step');
      }
      if (newCompleted.length === path.topics.length) {
        await awardBadge(user.email, 'path_complete');
      }

      onProgressUpdate();
      
      // Move to next topic
      const currentIndex = path.topics.findIndex(t => t.id === topicId);
      if (currentIndex < path.topics.length - 1) {
        setSelectedTopic(path.topics[currentIndex + 1]);
        setActiveSection('content');
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleQuizComplete = async (topicId, score) => {
    try {
      const user = await base44.auth.me();
      const newScores = { ...quizScores, [topicId]: Math.max(quizScores[topicId] || 0, score) };
      const xpEarned = score === 100 ? 100 : score >= 80 ? 75 : 50;

      if (progress?.id) {
        await base44.entities.UserProgress.update(progress.id, {
          quiz_scores: newScores,
          total_xp: (progress?.total_xp || 0) + xpEarned,
          last_activity: new Date().toISOString()
        });
      }

      if (score === 100) {
        await awardBadge(user.email, 'quiz_master');
      }

      onProgressUpdate();
    } catch (error) {
      console.error('Failed to save quiz score:', error);
    }
  };

  const handleChallengeComplete = async (topicId, xpReward) => {
    try {
      const user = await base44.auth.me();
      const newChallenges = [...challengeCompletions, topicId];

      if (progress?.id) {
        await base44.entities.UserProgress.update(progress.id, {
          challenge_completions: newChallenges,
          total_xp: (progress?.total_xp || 0) + xpReward,
          last_activity: new Date().toISOString()
        });
      }

      if (newChallenges.length === 1) {
        await awardBadge(user.email, 'code_warrior');
      }

      onProgressUpdate();
    } catch (error) {
      console.error('Failed to save challenge:', error);
    }
  };

  const awardBadge = async (email, badgeId) => {
    try {
      const existing = await base44.entities.Achievement.filter({ user_email: email, badge_id: badgeId });
      if (existing.length > 0) return;

      const badgeInfo = AVAILABLE_BADGES.find(b => b.id === badgeId);
      if (!badgeInfo) return;

      await base44.entities.Achievement.create({
        user_email: email,
        badge_id: badgeId,
        badge_name: badgeInfo.name,
        badge_description: badgeInfo.description,
        badge_icon: badgeInfo.icon,
        badge_color: badgeInfo.color,
        xp_reward: badgeInfo.xp,
        earned_at: new Date().toISOString()
      });

      setNewBadge(badgeInfo);
      setTimeout(() => setNewBadge(null), 5000);
    } catch (error) {
      console.error('Failed to award badge:', error);
    }
  };

  const progressPercent = path.topics?.length > 0 
    ? (completedTopics.length / path.topics.length) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Badge Notification */}
      <AnimatePresence>
        {newBadge && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 p-6 rounded-2xl ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'} shadow-2xl`}
          >
            <div className="flex items-center gap-4">
              <AchievementBadge 
                badge={{ badge_name: newBadge.name, badge_icon: newBadge.icon, badge_color: newBadge.color }}
                size="md"
                showDetails={false}
              />
              <div>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>🎉 Achievement Unlocked!</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{newBadge.name}</p>
                <p className="text-amber-500 text-sm">+{newBadge.xp} XP</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
        <button
          onClick={onBack}
          className={`flex items-center gap-2 text-sm font-medium mb-4 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Learning Paths
        </button>

        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${path.color || 'from-blue-500 to-cyan-500'}`}>
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{path.title}</h1>
            <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{path.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${
                path.difficulty === 'beginner' ? 'bg-green-500/20 text-green-500' :
                path.difficulty === 'intermediate' ? 'bg-amber-500/20 text-amber-500' :
                'bg-red-500/20 text-red-500'
              }`}>
                {path.difficulty}
              </span>
              <span className={`flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Clock className="w-4 h-4" />
                {path.estimated_hours}h estimated
              </span>
              <span className={`flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Target className="w-4 h-4" />
                {path.topics?.length} topics
              </span>
              <span className={`flex items-center gap-1 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                <Trophy className="w-4 h-4" />
                {progress?.total_xp || 0} XP earned
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Progress</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{completedTopics.length}/{path.topics?.length || 0} topics</span>
              </div>
              <div className={`h-3 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className={`h-full rounded-full bg-gradient-to-r ${path.color || 'from-blue-500 to-cyan-500'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Topics List */}
        <div className={`lg:col-span-1 p-4 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Topics</h3>
          <div className="space-y-2">
            {path.topics?.map((topic, index) => {
              const unlocked = isTopicUnlocked(index);
              const completed = isTopicCompleted(topic.id);
              const isActive = selectedTopic?.id === topic.id;

              return (
                <button
                  key={topic.id}
                  onClick={() => unlocked && setSelectedTopic(topic)}
                  disabled={!unlocked}
                  className={`
                    w-full text-left p-3 rounded-xl transition-all flex items-center gap-3
                    ${isActive
                      ? isDark ? 'bg-blue-500/20 border border-blue-500/50' : 'bg-blue-50 border border-blue-200'
                      : unlocked
                        ? isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'
                        : 'opacity-50 cursor-not-allowed'
                    }
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    ${completed
                      ? 'bg-green-500'
                      : unlocked
                        ? isDark ? 'bg-slate-700' : 'bg-slate-200'
                        : isDark ? 'bg-slate-800' : 'bg-slate-100'
                    }
                  `}>
                    {completed ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : unlocked ? (
                      <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{index + 1}</span>
                    ) : (
                      <Lock className={`w-4 h-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{topic.title}</p>
                    <p className={`text-xs ${
                      topic.level === 'beginner' ? 'text-green-500' :
                      topic.level === 'intermediate' ? 'text-amber-500' : 'text-red-500'
                    }`}>
                      {topic.level}
                    </p>
                  </div>
                  {quizScores[topic.id] && (
                    <span className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                      {quizScores[topic.id]}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {selectedTopic ? (
            <div className="space-y-6">
              {/* Section Tabs */}
              <div className={`flex gap-2 p-1 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                {[
                  { id: 'content', label: 'Learn', icon: BookOpen },
                  { id: 'quiz', label: 'Quiz', icon: Sparkles },
                  { id: 'challenge', label: 'Challenge', icon: Target }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`
                      flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${activeSection === tab.id
                        ? isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900 shadow-sm'
                        : isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-800'
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Section Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {activeSection === 'content' && (
                    <TopicContent
                      topic={selectedTopic}
                      path={path}
                      isUnlocked={true}
                      isCompleted={isTopicCompleted(selectedTopic.id)}
                      onComplete={() => handleTopicComplete(selectedTopic.id)}
                    />
                  )}
                  {activeSection === 'quiz' && (
                    <QuizSection
                      topic={selectedTopic}
                      path={path}
                      onComplete={(score) => handleQuizComplete(selectedTopic.id, score)}
                      previousScore={quizScores[selectedTopic.id]}
                    />
                  )}
                  {activeSection === 'challenge' && (
                    <CodingChallenge
                      topic={selectedTopic}
                      path={path}
                      onComplete={(xp) => handleChallengeComplete(selectedTopic.id, xp)}
                      isCompleted={challengeCompletions.includes(selectedTopic.id)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className={`text-center py-16 rounded-xl ${isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
              <Play className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Select a Topic to Begin
              </h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Choose a topic from the list to start learning
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}