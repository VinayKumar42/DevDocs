// GET /api/learning-paths - List all learning paths
// POST /api/learning-paths - Create a new learning path

import { LearningPaths } from '@/lib/db';
import { validateLearningPath } from '@/lib/validators';
import { getAllLearningPaths } from '@/utils/learningPathData';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  } else if (req.method === 'POST') {
    return handlePost(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGet(req, res) {
  try {
    const { difficulty, category } = req.query;

    let paths = LearningPaths.getAll({ difficulty, category });

    // If no paths exist in DB, seed with default paths
    if (paths.length === 0) {
      const defaultPaths = getAllLearningPaths();
      for (const path of defaultPaths) {
        LearningPaths.create(path);
      }
      paths = LearningPaths.getAll({ difficulty, category });
    }

    return res.status(200).json({
      success: true,
      paths
    });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return res.status(500).json({ error: 'Failed to fetch learning paths' });
  }
}

async function handlePost(req, res) {
  try {
    let body = {};
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }

    const validation = validateLearningPath(body);
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }

    const path = LearningPaths.create(validation.sanitized);

    return res.status(201).json({
      success: true,
      path
    });
  } catch (error) {
    console.error('Error creating learning path:', error);
    return res.status(500).json({ error: 'Failed to create learning path' });
  }
}
