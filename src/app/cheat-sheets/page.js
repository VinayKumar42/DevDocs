'use client';

import React, { useState } from 'react';
import { FileText, Download, Star, Search, Filter } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function CheatSheets() {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const cheatSheets = [
    {
      title: 'JavaScript ES6+',
      description: 'Modern JavaScript features, syntax, and best practices.',
      category: 'JavaScript',
      downloads: '25.3k',
      pages: 4,
      color: 'yellow'
    },
    {
      title: 'React Hooks',
      description: 'Complete reference for all React hooks with examples.',
      category: 'React',
      downloads: '32.1k',
      pages: 3,
      color: 'blue'
    },
    {
      title: 'CSS Flexbox',
      description: 'Visual guide to flexbox properties and layouts.',
      category: 'CSS',
      downloads: '28.7k',
      pages: 2,
      color: 'purple'
    },
    {
      title: 'Git Commands',
      description: 'Essential Git commands for version control.',
      category: 'Git',
      downloads: '41.2k',
      pages: 3,
      color: 'orange'
    },
    {
      title: 'TypeScript Types',
      description: 'TypeScript type system and advanced types.',
      category: 'TypeScript',
      downloads: '19.8k',
      pages: 5,
      color: 'cyan'
    },
    {
      title: 'Node.js APIs',
      description: 'Core Node.js modules and common patterns.',
      category: 'Node.js',
      downloads: '22.4k',
      pages: 4,
      color: 'green'
    },
    {
      title: 'SQL Queries',
      description: 'Common SQL queries and database operations.',
      category: 'Database',
      downloads: '30.5k',
      pages: 4,
      color: 'pink'
    },
    {
      title: 'Docker Commands',
      description: 'Docker CLI commands and best practices.',
      category: 'DevOps',
      downloads: '18.9k',
      pages: 3,
      color: 'blue'
    },
    {
      title: 'Python Basics',
      description: 'Python syntax, data structures, and built-ins.',
      category: 'Python',
      downloads: '27.6k',
      pages: 5,
      color: 'green'
    }
  ];

  const colorClasses = {
    yellow: 'from-yellow-500 to-amber-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-violet-600',
    orange: 'from-orange-500 to-red-600',
    cyan: 'from-cyan-500 to-teal-600',
    green: 'from-green-500 to-emerald-600',
    pink: 'from-pink-500 to-rose-600'
  };

  const categories = ['All', 'JavaScript', 'React', 'CSS', 'Git', 'TypeScript', 'Node.js', 'Database', 'DevOps', 'Python'];

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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 mb-6">
            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Cheat Sheets
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Quick reference guides for developers. Download, print, and keep handy.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search cheat sheets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Download Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {[
            { label: 'Total Downloads', value: '500K+', icon: Download },
            { label: 'Cheat Sheets', value: '50+', icon: FileText },
            { label: 'Avg Rating', value: '4.9', icon: Star }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/50 rounded-xl p-6 text-center shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 mb-3">
                  <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cheat Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cheatSheets.map((sheet, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group hover:-translate-y-2"
            >
              {/* Header */}
              <div className={`h-32 bg-gradient-to-br ${colorClasses[sheet.color]} relative flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                  {sheet.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {sheet.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {sheet.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <span>{sheet.downloads} downloads</span>
                  <span>{sheet.pages} pages</span>
                </div>

                {/* Download Button */}
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Request a custom cheat sheet or suggest topics you'd like to see covered.
          </p>
          <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            Request Cheat Sheet
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
