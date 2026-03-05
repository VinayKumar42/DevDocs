'use client';

import React from 'react';
import { Calendar, Clock, User, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Blog() {
  const { isDark } = useTheme();
  const featuredPost = {
    title: 'The Future of Web Development in 2026',
    excerpt: 'Explore the latest trends, technologies, and best practices shaping the future of web development.',
    author: 'Sarah Johnson',
    date: 'Feb 18, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    category: 'Trends'
  };

  const blogPosts = [
    {
      title: 'Mastering React Server Components',
      excerpt: 'A comprehensive guide to understanding and implementing React Server Components in your applications.',
      author: 'Mike Chen',
      date: 'Feb 15, 2026',
      readTime: '6 min read',
      category: 'React'
    },
    {
      title: 'Understanding Microservices Architecture',
      excerpt: 'Learn how to design, build, and deploy scalable microservices-based applications.',
      author: 'Emily Davis',
      date: 'Feb 12, 2026',
      readTime: '10 min read',
      category: 'Architecture'
    },
    {
      title: 'Building Secure APIs with Node.js',
      excerpt: 'Best practices for creating secure, production-ready APIs using Node.js and Express.',
      author: 'Alex Thompson',
      date: 'Feb 10, 2026',
      readTime: '7 min read',
      category: 'Security'
    },
    {
      title: 'CSS Grid vs Flexbox: When to Use Each',
      excerpt: 'A practical guide to choosing between CSS Grid and Flexbox for your layout needs.',
      author: 'Jessica Lee',
      date: 'Feb 8, 2026',
      readTime: '5 min read',
      category: 'CSS'
    },
    {
      title: 'Introduction to GraphQL',
      excerpt: 'Get started with GraphQL and learn why it\'s becoming the preferred choice for modern APIs.',
      author: 'David Park',
      date: 'Feb 5, 2026',
      readTime: '9 min read',
      category: 'GraphQL'
    },
    {
      title: 'TypeScript Tips and Tricks',
      excerpt: 'Advanced TypeScript techniques to write better, more maintainable code.',
      author: 'Sarah Johnson',
      date: 'Feb 3, 2026',
      readTime: '6 min read',
      category: 'TypeScript'
    }
  ];

  const categories = ['All', 'React', 'Node.js', 'Architecture', 'Security', 'CSS', 'TypeScript'];

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-orange-50'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 dark:bg-orange-500/20 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              Latest Articles
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Developer Blog
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Insights, tutorials, and best practices from industry experts.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-full transition-all ${
                index === 0
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16 bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 hover:shadow-3xl transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full bg-gradient-to-br from-orange-500 to-red-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <div className="p-8 sm:p-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 mb-4">
                {featuredPost.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                {featuredPost.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 mb-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>
              <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors group">
                Read Article
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group hover:-translate-y-2"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 mb-4">
                {post.category}
              </span>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Get the latest articles, tutorials, and updates delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
