"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Settings,
  Sun,
  Moon,
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Sparkles,
  Mail,
  BookOpen,
  FileText,
} from "lucide-react";
import CvUpdateModal from "./CvUpdateModal";
import { useSiteNav } from "./SiteNavProvider";

const NAV_ICONS = {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Sparkles,
  Mail,
  BookOpen,
};

function isLinkActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const { data, loading } = useSiteNav();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCvUpdate, setShowCvUpdate] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    } else if (savedTheme === "light") {
      setIsDark(false);
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = (data?.navLinks ?? []).map((link) => ({
    ...link,
    icon: NAV_ICONS[link.icon] || LayoutDashboard,
  }));

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-sm shadow-slate-200/40 dark:shadow-black/20"
            : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand */}
            <Link
              href={data?.brand?.homeHref ?? "/"}
              className="flex items-center gap-3 min-w-0 group shrink-0 rounded-2xl py-1 pr-3 -ml-1 hover:bg-slate-100/80 dark:hover:bg-slate-800/40 transition-colors duration-300"
            >
              <div className="relative shrink-0 overflow-visible">
                <img
                  src={data?.brand?.logo ?? "/logo.png"}
                  alt={data?.brand?.logoAlt ?? "Tasfia Tarannum"}
                  className="h-12 w-auto max-h-12 object-contain object-center bg-transparent mix-blend-multiply dark:mix-blend-lighten dark:opacity-95 origin-center transition-transform duration-300 ease-out group-hover:scale-[1.18]"
                />
              </div>

              <div className="hidden sm:flex flex-col leading-[1.2] min-w-0">
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white truncate group-hover:text-[#3e0097] dark:group-hover:text-indigo-300 transition-colors">
                  {data?.brand?.name ?? "Tasfia Tarannum"}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-indigo-600/90 dark:text-indigo-400/90 truncate">
                  {data?.brand?.title ?? "Junior Software Engineer"}
                </span>
              </div>
            </Link>

            {/* Tablet nav — icons only */}
            <div className="hidden lg:flex xl:hidden items-center p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 min-h-[2.75rem] min-w-0 overflow-x-auto">
              {!loading &&
                navLinks.map(({ href, label, icon: Icon }) => {
                  const active = isLinkActive(pathname, href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      title={label}
                      aria-label={label}
                      className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 shrink-0 ${
                        active
                          ? "text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:text-[#3e0097] dark:hover:text-indigo-300 hover:bg-white/70 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 shadow-md shadow-indigo-500/25" />
                      )}
                      <Icon size={17} className={`relative z-10 ${active ? "text-white" : ""}`} />
                    </Link>
                  );
                })}
            </div>

            {/* Desktop nav — full labels */}
            <div className="hidden xl:flex items-center p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 min-h-[2.75rem] min-w-0">
              {loading ? (
                <div className="flex items-center gap-2 px-3 animate-pulse">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-8 w-20 rounded-xl bg-slate-200 dark:bg-slate-700" />
                  ))}
                </div>
              ) : (
                navLinks.map(({ href, label, icon: Icon }) => {
                const active = isLinkActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-[#3e0097] dark:hover:text-indigo-300 hover:bg-white/70 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    {active && (
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 shadow-md shadow-indigo-500/25" />
                    )}
                    <Icon size={15} className={`relative z-10 ${active ? "text-white" : ""}`} />
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  aria-label="Settings"
                  className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 cursor-pointer ${
                    showSettings
                      ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  <Settings
                    size={18}
                    className={`transition-transform duration-300 ${showSettings ? "rotate-90" : ""}`}
                  />
                </button>

                {showSettings && (
                  <div className="absolute right-0 top-12 w-60 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 py-2 z-50 animate-nav-dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettings(false);
                        setShowCvUpdate(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50">
                        <FileText size={15} className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      Update CV
                    </button>

                    <div className="mx-3 border-t border-slate-100 dark:border-slate-800" />

                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                          {isDark ? (
                            <Moon size={15} className="text-indigo-400" />
                          ) : (
                            <Sun size={15} className="text-amber-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            {isDark ? "Dark mode" : "Light mode"}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {isDark ? "Switch to light" : "Switch to dark"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle theme"
                        className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer shrink-0 ${
                          isDark ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
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
                )}
              </div>

              <Link
                href={data?.hireCta?.href ?? "/contact"}
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 hover:from-[#32007a] hover:to-indigo-700 text-white text-sm font-semibold px-4 py-2 shadow-sm shadow-indigo-500/20 transition-all"
              >
                {data?.hireCta?.label ?? "Hire me"}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="xl:hidden flex items-center justify-center w-11 h-11 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-16 left-0 right-0 mx-3 max-h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300 ease-out ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xl shadow-slate-300/30 dark:shadow-black/50 overflow-hidden">
            <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {data?.mobileMenu?.title ?? "Navigation"}
              </p>
            </div>

            <div className="p-3 space-y-1">
              {loading ? (
                <div className="space-y-2 animate-pulse p-1">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
                  ))}
                </div>
              ) : (
                navLinks.map(({ href, label, icon: Icon }) => {
                const active = isLinkActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      active
                        ? "bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                        active
                          ? "bg-white/15"
                          : "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="font-medium">{label}</span>
                    {active && (
                      <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                        {data?.mobileMenu?.activeLabel ?? "Active"}
                      </span>
                    )}
                  </Link>
                );
              })
              )}
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-slate-800">
              <Link
                href={data?.hireCta?.href ?? "/contact"}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center py-2.5 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white text-sm font-semibold shadow-sm"
              >
                {data?.hireCta?.label ?? "Hire me"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CvUpdateModal open={showCvUpdate} onClose={() => setShowCvUpdate(false)} />
    </>
  );
}
