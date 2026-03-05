"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, 
  X, 
  Code2, 
  Database, 
  Globe, 
  Server, 
  Cpu, 
  Network,
  Layers,
  Briefcase,
  BookOpen,
  Zap,
  Star,
  GitBranch,
  Users,
  MessageSquare,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../../components/ThemeProvider';
import ThemeToggle from '../../components/ThemeToggle';
import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import DocCard from '../../components/DocCard';
import DocContent from '../../components/DocContent';
import TableOfContents from '../../components/TableOfContents';
import ForumSection from '../../components/forum/ForumSection';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';
import LearningDashboard from '../../components/learning/LearningDashboard';

const docCategories = [
  {
    title: 'Programming Languages',
    description: 'Master C, C++, Java, Python, JavaScript, and more',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Arrays, trees, graphs, sorting, and searching',
    icon: Layers,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Web Development',
    description: 'HTML, CSS, React, Next.js, and modern frameworks',
    icon: Globe,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Backend Development',
    description: 'Node.js, APIs, databases, and server architecture',
    icon: Server,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Databases',
    description: 'MySQL, MongoDB, PostgreSQL, and Redis',
    icon: Database,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    title: 'System Design',
    description: 'Scalability, load balancing, and microservices',
    icon: Cpu,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Computer Networks',
    description: 'OSI model, TCP/IP, HTTP, and security',
    icon: Network,
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    title: 'Interview Prep',
    description: 'Coding patterns, system design, and tips',
    icon: Briefcase,
    gradient: 'from-rose-500 to-pink-500'
  }
];

