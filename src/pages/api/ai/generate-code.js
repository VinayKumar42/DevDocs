// POST /api/ai/generate-code - Generate code using AI

import { generateCode } from '@/lib/ai';
import { validateCodeGeneratorInput } from '@/lib/validators';

// Simple rate limiting (in production, use a proper solution)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Clean old requests
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ 
      error: 'Too many requests',
      message: 'Please wait a moment before generating more code'
    });
  }

  try {
    let body = {};
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }

    const validation = validateCodeGeneratorInput(body);
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }

    const result = await generateCode(validation.sanitized);

    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error generating code:', error);
    return res.status(500).json({ 
      error: 'Failed to generate code',
      message: error.message || 'An unexpected error occurred'
    });
  }
}
