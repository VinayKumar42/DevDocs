// POST /api/questions/[id]/answer - Add an answer to a question

import { Questions, Answers } from '@/lib/db';
import { validateAnswer } from '@/lib/validators';
import { generateAIAnswer } from '@/lib/ai';

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

    // Check if AI answer is requested
    if (body.generate_ai_answer) {
      try {
        const aiResponse = await generateAIAnswer({ question });
        
        const aiAnswer = Answers.create({
          question_id: id,
          body: aiResponse,
          author_name: 'AI Assistant',
          author_email: 'ai@devdocs.local',
          is_ai_generated: true
        });

        return res.status(201).json({
          success: true,
          answer: aiAnswer
        });
      } catch (aiError) {
        console.error('AI answer generation failed:', aiError);
        return res.status(500).json({ 
          error: 'Failed to generate AI answer',
          details: aiError.message 
        });
      }
    }

    // Regular answer submission
    const validation = validateAnswer({
      ...body,
      question_id: id
    });
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }

    const answer = Answers.create(validation.sanitized);

    return res.status(201).json({
      success: true,
      answer
    });
  } catch (error) {
    console.error('Error creating answer:', error);
    return res.status(500).json({ error: 'Failed to create answer' });
  }
}
