// POST /api/user/achievements - Award an achievement to a user

import { Achievements } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = {};
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }

    const userEmail = body.user_email || 'demo@user.com';
    const { type, title, description, xp_reward, icon } = body;

    if (!type) {
      return res.status(400).json({ error: 'Achievement type is required' });
    }

    const achievement = Achievements.award(userEmail, type, {
      title: title || type,
      description: description || '',
      xp_reward: xp_reward || 100,
      icon: icon || 'Award'
    });

    return res.status(201).json({
      success: true,
      achievement,
      isNew: true
    });
  } catch (error) {
    console.error('Error awarding achievement:', error);
    return res.status(500).json({ error: 'Failed to award achievement' });
  }
}
