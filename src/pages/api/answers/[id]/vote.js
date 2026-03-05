// POST /api/answers/[id]/vote - Vote on an answer

import { Answers } from '@/lib/db';
import { validateVote } from '@/lib/validators';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Answer ID is required' });
  }

  try {
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

    const updated = Answers.vote(id, validation.sanitized.direction);

    if (!updated) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    return res.status(200).json({
      success: true,
      answer: updated
    });
  } catch (error) {
    console.error('Error voting on answer:', error);
    return res.status(500).json({ error: 'Failed to vote on answer' });
  }
}
