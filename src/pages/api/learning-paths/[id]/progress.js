// PATCH /api/learning-paths/[id]/progress - Update progress for a learning path

import { LearningPaths, UserProgress } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PATCH' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Learning path ID is required' });
  }

  try {
    const path = LearningPaths.getById(id);
    
    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    let body = {};
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }

    const userEmail = body.user_email || 'demo@user.com';
    const { topic_id, completed, quiz_score, challenge_id } = body;

    let progress;

    if (topic_id !== undefined) {
      // Update topic completion
      progress = UserProgress.updateProgress(userEmail, id, topic_id, completed !== false);
    } else if (quiz_score !== undefined) {
      // Update quiz score
      const existing = UserProgress.get(userEmail, id);
      const quizScores = existing?.quiz_scores || {};
      quizScores[body.quiz_id || topic_id] = quiz_score;
      
      progress = UserProgress.upsert(userEmail, id, {
        ...existing,
        quiz_scores: quizScores,
        status: 'in-progress'
      });
    } else if (challenge_id) {
      // Update challenge completion
      const existing = UserProgress.get(userEmail, id);
      const challenges = existing?.challenge_completions || [];
      if (!challenges.includes(challenge_id)) {
        challenges.push(challenge_id);
      }
      
      progress = UserProgress.upsert(userEmail, id, {
        ...existing,
        challenge_completions: challenges,
        status: 'in-progress'
      });
    } else {
      // General progress update
      progress = UserProgress.upsert(userEmail, id, body);
    }

    // Calculate progress percentage
    const totalTopics = path.topics?.length || 1;
    const completedTopics = progress.completed_topics?.length || 0;
    const progressPercent = Math.round((completedTopics / totalTopics) * 100);

    // Update status if all topics completed
    if (progressPercent === 100 && progress.status !== 'completed') {
      progress = UserProgress.upsert(userEmail, id, {
        ...progress,
        status: 'completed'
      });
    }

    return res.status(200).json({
      success: true,
      progress: {
        ...progress,
        progressPercent,
        totalTopics,
        completedTopics
      }
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return res.status(500).json({ error: 'Failed to update progress' });
  }
}
