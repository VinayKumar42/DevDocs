'use client';

import React from 'react';
import { Play, BookOpen, Award, CheckCircle2, Star } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Tutorials() {
  const { isDark } = useTheme();
  const tutorials = [
    {
      title: 'React Fundamentals',
      description: 'Master the basics of React including components, props, state, and hooks.',
      level: 'Beginner',
      duration: '3 hours',
      lessons: 12,
      rating: 4.8,
      students: '15.2k',
      color: 'blue'
    },
    {
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
      level: 'Intermediate',
      duration: '5 hours',
      lessons: 18,
      rating: 4.9,
      students: '12.8k',
      color: 'green'
    },
    {
      title: 'Full-Stack Next.js',
      description: 'Create production-ready full-stack applications with Next.js 14 and beyond.',
      level: 'Advanced',
      duration: '8 hours',
      lessons: 24,
      rating: 4.7,
      students: '9.5k',
      color: 'purple'
    },
    {
      title: 'TypeScript Essentials',
      description: 'Learn TypeScript from scratch and write type-safe JavaScript applications.',
      level: 'Beginner',
      duration: '4 hours',
      lessons: 15,
      rating: 4.6,
      students: '11.3k',
      color: 'cyan'
    },
    {
      title: 'GraphQL API Development',
      description: 'Design and build modern GraphQL APIs with Apollo Server and Prisma.',
      level: 'Intermediate',
      duration: '6 hours',
      lessons: 20,
      rating: 4.8,
      students: '8.7k',
      color: 'pink'
    },
    {
      title: 'Docker & Kubernetes',
      description: 'Containerize applications and deploy them using Docker and Kubernetes.',
      level: 'Advanced',
      duration: '7 hours',
      lessons: 22,
      rating: 4.9,
      students: '10.2k',
      color: 'orange'
    }
  ];

  const levelColors = {
    Beginner: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    Advanced: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
  };

  const colorGradients = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-violet-600',
    cyan: 'from-cyan-500 to-teal-600',
    pink: 'from-pink-500 to-rose-600',
    orange: 'from-orange-500 to-red-600'
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 mb-6">
            <Play className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Video Tutorials
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Learn by doing with our comprehensive video tutorial series.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { label: 'Total Tutorials', value: '150+' },
            { label: 'Total Students', value: '50K+' },
            { label: 'Hours of Content', value: '500+' },
            { label: 'Average Rating', value: '4.8' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/50 rounded-xl p-6 text-center shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tutorials.map((tutorial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group hover:-translate-y-2"
            >
              {/* Thumbnail */}
              <div className={`relative h-48 bg-gradient-to-br ${colorGradients[tutorial.color]} flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${levelColors[tutorial.level]}`}>
                  {tutorial.level}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {tutorial.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {tutorial.description}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <BookOpen className="w-4 h-4" />
                    {tutorial.lessons} lessons
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Award className="w-4 h-4" />
                    {tutorial.duration}
                  </div>
                </div>

                {/* Rating & Students */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {tutorial.rating}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {tutorial.students} students
                  </span>
                </div>

                {/* CTA Button */}
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all">
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              New courses added weekly
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Get unlimited access to all tutorials and courses with our premium membership.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
