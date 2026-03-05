// GET /api/learning-paths/[id] - Get a single learning path
// PUT /api/learning-paths/[id] - Update a learning path
// DELETE /api/learning-paths/[id] - Delete a learning path

import { LearningPaths, UserProgress } from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Learning path ID is required' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, id);
    case 'PUT':
      return handlePut(req, res, id);
    case 'DELETE':
      return handleDelete(req, res, id);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGet(req, res, id) {
  try {
    const path = LearningPaths.getById(id);
    
    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    return res.status(200).json({
      success: true,
      path
    });
  } catch (error) {
    console.error('Error fetching learning path:', error);
    return res.status(500).json({ error: 'Failed to fetch learning path' });
  }
}

async function handlePut(req, res, id) {
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

    const updated = LearningPaths.update(id, body);

    return res.status(200).json({
      success: true,
      path: updated
    });
  } catch (error) {
    console.error('Error updating learning path:', error);
    return res.status(500).json({ error: 'Failed to update learning path' });
  }
}

async function handleDelete(req, res, id) {
  try {
    const path = LearningPaths.getById(id);
    
    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    LearningPaths.delete(id);

    return res.status(200).json({
      success: true,
      message: 'Learning path deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting learning path:', error);
    return res.status(500).json({ error: 'Failed to delete learning path' });
  }
}
