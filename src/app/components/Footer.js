"use client";

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from document class on mount
  useEffect(() => {
    setMounted(true);
    const isDarkTheme = document.documentElement.classList.contains('dark');
    setIsDark(isDarkTheme);

    // Listen for theme changes from navbar
    const observer = new MutationObserver(() => {
      const isDarkTheme = document.documentElement.classList.contains('dark');
      setIsDark(isDarkTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className={`${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'} py-3 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="whitespace-nowrap">
            © {new Date().getFullYear()} Portfolio — Built with Next.js
          </span>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/tarannumtasfia"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900'
              }`}
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/tasfiatarannum"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900'
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:tasfiatarannum@yahoo.com"
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900'
              }`}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}