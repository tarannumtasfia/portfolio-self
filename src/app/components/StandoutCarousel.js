"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  Trophy,
  Database,
  Binary,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers,
  Server,
  Zap,
} from "lucide-react";

const featuredHighlights = [
  {
    id: "algorithms",
    stat: "250+",
    statLabel: "Problems Solved",
    title: "Algorithms & DSA",
    description:
      "250+ LeetCode problems — arrays, trees, graphs, DP, and interview-ready problem solving.",
    tags: ["Arrays", "Trees", "Graphs", "DP"],
    href: "https://leetcode.com/u/tasfiatarannum/",
    linkLabel: "View LeetCode profile",
    icon: Trophy,
    accent: "from-amber-400 via-orange-500 to-yellow-500",
    accentSoft:
      "from-amber-500/15 via-orange-500/10 to-yellow-500/15 dark:from-amber-500/25 dark:via-orange-500/15 dark:to-yellow-500/25",
    glow: "shadow-amber-500/20 dark:shadow-amber-900/30",
    linkAccent: "text-amber-700 dark:text-amber-400",
  },
  {
    id: "sql",
    stat: "SQL",
    statLabel: "Database Expertise",
    title: "SQL & Data Management",
    description:
      "SQL queries, T-SQL, job data handling, and schema comparison for real-world data work.",
    tags: ["SQL Queries", "T-SQL", "Schema Comparison", "Job Data"],
    icon: Database,
    accent: "from-emerald-400 via-teal-500 to-cyan-500",
    accentSoft:
      "from-emerald-500/15 via-teal-500/10 to-cyan-500/15 dark:from-emerald-500/25 dark:via-teal-500/15 dark:to-cyan-500/25",
    glow: "shadow-emerald-500/20 dark:shadow-emerald-900/30",
  },
  {
    id: "csharp",
    stat: "C#",
    statLabel: "Language Skill",
    title: "C# Programming",
    description: "C# with OOP — structured code, strong typing, and .NET fundamentals.",
    tags: ["C#", "OOP", "LINQ", ".NET"],
    icon: Binary,
    accent: "from-violet-500 via-purple-600 to-indigo-600",
    accentSoft:
      "from-violet-500/15 via-purple-500/10 to-indigo-500/15 dark:from-violet-500/25 dark:via-purple-500/15 dark:to-indigo-500/25",
    glow: "shadow-violet-500/20 dark:shadow-violet-900/30",
  },
  {
    id: "react",
    stat: "React",
    statLabel: "UI Library",
    title: "React.js",
    description: "Interactive UIs with React — components, hooks, and reusable patterns.",
    tags: ["Components", "Hooks", "JSX", "SPA"],
    icon: Code2,
    accent: "from-cyan-400 via-sky-500 to-blue-500",
    accentSoft:
      "from-cyan-500/15 via-sky-500/10 to-blue-500/15 dark:from-cyan-500/25 dark:via-sky-500/15 dark:to-blue-500/25",
    glow: "shadow-cyan-500/20 dark:shadow-cyan-900/30",
  },
  {
    id: "nextjs",
    stat: "Next.js",
    statLabel: "React Framework",
    title: "Next.js",
    description: "Next.js for SSR, routing, API routes, and production-ready React apps.",
    tags: ["App Router", "SSR", "API Routes", "SEO"],
    icon: Layers,
    accent: "from-slate-700 via-slate-800 to-black",
    accentSoft:
      "from-slate-500/15 via-slate-600/10 to-slate-700/15 dark:from-slate-500/25 dark:via-slate-600/15 dark:to-slate-700/25",
    glow: "shadow-slate-500/20 dark:shadow-black/40",
  },
  {
    id: "django",
    stat: "Django",
    statLabel: "Python Framework",
    title: "Python & Django",
    description: "Python & Django — ORM, MVT architecture, and backend web apps.",
    tags: ["Python", "Django", "ORM", "REST APIs"],
    icon: Server,
    accent: "from-green-600 via-emerald-600 to-teal-700",
    accentSoft:
      "from-green-500/15 via-emerald-500/10 to-teal-500/15 dark:from-green-500/25 dark:via-emerald-500/15 dark:to-teal-500/25",
    glow: "shadow-green-500/20 dark:shadow-green-900/30",
  },
  {
    id: "express",
    stat: "Express",
    statLabel: "Node.js Backend",
    title: "Express.js",
    description: "Express.js REST APIs — middleware, routing, and Node.js backends.",
    tags: ["REST APIs", "Middleware", "Routing", "Node.js"],
    icon: Zap,
    accent: "from-gray-500 via-gray-600 to-gray-800",
    accentSoft:
      "from-gray-500/15 via-gray-600/10 to-gray-700/15 dark:from-gray-500/25 dark:via-gray-600/15 dark:to-gray-700/25",
    glow: "shadow-gray-500/20 dark:shadow-gray-900/30",
  },
];

function HighlightCard({
  stat,
  statLabel,
  title,
  description,
  tags,
  href,
  linkLabel,
  icon: Icon,
  accent,
  accentSoft,
  glow,
  linkAccent,
}) {
  return (
    <article
      className={`group relative flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md ${glow} hover:border-indigo-200/80 dark:hover:border-indigo-800 transition-all duration-300`}
    >
      <div className={`h-1 bg-gradient-to-r ${accent}`} />

      <div className={`relative px-4 pt-4 pb-3 bg-gradient-to-br ${accentSoft}`}>
        <div className="flex items-center justify-between gap-2">
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${accent} shadow-md`}
          >
            <Icon size={18} className="text-white" />
          </div>
          <div className="text-right">
            <p className={`text-xl font-bold bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
              {stat}
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {statLabel}
            </p>
          </div>
        </div>
        <h3 className="mt-2.5 text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>

      <div className="flex flex-col flex-1 px-4 pb-4 pt-2.5">
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 description-text line-clamp-3">
          {description}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-auto pt-2 inline-flex items-center gap-1 text-xs font-semibold hover:underline ${linkAccent}`}
          >
            {linkLabel}
            <ExternalLink size={11} />
          </a>
        )}
      </div>
    </article>
  );
}

function getVisibleCount(width) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export default function StandoutCarousel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => setVisible(getVisibleCount(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, featuredHighlights.length - visible);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((current) => Math.min(maxIndex, current + 1));
  }, [maxIndex]);

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return (
    <section className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Standout strengths
          </h2>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous skills"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next skills"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          aria-label="Previous"
          className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-[#3e0097] dark:hover:text-indigo-300 disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          aria-label="Next"
          className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-[#3e0097] dark:hover:text-indigo-300 disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronRight size={22} />
        </button>

        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
          >
            {featuredHighlights.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-2 sm:px-3"
                style={{ flex: `0 0 ${100 / visible}%` }}
              >
                <HighlightCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-3">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                dotIndex === index
                  ? "w-6 bg-gradient-to-r from-[#3e0097] to-indigo-600"
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
