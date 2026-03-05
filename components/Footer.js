import React from 'react';
import Link from 'next/link';
import { BookOpen, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const footerLinks = {
  'Documentation': [
    { name: 'Getting Started', href: '/getting-started' },
    { name: 'Core Concepts', href: '/core-concepts' },
    { name: 'API Reference', href: '/api-reference' },
    { name: 'Examples', href: '/examples' }
  ],
  'Resources': [
    { name: 'Blog', href: '/blog' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Cheat Sheets', href: '/cheat-sheets' },
    { name: 'Roadmaps', href: '/roadmaps' }
  ],
  'Company': [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' }
  ]
};

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`mt-16 sm:mt-20 border-t transition-colors duration-300 ${isDark ? 'border-slate-800 bg-[#0B0F19]' : 'border-slate-200 bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1 xs:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo.png" 
                alt="DevDocs Logo" 
                className="w-10 h-10 rounded-xl object-contain"
              />
              <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>DevDocs</span>
            </div>
            <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Your complete guide to software engineering. Learn, build, and grow with comprehensive documentation.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: 'https://github.com/VinayKumar42', label: 'GitHub' },
                { icon: Twitter, href: 'https://x.com/vinay9149', label: 'Twitter' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/vinaykumar42/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:vinayboss9669@gmail.com', label: 'Email' }
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  title={label}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 sm:pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-sm text-center sm:text-left ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              © {new Date().getFullYear()} DevDocs. All rights reserved.
            </p>
            <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by developers, for developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}