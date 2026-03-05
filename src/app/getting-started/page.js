'use client';

import React from 'react';
import { BookOpen, Rocket, Code, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function GettingStarted() {
  const { isDark } = useTheme();
  const steps = [
    {
      title: 'Installation',
      description: 'Install the necessary dependencies and set up your development environment.',
      icon: Code,
      command: 'npm install devdocs-sdk'
    },
    {
      title: 'Configuration',
      description: 'Configure your project settings and API keys.',
      icon: CheckCircle2
    },
    {
      title: 'First Project',
      description: 'Create your first project and start coding.',
      icon: Rocket
    }
  ];

  const quickLinks = [
    { title: 'Core Concepts', href: '/core-concepts' },
    { title: 'API Reference', href: '/api-reference' },
    { title: 'Examples', href: '/examples' }
  ];

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Getting Started
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Welcome to DevDocs! Let's get you up and running in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {step.description}
                </p>
                {step.command && (
                  <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-3 font-mono text-sm text-green-400">
                    {step.command}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Prerequisites */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 shadow-lg mb-12 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Prerequisites
          </h2>
          <ul className="space-y-3">
            {[
              'Node.js 16.x or higher',
              'npm or yarn package manager',
              'Basic knowledge of JavaScript/TypeScript',
              'A code editor (VS Code recommended)'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Next Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between text-white">
                  <span className="font-semibold">{link.title}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
