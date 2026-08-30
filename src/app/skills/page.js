"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageLoader from "../components/PageLoader";
import {
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const WORK_ICONS = {
  Layers,
  Trophy,
  Users,
};

function SkillsSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      <div className="space-y-3 max-w-2xl">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-48" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
      </div>
      <div className="h-40 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl" />
      <div className="grid sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-52 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl"
          />
        ))}
      </div>
      <div className="h-72 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl" />
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
      <main className="relative min-h-[50vh] bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 opacity-50 pointer-events-none select-none">
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
      <main className="bg-slate-50 dark:bg-slate-950 pt-24 pb-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          {error || skills?.ui?.unavailableLabel || "Skills unavailable."}
        </div>
      </main>
    );
  }

  const {
    belief,
    algorithmsSpotlight,
    howIWork,
    technicalSkills,
    professionalStrengths,
    footer,
  } = skills;

  return (
    <main className="bg-slate-50 dark:bg-slate-950 pt-20 pb-6 sm:pb-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <h1 className="sr-only">Skills</h1>

        {/* Belief */}
        <section className="max-w-3xl">
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {belief.title}
          </h2>
          <div className="mt-4 space-y-2">
            {(Array.isArray(belief.text) ? belief.text : [belief.text]).map((line) => (
              <p
                key={line}
                className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 break-words"
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* 250+ Algorithms spotlight */}
        <section className="relative overflow-hidden rounded-2xl border border-indigo-100/90 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-violet-950/30 shadow-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#3e0097]/15 dark:bg-[#3e0097]/20 blur-3xl"
          />
          <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
            <div className="flex flex-col items-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3e0097] dark:text-indigo-400">
                {algorithmsSpotlight.eyebrow}
              </p>
              <p
                className="mt-2 text-4xl sm:text-6xl md:text-7xl font-semibold leading-none tracking-tight text-[#3e0097] dark:text-indigo-400 tabular-nums"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                {algorithmsSpotlight.stat}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 dark:text-slate-200">
                {algorithmsSpotlight.label}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {algorithmsSpotlight.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {algorithmsSpotlight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-indigo-200/80 dark:border-indigo-800/60 bg-white/80 dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-[#3e0097] dark:text-indigo-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={algorithmsSpotlight.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#3e0097] hover:bg-[#32007a] text-white text-sm font-semibold px-4 py-2.5 min-h-11 transition-colors shadow-sm shadow-indigo-500/20"
              >
                {algorithmsSpotlight.linkLabel}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* How I work */}
        <section>
          <div className="text-center max-w-xl mx-auto mb-5">
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              <span className="text-slate-900 dark:text-white">
                {howIWork.title.split(" ").slice(0, -1).join(" ")}
              </span>
              {howIWork.title.includes(" ") ? " " : ""}
              <span className="text-[#3e0097] dark:text-indigo-400">
                {howIWork.title.split(" ").slice(-1)[0]}
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
              {howIWork.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {howIWork.items.map((item) => {
              const Icon = WORK_ICONS[item.icon] || Layers;
              const featured = item.featured;

              return (
                <article
                  key={item.id}
                  className={`flex flex-col rounded-2xl border bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm transition-shadow hover:shadow-md ${
                    featured
                      ? "border-[#3e0097]/40 dark:border-indigo-600/60 ring-1 ring-indigo-200/70 dark:ring-indigo-800/50"
                      : "border-slate-200/80 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
                        featured
                          ? "bg-[#3e0097]/10 dark:bg-indigo-950/60 text-[#3e0097] dark:text-indigo-400"
                          : "bg-indigo-50 dark:bg-indigo-950/50 text-[#3e0097] dark:text-indigo-400"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                        featured
                          ? "text-[#3e0097] dark:text-indigo-400"
                          : "text-[#3e0097]/80 dark:text-indigo-400"
                      }`}
                    >
                      {item.eyebrow}
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 flex-1">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                          featured
                            ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-[#3e0097] dark:text-indigo-200"
                            : "border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-slate-800/60 text-indigo-800 dark:text-indigo-300"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-900 dark:text-white mb-4">
            {technicalSkills.title}
          </h2>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {technicalSkills.categories.map(({ category, skills: categorySkills, highlightSkills }) => (
                <li
                  key={category}
                  className="grid gap-3 sm:grid-cols-[9rem_1fr] lg:grid-cols-[10rem_1fr] sm:gap-6 px-4 sm:px-6 py-4 sm:py-5"
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white pt-0.5">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {highlightSkills?.map((skill) => (
                      <a
                        key={skill.label}
                        href={skill.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#3e0097]/30 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 text-xs font-semibold text-[#3e0097] dark:text-indigo-200 hover:bg-[#3e0097] hover:border-[#3e0097] hover:text-white dark:hover:bg-indigo-500 dark:hover:border-indigo-500 dark:hover:text-white transition-colors duration-200"
                      >
                        <Trophy size={12} />
                        {skill.label}
                        <ExternalLink size={11} className="opacity-70" />
                      </a>
                    ))}
                    {categorySkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/30 px-3 py-1.5 text-xs font-medium text-indigo-800 dark:text-indigo-200 cursor-default transition-colors duration-200 hover:bg-[#3e0097] hover:border-[#3e0097] hover:text-white dark:hover:bg-indigo-500 dark:hover:border-indigo-500 dark:hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Professional Strengths */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-900 dark:text-white mb-4">
            {professionalStrengths.title}
          </h2>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="hidden sm:grid grid-cols-[4rem_1fr] gap-4 px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {professionalStrengths.columns.number}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {professionalStrengths.columns.strength}
              </p>
            </div>

            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {professionalStrengths.items.map((item, index) => {
                const isAlgorithms = index === 0;

                return (
                  <li
                    key={item}
                    className={`group grid gap-2 sm:grid-cols-[4rem_1fr] sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 cursor-default transition-colors duration-200 ${
                      isAlgorithms
                        ? "bg-indigo-50/60 dark:bg-indigo-950/25 hover:bg-indigo-100/80 dark:hover:bg-indigo-950/40"
                        : "hover:bg-indigo-50/70 dark:hover:bg-indigo-950/25"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold tabular-nums transition-colors duration-200 ${
                        isAlgorithms
                          ? "text-[#3e0097] dark:text-indigo-400"
                          : "text-slate-400 dark:text-slate-500 group-hover:text-[#3e0097] dark:group-hover:text-indigo-400"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-200 ${
                        isAlgorithms
                          ? "text-slate-800 dark:text-slate-100 font-medium"
                          : "text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100"
                      }`}
                    >
                      {item}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Footer CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 pt-2 border-t border-slate-200/80 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 break-words sm:whitespace-nowrap sm:shrink min-w-0">
            {footer.note}
          </p>
          <div className="flex flex-wrap gap-3">
            {footer.links.map((link) =>
              link.primary ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#3e0097] hover:bg-[#32007a] text-white text-sm font-semibold px-4 py-2.5 min-h-11 transition-colors shadow-sm"
                >
                  {link.label}
                  <ArrowRight size={14} />
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 text-sm font-semibold px-4 py-2.5 min-h-11 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
