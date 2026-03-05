// POST /api/questions/[id]/vote - Vote on a question

import { Questions } from '@/lib/db';
import { validateVote } from '@/lib/validators';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Question ID is required' });
  }

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

    const validation = validateVote(body);
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }

    const updated = Questions.vote(id, validation.sanitized.direction);

    return res.status(200).json({
      success: true,
      question: updated
    });
  } catch (error) {
    console.error('Error voting on question:', error);
    return res.status(500).json({ error: 'Failed to vote on question' });
  }
}