function HomeContent() {
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Ensure sidebar is open on large screens only on the client to avoid hydration mismatch
  React.useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showForum, setShowForum] = useState(false);
  const [showLearning, setShowLearning] = useState(false);

  const handleSelectTopic = (category, topic) => {
    setSelectedTopic({ category, topic });
    setShowForum(false);
    setShowLearning(false);
    // Always close sidebar when viewing a topic (both desktop and mobile)
    setSidebarOpen(false);
  };

  const handleBackToHome = () => {
    setSelectedTopic(null);
    setShowForum(false);
    setShowLearning(false);
    // On desktop (lg screens), open sidebar when going to Home
    // On mobile, keep it closed
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  };

  const handleSearchResult = (result) => {
    setSelectedTopic({ category: result.category, topic: result.title });
    setShowForum(false);
    setShowLearning(false);
    // Close sidebar when viewing a topic from search (both desktop and mobile)
    setSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0B0F19]' : 'bg-[#F9FAFB]'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`
          absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl
          ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'}
        `} />
        <div className={`
          absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl
          ${isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'}
        `} />
      </div>

      {/* Sidebar: always open on large screens, toggled on mobile */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onSelectTopic={handleSelectTopic}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${selectedTopic || showForum || showLearning ? 'lg:ml-0' : 'lg:ml-72'}`}>
        {/* Header */}
        <header className={`
          fixed pt-4 pb-4 top-0 ${selectedTopic || showForum || showLearning ? 'left-0' : 'lg:left-72'} right-0 z-30 backdrop-blur-xl transition-all duration-300
          ${isDark 
            ? 'bg-[#0B0F19]/80 border-b border-slate-800' 
            : 'bg-white/80 border-b border-slate-200'
          }
        `}>
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-6 h-14 gap-2">
            <div className="flex items-center min-w-0 flex-1 gap-2 sm:gap-4">
              <button 
                onClick={() => {
                  setSelectedTopic(null);
                  setShowForum(false);
                  setShowLearning(false);
                  // Open sidebar on desktop when clicking Home logo
                  if (window.innerWidth >= 1024) {
                    setSidebarOpen(true);
                  }
                }}
                className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
              >
                <img 
                  src="/logo.png" 
                  alt="DevDocs Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain"
                />
                <span className="font-bold text-base sm:text-lg whitespace-nowrap text-white hidden xs:inline">DevDocs</span>
              </button>
              <button
                onClick={() => setSidebarOpen(true)}
                className={`
                  lg:hidden p-2 rounded-xl transition-colors flex-shrink-0
                  ${isDark 
                    ? 'hover:bg-slate-800 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-600'
                  }
                `}
              >
                <Menu className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>
              <div className="hidden md:block w-full max-w-md">
                <SearchBar onSelectResult={handleSearchResult} />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <button
                onClick={() => {
                  setShowLearning(true);
                  setShowForum(false);
                  setSelectedTopic(null);
                  // Close sidebar on desktop when viewing Learning Paths
                  if (window.innerWidth >= 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`
                  hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium
                  transition-colors whitespace-nowrap
                  ${showLearning
                    ? 'bg-purple-500/20 text-purple-400'
                    : isDark 
                      ? 'hover:bg-slate-800 text-slate-400' 
                      : 'hover:bg-slate-100 text-slate-600'
                  }
                `}
                title="Learning Paths"
              >
                <GraduationCap className="w-4 h-4" />
                <span className="hidden lg:inline">Learning Paths</span>
              </button>
              <button
                onClick={() => {
                  setShowForum(true);
                  setShowLearning(false);
                  setSelectedTopic(null);
                  // Close sidebar on desktop when viewing Q&A Forum
                  if (window.innerWidth >= 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`
                  hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium
                  transition-colors whitespace-nowrap
                  ${showForum
                    ? 'bg-blue-500/20 text-blue-400'
                    : isDark 
                      ? 'hover:bg-slate-800 text-slate-400' 
                      : 'hover:bg-slate-100 text-slate-600'
                  }
                `}
                title="Q&A Forum"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden lg:inline">Q&A Forum</span>
              </button>
              <a
                href="https://github.com/VinayKumar42"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium
                  transition-colors whitespace-nowrap
                  ${isDark 
                    ? 'hover:bg-slate-800 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-600'
                  }
                `}
                title="GitHub"
              >
                <GitBranch className="w-4 h-4" />
                <span className="hidden lg:inline">GitHub</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden px-4 pb-3 pt-2">
            <SearchBar onSelectResult={handleSearchResult} />
          </div>
          
          {/* Mobile Navigation Menu */}
          <div className="md:hidden px-4 pb-3 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => {
                setShowLearning(true);
                setShowForum(false);
                setSelectedTopic(null);
                setSidebarOpen(false);
              }}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0
                ${showLearning
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : isDark 
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              <GraduationCap className="w-7 h-7" />
              <span>Learning Paths</span>
            </button>
            <button
              onClick={() => {
                setShowForum(true);
                setShowLearning(false);
                setSelectedTopic(null);
                setSidebarOpen(false);
              }}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0
                ${showForum
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : isDark 
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              <MessageSquare className="w-7 h-7" />
              <span>Q&A Forum</span>
            </button>
            <a
              href="https://github.com/VinayKumar42"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0
                ${isDark 
                  ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              <GitBranch className="w-7 h-7" />
              <span>GitHub</span>
            </a>
          </div>
        </header>

        {/* Content Area */}
        <main className="pt-[200px] md:pt-[100px] px-4 lg:px-8 pb-8 min-h-screen">
          <AnimatePresence mode="wait">
            {showLearning ? (
              <motion.div
                key="learning"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <LearningDashboard onBack={handleBackToHome} />
              </motion.div>
            ) : showForum ? (
              <motion.div
                key="forum"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={handleBackToHome}
                  className={`
                    mb-6 flex items-center gap-2 text-sm font-medium
                    ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}
                  `}
                >
                  ← Back to Home
                </button>
                <ForumSection />
              </motion.div>
            ) : selectedTopic ? (
              <motion.div
                key="doc-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="max-w-7xl mx-auto">
                  <button
                    onClick={handleBackToHome}
                    className={`
                      mb-6 flex items-center gap-2 text-sm font-medium
                      ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}
                    `}
                  >
                    ← Back to Home
                  </button>
                  <div className="flex gap-8">
                    <div className="flex-1 min-w-0">
                      <DocContent 
                        category={selectedTopic.category} 
                        topic={selectedTopic.topic} 
                      />
                    </div>
                    <div className="hidden xl:block w-64 flex-shrink-0">
                      <TableOfContents />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12 sm:mb-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4 sm:mb-6"
                  >
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                    <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      Your Complete Developer Resource
                    </span>
                  </motion.div>

                  <h1 className={`
                    text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4
                    ${isDark ? 'text-white' : 'text-slate-900'}
                  `}>
                    Master Software
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {' '}Engineering
                    </span>
                  </h1>

                  <p className={`
                    text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4
                    ${isDark ? 'text-slate-400' : 'text-slate-600'}
                  `}>
                    Comprehensive documentation for programming languages, data structures, 
                    system design, and everything you need to excel as a software engineer.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8 sm:mt-12 px-4">
                    {[
                      { icon: BookOpen, label: 'Documentation', value: '500+' },
                      { icon: Code2, label: 'Code Examples', value: '1000+' },
                      { icon: Users, label: 'Developers', value: '50K+' },
                      { icon: Star, label: 'GitHub Stars', value: '12K' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <stat.icon className={`
                          w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2
                          ${isDark ? 'text-slate-500' : 'text-slate-400'}
                        `} />
                        <p className={`
                          text-xl sm:text-2xl font-bold
                          ${isDark ? 'text-white' : 'text-slate-900'}
                        `}>
                          {stat.value}
                        </p>
                        <p className={`
                          text-xs sm:text-sm
                          ${isDark ? 'text-slate-500' : 'text-slate-500'}
                        `}>
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Documentation Cards */}
                <section>
                  <h2 className={`
                    text-xl sm:text-2xl font-bold mb-6 sm:mb-8
                    ${isDark ? 'text-white' : 'text-slate-900'}
                  `}>
                    Explore Documentation
                  </h2>

                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {docCategories.map((doc, index) => (
                      <DocCard
                        key={doc.title}
                        title={doc.title}
                        description={doc.description}
                        icon={doc.icon}
                        gradient={doc.gradient}
                        delay={index * 0.05}
                        onClick={() => handleSelectTopic(doc.title, 'Introduction')}
                      />
                    ))}
                  </div>
                </section>

                {/* Quick Links */}
                <section className="mt-12 sm:mt-16">
                  <h2 className={`
                    text-xl sm:text-2xl font-bold mb-6 sm:mb-8
                    ${isDark ? 'text-white' : 'text-slate-900'}
                  `}>
                    Popular Topics
                  </h2>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[
                      'JavaScript', 'Python', 'React', 'Node.js', 'SQL',
                      'Binary Search', 'Dynamic Programming', 'REST APIs',
                      'System Design', 'Git', 'Docker', 'Microservices'
                    ].map((topic, index) => (
                      <motion.button
                        key={topic}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectTopic('Quick Links', topic)}
                        className={`
                          px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium
                          transition-colors duration-200
                          ${isDark 
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm'
                          }
                        `}
                      >
                        {topic}
                      </motion.button>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default HomeContent;