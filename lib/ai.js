// AI Service utilities

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateCode({ language, topic, difficulty }) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const systemPrompt = `You are an expert programming instructor. Generate clean, well-documented code examples.
Return ONLY valid JSON with no additional text or markdown formatting.`;

  const userPrompt = `Generate a ${difficulty} level code example in ${language} for the topic: "${topic}".

Return a JSON object with this exact structure:
{
  "code": "// The complete, runnable code example with comments",
  "explanation": "A clear explanation of what the code does and how it works",
  "language": "${language}",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "relatedTopics": ["Related topic 1", "Related topic 2"]
}

Make the code practical, educational, and well-commented. Include best practices.`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4096
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate code');
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No content in AI response');
  }

  // Parse the JSON response
  try {
    // Clean up the response (remove markdown code blocks if present)
    let cleanContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    return JSON.parse(cleanContent);
  } catch (parseError) {
    console.error('Failed to parse AI response:', content);
    // Return a structured response even if parsing fails
    return {
      code: content,
      explanation: 'Generated code example',
      language,
      topic,
      difficulty,
      keyPoints: [],
      relatedTopics: []
    };
  }
}

export async function generateAIAnswer({ question, context }) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const systemPrompt = `You are an expert developer helping to answer programming questions.
Provide clear, accurate, and helpful answers with code examples when appropriate.
Format your response in markdown. Be concise but thorough.`;

  const userPrompt = `Question: ${question.title}

Details: ${question.body}

Category: ${question.category}
${question.tags?.length ? `Tags: ${question.tags.join(', ')}` : ''}

Please provide a helpful answer to this question. Include code examples if relevant.`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2048
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate answer');
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No content in AI response');
  }

  return content;
}

export async function generateLearningPath({ title, category }) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const systemPrompt = `You are an expert curriculum designer. Create structured learning paths for developers.
Return ONLY valid JSON with no additional text or markdown formatting.`;

  const userPrompt = `Create a comprehensive learning path for "${title}" in the "${category}" category.

Return a JSON object with this exact structure:
{
  "title": "${title}",
  "description": "A compelling description of what learners will achieve",
  "category": "${category}",
  "difficulty": "beginner|intermediate|advanced",
  "estimated_hours": 10-40,
  "color": "from-blue-500 to-purple-500",
  "total_xp": 500-2000,
  "topics": [
    {
      "id": "unique-id",
      "title": "Topic Title",
      "level": "beginner|intermediate|advanced",
      "description": "What this topic covers",
      "order": 1
    }
  ],
  "prerequisites": ["Prerequisite 1"],
  "tags": ["tag1", "tag2"]
}

Include 4-6 progressive topics that build upon each other.`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2048
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate learning path');
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No content in AI response');
  }

  // Parse the JSON response
  try {
    let cleanContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    return JSON.parse(cleanContent);
  } catch (parseError) {
    console.error('Failed to parse AI response:', content);
    throw new Error('Failed to parse learning path data');
  }
}

export default {
  generateCode,
  generateAIAnswer,
  generateLearningPath
};
