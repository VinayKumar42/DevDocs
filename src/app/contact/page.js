'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Contact() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Message sent! We\'ll get back to you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@devdocs.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'San Francisco, CA',
      description: 'Remote-first company'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: '24-48 hours',
      description: 'Average response time'
    }
  ];

  const topics = [
    'General Inquiry',
    'Technical Support',
    'Partnership',
    'Feedback',
    'Press & Media',
    'Other'
  ];

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-green-50'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 dark:bg-green-500/20 px-4 py-2 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              We'd Love to Hear From You
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Have a question or feedback? We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select a topic</option>
                    {topics.map((topic, index) => (
                      <option key={index} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-green-500/30"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">
                    {info.title}
                  </h3>
                  <p className="text-slate-900 dark:text-white font-semibold mb-1">
                    {info.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 sm:p-12 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'How quickly will I get a response?',
                a: 'We typically respond within 24-48 hours during business days.'
              },
              {
                q: 'Do you offer technical support?',
                a: 'Yes! Select "Technical Support" in the subject and describe your issue.'
              },
              {
                q: 'Can I schedule a call?',
                a: 'Absolutely! Mention your preferred time in the message.'
              },
              {
                q: 'Where can I report bugs?',
                a: 'Use our GitHub repository or select "Technical Support" in the form.'
              }
            ].map((faq, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Connect with thousands of developers on Discord, GitHub, and Twitter.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors">
              Join Discord
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              Follow on Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
