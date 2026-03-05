'use client';

import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, FileText, Users, Menu } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { isDark } = useTheme();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Documentation', href: '/getting-started', icon: BookOpen },
    { name: 'Resources', href: '/blog', icon: FileText },
    { name: 'About', href: '/about', icon: Users }
  ];

  return (
    <nav className={`
      sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300
      ${isDark 
        ? 'bg-[#0B0F19]/90 border-slate-800' 
        : 'bg-white/90 border-slate-200'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.png" 
              alt="DevDocs Logo" 
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span className={`font-bold text-xl hidden sm:inline ${isDark ? 'text-white' : 'text-slate-900'}`}>
              DevDocs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    transition-colors
                    ${isDark 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <div className="md:hidden relative group">
              <button
                className={`
                  p-2 rounded-xl transition-colors
                  ${isDark 
                    ? 'hover:bg-slate-800 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-600'
                  }
                `}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Mobile Dropdown Menu */}
              <div className={`
                absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg py-2
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200 border
                ${isDark 
                  ? 'bg-slate-800 border-slate-700' 
                  : 'bg-white border-slate-200'
                }
              `}>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`
                        flex items-center gap-3 px-4 py-2 text-sm font-medium
                        transition-colors
                        ${isDark 
                          ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
