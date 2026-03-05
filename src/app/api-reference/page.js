'use client';

import React, { useState } from 'react';
import { Code, BookOpen, Terminal, FileCode, Search } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function APIReference() {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const apiCategories = [
    {
      title: 'Authentication',
      icon: Terminal,
      endpoints: [
        { method: 'POST', path: '/auth/login', description: 'User login endpoint' },
        { method: 'POST', path: '/auth/register', description: 'User registration' },
        { method: 'POST', path: '/auth/logout', description: 'User logout' }
      ]
    },
    {
      title: 'User Management',
      icon: FileCode,
      endpoints: [
        { method: 'GET', path: '/users/:id', description: 'Get user by ID' },
        { method: 'PUT', path: '/users/:id', description: 'Update user details' },
        { method: 'DELETE', path: '/users/:id', description: 'Delete user account' }
      ]
    },
    {
      title: 'Data Operations',
      icon: Code,
      endpoints: [
        { method: 'GET', path: '/data', description: 'Fetch all data' },
        { method: 'POST', path: '/data', description: 'Create new data entry' },
        { method: 'PATCH', path: '/data/:id', description: 'Update data entry' }
      ]
    }
  ];

  const methodColors = {
    GET: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    POST: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    PUT: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    PATCH: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    DELETE: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 mb-6">
            <BookOpen className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            API Reference
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Complete API documentation with endpoints, parameters, and examples.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search endpoints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* API Categories */}
        <div className="space-y-8">
          {apiCategories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={catIndex}
                className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.endpoints.map((endpoint, endIndex) => (
                    <div
                      key={endIndex}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-bold border ${methodColors[endpoint.method]} w-fit`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="flex-1 text-sm sm:text-base font-mono text-slate-900 dark:text-white">
                        {endpoint.path}
                      </code>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {endpoint.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Start */}
        <div className="mt-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 sm:p-12 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Quick Start
          </h2>
          <p className="text-white/90 mb-6">
            Get started with our API in minutes. Include your API key in the Authorization header.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
            <code>
              curl -H "Authorization: Bearer YOUR_API_KEY" \<br />
              &nbsp;&nbsp;https://api.devdocs.com/v1/users
            </code>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
