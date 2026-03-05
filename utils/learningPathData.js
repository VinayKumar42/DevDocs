// Learning path data organized by topic

export const learningPaths = {
  'JavaScript Fundamentals': {
    title: 'JavaScript Fundamentals',
    description: 'Master JavaScript from basics to advanced concepts including ES6+, async programming, and more.',
    category: 'Programming Languages',
    difficulty: 'beginner',
    estimated_hours: 10,
    color: 'from-yellow-500 to-orange-500',
    total_xp: 500,
    topics: [
      { id: 'js-1', title: 'Variables & Data Types', level: 'beginner', description: 'Learn about let, const, var and primitive types', order: 1 },
      { id: 'js-2', title: 'Functions & Scope', level: 'beginner', description: 'Understanding function declarations, expressions, and closures', order: 2 },
      { id: 'js-3', title: 'Arrays & Objects', level: 'beginner', description: 'Working with complex data structures', order: 3 },
      { id: 'js-4', title: 'ES6+ Features', level: 'intermediate', description: 'Arrow functions, destructuring, spread operator', order: 4 },
      { id: 'js-5', title: 'Async JavaScript', level: 'intermediate', description: 'Promises, async/await, and event loop', order: 5 }
    ]
  },
  
  'React Development': {
    title: 'React Development',
    description: 'Build modern web applications with React, hooks, state management, and best practices.',
    category: 'Web Development',
    difficulty: 'intermediate',
    estimated_hours: 15,
    color: 'from-cyan-500 to-blue-500',
    total_xp: 750,
    topics: [
      { id: 'react-1', title: 'React Basics', level: 'beginner', description: 'Components, JSX, and props', order: 1 },
      { id: 'react-2', title: 'State & Lifecycle', level: 'intermediate', description: 'useState, useEffect, and component lifecycle', order: 2 },
      { id: 'react-3', title: 'Advanced Hooks', level: 'intermediate', description: 'useContext, useReducer, useMemo, useCallback', order: 3 },
      { id: 'react-4', title: 'State Management', level: 'intermediate', description: 'Context API and state management patterns', order: 4 },
      { id: 'react-5', title: 'Performance Optimization', level: 'advanced', description: 'React.memo, lazy loading, and optimization techniques', order: 5 }
    ]
  },
  
  'Data Structures & Algorithms': {
    title: 'Data Structures & Algorithms',
    description: 'Essential DSA concepts for coding interviews and problem-solving.',
    category: 'Data Structures & Algorithms',
    difficulty: 'intermediate',
    estimated_hours: 20,
    color: 'from-purple-500 to-pink-500',
    total_xp: 1000,
    topics: [
      { id: 'dsa-1', title: 'Arrays & Strings', level: 'beginner', description: 'Array manipulation and string algorithms', order: 1 },
      { id: 'dsa-2', title: 'Linked Lists', level: 'intermediate', description: 'Singly, doubly linked lists and operations', order: 2 },
      { id: 'dsa-3', title: 'Trees & Graphs', level: 'intermediate', description: 'Binary trees, BST, and graph traversals', order: 3 },
      { id: 'dsa-4', title: 'Sorting & Searching', level: 'intermediate', description: 'Common sorting algorithms and binary search', order: 4 },
      { id: 'dsa-5', title: 'Dynamic Programming', level: 'advanced', description: 'Memoization, tabulation, and common patterns', order: 5 }
    ]
  },
  
  'System Design Basics': {
    title: 'System Design Basics',
    description: 'Learn to design scalable systems from fundamentals to advanced concepts.',
    category: 'System Design',
    difficulty: 'advanced',
    estimated_hours: 25,
    color: 'from-green-500 to-emerald-500',
    total_xp: 1250,
    topics: [
      { id: 'sd-1', title: 'Scalability Fundamentals', level: 'intermediate', description: 'Horizontal vs vertical scaling, load balancing', order: 1 },
      { id: 'sd-2', title: 'Database Design', level: 'intermediate', description: 'SQL vs NoSQL, sharding, replication', order: 2 },
      { id: 'sd-3', title: 'Caching Strategies', level: 'intermediate', description: 'Redis, CDN, and caching patterns', order: 3 },
      { id: 'sd-4', title: 'Microservices', level: 'advanced', description: 'Service architecture and communication', order: 4 },
      { id: 'sd-5', title: 'Design Patterns', level: 'advanced', description: 'Common system design patterns and trade-offs', order: 5 }
    ]
  },
  
  'Python for Beginners': {
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python, the most beginner-friendly language.',
    category: 'Programming Languages',
    difficulty: 'beginner',
    estimated_hours: 8,
    color: 'from-blue-500 to-cyan-500',
    total_xp: 400,
    topics: [
      { id: 'py-1', title: 'Python Basics', level: 'beginner', description: 'Syntax, variables, and basic operations', order: 1 },
      { id: 'py-2', title: 'Control Flow', level: 'beginner', description: 'If statements, loops, and conditions', order: 2 },
      { id: 'py-3', title: 'Functions', level: 'beginner', description: 'Defining and using functions', order: 3 },
      { id: 'py-4', title: 'Data Structures', level: 'beginner', description: 'Lists, dictionaries, sets, and tuples', order: 4 },
      { id: 'py-5', title: 'File Handling', level: 'intermediate', description: 'Reading and writing files', order: 5 }
    ]
  },
  
  'Git & Version Control': {
    title: 'Git & Version Control',
    description: 'Master Git commands and workflows for professional development.',
    category: 'DevOps & Cloud',
    difficulty: 'beginner',
    estimated_hours: 5,
    color: 'from-orange-500 to-red-500',
    total_xp: 300,
    topics: [
      { id: 'git-1', title: 'Git Basics', level: 'beginner', description: 'Init, add, commit, and basic workflow', order: 1 },
      { id: 'git-2', title: 'Branching', level: 'beginner', description: 'Creating and merging branches', order: 2 },
      { id: 'git-3', title: 'Remote Repositories', level: 'beginner', description: 'Push, pull, and working with GitHub', order: 3 },
      { id: 'git-4', title: 'Advanced Git', level: 'intermediate', description: 'Rebase, cherry-pick, and conflict resolution', order: 4 }
    ]
  },
  
  'TypeScript Essentials': {
    title: 'TypeScript Essentials',
    description: 'Learn TypeScript for type-safe JavaScript development.',
    category: 'Programming Languages',
    difficulty: 'intermediate',
    estimated_hours: 12,
    color: 'from-blue-600 to-indigo-500',
    total_xp: 600,
    topics: [
      { id: 'ts-1', title: 'TypeScript Basics', level: 'beginner', description: 'Types, interfaces, and basic syntax', order: 1 },
      { id: 'ts-2', title: 'Advanced Types', level: 'intermediate', description: 'Union, intersection, and conditional types', order: 2 },
      { id: 'ts-3', title: 'Generics', level: 'intermediate', description: 'Creating reusable type-safe components', order: 3 },
      { id: 'ts-4', title: 'Decorators', level: 'advanced', description: 'Meta-programming with decorators', order: 4 },
      { id: 'ts-5', title: 'TypeScript with React', level: 'advanced', description: 'Building type-safe React applications', order: 5 }
    ]
  },
  
  'Node.js Backend': {
    title: 'Node.js Backend',
    description: 'Build scalable backend applications with Node.js.',
    category: 'Backend Development',
    difficulty: 'intermediate',
    estimated_hours: 18,
    color: 'from-green-600 to-lime-500',
    total_xp: 900,
    topics: [
      { id: 'node-1', title: 'Node.js Fundamentals', level: 'beginner', description: 'Event loop, modules, and npm', order: 1 },
      { id: 'node-2', title: 'Express Framework', level: 'intermediate', description: 'Building REST APIs with Express', order: 2 },
      { id: 'node-3', title: 'Database Integration', level: 'intermediate', description: 'Connecting to MongoDB and SQL databases', order: 3 },
      { id: 'node-4', title: 'Authentication', level: 'intermediate', description: 'JWT and session-based auth', order: 4 },
      { id: 'node-5', title: 'Testing & Deployment', level: 'advanced', description: 'Unit testing and production deployment', order: 5 }
    ]
  },
  
  'Docker & Containers': {
    title: 'Docker & Containers',
    description: 'Containerize applications with Docker for consistent deployments.',
    category: 'DevOps & Cloud',
    difficulty: 'intermediate',
    estimated_hours: 10,
    color: 'from-cyan-600 to-blue-600',
    total_xp: 550,
    topics: [
      { id: 'docker-1', title: 'Docker Basics', level: 'beginner', description: 'Images, containers, and Dockerfile', order: 1 },
      { id: 'docker-2', title: 'Docker Compose', level: 'intermediate', description: 'Multi-container applications', order: 2 },
      { id: 'docker-3', title: 'Volumes & Networks', level: 'intermediate', description: 'Data persistence and networking', order: 3 },
      { id: 'docker-4', title: 'Best Practices', level: 'intermediate', description: 'Optimization and security', order: 4 }
    ]
  },
  
  'Database Mastery': {
    title: 'Database Mastery',
    description: 'Master both SQL and NoSQL databases.',
    category: 'Databases',
    difficulty: 'intermediate',
    estimated_hours: 20,
    color: 'from-purple-600 to-violet-500',
    total_xp: 950,
    topics: [
      { id: 'db-1', title: 'SQL Fundamentals', level: 'beginner', description: 'SELECT, JOIN, and basic queries', order: 1 },
      { id: 'db-2', title: 'Advanced SQL', level: 'intermediate', description: 'Subqueries, CTEs, and window functions', order: 2 },
      { id: 'db-3', title: 'Database Design', level: 'intermediate', description: 'Normalization and schema design', order: 3 },
      { id: 'db-4', title: 'NoSQL Databases', level: 'intermediate', description: 'MongoDB, Redis, and when to use', order: 4 },
      { id: 'db-5', title: 'Performance Tuning', level: 'advanced', description: 'Indexing and query optimization', order: 5 }
    ]
  }
};

export const getAllLearningPaths = () => {
  return Object.values(learningPaths);
};

export const getLearningPathByTitle = (title) => {
  return learningPaths[title] || null;
};

export const getLearningPathsByCategory = (category) => {
  return Object.values(learningPaths).filter(path => path.category === category);
};

export const getLearningPathsByDifficulty = (difficulty) => {
  return Object.values(learningPaths).filter(path => path.difficulty === difficulty);
};
