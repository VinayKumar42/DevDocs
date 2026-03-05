// GET /api/user/progress - Get user's progress across all learning paths

import { UserProgress, Achievements } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userEmail = req.query.email || 'demo@user.com';

    const progress = UserProgress.getByUser(userEmail);
    const achievements = Achievements.getByUser(userEmail);

    // Calculate stats
    let totalXP = 0;
    let completedPaths = 0;
    let inProgressPaths = 0;

    progress.forEach(p => {
      totalXP += p.total_xp || 0;
      if (p.status === 'completed') completedPaths++;
      else if (p.status === 'in-progress') inProgressPaths++;
    });

    achievements.forEach(a => {
      totalXP += a.xp_reward || 0;
    });

    // Create progress map by path_id
    const progressMap = {};
    progress.forEach(p => {
      progressMap[p.path_id] = p;
    });

    return res.status(200).json({
      success: true,
      progress: progressMap,
      achievements,
      stats: {
        totalXP,
        completedPaths,
        inProgressPaths,
        totalAchievements: achievements.length
      }
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return res.status(500).json({ error: 'Failed to fetch user progress' });
  }
}
