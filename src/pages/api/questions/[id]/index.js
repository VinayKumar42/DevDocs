// GET /api/questions/[id] - Get a single question with its answers
// PUT /api/questions/[id] - Update a question
// DELETE /api/questions/[id] - Delete a question

import { Questions, Answers } from '@/lib/db';
import { validateQuestion } from '@/lib/validators';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Question ID is required' });
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
    const question = Questions.getById(id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Increment view count
    Questions.incrementViews(id);

    // Get answers for this question
    const answers = Answers.getByQuestionId(id);

    return res.status(200).json({
      question: {
        ...question,
        views: (question.views || 0) + 1
      },
      answers
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    return res.status(500).json({ error: 'Failed to fetch question' });
  }
}

async function handlePut(req, res, id) {
  try {
    const question = Questions.getById(id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    let body = {};
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }

    // Only validate fields that are being updated
    const updateData = {};
    if (body.title) updateData.title = body.title;
    if (body.body) updateData.body = body.body;
    if (body.category) updateData.category = body.category;
    if (body.topic) updateData.topic = body.topic;
    if (body.tags) updateData.tags = body.tags;
    if (body.status) updateData.status = body.status;

    const updated = Questions.update(id, updateData);

    return res.status(200).json({
      success: true,
      question: updated
    });
  } catch (error) {
    console.error('Error updating question:', error);
    return res.status(500).json({ error: 'Failed to update question' });
  }
}

async function handleDelete(req, res, id) {
  try {
    const question = Questions.getById(id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    Questions.delete(id);

    return res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    return res.status(500).json({ error: 'Failed to delete question' });
  }
}
