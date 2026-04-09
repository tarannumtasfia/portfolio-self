"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Settings, Sun, Moon, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const settingsRef = useRef(null);

  // Toggle dark class on <html> AND save to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Close settings panel on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 h-16 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Nav Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-indigo-600 font-medium text-black dark:text-white transition-colors">Portfolio</Link>
            <Link href="/experience" className="hover:text-indigo-600 font-medium text-black dark:text-white transition-colors">Experience</Link>
            <Link href="/projects" className="hover:text-indigo-600 font-medium text-black dark:text-white transition-colors">Projects</Link>
            <Link href="/skills" className="hover:text-indigo-600 font-medium text-black dark:text-white transition-colors">Skills</Link>
            <Link href="/contact-info" className="hover:text-indigo-600 font-medium text-black dark:text-white transition-colors">Contact</Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu" className="text-gray-800 dark:text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Brand + Settings */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Tasfia Tarannum" className="w-8 h-8 rounded-full object-cover border border-[#3e0097]" />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold dark:text-white">Tasfia Tarannum</span>
                <span className="text-sm font-medium ml-1 dark:text-white">Junior Software Engineer</span>
              </div>
            </Link>

            {/* Settings button + dropdown */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                aria-label="Settings"
                className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                  showSettings
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600"
                }`}
              >
                <Settings size={20} className={`transition-transform duration-300 ${showSettings ? "rotate-45" : ""}`} />
              </button>

              {/* Settings Panel */}
              {showSettings && (
                <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl py-3 z-50">
                  {/* Header */}
                  <div className="px-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Settings</p>
                  </div>

                  {/* Theme toggle */}
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isDark ? (
                          <Moon size={16} className="text-indigo-400" />
                        ) : (
                          <Sun size={16} className="text-amber-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Theme</p>
                          <p className="text-xs text-gray-400">{isDark ? "Dark mode" : "Light mode"}</p>
                        </div>
                      </div>
                      {/* Toggle switch */}
                      <button
                        onClick={() => setIsDark(!isDark)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
                          isDark ? "bg-indigo-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                            isDark ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Divider + future items placeholder */}
                  <div className="px-4 border-t border-gray-100 dark:border-gray-700 pt-2 mt-1">
                    <button
                      disabled
                      className="w-full flex items-center justify-between py-2 text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    >
                      <span>Edit Profile</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute left-0 top-16 mt-2 px-2 md:hidden bg-white dark:bg-gray-900 rounded-2xl shadow-lg py-6 flex flex-col items-start w-full max-w-xs space-y-4 animate-fade-in z-50">
            {[
              { href: "/", label: "Portfolio" },
              { href: "/experience", label: "Experience" },
              { href: "/projects", label: "Projects" },
              { href: "/skills", label: "Skills" },
              { href: "/contact-info", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-900 dark:text-white font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-700 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}