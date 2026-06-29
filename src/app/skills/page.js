"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StandoutCarousel from "../components/StandoutCarousel";
import PageLoader from "../components/PageLoader";
import { Code2, Server, Brain, Wrench, Database, ArrowRight, Sparkles } from "lucide-react";

const CATEGORY_ICONS = {
  Code2,
  Server,
  Database,
  Brain,
  Wrench,
};

function SkillsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 space-y-3 text-center">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24 mx-auto" />
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-32 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-80 max-w-full mx-auto" />
      </div>
      <div className="h-48 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl mb-8" />
      <div className="grid sm:grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-32 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSkills() {
      try {
        const response = await fetch("/api/skills");
        if (!response.ok) throw new Error("Failed to load skills");

        const data = await response.json();
        if (!cancelled) setSkills(data);
      } catch {
        if (!cancelled) setError("Could not load skills data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadSkills();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 opacity-50 pointer-events-none select-none">
          <SkillsSkeleton />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pt-24">
          <PageLoader label="Loading skills..." icon={Sparkles} />
        </div>
      </main>
    );
  }

  if (error || !skills) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          {error || "Skills unavailable."}
        </div>
      </main>
    );
  }

  const { header, carousel, allSkills, footerLinks } = skills;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-1">
            {header.eyebrow}
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {header.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-center description-text">
            {header.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {header.highlights.map(({ value, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-3 py-1.5 text-xs shadow-sm"
              >
                <span className="font-bold text-[#3e0097] dark:text-indigo-400">{value}</span>
                <span className="text-slate-500 dark:text-slate-400">{label}</span>
              </span>
            ))}
          </div>
        </header>

        <StandoutCarousel title={carousel.title} items={carousel.items} />

        <section className="mt-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              {allSkills.title}
            </h2>
            <Link
              href={allSkills.viewProjectsHref}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3e0097] dark:text-indigo-400 hover:underline shrink-0"
            >
              {allSkills.viewProjectsLabel}
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {allSkills.categories.map(({ category, icon, skills: categorySkills }) => {
              const Icon = CATEGORY_ICONS[icon] || Code2;

              return (
                <div
                  key={category}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <Icon size={15} className="text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          {footerLinks.map((link, index) => (
            <span key={link.href} className="contents">
              {index > 0 && <span className="text-slate-300 dark:text-slate-700">·</span>}
              <Link
                href={link.href}
                className={
                  link.primary
                    ? "font-semibold text-[#3e0097] dark:text-indigo-400 hover:underline"
                    : "font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300"
                }
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
