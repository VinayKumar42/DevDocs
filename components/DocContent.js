import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, ExternalLink, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import CodeBlock from './CodeBlock';
import AIContentGenerator from './AIContentGenerator';

export default function DocContent({ category, topic }) {
  const { isDark } = useTheme();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const codeExamples = {
    'JavaScript': `// Modern JavaScript Basics
const greeting = (name) => {
  return \`Hello, \${name}!\`;
};

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((a, b) => a + b, 0);

// Async/Await
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

console.log(greeting('Developer'));`,
    'Python': `# Python Fundamentals
def greeting(name: str) -> str:
    return f"Hello, {name}!"

# List comprehensions
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
total = sum(numbers)

# Async/Await
async def fetch_data(url: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

print(greeting("Developer"))`,
    'Binary Search Algorithm': `// Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found!
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Not found
}

// Time Complexity: O(log n)
// Space Complexity: O(1)
const sorted = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(sorted, 7)); // Output: 3`,
    'React': `// React Functional Component with Hooks
import React, { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="counter">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    default: `// Example Code
function example() {
  console.log("Hello, World!");
  return true;
}

example();`
  };

  const getCodeExample = () => {
    return codeExamples[topic] || codeExamples.default;
  };

  const getLanguage = () => {
    if (topic === 'Python') return 'python';
    if (topic === 'Java') return 'java';
    return 'javascript';
  };

  return (
    <motion.article
      {...fadeIn}
      className="max-w-4xl"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Docs</span>
        <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>/</span>
        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{category}</span>
        <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>/</span>
        <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{topic}</span>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          text-4xl font-bold mb-4
          ${isDark ? 'text-white' : 'text-slate-900'}
        `}
      >
        {topic}
      </motion.h1>

      {/* Meta */}
      <div className={`
        flex flex-wrap items-center gap-4 mb-8 text-sm
        ${isDark ? 'text-slate-400' : 'text-slate-500'}
      `}>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>Updated Jan 15, 2025</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>5 min read</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          <span>DevDocs Team</span>
        </div>
        <div className={`
          flex items-center gap-1.5 px-2 py-0.5 rounded-full
          ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}
        `}>
          <Tag className="w-3 h-3" />
          <span>{category}</span>
        </div>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className={`
          p-4 rounded-xl mb-8 flex items-start gap-3
          ${isDark 
            ? 'bg-blue-500/10 border border-blue-500/20' 
            : 'bg-blue-50 border border-blue-200'
          }
        `}
      >
        <Info className={`w-5 h-5 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        <div>
          <p className={`font-medium ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
            Prerequisites
          </p>
          <p className={`text-sm mt-1 ${isDark ? 'text-blue-300/80' : 'text-blue-700'}`}>
            This guide assumes you have basic knowledge of programming concepts and a development environment set up.
          </p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-8">
        <section id="introduction">
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Introduction
          </h2>
          <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Welcome to the comprehensive guide on <strong>{topic}</strong>. This documentation will help you understand 
            the core concepts, best practices, and practical implementations. Whether you're a beginner or an experienced 
            developer, this guide has something valuable for everyone.
          </p>
        </section>

        <section id="getting-started">
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Getting Started
          </h2>
          
          <div id="prerequisites" className="mb-6">
            <h3 className={`text-xl font-medium mb-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Prerequisites
            </h3>
            <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li className="flex items-start gap-2">
                <CheckCircle2 className={`w-5 h-5 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span>Basic understanding of programming fundamentals</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className={`w-5 h-5 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span>A code editor (VS Code recommended)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className={`w-5 h-5 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span>Node.js installed (for JavaScript projects)</span>
              </li>
            </ul>
          </div>

          <div id="installation">
            <h3 className={`text-xl font-medium mb-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Installation
            </h3>
            <CodeBlock
              code={`# Install using npm
npm install ${topic.toLowerCase().replace(/\s+/g, '-')}

# Or using yarn
yarn add ${topic.toLowerCase().replace(/\s+/g, '-')}`}
              language="bash"
              title="Terminal"
            />
          </div>
        </section>

        <section id="basic-concepts">
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Basic Concepts
          </h2>
          <p className={`leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Understanding the fundamental concepts is crucial before diving into advanced topics. 
            Let's explore the core principles that form the foundation of {topic}.
          </p>
          
          {/* Warning Box */}
          <div className={`
            p-4 rounded-xl mb-6 flex items-start gap-3
            ${isDark 
              ? 'bg-amber-500/10 border border-amber-500/20' 
              : 'bg-amber-50 border border-amber-200'
            }
          `}>
            <AlertCircle className={`w-5 h-5 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            <div>
              <p className={`font-medium ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Important Note
              </p>
              <p className={`text-sm mt-1 ${isDark ? 'text-amber-300/80' : 'text-amber-700'}`}>
                Make sure to practice these concepts with hands-on exercises for better understanding.
              </p>
            </div>
          </div>
        </section>

        <section id="examples">
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Examples
          </h2>
          
          <div id="simple-example" className="mb-6">
            <h3 className={`text-xl font-medium mb-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Code Example
            </h3>
            <CodeBlock
              code={getCodeExample()}
              language={getLanguage()}
              title={`${topic} Example`}
            />
          </div>
        </section>

        <section id="best-practices">
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Best Practices
          </h2>
          <div className="grid gap-4">
            {[
              'Write clean, readable code with proper documentation',
              'Follow consistent naming conventions',
              'Use version control (Git) for all projects',
              'Test your code thoroughly before deployment',
              'Keep your dependencies updated'
            ].map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-xl flex items-center gap-3
                  ${isDark 
                    ? 'bg-slate-800/50 border border-slate-700/50' 
                    : 'bg-slate-50 border border-slate-200'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                  ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}
                `}>
                  {index + 1}
                </div>
                <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>{practice}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="references">
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            References
          </h2>
          <div className="flex flex-wrap gap-3">
            {['Official Documentation', 'GitHub Repository', 'Community Forum', 'Video Tutorials'].map((ref) => (
              <a
                key={ref}
                href="#"
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                  transition-colors duration-200
                  ${isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }
                `}
              >
                <ExternalLink className="w-4 h-4" />
                {ref}
              </a>
            ))}
          </div>
        </section>

        {/* AI Content Generator Section */}
        <section id="ai-generator" className="mt-12">
          <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            🤖 AI-Powered Learning
          </h2>
          <div className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>✨ AI Generated Content</div>
          <AIContentGenerator topic={topic} category={category} />
        </section>
      </div>
    </motion.article>
  );
}