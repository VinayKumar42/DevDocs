'use client';

import React from 'react';
import { Heart, Users, Target, Zap, Award, Globe } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function About() {
  const { isDark } = useTheme();
  const values = [
    {
      icon: Heart,
      title: 'Passion for Learning',
      description: 'We believe in continuous learning and growth for developers at every stage.',
      color: 'red'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive community where developers help each other succeed.',
      color: 'blue'
    },
    {
      icon: Target,
      title: 'Quality Content',
      description: 'Delivering accurate, up-to-date, and practical documentation and tutorials.',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving to meet the changing needs of modern development.',
      color: 'yellow'
    }
  ];

  const stats = [
    { value: '500K+', label: 'Active Developers' },
    { value: '1000+', label: 'Tutorials' },
    { value: '50+', label: 'Technologies' },
    { value: '100+', label: 'Contributors' }
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & CEO', avatar: 'SJ' },
    { name: 'Michael Chen', role: 'CTO', avatar: 'MC' },
    { name: 'Emily Davis', role: 'Head of Content', avatar: 'ED' },
    { name: 'David Park', role: 'Lead Developer', avatar: 'DP' }
  ];

  const colorClasses = {
    red: 'from-red-500 to-rose-600',
    blue: 'from-blue-500 to-cyan-600',
    green: 'from-green-500 to-emerald-600',
    yellow: 'from-yellow-500 to-amber-600'
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-indigo-50'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-500/20 px-4 py-2 rounded-full mb-6">
            <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Empowering Developers Worldwide
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            About DevDocs
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make quality software development education accessible to everyone, everywhere.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 text-center shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 sm:p-12 shadow-lg border border-slate-200 dark:border-slate-700 mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Our Story
          </h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            <p>
              DevDocs was born from a simple observation: developers spend countless hours searching for quality documentation and learning resources scattered across the internet.
            </p>
            <p>
              In 2023, we set out to change that by creating a centralized platform where developers could find everything they need to learn, build, and grow their skills—all in one place.
            </p>
            <p>
              Today, we're proud to serve over 500,000 developers worldwide with comprehensive documentation, interactive tutorials, and a supportive community that believes in the power of shared knowledge.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Our Values
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[value.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Passionate developers and educators dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 text-center shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <Award className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for developer education.
          </p>
          <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            View Career Opportunities
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
