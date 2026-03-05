'use client';

import React from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Users, Rocket, Heart, TrendingUp } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Careers() {
  const { isDark } = useTheme();
  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Industry-leading compensation and equity packages.'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work when you\'re most productive with flexible schedules.'
    },
    {
      icon: MapPin,
      title: 'Remote First',
      description: 'Work from anywhere in the world.'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Continuous learning and development opportunities.'
    },
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work with passionate, talented people who care.'
    }
  ];

  const openings = [
    {
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build beautiful, performant user interfaces with React and Next.js.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Design system experience']
    },
    {
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design and build scalable APIs and backend services.',
      requirements: ['Node.js expertise', 'Database design', 'Microservices architecture']
    },
    {
      title: 'Technical Writer',
      department: 'Content',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create comprehensive documentation and tutorials for developers.',
      requirements: ['Strong writing skills', 'Programming background', 'Documentation experience']
    },
    {
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full-time',
      description: 'Manage infrastructure, CI/CD, and deployment automation.',
      requirements: ['Kubernetes experience', 'Cloud platforms (AWS/GCP)', 'Infrastructure as Code']
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive user experiences for our developer platform.',
      requirements: ['UI/UX design portfolio', 'Figma expertise', 'User research experience']
    },
    {
      title: 'Content Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Drive content strategy and developer community engagement.',
      requirements: ['Content strategy experience', 'Developer audience knowledge', 'Analytics skills']
    }
  ];

  const typeColors = {
    'Full-time': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    'Part-time': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'Contract': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
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
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 px-4 py-2 rounded-full mb-6">
            <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              We're Hiring!
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Help us build the future of developer education. Work with talented people on meaningful problems.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Why Join DevDocs?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Open Positions
          </h2>
          <div className="space-y-6">
            {openings.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {job.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {job.department}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${typeColors[job.type]}`}>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {job.description}
                </p>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, reqIndex) => (
                      <li
                        key={reqIndex}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and let us know how you'd like to contribute.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            Send General Application
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
