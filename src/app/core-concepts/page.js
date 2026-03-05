'use client';

import React from 'react';
import { Layers, Zap, Shield, Database, Cloud, GitBranch } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function CoreConcepts() {
  const { isDark } = useTheme();
  const concepts = [
    {
      title: 'Architecture',
      description: 'Understanding the fundamental architecture patterns and design principles that power modern applications.',
      icon: Layers,
      color: 'blue',
      topics: ['MVC Pattern', 'Microservices', 'Event-Driven Architecture']
    },
    {
      title: 'Performance',
      description: 'Learn optimization techniques to build fast, efficient applications that scale.',
      icon: Zap,
      color: 'yellow',
      topics: ['Caching Strategies', 'Load Balancing', 'CDN Integration']
    },
    {
      title: 'Security',
      description: 'Best practices for securing your applications and protecting user data.',
      icon: Shield,
      color: 'green',
      topics: ['Authentication', 'Authorization', 'Data Encryption']
    },
    {
      title: 'Data Management',
      description: 'Effective strategies for storing, retrieving, and managing application data.',
      icon: Database,
      color: 'purple',
      topics: ['Database Design', 'Query Optimization', 'Data Migration']
    },
    {
      title: 'Cloud Integration',
      description: 'Deploy and manage applications in cloud environments efficiently.',
      icon: Cloud,
      color: 'cyan',
      topics: ['Infrastructure as Code', 'Serverless', 'Container Orchestration']
    },
    {
      title: 'Version Control',
      description: 'Master version control systems and collaborative development workflows.',
      icon: GitBranch,
      color: 'orange',
      topics: ['Git Workflows', 'Branching Strategies', 'Code Review']
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
    yellow: 'from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500',
    green: 'from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500',
    purple: 'from-purple-500 to-violet-600 dark:from-purple-400 dark:to-violet-500',
    cyan: 'from-cyan-500 to-teal-600 dark:from-cyan-400 dark:to-teal-500',
    orange: 'from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500'
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-purple-50'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Core Concepts
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Master the essential concepts that form the foundation of modern software development.
          </p>
        </div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {concepts.map((concept, index) => {
            const Icon = concept.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[concept.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                  {concept.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {concept.description}
                </p>
                <div className="space-y-2">
                  {concept.topics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colorClasses[concept.color]}`} />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 sm:p-12 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to dive deeper?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Explore our comprehensive tutorials and hands-on examples to master these concepts.
          </p>
          <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            View Tutorials
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
