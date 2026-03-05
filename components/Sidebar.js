import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Code2, 
  Database, 
  Globe, 
  Server, 
  Cpu, 
  Network, 
  BookOpen,
  FileCode,
  Rocket,
  Map,
  Briefcase,
  Terminal,
  Layers,
  X,
  Shield,
  Cloud,
  TestTube,
  Bot,
  Box
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const menuItems = [
  {
    title: 'Getting Started',
    icon: Rocket,
    items: ['Introduction', 'Installation', 'Quick Start']
  },
  {
    title: 'Programming Languages',
    icon: Code2,
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Language Internals', 'Memory Management']
  },
  {
    title: 'Data Structures & Algorithms',
    icon: Layers,
    items: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Searching', 'Dynamic Programming', 'Time Complexity', 'Space Complexity']
  },
  {
    title: 'Web Development',
    icon: Globe,
    items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Next.js', 'Vue.js', 'State Management', 'Responsive Design', 'Accessibility (a11y)']
  },
  {
    title: 'Backend Development',
    icon: Server,
    items: ['Node.js', 'Express', 'Fastify', 'REST APIs', 'GraphQL', 'Authentication', 'Authorization', 'WebSockets', 'Server-side Rendering']
  },
  {
    title: 'Databases',
    icon: Database,
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQL Basics', 'Indexing', 'Transactions', 'Query Optimization', 'ORM/ODM']
  },
  {
    title: 'System Design',
    icon: Cpu,
    items: ['Fundamentals', 'Scalability', 'Load Balancing', 'Caching', 'Microservices', 'Monolith vs Microservices', 'Databases at Scale']
  },
  {
    title: 'Operating Systems',
    icon: Terminal,
    items: ['Process Management', 'Memory Management', 'File Systems', 'Scheduling', 'Concurrency', 'Deadlocks']
  },
  {
    title: 'Computer Networks',
    icon: Network,
    items: ['OSI Model', 'TCP/IP', 'HTTP/HTTPS', 'DNS', 'Network Security', 'Protocols']
  },
  {
    title: 'OOP Concepts',
    icon: Box,
    items: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'SOLID Principles', 'Design Patterns']
  },
  {
    title: 'DevOps & Cloud',
    icon: Cloud,
    items: ['Git & GitHub', 'CI/CD', 'Docker', 'Kubernetes Basics', 'AWS', 'GCP', 'Azure', 'Linux & Bash']
  },
  {
    title: 'Security',
    icon: Shield,
    items: ['Web Security Basics', 'JWT & OAuth', 'HTTPS', 'OWASP Top 10', 'Data Encryption', 'Authentication Security']
  },
  {
    title: 'Testing & Quality',
    icon: TestTube,
    items: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Debugging', 'Logging & Monitoring', 'Test Frameworks']
  },
  {
    title: 'AI & Modern Tech',
    icon: Bot,
    items: ['AI Basics', 'API Integration', 'Prompt Engineering', 'Automation Tools', 'Machine Learning Intro']
  },
  {
    title: 'DBMS',
    icon: Database,
    items: ['DBMS Fundamentals', 'ER Diagrams', 'Normalization', 'ACID Properties', 'Relational Algebra']
  },
  {
    title: 'Interview Prep',
    icon: Briefcase,
    items: ['Coding Patterns', 'System Design', 'Behavioral', 'Tips & Tricks', 'Common Problems']
  },
  {
    title: 'Cheat Sheets',
    icon: FileCode,
    items: ['Git Commands', 'Linux Commands', 'SQL Queries', 'Regex', 'Docker Commands', 'Keyboard Shortcuts']
  },
  {
    title: 'Roadmaps',
    icon: Map,
    items: ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Data Science', 'Mobile Development']
  }
];

export default function Sidebar({ isOpen, onClose, onSelectTopic }) {
  const { isDark } = useTheme();
  const [expandedItems, setExpandedItems] = useState(['Getting Started']);

  const toggleExpand = (title) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed lg:fixed top-0 left-0 h-screen z-50 lg:z-40
          w-72 flex flex-col
          ${isDark 
            ? 'bg-[#0B0F19] border-r border-slate-800' 
            : 'bg-white border-r border-slate-200'
          }
        `}
        initial={{ x: -288 }}
        animate={{ x: isOpen ? 0 : -288 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{ x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : undefined }}
      >
        {/* Logo */}
        <div className={`
          flex-shrink-0 p-4 border-b
          ${isDark ? 'border-slate-800 bg-[#0B0F19]' : 'border-slate-200 bg-white'}
        `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="DevDocs Logo" 
                  className="w-14 h-14 rounded-xl object-contain"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0B0F19]" />
              </div>
              <div>
                <h1 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  DevDocs
                </h1>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  v2.0.0
                </p>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className={`
                lg:hidden p-2 rounded-xl transition-all duration-200 hover:scale-110
                ${isDark 
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-white' 
                  : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                }
              `}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation - Scrollable container */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.title);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <button
                  onClick={() => toggleExpand(item.title)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-xl
                    transition-all duration-200 group
                    ${isDark 
                      ? 'hover:bg-slate-800/50 text-slate-300 hover:text-white' 
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                    }
                    ${isExpanded && (isDark ? 'bg-slate-800/30' : 'bg-slate-100/50')}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      p-2 rounded-lg transition-all duration-200
                      ${isDark 
                        ? 'bg-slate-800 group-hover:bg-blue-500/20' 
                        : 'bg-slate-100 group-hover:bg-blue-100'
                      }
                    `}>
                      <Icon className={`
                        w-6 h-6 transition-colors
                        ${isDark 
                          ? 'text-slate-400 group-hover:text-blue-400' 
                          : 'text-slate-500 group-hover:text-blue-500'
                        }
                      `} />
                    </div>
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 mt-1 space-y-1 border-l-2 border-slate-700/50 pl-4">
                        {item.items.map((subItem) => (
                          <button
                            key={subItem}
                            onClick={() => {
                              onSelectTopic(item.title, subItem);
                              onClose();
                            }}
                            className={`
                              w-full text-left px-3 py-2 rounded-lg text-sm
                              transition-all duration-200
                              ${isDark 
                                ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' 
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                              }
                            `}
                          >
                            {subItem}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}