import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Trophy, Flame, Target, Sparkles, Loader2, 
  Plus, Filter, TrendingUp, Award
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useTheme } from '../ThemeProvider';
import LearningPathCard from './LearningPathCard';
import LearningPathDetail from './LearningPathDetail';
import AchievementBadge from './AchievementBadge';
import { getAllLearningPaths } from '../../utils/learningPathData';

export default function LearningDashboard({ onBack }) {
  const { isDark } = useTheme();
  const [paths, setPaths] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPath, setSelectedPath] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userStats, setUserStats] = useState({ totalXP: 0, streak: 0, completed: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const user = await base44.auth.me();
      
      // Load paths - use default paths from utils if none exist
      let existingPaths = await base44.entities.LearningPath.list();
      if (existingPaths.length === 0) {
        // Create default paths from utils data
        const defaultPaths = getAllLearningPaths();
        await Promise.all(defaultPaths.map(p => base44.entities.LearningPath.create(p)));
        existingPaths = await base44.entities.LearningPath.list();
      }
      setPaths(existingPaths);

      // Load progress
      const progress = await base44.entities.UserProgress.filter({ user_email: user.email });
      const pMap = {};
      let totalXP = 0;
      let completed = 0;
      progress.forEach(p => {
        pMap[p.path_id] = p;
        totalXP += p.total_xp || 0;
        if (p.status === 'completed') completed++;
      });
      setProgressMap(pMap);

      // Load achievements
      const userAchievements = await base44.entities.Achievement.filter({ user_email: user.email });
      setAchievements(userAchievements);
      userAchievements.forEach(a => totalXP += a.xp_reward || 0);

      setUserStats({ totalXP, streak: 0, completed });
    } catch (error) {
      console.error('Failed to load data:', error);
      // If base44 fails, use local data
      const defaultPaths = getAllLearningPaths();
      setPaths(defaultPaths);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCustomPath = async () => {
    setIsGenerating(true);
    try {
      const existingTitles = paths.map(p => p.title).join(', ');
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a unique and valuable learning path for software engineering that is NOT already covered by these existing paths: ${existingTitles}.

Create something practical and in-demand, such as: 
- API Design & Development
- Testing & Test-Driven Development (TDD)
- Cloud Computing (AWS/Azure/GCP)
- Kubernetes & Container Orchestration
- GraphQL Development
- Web Security
- Performance Optimization
- CI/CD Pipelines
- Serverless Architecture
- Mobile Development

The learning path should:
1. Have a clear, specific title (not generic)
2. Include 4-5 progressive topics from beginner/intermediate to advanced
3. Be practical and job-relevant
4. Have realistic time estimates

Provide a comprehensive path structure.`,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            difficulty: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
            estimated_hours: { type: "number" },
            color: { type: "string" },
            total_xp: { type: "number" },
            topics: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  level: { type: "string" },
                  description: { type: "string" },
                  order: { type: "number" }
                },
                required: ["id", "title", "level", "description", "order"]
              }
            }
          },
          required: ["title", "description", "category", "difficulty", "estimated_hours", "topics"]
        }
      });

      // Robust validation for LLM response
      if (!response || typeof response !== 'object' || Array.isArray(response)) {
        console.error('Invalid response from LLM (not an object):', response);
        alert('Failed to generate a valid learning path. (Empty or invalid response) Please try again later.');
        return;
      }
      if (!response.title || !response.topics || !Array.isArray(response.topics) || response.topics.length === 0) {
        console.error('Invalid response from LLM (missing fields):', response);
        alert('Failed to generate a valid learning path. (Missing required fields) Please try again later.');
        return;
      }

      // Ensure proper structure
      const pathData = {
        title: response.title,
        description: response.description,
        category: response.category || 'General',
        difficulty: response.difficulty || 'intermediate',
        estimated_hours: response.estimated_hours || 10,
        color: response.color || 'from-blue-500 to-purple-500',
        total_xp: response.total_xp || (response.topics.length * 100),
        topics: response.topics.map((t, idx) => ({
          id: t.id || `topic-${Date.now()}-${idx}`,
          title: t.title,
          level: t.level || 'intermediate',
          description: t.description,
          order: t.order || (idx + 1)
        }))
      };

      await base44.entities.LearningPath.create(pathData);
      await loadData();
    } catch (error) {
      console.error('Failed to generate path:', error);
      alert('Failed to generate learning path. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredPaths = paths.filter(p => 
    filterDifficulty === 'all' || p.difficulty === filterDifficulty
  );

  if (selectedPath) {
    return (
      <LearningPathDetail
        path={selectedPath}
        progress={progressMap[selectedPath.id]}
        onBack={() => setSelectedPath(null)}
        onProgressUpdate={loadData}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Learning Paths
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              AI-powered interactive courses with quizzes and challenges
            </p>
          </div>
        </div>
        
        <button
          onClick={onBack}
          className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
        >
          ← Back to Home
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Trophy, label: 'Total XP', value: userStats.totalXP, color: 'from-amber-500 to-orange-500' },
          { icon: Target, label: 'Paths Completed', value: userStats.completed, color: 'from-green-500 to-emerald-500' },
          { icon: Award, label: 'Badges Earned', value: achievements.length, color: 'from-purple-500 to-pink-500' },
          { icon: TrendingUp, label: 'In Progress', value: Object.values(progressMap).filter(p => p.status === 'in_progress').length, color: 'from-blue-500 to-cyan-500' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${stat.color} mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</p>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Badges Preview */}
      {achievements.length > 0 && (
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Your Badges</h3>
          <div className="flex flex-wrap gap-4">
            {achievements.slice(0, 6).map((badge) => (
              <AchievementBadge key={badge.id} badge={badge} size="sm" />
            ))}
            {achievements.length > 6 && (
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  +{achievements.length - 6}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center gap-4">
        <div className={`flex items-center gap-2 p-1 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setFilterDifficulty(level)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filterDifficulty === level
                  ? isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900 shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={generateCustomPath}
          disabled={isGenerating}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ml-auto
            ${isGenerating
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            }
            text-white
          `}
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate New Path
        </button>
      </div>

      {/* Paths Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className={`w-8 h-8 animate-spin ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredPaths.map((path, i) => (
            <LearningPathCard
              key={path.id}
              path={path}
              progress={progressMap[path.id]}
              onClick={() => setSelectedPath(path)}
              delay={i * 0.05}
            />
          ))}
        </div>
      )}
    </div>
  );
}