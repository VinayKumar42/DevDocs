// GET /api/search - Global search across docs, Q&A, and learning paths

import { Questions, LearningPaths } from '@/lib/db';
import { getTopicSearchData } from '@/utils/topicData';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { q, type } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const query = q.toLowerCase().trim();
    const results = {
      docs: [],
      questions: [],
      learningPaths: [],
      total: 0
    };

    // Search documentation topics
    if (!type || type === 'docs' || type === 'all') {
      const topicData = getTopicSearchData();
      results.docs = topicData
        .filter(topic => 
          topic.title.toLowerCase().includes(query) ||
          topic.category.toLowerCase().includes(query) ||
          (topic.keywords && topic.keywords.some(k => k.toLowerCase().includes(query)))
        )
        .slice(0, 10)
        .map(t => ({
          type: 'doc',
          id: t.id,
          title: t.title,
          category: t.category,
          description: t.description || ''
        }));
    }

    // Search Q&A questions
    if (!type || type === 'questions' || type === 'all') {
      const questionResult = Questions.getAll({
        search: q,
        limit: 10
      });
      results.questions = questionResult.questions.map(q => ({
        type: 'question',
        id: q.id,
        title: q.title,
        category: q.category,
        answersCount: q.answersCount || 0
      }));
    }

    // Search learning paths
    if (!type || type === 'learningPaths' || type === 'all') {
      const paths = LearningPaths.getAll();
      results.learningPaths = paths
        .filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
        )
        .slice(0, 10)
        .map(p => ({
          type: 'learningPath',
          id: p.id,
          title: p.title,
          category: p.category,
          difficulty: p.difficulty
        }));
    }

    results.total = results.docs.length + results.questions.length + results.learningPaths.length;

    return res.status(200).json({
      success: true,
      query: q,
      ...results
    });
  } catch (error) {
    console.error('Error searching:', error);
    return res.status(500).json({ error: 'Search failed' });
  }
}
