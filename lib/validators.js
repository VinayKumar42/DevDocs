// Simple validation utilities (lightweight alternative to Zod)

export function validateQuestion(data) {
  const errors = [];
  
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required');
  } else if (data.title.trim().length < 10) {
    errors.push('Title must be at least 10 characters');
  } else if (data.title.trim().length > 200) {
    errors.push('Title must be less than 200 characters');
  }
  
  if (!data.body || typeof data.body !== 'string') {
    errors.push('Question body is required');
  } else if (data.body.trim().length < 20) {
    errors.push('Question body must be at least 20 characters');
  } else if (data.body.trim().length > 10000) {
    errors.push('Question body must be less than 10000 characters');
  }
  
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array');
  } else if (data.tags && data.tags.length > 10) {
    errors.push('Maximum 10 tags allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      title: sanitizeString(data.title),
      body: sanitizeMarkdown(data.body),
      category: sanitizeString(data.category || 'General'),
      topic: sanitizeString(data.topic || ''),
      tags: (data.tags || []).map(t => sanitizeString(t)).filter(Boolean).slice(0, 10),
      author_name: sanitizeString(data.author_name || 'Anonymous'),
      author_email: sanitizeEmail(data.author_email || ''),
      suggested_docs: data.suggested_docs || []
    } : null
  };
}

export function validateAnswer(data) {
  const errors = [];
  
  if (!data.question_id || typeof data.question_id !== 'string') {
    errors.push('Question ID is required');
  }
  
  if (!data.body || typeof data.body !== 'string') {
    errors.push('Answer body is required');
  } else if (data.body.trim().length < 10) {
    errors.push('Answer must be at least 10 characters');
  } else if (data.body.trim().length > 10000) {
    errors.push('Answer must be less than 10000 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      question_id: data.question_id,
      body: sanitizeMarkdown(data.body),
      author_name: sanitizeString(data.author_name || 'Anonymous'),
      author_email: sanitizeEmail(data.author_email || ''),
      is_ai_generated: Boolean(data.is_ai_generated)
    } : null
  };
}

export function validateLearningPath(data) {
  const errors = [];
  
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required');
  } else if (data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  } else if (data.title.trim().length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  if (!data.description || typeof data.description !== 'string') {
    errors.push('Description is required');
  } else if (data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }
  
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  if (data.difficulty && !validDifficulties.includes(data.difficulty)) {
    errors.push('Invalid difficulty level');
  }
  
  if (!data.topics || !Array.isArray(data.topics) || data.topics.length === 0) {
    errors.push('At least one topic is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      title: sanitizeString(data.title),
      description: sanitizeString(data.description),
      category: sanitizeString(data.category || 'General'),
      difficulty: data.difficulty || 'beginner',
      estimated_hours: Number(data.estimated_hours) || 10,
      topics: (data.topics || []).map((t, idx) => ({
        id: t.id || `topic-${Date.now()}-${idx}`,
        title: sanitizeString(t.title || ''),
        level: t.level || 'beginner',
        description: sanitizeString(t.description || ''),
        order: Number(t.order) || idx + 1
      })),
      prerequisites: (data.prerequisites || []).map(p => sanitizeString(p)),
      tags: (data.tags || []).map(t => sanitizeString(t)).filter(Boolean),
      icon: data.icon || 'BookOpen',
      color: data.color || 'from-blue-500 to-purple-500',
      total_xp: Number(data.total_xp) || 500
    } : null
  };
}

export function validateVote(data) {
  const errors = [];
  
  if (!data.direction || !['up', 'down'].includes(data.direction)) {
    errors.push('Vote direction must be "up" or "down"');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      direction: data.direction
    } : null
  };
}

export function validateCodeGeneratorInput(data) {
  const errors = [];
  
  const validLanguages = ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'C', 'C#', 'Ruby', 'PHP', 'Rust', 'Swift', 'Kotlin'];
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  
  if (!data.language || typeof data.language !== 'string') {
    errors.push('Language is required');
  } else if (!validLanguages.includes(data.language)) {
    errors.push(`Language must be one of: ${validLanguages.join(', ')}`);
  }
  
  if (!data.topic || typeof data.topic !== 'string') {
    errors.push('Topic is required');
  } else if (data.topic.trim().length < 2) {
    errors.push('Topic must be at least 2 characters');
  } else if (data.topic.trim().length > 200) {
    errors.push('Topic must be less than 200 characters');
  }
  
  if (data.difficulty && !validDifficulties.includes(data.difficulty)) {
    errors.push('Invalid difficulty level');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      language: data.language,
      topic: sanitizeString(data.topic),
      difficulty: data.difficulty || 'intermediate'
    } : null
  };
}

// Sanitization helpers
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}

function sanitizeMarkdown(str) {
  if (typeof str !== 'string') return '';
  // Allow markdown but remove potentially dangerous content
  return str
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed[^>]*>/gi, '');
}

function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? email.toLowerCase().trim() : '';
}

export default {
  validateQuestion,
  validateAnswer,
  validateLearningPath,
  validateVote,
  validateCodeGeneratorInput
};
