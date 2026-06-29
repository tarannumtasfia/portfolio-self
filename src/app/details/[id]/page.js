"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FolderKanban } from "lucide-react";
import PageLoader from "../../components/PageLoader";

export default function ProjectDetails() {
  const params = useParams();
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to load projects");

        const data = await response.json();
        if (!cancelled) setProjectsData(data);
      } catch {
        if (!cancelled) setError("Could not load project data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <PageLoader label="Loading project..." icon={FolderKanban} />
        </div>
      </main>
    );
  }

  if (error || !projectsData) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          {error || "Project unavailable."}
        </div>
      </main>
    );
  }

  const project = projectsData.projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-6 sm:pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 min-h-[calc(100dvh-6rem)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 w-fit rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors min-h-11"
          >
            <ArrowLeft size={15} />
            Back to Projects
          </Link>

          <div className="min-w-0 sm:flex-1 sm:px-4">
            <h1 className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white break-words">
              {project.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 break-words">{project.role}</p>
          </div>

          <a
            href={project.iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white text-sm font-semibold px-4 py-2.5 min-h-11 shadow-sm transition-all shrink-0"
          >
            Open live demo
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="flex-1 min-h-[min(55dvh,640px)] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <iframe
            src={project.iframeSrc}
            className="w-full h-full min-h-[320px] border-0"
            title={project.title}
          />
        </div>
      </div>
    </main>
  );
}
