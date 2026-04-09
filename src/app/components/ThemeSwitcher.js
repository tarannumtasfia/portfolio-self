'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitcher() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`p-2 rounded-lg transition-all duration-200 ${
        isDark
          ? 'bg-gray-800 text-amber-400 hover:bg-gray-700'
          : 'bg-gray-200 text-amber-500 hover:bg-gray-300'
      }`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
