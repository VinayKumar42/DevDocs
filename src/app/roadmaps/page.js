'use client';

import React from 'react';
import { Map, CheckCircle2, Circle, TrendingUp, Target, Rocket } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Roadmaps() {
  const { isDark } = useTheme();
  const roadmaps = [
    {
      title: 'Frontend Developer',
      description: 'Complete roadmap to becoming a professional frontend developer.',
      icon: Rocket,
      color: 'blue',
      steps: [
        { title: 'HTML & CSS Basics', completed: true },
        { title: 'JavaScript Fundamentals', completed: true },
        { title: 'React & Modern Frameworks', completed: false },
        { title: 'State Management', completed: false },
        { title: 'Testing & Deployment', completed: false }
      ],
      duration: '6-12 months',
      difficulty: 'Beginner to Advanced'
    },
    {
      title: 'Backend Developer',
      description: 'Master server-side development and database management.',
      icon: Target,
      color: 'green',
      steps: [
        { title: 'Programming Basics', completed: true },
        { title: 'Node.js & Express', completed: false },
        { title: 'Databases & ORMs', completed: false },
        { title: 'API Design', completed: false },
        { title: 'Security & Scalability', completed: false }
      ],
      duration: '8-14 months',
      difficulty: 'Intermediate'
    },
    {
      title: 'Full-Stack Developer',
      description: 'Become proficient in both frontend and backend development.',
      icon: TrendingUp,
      color: 'purple',
      steps: [
        { title: 'Frontend Fundamentals', completed: true },
        { title: 'Backend Basics', completed: false },
        { title: 'Database Integration', completed: false },
        { title: 'Full-Stack Frameworks', completed: false },
        { title: 'DevOps & Deployment', completed: false }
      ],
      duration: '12-18 months',
      difficulty: 'Advanced'
    },
    {
      title: 'DevOps Engineer',
      description: 'Learn infrastructure, automation, and deployment strategies.',
      icon: Map,
      color: 'orange',
      steps: [
        { title: 'Linux & Networking', completed: false },
        { title: 'CI/CD Pipelines', completed: false },
        { title: 'Docker & Containers', completed: false },
        { title: 'Kubernetes', completed: false },
        { title: 'Cloud Platforms', completed: false }
      ],
      duration: '10-16 months',
      difficulty: 'Advanced'
    }
  ];

  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500/20'
    },
    green: {
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-500/10 dark:bg-green-500/20',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500/20'
    },
    purple: {
      gradient: 'from-purple-500 to-violet-600',
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500/20'
    },
    orange: {
      gradient: 'from-orange-500 to-red-600',
      bg: 'bg-orange-500/10 dark:bg-orange-500/20',
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-500/20'
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-teal-50'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 mb-6">
            <Map className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Learning Roadmaps
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Structured learning paths to guide your developer journey from beginner to expert.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { label: 'Career Paths', value: '15+' },
            { label: 'Learning Steps', value: '200+' },
            { label: 'Active Learners', value: '100K+' },
            { label: 'Success Rate', value: '94%' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/50 rounded-xl p-6 text-center shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roadmaps.map((roadmap, index) => {
            const Icon = roadmap.icon;
            const colors = colorClasses[roadmap.color];
            
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                      {roadmap.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {roadmap.description}
                    </p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {roadmap.duration}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {roadmap.difficulty}
                  </span>
                </div>

                {/* Learning Steps */}
                <div className="space-y-4 mb-6">
                  {roadmap.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex items-center gap-3"
                    >
                      {step.completed ? (
                        <CheckCircle2 className={`w-6 h-6 ${colors.text} flex-shrink-0`} />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                      )}
                      <span className={`text-sm sm:text-base ${step.completed ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Progress</span>
                    <span className={`font-bold ${colors.text}`}>
                      {Math.round((roadmap.steps.filter(s => s.completed).length / roadmap.steps.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
                      style={{
                        width: `${(roadmap.steps.filter(s => s.completed).length / roadmap.steps.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all`}>
                  Start Learning Path
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Take our skill assessment quiz and get a personalized learning roadmap tailored to your goals.
          </p>
          <button className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            Take Assessment
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
