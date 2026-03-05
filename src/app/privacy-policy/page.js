'use client';

import React from 'react';
import { Shield, Lock, Eye, Cookie, FileText, AlertCircle } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function PrivacyPolicy() {
  const { isDark } = useTheme();
  const lastUpdated = 'February 21, 2026';

  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you create an account, we collect your name, email address, and password. You may optionally provide additional information such as your profile picture and bio.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about your interactions with our platform, including pages visited, features used, and time spent on the platform.'
        },
        {
          subtitle: 'Device Information',
          text: 'We collect information about the device and browser you use to access DevDocs, including IP address, browser type, and operating system.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'We use your information to provide, maintain, and improve our services, including personalized learning recommendations and progress tracking.'
        },
        {
          subtitle: 'Communication',
          text: 'We may send you service-related emails, updates, newsletters, and promotional materials. You can opt out of marketing communications at any time.'
        },
        {
          subtitle: 'Analytics',
          text: 'We analyze usage patterns to understand how our platform is used and to improve user experience and content quality.'
        }
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols.'
        },
        {
          subtitle: 'Storage',
          text: 'Your data is stored on secure servers with restricted access. We implement multiple layers of security to protect your information.'
        },
        {
          subtitle: 'Access Control',
          text: 'Only authorized personnel have access to user data, and all access is logged and monitored.'
        }
      ]
    },
    {
      icon: Cookie,
      title: 'Cookies and Tracking',
      content: [
        {
          subtitle: 'Essential Cookies',
          text: 'We use cookies necessary for the platform to function, such as authentication and session management.'
        },
        {
          subtitle: 'Analytics Cookies',
          text: 'We use analytics cookies to understand how users interact with our platform. You can control these in your browser settings.'
        },
        {
          subtitle: 'Third-Party Services',
          text: 'We may use third-party services like Google Analytics. These services have their own privacy policies.'
        }
      ]
    }
  ];

  const rights = [
    'Access your personal data',
    'Correct inaccurate data',
    'Request deletion of your data',
    'Export your data',
    'Opt out of marketing communications',
    'Withdraw consent at any time'
  ];

  return (
    <>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#0B0F19] via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-500/10 dark:bg-slate-500/20 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Last Updated: {lastUpdated}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                Introduction
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                DevDocs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-500/10 dark:bg-slate-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                        {item.subtitle}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Your Rights */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Your Rights
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Under data protection laws, you have rights including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rights.map((right, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"
              >
                <div className="w-2 h-2 rounded-full bg-slate-600 dark:bg-slate-400 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">
                  {right}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Third-Party Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            We may use third-party service providers to help us operate our platform and administer activities. These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Third-party services we use include:
          </p>
          <ul className="mt-4 space-y-2">
            {['Google Analytics for usage analytics', 'AWS for hosting and storage', 'SendGrid for email communications', 'Stripe for payment processing'].map((service, index) => (
              <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-slate-400" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Children's Privacy
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete it.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Changes to This Privacy Policy
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or our data practices, please contact us.
          </p>
          <button className="bg-white text-slate-900 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            Contact Privacy Team
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
