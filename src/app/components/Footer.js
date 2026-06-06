"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, Heart } from "lucide-react";
import CvViewerModal from "./CvViewerModal";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-info", label: "Contact" },
];

const socialLinks = [
  { href: "https://linkedin.com/in/tasfiatarannum", label: "LinkedIn", icon: "/linkedin-icon.png" },
  { href: "https://github.com/tarannumtasfia", label: "GitHub", icon: "/github-icon.png" },
  { href: "https://leetcode.com/u/tasfiatarannum/", label: "LeetCode", icon: "/leetcode-icon.png" },
  { label: "CV", icon: "/cv-icon.png", cv: true },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [showCv, setShowCv] = useState(false);

  return (
    <>
      <footer className="relative mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3e0097]/50 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="inline-flex items-center gap-2.5 group shrink-0">
              <img
                src="/logo.png"
                alt="Tasfia Tarannum"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-700 transition-all"
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Tasfia Tarannum</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Junior Software Engineer</p>
              </div>
            </Link>

            <nav className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-1 p-1 min-w-max sm:min-w-0 rounded-xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-[#3e0097] dark:hover:text-indigo-300 hover:bg-white dark:hover:bg-slate-700/50 transition-all whitespace-nowrap"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
              {socialLinks.map(({ href, label, icon, cv }) =>
                cv ? (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setShowCv(true)}
                    aria-label={label}
                    title={label}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all cursor-pointer"
                  >
                    <img src={icon} alt="" className="w-4 h-4 object-contain" />
                  </button>
                ) : (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all"
                  >
                    <img src={icon} alt="" className="w-4 h-4 object-contain" />
                  </a>
                )
              )}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#3e0097] to-indigo-600 text-white hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-slate-400 dark:text-slate-500">
            <p>© {year} Tasfia Tarannum. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with
              <Heart size={10} className="text-rose-500 fill-rose-500" />
              Next.js & Tailwind
            </p>
          </div>
        </div>
      </footer>

      <CvViewerModal open={showCv} onClose={() => setShowCv(false)} />
    </>
  );
}
