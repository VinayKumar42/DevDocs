import React from 'react';
import { useTheme } from '../ThemeProvider';

// Question card skeleton
export function QuestionCardSkeleton() {
  const { isDark } = useTheme();
  
  return (
    <div
      className={`
        p-5 rounded-xl border animate-pulse
        ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}
      `}
    >
      <div className="flex gap-4">
        <div className="hidden sm:flex flex-col items-center gap-2 min-w-[60px]">
          <div className={`h-8 w-10 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <div className={`h-4 w-8 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <div className={`h-8 w-10 rounded mt-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <div className={`h-4 w-10 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between gap-2">
            <div className={`h-6 w-3/4 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <div className={`h-6 w-16 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          </div>
          <div className="space-y-2">
            <div className={`h-4 w-full rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          </div>
          <div className="flex gap-2">
            <div className={`h-6 w-24 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <div className={`h-6 w-20 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          </div>
          <div className="flex gap-4">
            <div className={`h-4 w-24 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <div className={`h-4 w-20 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Learning path card skeleton
export function LearningPathSkeleton() {
  const { isDark } = useTheme();
  
  return (
    <div
      className={`
        p-4 rounded-xl border animate-pulse
        ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}
      `}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
        <div className="flex-1 space-y-2">
          <div className={`h-5 w-3/4 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <div className={`h-4 w-1/2 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className={`h-4 w-full rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
        <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
      </div>
      <div className={`h-2 w-full rounded-full mb-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
      <div className="flex justify-between">
        <div className={`h-4 w-20 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
        <div className={`h-4 w-16 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
      </div>
    </div>
  );
}

// Code skeleton for AI content
export function CodeSkeleton({ lines = 8 }) {
  const { isDark } = useTheme();
  
  return (
    <div
      className={`
        p-4 rounded-xl font-mono text-sm animate-pulse
        ${isDark ? 'bg-slate-900' : 'bg-slate-100'}
      `}
    >
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-4 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
            style={{ width: `${Math.random() * 40 + 40}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Text skeleton
export function TextSkeleton({ lines = 3, className = '' }) {
  const { isDark } = useTheme();
  
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'} ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

export default {
  QuestionCardSkeleton,
  LearningPathSkeleton,
  CodeSkeleton,
  TextSkeleton
};
