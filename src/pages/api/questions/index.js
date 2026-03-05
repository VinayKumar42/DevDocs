// GET /api/questions - List all questions with pagination and search
// POST /api/questions - Create a new question

import { Questions } from '@/lib/db';
import { validateQuestion } from '@/lib/validators';

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
    const {
      search,
      category,
      status,
      tag,
      sort = '-createdAt',
      page = 1,
      limit = 20
    } = req.query;

    const result = Questions.getAll({
      search,
      category,
      status,
      tag,
      sort,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ error: 'Failed to fetch questions' });
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

    const validation = validateQuestion(body);
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }

    const question = Questions.create(validation.sanitized);
    
    return res.status(201).json({ 
      success: true, 
      question 
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return res.status(500).json({ error: 'Failed to create question' });
  }
}
