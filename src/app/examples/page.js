'use client';

import React, { useState } from 'react';
import { Code2, Sparkles, Copy, Check } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Examples() {
  const { isDark } = useTheme();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const examples = [
    {
      title: 'User Authentication',
      description: 'Complete example of implementing user authentication with JWT tokens.',
      language: 'javascript',
      code: `import jwt from 'jsonwebtoken';

async function authenticateUser(email, password) {
  const user = await User.findByEmail(email);
  if (!user || !user.verifyPassword(password)) {
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  return { user, token };
}`
    },
    {
      title: 'REST API Endpoint',
      description: 'Create a RESTful API endpoint with Express.js.',
      language: 'javascript',
      code: `app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
});`
    },
    {
      title: 'Database Query',
      description: 'Efficient database query with pagination and filtering.',
      language: 'javascript',
      code: `async function getUsers(filters = {}) {
  const { page = 1, limit = 10, role } = filters;
  const skip = (page - 1) * limit;
  
  const query = role ? { role } : {};
  
  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-password');
    
  const total = await User.countDocuments(query);
  
  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}`
    },
    {
      title: 'React Component',
      description: 'Modern React component with hooks and state management.',
      language: 'jsx',
      code: `import { useState, useEffect } from 'react';

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`
    }
  ];

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50'
      }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 mb-6">
            <Code2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Code Examples
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Ready-to-use code examples for common development tasks.
          </p>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              {/* Example Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {example.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {example.description}
                    </p>
                  </div>
                  <button
                    onClick={() => copyCode(example.code, index)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-medium">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Block */}
              <div className="bg-slate-900 dark:bg-slate-950 p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-emerald-400 font-mono">
                    {example.code}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 sm:p-12 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Need more examples?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Browse our GitHub repository for hundreds of additional code examples and starter templates.
          </p>
          <button className="bg-white text-emerald-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            View on GitHub
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
