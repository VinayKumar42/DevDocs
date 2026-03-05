// Topic-specific data for all documentation categories
// This data will be used by the AI to provide accurate, focused responses

export const topicData = {
  // Programming Languages
  'JavaScript': {
    category: 'Programming Languages',
    description: 'Modern JavaScript including ES6+, async programming, and advanced patterns',
    keyTopics: ['Variables', 'Functions', 'Objects', 'Arrays', 'Promises', 'Async/Await', 'Modules'],
    context: 'Client and server-side programming language'
  },
  'Python': {
    category: 'Programming Languages',
    description: 'Python programming from basics to advanced concepts',
    keyTopics: ['Syntax', 'Data Types', 'Functions', 'OOP', 'Decorators', 'Generators', 'asyncio'],
    context: 'General-purpose programming with focus on readability'
  },
  'Java': {
    category: 'Programming Languages',
    description: 'Object-oriented programming with Java',
    keyTopics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism', 'Collections', 'Streams', 'Concurrency'],
    context: 'Enterprise and Android development'
  },
  'C': {
    category: 'Programming Languages',
    description: 'Low-level programming and system programming with C',
    keyTopics: ['Pointers', 'Memory Management', 'Structures', 'File I/O', 'System Calls'],
    context: 'System programming and embedded systems'
  },
  'C++': {
    category: 'Programming Languages',
    description: 'Object-oriented and system programming with C++',
    keyTopics: ['Classes', 'Templates', 'STL', 'Smart Pointers', 'Move Semantics', 'RAII'],
    context: 'High-performance applications and game development'
  },
  'TypeScript': {
    category: 'Programming Languages',
    description: 'Typed superset of JavaScript for large-scale applications',
    keyTopics: ['Types', 'Interfaces', 'Generics', 'Decorators', 'Type Guards', 'Utility Types'],
    context: 'Type-safe JavaScript development'
  },
  
  // Data Structures & Algorithms
  'Arrays': {
    category: 'Data Structures & Algorithms',
    description: 'Array data structure and common operations',
    keyTopics: ['Indexing', 'Traversal', 'Insertion', 'Deletion', 'Two Pointers', 'Sliding Window'],
    context: 'Foundation for many algorithms and data manipulation'
  },
  'Linked Lists': {
    category: 'Data Structures & Algorithms',
    description: 'Singly and doubly linked list implementations',
    keyTopics: ['Node Structure', 'Insertion', 'Deletion', 'Reversal', 'Cycle Detection', 'Fast/Slow Pointers'],
    context: 'Dynamic data structure for sequential access'
  },
  'Trees': {
    category: 'Data Structures & Algorithms',
    description: 'Tree data structures including binary trees and BST',
    keyTopics: ['Binary Tree', 'BST', 'Traversals', 'Height', 'Balance', 'AVL Trees'],
    context: 'Hierarchical data organization'
  },
  'Graphs': {
    category: 'Data Structures & Algorithms',
    description: 'Graph representations and traversal algorithms',
    keyTopics: ['Adjacency List', 'Adjacency Matrix', 'DFS', 'BFS', 'Shortest Path', 'Topological Sort'],
    context: 'Modeling networks and relationships'
  },
  'Sorting': {
    category: 'Data Structures & Algorithms',
    description: 'Common sorting algorithms and their complexities',
    keyTopics: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort', 'Time Complexity', 'Stability'],
    context: 'Organizing data efficiently'
  },
  'Searching': {
    category: 'Data Structures & Algorithms',
    description: 'Searching algorithms for various data structures',
    keyTopics: ['Linear Search', 'Binary Search', 'DFS', 'BFS', 'Interpolation Search'],
    context: 'Finding elements efficiently'
  },
  'Dynamic Programming': {
    category: 'Data Structures & Algorithms',
    description: 'Optimization technique using memoization and tabulation',
    keyTopics: ['Memoization', 'Tabulation', 'LCS', 'Knapsack', 'Fibonacci', 'State Transition'],
    context: 'Solving optimization problems'
  },
  'Time Complexity': {
    category: 'Data Structures & Algorithms',
    description: 'Analyzing algorithm efficiency using Big O notation',
    keyTopics: ['Big O', 'Best/Worst/Average Case', 'Amortized Analysis', 'Space-Time Tradeoffs'],
    context: 'Measuring algorithm performance'
  },
  'Space Complexity': {
    category: 'Data Structures & Algorithms',
    description: 'Memory usage analysis of algorithms',
    keyTopics: ['Auxiliary Space', 'In-place Algorithms', 'Recursion Stack', 'Memory Optimization'],
    context: 'Memory efficiency analysis'
  },
  
  // Web Development
  'HTML5': {
    category: 'Web Development',
    description: 'Modern HTML markup and semantic elements',
    keyTopics: ['Semantic HTML', 'Forms', 'Canvas', 'SVG', 'Web Storage', 'Accessibility'],
    context: 'Building web page structure'
  },
  'CSS3': {
    category: 'Web Development',
    description: 'Styling web pages with modern CSS features',
    keyTopics: ['Flexbox', 'Grid', 'Animations', 'Transitions', 'Media Queries', 'Custom Properties'],
    context: 'Visual design and layout'
  },
  'React': {
    category: 'Web Development',
    description: 'Modern React with hooks and functional components',
    keyTopics: ['Components', 'Hooks', 'State', 'Props', 'Context', 'Performance', 'Custom Hooks'],
    context: 'Building interactive UIs'
  },
  'Next.js': {
    category: 'Web Development',
    description: 'React framework for production applications',
    keyTopics: ['SSR', 'SSG', 'API Routes', 'File-based Routing', 'Image Optimization', 'Middleware'],
    context: 'Full-stack React applications'
  },
  'Vue.js': {
    category: 'Web Development',
    description: 'Progressive JavaScript framework',
    keyTopics: ['Components', 'Reactivity', 'Composition API', 'Directives', 'Vuex', 'Vue Router'],
    context: 'Building user interfaces'
  },
  'State Management': {
    category: 'Web Development',
    description: 'Managing application state in frontend apps',
    keyTopics: ['Redux', 'Context API', 'Zustand', 'Recoil', 'Global State', 'Local State'],
    context: 'Coordinating data across components'
  },
  'Responsive Design': {
    category: 'Web Development',
    description: 'Creating layouts that work on all devices',
    keyTopics: ['Media Queries', 'Flexible Grids', 'Mobile-First', 'Breakpoints', 'Viewport'],
    context: 'Cross-device compatibility'
  },
  'Accessibility (a11y)': {
    category: 'Web Development',
    description: 'Making web applications accessible to everyone',
    keyTopics: ['ARIA', 'Semantic HTML', 'Keyboard Navigation', 'Screen Readers', 'WCAG'],
    context: 'Inclusive design practices'
  },
  
  // Backend Development
  'Node.js': {
    category: 'Backend Development',
    description: 'JavaScript runtime for server-side development',
    keyTopics: ['Event Loop', 'Modules', 'npm', 'File System', 'Streams', 'Child Processes'],
    context: 'Building scalable network applications'
  },
  'Express': {
    category: 'Backend Development',
    description: 'Minimalist web framework for Node.js',
    keyTopics: ['Routing', 'Middleware', 'Error Handling', 'Template Engines', 'Static Files'],
    context: 'Building web servers and APIs'
  },
  'REST APIs': {
    category: 'Backend Development',
    description: 'RESTful API design and implementation',
    keyTopics: ['HTTP Methods', 'Status Codes', 'CRUD Operations', 'Versioning', 'Documentation'],
    context: 'Creating web services'
  },
  'GraphQL': {
    category: 'Backend Development',
    description: 'Query language for APIs',
    keyTopics: ['Queries', 'Mutations', 'Schemas', 'Resolvers', 'Subscriptions', 'Apollo'],
    context: 'Flexible API data fetching'
  },
  'Authentication': {
    category: 'Backend Development',
    description: 'User authentication and session management',
    keyTopics: ['JWT', 'OAuth', 'Sessions', 'Cookies', 'Password Hashing', 'MFA'],
    context: 'Securing user access'
  },
  'Authorization': {
    category: 'Backend Development',
    description: 'Access control and permissions',
    keyTopics: ['RBAC', 'ABAC', 'Permissions', 'Roles', 'Policies', 'Resource Protection'],
    context: 'Managing user permissions'
  },
  'WebSockets': {
    category: 'Backend Development',
    description: 'Real-time bidirectional communication',
    keyTopics: ['Connection', 'Events', 'Broadcasting', 'Rooms', 'Socket.io', 'Error Handling'],
    context: 'Real-time features'
  },
  
  // Databases
  'MySQL': {
    category: 'Databases',
    description: 'Relational database management system',
    keyTopics: ['Tables', 'Joins', 'Indexes', 'Transactions', 'Stored Procedures', 'Triggers'],
    context: 'Structured data storage'
  },
  'PostgreSQL': {
    category: 'Databases',
    description: 'Advanced open-source relational database',
    keyTopics: ['JSONB', 'Full-text Search', 'Window Functions', 'CTEs', 'Extensions', 'Partitioning'],
    context: 'Features-rich relational database'
  },
  'MongoDB': {
    category: 'Databases',
    description: 'NoSQL document database',
    keyTopics: ['Documents', 'Collections', 'Aggregation', 'Indexes', 'Replication', 'Sharding'],
    context: 'Flexible schema database'
  },
  'Redis': {
    category: 'Databases',
    description: 'In-memory data structure store',
    keyTopics: ['Strings', 'Lists', 'Sets', 'Hashes', 'Pub/Sub', 'Caching', 'Session Store'],
    context: 'High-performance caching and messaging'
  },
  'SQL Basics': {
    category: 'Databases',
    description: 'Structured Query Language fundamentals',
    keyTopics: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'WHERE', 'JOIN', 'GROUP BY'],
    context: 'Querying relational databases'
  },
  'Indexing': {
    category: 'Databases',
    description: 'Database indexing for performance',
    keyTopics: ['B-Tree', 'Hash Index', 'Composite Index', 'Covering Index', 'Index Selection'],
    context: 'Optimizing query performance'
  },
  'Transactions': {
    category: 'Databases',
    description: 'ACID properties and transaction management',
    keyTopics: ['ACID', 'Isolation Levels', 'Commit', 'Rollback', 'Deadlocks', 'Locking'],
    context: 'Data consistency and integrity'
  },
  
  // System Design
  'Scalability': {
    category: 'System Design',
    description: 'Designing systems to handle growth',
    keyTopics: ['Horizontal Scaling', 'Vertical Scaling', 'Load Balancing', 'Auto-scaling', 'Partitioning'],
    context: 'Building systems for scale'
  },
  'Load Balancing': {
    category: 'System Design',
    description: 'Distributing traffic across servers',
    keyTopics: ['Round Robin', 'Least Connections', 'Layer 4/7', 'Health Checks', 'Sticky Sessions'],
    context: 'Traffic distribution'
  },
  'Caching': {
    category: 'System Design',
    description: 'Improving performance with caching',
    keyTopics: ['Cache Strategies', 'CDN', 'Redis', 'Memcached', 'Cache Invalidation', 'Write Policies'],
    context: 'Performance optimization'
  },
  'Microservices': {
    category: 'System Design',
    description: 'Distributed architecture pattern',
    keyTopics: ['Service Boundaries', 'Communication', 'API Gateway', 'Service Discovery', 'Fault Tolerance'],
    context: 'Modular system architecture'
  },
  'Monolith vs Microservices': {
    category: 'System Design',
    description: 'Comparing architectural patterns',
    keyTopics: ['Trade-offs', 'When to Use', 'Migration', 'Complexity', 'Team Structure'],
    context: 'Choosing architecture'
  },
  
  // Operating Systems
  'Process Management': {
    category: 'Operating Systems',
    description: 'Managing processes in an OS',
    keyTopics: ['Process States', 'Context Switching', 'IPC', 'Threads', 'Scheduling'],
    context: 'OS process handling'
  },
  'Memory Management': {
    category: 'Operating Systems',
    description: 'How OS manages memory',
    keyTopics: ['Virtual Memory', 'Paging', 'Segmentation', 'Memory Allocation', 'Garbage Collection'],
    context: 'Memory organization'
  },
  'File Systems': {
    category: 'Operating Systems',
    description: 'File storage and organization',
    keyTopics: ['Inodes', 'Directories', 'File Permissions', 'Journaling', 'RAID'],
    context: 'Data persistence'
  },
  'Scheduling': {
    category: 'Operating Systems',
    description: 'CPU scheduling algorithms',
    keyTopics: ['FCFS', 'SJF', 'Round Robin', 'Priority', 'Multilevel Queue'],
    context: 'Process scheduling'
  },
  'Concurrency': {
    category: 'Operating Systems',
    description: 'Managing concurrent execution',
    keyTopics: ['Threads', 'Synchronization', 'Mutex', 'Semaphores', 'Race Conditions'],
    context: 'Parallel execution'
  },
  
  // Computer Networks
  'OSI Model': {
    category: 'Computer Networks',
    description: 'Seven-layer network communication model',
    keyTopics: ['Physical', 'Data Link', 'Network', 'Transport', 'Session', 'Presentation', 'Application'],
    context: 'Network architecture framework'
  },
  'TCP/IP': {
    category: 'Computer Networks',
    description: 'Internet protocol suite',
    keyTopics: ['TCP', 'UDP', 'IP Addressing', 'Routing', 'Subnetting', 'Ports'],
    context: 'Internet communication'
  },
  'HTTP/HTTPS': {
    category: 'Computer Networks',
    description: 'Web communication protocols',
    keyTopics: ['Methods', 'Status Codes', 'Headers', 'Cookies', 'SSL/TLS', 'CORS'],
    context: 'Web data transfer'
  },
  'DNS': {
    category: 'Computer Networks',
    description: 'Domain Name System',
    keyTopics: ['Name Resolution', 'Records', 'Caching', 'Hierarchy', 'TTL'],
    context: 'Domain to IP mapping'
  },
  
  // OOP Concepts
  'Classes & Objects': {
    category: 'OOP Concepts',
    description: 'Fundamental OOP building blocks',
    keyTopics: ['Class Definition', 'Object Instantiation', 'Constructors', 'Methods', 'Properties'],
    context: 'Object-oriented programming basics'
  },
  'Inheritance': {
    category: 'OOP Concepts',
    description: 'Code reuse through class hierarchies',
    keyTopics: ['Parent Class', 'Child Class', 'Method Overriding', 'Super', 'Multiple Inheritance'],
    context: 'Creating class hierarchies'
  },
  'Polymorphism': {
    category: 'OOP Concepts',
    description: 'Multiple forms of methods and objects',
    keyTopics: ['Method Overloading', 'Method Overriding', 'Runtime Polymorphism', 'Compile-time Polymorphism'],
    context: 'Flexible method implementation'
  },
  'Encapsulation': {
    category: 'OOP Concepts',
    description: 'Data hiding and bundling',
    keyTopics: ['Private', 'Public', 'Protected', 'Getters', 'Setters', 'Information Hiding'],
    context: 'Protecting data integrity'
  },
  'Abstraction': {
    category: 'OOP Concepts',
    description: 'Hiding complex implementation details',
    keyTopics: ['Abstract Classes', 'Interfaces', 'Abstract Methods', 'Implementation'],
    context: 'Simplifying complexity'
  },
  'SOLID Principles': {
    category: 'OOP Concepts',
    description: 'Five design principles for maintainable code',
    keyTopics: ['Single Responsibility', 'Open/Closed', 'Liskov Substitution', 'Interface Segregation', 'Dependency Inversion'],
    context: 'Clean code design'
  },
  'Design Patterns': {
    category: 'OOP Concepts',
    description: 'Common solutions to recurring problems',
    keyTopics: ['Singleton', 'Factory', 'Observer', 'Strategy', 'Decorator', 'MVC'],
    context: 'Reusable design solutions'
  },
  
  // DevOps & Cloud
  'Git & GitHub': {
    category: 'DevOps & Cloud',
    description: 'Version control and collaboration',
    keyTopics: ['Commits', 'Branches', 'Merge', 'Pull Requests', 'Conflicts', 'Rebase'],
    context: 'Source code management'
  },
  'CI/CD': {
    category: 'DevOps & Cloud',
    description: 'Continuous Integration and Deployment',
    keyTopics: ['Pipeline', 'Automation', 'Testing', 'Deployment', 'Jenkins', 'GitHub Actions'],
    context: 'Automated software delivery'
  },
  'Docker': {
    category: 'DevOps & Cloud',
    description: 'Containerization platform',
    keyTopics: ['Images', 'Containers', 'Dockerfile', 'Docker Compose', 'Volumes', 'Networks'],
    context: 'Application containerization'
  },
  'Kubernetes Basics': {
    category: 'DevOps & Cloud',
    description: 'Container orchestration',
    keyTopics: ['Pods', 'Deployments', 'Services', 'ConfigMaps', 'Ingress', 'Scaling'],
    context: 'Managing containerized applications'
  },
  'AWS': {
    category: 'DevOps & Cloud',
    description: 'Amazon Web Services cloud platform',
    keyTopics: ['EC2', 'S3', 'RDS', 'Lambda', 'VPC', 'IAM'],
    context: 'Cloud computing services'
  },
  'Linux & Bash': {
    category: 'DevOps & Cloud',
    description: 'Linux operating system and shell scripting',
    keyTopics: ['Commands', 'File System', 'Permissions', 'Pipes', 'Scripts', 'Package Management'],
    context: 'Unix-like system administration'
  },
  
  // Security
  'Web Security Basics': {
    category: 'Security',
    description: 'Fundamental web security concepts',
    keyTopics: ['XSS', 'CSRF', 'SQL Injection', 'Input Validation', 'Output Encoding'],
    context: 'Protecting web applications'
  },
  'JWT & OAuth': {
    category: 'Security',
    description: 'Modern authentication mechanisms',
    keyTopics: ['JSON Web Tokens', 'OAuth 2.0', 'Token Validation', 'Refresh Tokens', 'Scopes'],
    context: 'Secure authentication'
  },
  'HTTPS': {
    category: 'Security',
    description: 'Secure web communication',
    keyTopics: ['SSL/TLS', 'Certificates', 'Encryption', 'Handshake', 'HSTS'],
    context: 'Encrypted data transfer'
  },
  'OWASP Top 10': {
    category: 'Security',
    description: 'Top web application security risks',
    keyTopics: ['Injection', 'Broken Authentication', 'XSS', 'CSRF', 'Security Misconfiguration'],
    context: 'Common vulnerabilities'
  },
  
  // Getting Started
  'Introduction': {
    category: 'Getting Started',
    description: 'Introduction to the documentation platform',
    keyTopics: ['Overview', 'Features', 'Navigation', 'How to Use'],
    context: 'Platform introduction'
  },
  'Installation': {
    category: 'Getting Started',
    description: 'Setting up your development environment',
    keyTopics: ['Prerequisites', 'Setup Steps', 'Configuration', 'Verification'],
    context: 'Environment setup'
  },
  'Quick Start': {
    category: 'Getting Started',
    description: 'Getting started quickly with basic examples',
    keyTopics: ['First Project', 'Hello World', 'Basic Concepts', 'Next Steps'],
    context: 'Quick beginner guide'
  }
};

export const getCategoryTopics = (category) => {
  return Object.entries(topicData)
    .filter(([_, data]) => data.category === category)
    .map(([topic, data]) => ({ topic, ...data }));
};

export const getTopicInfo = (topic) => {
  return topicData[topic] || null;
};

export const getAllCategories = () => {
  const categories = new Set();
  Object.values(topicData).forEach(data => categories.add(data.category));
  return Array.from(categories);
};

export const getTopicSearchData = () => {
  return Object.entries(topicData).map(([topic, data], index) => ({
    id: `topic-${index}`,
    title: topic,
    category: data.category,
    description: data.description,
    keywords: [...(data.keyTopics || []), data.context, topic.toLowerCase()]
  }));
};
