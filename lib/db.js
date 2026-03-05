// Simple file-based database for persistence
// Uses JSON files to store data - works well for this project

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'db');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(collection) {
  ensureDataDir();
  return path.join(DATA_DIR, `${collection}.json`);
}

function readCollection(collection) {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${collection}:`, error);
    return [];
  }
}

function writeCollection(collection, data) {
  const filePath = getFilePath(collection);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${collection}:`, error);
    return false;
  }
}

// Generate unique ID
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Questions Collection
export const Questions = {
  getAll: (options = {}) => {
    let questions = readCollection('questions');
    
    // Search
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      questions = questions.filter(q => 
        q.title.toLowerCase().includes(searchLower) ||
        q.body.toLowerCase().includes(searchLower) ||
        (q.tags && q.tags.some(t => t.toLowerCase().includes(searchLower)))
      );
    }
    
    // Filter by category
    if (options.category && options.category !== 'All') {
      questions = questions.filter(q => q.category === options.category);
    }
    
    // Filter by status
    if (options.status && options.status !== 'all') {
      questions = questions.filter(q => q.status === options.status);
    }
    
    // Filter by tag
    if (options.tag) {
      questions = questions.filter(q => q.tags && q.tags.includes(options.tag));
    }
    
    // Sort
    const sortField = options.sort || '-createdAt';
    const isDesc = sortField.startsWith('-');
    const field = isDesc ? sortField.slice(1) : sortField;
    
    questions.sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];
      
      if (field === 'createdAt' || field === 'updatedAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      
      if (isDesc) {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
    
    // Pagination
    const page = options.page || 1;
    const limit = options.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginatedQuestions = questions.slice(startIndex, startIndex + limit);
    
    return {
      questions: paginatedQuestions,
      total: questions.length,
      page,
      totalPages: Math.ceil(questions.length / limit)
    };
  },
  
  getById: (id) => {
    const questions = readCollection('questions');
    return questions.find(q => q.id === id) || null;
  },
  
  create: (data) => {
    const questions = readCollection('questions');
    const newQuestion = {
      id: generateId(),
      title: data.title,
      body: data.body,
      category: data.category || 'General',
      topic: data.topic || '',
      tags: data.tags || [],
      author_name: data.author_name || 'Anonymous',
      author_email: data.author_email || '',
      votes: 0,
      views: 0,
      answersCount: 0,
      status: 'open',
      suggested_docs: data.suggested_docs || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    questions.push(newQuestion);
    writeCollection('questions', questions);
    return newQuestion;
  },
  
  update: (id, data) => {
    const questions = readCollection('questions');
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return null;
    
    questions[index] = {
      ...questions[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    writeCollection('questions', questions);
    return questions[index];
  },
  
  delete: (id) => {
    const questions = readCollection('questions');
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return false;
    
    questions.splice(index, 1);
    writeCollection('questions', questions);
    return true;
  },
  
  vote: (id, direction) => {
    const questions = readCollection('questions');
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return null;
    
    questions[index].votes += direction === 'up' ? 1 : -1;
    questions[index].updatedAt = new Date().toISOString();
    writeCollection('questions', questions);
    return questions[index];
  },
  
  incrementViews: (id) => {
    const questions = readCollection('questions');
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return null;
    
    questions[index].views = (questions[index].views || 0) + 1;
    writeCollection('questions', questions);
    return questions[index];
  },
  
  updateAnswersCount: (id, count) => {
    const questions = readCollection('questions');
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return null;
    
    questions[index].answersCount = count;
    if (count > 0 && questions[index].status === 'open') {
      questions[index].status = 'answered';
    }
    writeCollection('questions', questions);
    return questions[index];
  }
};

// Answers Collection
export const Answers = {
  getByQuestionId: (questionId) => {
    const answers = readCollection('answers');
    return answers
      .filter(a => a.question_id === questionId)
      .sort((a, b) => {
        // Sort by accepted first, then by votes, then by date
        if (a.is_accepted !== b.is_accepted) return b.is_accepted ? 1 : -1;
        if (a.votes !== b.votes) return b.votes - a.votes;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  },
  
  create: (data) => {
    const answers = readCollection('answers');
    const newAnswer = {
      id: generateId(),
      question_id: data.question_id,
      body: data.body,
      author_name: data.author_name || 'Anonymous',
      author_email: data.author_email || '',
      votes: 0,
      is_accepted: false,
      is_ai_generated: data.is_ai_generated || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    answers.push(newAnswer);
    writeCollection('answers', answers);
    
    // Update question's answer count
    const questionAnswers = answers.filter(a => a.question_id === data.question_id);
    Questions.updateAnswersCount(data.question_id, questionAnswers.length);
    
    return newAnswer;
  },
  
  vote: (id, direction) => {
    const answers = readCollection('answers');
    const index = answers.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    answers[index].votes += direction === 'up' ? 1 : -1;
    answers[index].updatedAt = new Date().toISOString();
    writeCollection('answers', answers);
    return answers[index];
  },
  
  accept: (id) => {
    const answers = readCollection('answers');
    const index = answers.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    // Remove accepted status from other answers to same question
    const questionId = answers[index].question_id;
    answers.forEach((a, i) => {
      if (a.question_id === questionId) {
        answers[i].is_accepted = i === index;
      }
    });
    
    writeCollection('answers', answers);
    return answers[index];
  },
  
  getAll: () => {
    return readCollection('answers');
  }
};

// Learning Paths Collection
export const LearningPaths = {
  getAll: (options = {}) => {
    let paths = readCollection('learning_paths');
    
    // Filter by difficulty
    if (options.difficulty && options.difficulty !== 'all') {
      paths = paths.filter(p => p.difficulty === options.difficulty);
    }
    
    // Filter by category
    if (options.category) {
      paths = paths.filter(p => p.category === options.category);
    }
    
    return paths;
  },
  
  getById: (id) => {
    const paths = readCollection('learning_paths');
    return paths.find(p => p.id === id) || null;
  },
  
  create: (data) => {
    const paths = readCollection('learning_paths');
    const newPath = {
      id: generateId(),
      title: data.title,
      description: data.description,
      category: data.category || 'General',
      difficulty: data.difficulty || 'beginner',
      estimated_hours: data.estimated_hours || 10,
      topics: (data.topics || []).map((t, idx) => ({
        id: t.id || `topic-${Date.now()}-${idx}`,
        title: t.title,
        level: t.level || 'beginner',
        description: t.description || '',
        order: t.order || idx + 1
      })),
      prerequisites: data.prerequisites || [],
      tags: data.tags || [],
      icon: data.icon || 'BookOpen',
      color: data.color || 'from-blue-500 to-purple-500',
      total_xp: data.total_xp || 500,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    paths.push(newPath);
    writeCollection('learning_paths', paths);
    return newPath;
  },
  
  update: (id, data) => {
    const paths = readCollection('learning_paths');
    const index = paths.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    paths[index] = {
      ...paths[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    writeCollection('learning_paths', paths);
    return paths[index];
  },
  
  delete: (id) => {
    const paths = readCollection('learning_paths');
    const index = paths.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    paths.splice(index, 1);
    writeCollection('learning_paths', paths);
    return true;
  }
};

// User Progress Collection
export const UserProgress = {
  get: (userEmail, pathId) => {
    const progress = readCollection('user_progress');
    return progress.find(p => p.user_email === userEmail && p.path_id === pathId) || null;
  },
  
  getByUser: (userEmail) => {
    const progress = readCollection('user_progress');
    return progress.filter(p => p.user_email === userEmail);
  },
  
  upsert: (userEmail, pathId, data) => {
    const progress = readCollection('user_progress');
    const index = progress.findIndex(p => p.user_email === userEmail && p.path_id === pathId);
    
    if (index === -1) {
      // Create new progress record
      const newProgress = {
        id: generateId(),
        user_email: userEmail,
        path_id: pathId,
        completed_topics: data.completed_topics || [],
        quiz_scores: data.quiz_scores || {},
        challenge_completions: data.challenge_completions || [],
        current_topic_id: data.current_topic_id || null,
        total_xp: data.total_xp || 0,
        streak_days: data.streak_days || 0,
        status: data.status || 'not-started',
        last_activity: new Date().toISOString(),
        started_at: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      progress.push(newProgress);
      writeCollection('user_progress', progress);
      return newProgress;
    }
    
    // Update existing progress
    progress[index] = {
      ...progress[index],
      ...data,
      last_activity: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    writeCollection('user_progress', progress);
    return progress[index];
  },
  
  updateProgress: (userEmail, pathId, topicId, completed = true) => {
    const progress = readCollection('user_progress');
    let record = progress.find(p => p.user_email === userEmail && p.path_id === pathId);
    
    if (!record) {
      record = {
        id: generateId(),
        user_email: userEmail,
        path_id: pathId,
        completed_topics: [],
        quiz_scores: {},
        challenge_completions: [],
        current_topic_id: null,
        total_xp: 0,
        streak_days: 0,
        status: 'in-progress',
        last_activity: new Date().toISOString(),
        started_at: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      progress.push(record);
    }
    
    const index = progress.findIndex(p => p.id === record.id);
    
    if (completed) {
      if (!progress[index].completed_topics.includes(topicId)) {
        progress[index].completed_topics.push(topicId);
        progress[index].total_xp = (progress[index].total_xp || 0) + 50;
      }
    } else {
      progress[index].completed_topics = progress[index].completed_topics.filter(t => t !== topicId);
    }
    
    progress[index].current_topic_id = topicId;
    progress[index].status = 'in-progress';
    progress[index].last_activity = new Date().toISOString();
    progress[index].updatedAt = new Date().toISOString();
    
    writeCollection('user_progress', progress);
    return progress[index];
  }
};

// Achievements Collection
export const Achievements = {
  getByUser: (userEmail) => {
    const achievements = readCollection('achievements');
    return achievements.filter(a => a.user_email === userEmail);
  },
  
  award: (userEmail, achievementType, data = {}) => {
    const achievements = readCollection('achievements');
    
    // Check if user already has this achievement
    const existing = achievements.find(
      a => a.user_email === userEmail && a.type === achievementType
    );
    if (existing) return existing;
    
    const newAchievement = {
      id: generateId(),
      user_email: userEmail,
      type: achievementType,
      title: data.title || achievementType,
      description: data.description || '',
      xp_reward: data.xp_reward || 100,
      icon: data.icon || 'Award',
      earned_at: new Date().toISOString()
    };
    achievements.push(newAchievement);
    writeCollection('achievements', achievements);
    return newAchievement;
  }
};

export default {
  Questions,
  Answers,
  LearningPaths,
  UserProgress,
  Achievements
};
