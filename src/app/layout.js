'use client';

import React from 'react';
import './globals.css';
import ThemeProvider from '../../components/ThemeProvider';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        {/* <link rel="shortcut icon" type="image/png" href="/logo.png" /> */}
        {/* <link rel="apple-touch-icon" href="/logo.png" /> */}
        <title>DevDocs - Your Complete Developer Resource</title>
        <meta name="description" content="Comprehensive documentation for software engineering including programming languages, data structures, system design, and more." />
      </head>
      <body className="min-h-screen">
        <style>{`
          :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
          }
          
          .dark {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #475569;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Selection color */
          ::selection {
            background: rgba(59, 130, 246, 0.3);
          }
        `}</style>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}