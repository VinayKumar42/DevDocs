// POST /api/answers/[id]/accept - Accept an answer

import { Answers, Questions } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Answer ID is required' });
  }

  try {
    const updated = Answers.accept(id);

    if (!updated) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    // Update question status to answered
    Questions.update(updated.question_id, { status: 'answered' });

    return res.status(200).json({
      success: true,
      answer: updated
    });
  } catch (error) {
    console.error('Error accepting answer:', error);
    return res.status(500).json({ error: 'Failed to accept answer' });
  }
}
