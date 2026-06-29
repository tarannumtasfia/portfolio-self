"use client";

import { useEffect, useState } from "react";
import ExperienceSection from "../components/ExperienceSection";
import PageLoader from "../components/PageLoader";
import { Briefcase } from "lucide-react";

function ExperienceSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-10 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20" />
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-40" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full max-w-2xl" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-20 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl"
          />
        ))}
      </div>
      <div className="h-96 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl" />
    </div>
  );
}

export default function ExperiencePage() {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadExperience() {
      try {
        const response = await fetch("/api/experience");
        if (!response.ok) throw new Error("Failed to load experience");

        const data = await response.json();
        if (!cancelled) setExperience(data);
      } catch {
        if (!cancelled) setError("Could not load experience data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadExperience();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 opacity-50 pointer-events-none select-none">
          <ExperienceSkeleton />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pt-24">
          <PageLoader label="Loading experience..." icon={Briefcase} />
        </div>
      </main>
    );
  }

  if (error || !experience) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          {error || "Experience unavailable."}
        </div>
      </main>
    );
  }

  return <ExperienceSection data={experience} />;
}
