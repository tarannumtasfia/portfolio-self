"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LayoutGrid,
  List,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PROJECTS_PER_PAGE = 4;

const projects = [
  {
    id: "todo",
    title: "To-Do List",
    role: "Task Manager App",
    tags: ["React", "Kanban", "Productivity"],
    description: "A Kanban board for managing tasks with drag-and-drop workflows.",
    iframeSrc: "https://kanban-board-sigma-sepia.vercel.app/",
    image: "/projects/todo.png",
    accent: "from-orange-400 to-amber-500",
    accentSoft: "from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20",
    accentText: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "movie",
    title: "Movie Website",
    role: "Movie Search App",
    tags: ["React", "API", "Movies"],
    description: "Search, browse, and manage movies with a clean React interface.",
    iframeSrc: "https://movie-app-ashen-iota-35.vercel.app/",
    image: "/projects/movie.png",
    accent: "from-emerald-400 to-teal-500",
    accentSoft: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20",
    accentText: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "eschool",
    title: "E-School",
    role: "Educational Landing Page",
    tags: ["HTML", "CSS", "Bootstrap"],
    description: "A responsive educational landing page built with HTML, CSS, and Bootstrap.",
    iframeSrc: "https://tarannumtasfia.github.io/e-school/",
    image: "/projects/eschool.png",
    accent: "from-sky-400 to-blue-500",
    accentSoft: "from-sky-500/10 to-blue-500/10 dark:from-sky-500/20 dark:to-blue-500/20",
    accentText: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "crudapp",
    title: "CRUD App",
    role: "User Management System",
    tags: ["React", "MongoDB", "Express", "Node.js"],
    description:
      "Full-stack user management with registration, login, and CRUD operations.",
    iframeSrc: "https://crud-frontend-iota-one.vercel.app/",
    image: "/projects/crudapp.png",
    accent: "from-violet-400 to-purple-600",
    accentSoft: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20",
    accentText: "text-violet-600 dark:text-violet-400",
  },
  {
    id: "courier",
    title: "Courier Tracker",
    role: "Real-Time Package Tracker",
    tags: ["Next.js", "Socket.IO", "MongoDB", "Tailwind"],
    description:
      "Real-time package tracking with alerts and drill-down views for dispatchers.",
    iframeSrc: "https://courier-tracker-frontend-eosin.vercel.app/",
    image: "/projects/courier.png",
    accent: "from-amber-400 to-yellow-500",
    accentSoft: "from-amber-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:to-yellow-500/20",
    accentText: "text-amber-600 dark:text-amber-400",
  },
];

function PaginationControls({ page, totalPages, onPageChange }) {
  return (
    <div className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 w-fit">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="flex items-center justify-center w-7 h-7 rounded-md text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronLeft size={15} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-label={`Page ${pageNum}`}
            aria-current={pageNum === page ? "page" : undefined}
            className={`min-w-[1.75rem] h-7 px-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              pageNum === page
                ? "bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="flex items-center justify-center w-7 h-7 rounded-md text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronRight size={15} />
        </button>
      </div>
  );
}

function ProjectsToolbar({ page, totalPages, onPageChange, total, view, setView }) {
  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
      <p className="text-[11px] text-slate-500 dark:text-slate-400 justify-self-start text-center sm:text-left">
        Page {page} of {totalPages} · {total} projects
      </p>

      <div className="justify-self-center">
        <PaginationControls page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </div>

      <div className="justify-self-end flex justify-end w-full sm:w-auto">
        <ViewToggle view={view} setView={setView} />
      </div>
    </div>
  );
}

function ViewToggle({ view, setView }) {
  return (
    <div className="inline-flex w-auto items-center p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
      <button
        type="button"
        onClick={() => setView("grid")}
        className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          view === "grid"
            ? "bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-sm shadow-indigo-500/25"
            : "text-slate-600 dark:text-slate-300 hover:text-[#3e0097] dark:hover:text-indigo-300"
        }`}
      >
        <LayoutGrid size={15} />
        Grid
      </button>
      <button
        type="button"
        onClick={() => setView("list")}
        className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          view === "list"
            ? "bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-sm shadow-indigo-500/25"
            : "text-slate-600 dark:text-slate-300 hover:text-[#3e0097] dark:hover:text-indigo-300"
        }`}
      >
        <List size={15} />
        List
      </button>
    </div>
  );
}

function ProjectTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectActions({ project }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full sm:w-auto">
      <Link
        href={`/details/${project.id}`}
        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 hover:from-[#32007a] hover:to-indigo-700 text-white text-sm font-semibold px-4 py-2 shadow-sm shadow-indigo-500/20 transition-all"
      >
        View details
        <ArrowRight size={14} />
      </Link>
      <a
        href={project.iframeSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-700 dark:text-slate-200 text-sm font-medium px-4 py-2 transition-all"
      >
        Live demo
        <ExternalLink size={14} />
      </a>
    </div>
  );
}

function GridCard({ project, index }) {
  return (
    <article className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:border-indigo-200/80 dark:hover:border-indigo-800 transition-all duration-300 hover:-translate-y-1">
      <div className={`h-1 bg-gradient-to-r ${project.accent}`} />

      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 right-3 text-xs font-semibold text-white/90 tabular-nums bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col flex-1 px-6 pb-6 pt-5">
        <p className={`text-xs font-semibold uppercase tracking-[0.15em] ${project.accentText}`}>
          {project.title}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white leading-snug">
          {project.role}
        </h3>

        <div className="mt-3">
          <ProjectTags tags={project.tags} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 flex-1 description-text">
          {project.description}
        </p>
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  );
}

function ListCard({ project, index }) {
  return (
    <article className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-indigo-200/80 dark:hover:border-indigo-800 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="relative w-full sm:w-56 lg:w-64 shrink-0 aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${project.accent}`} />
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-6 flex-1 min-w-0 lg:flex-row lg:items-center lg:gap-6">
          <div className="lg:w-56 shrink-0">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">
              Project {String(index + 1).padStart(2, "0")}
            </p>
            <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${project.accentText}`}>
              {project.title}
            </p>
            <h3 className="mt-0.5 text-base font-semibold text-slate-900 dark:text-white">
              {project.role}
            </h3>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed description-text">
              {project.description}
            </p>
            <ProjectTags tags={project.tags} />
          </div>

          <div className="shrink-0 w-full lg:w-auto lg:pl-4">
            <ProjectActions project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsGrid() {
  const [view, setView] = useState("grid");
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const [page, setPage] = useState(Math.min(initialPage, totalPages));

  useEffect(() => {
    const urlPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    setPage(Math.min(urlPage, totalPages));
  }, [searchParams, totalPages]);

  const visibleProjects = useMemo(() => {
    const start = (page - 1) * PROJECTS_PER_PAGE;
    return projects.slice(start, start + PROJECTS_PER_PAGE);
  }, [page]);

  const startIndex = (page - 1) * PROJECTS_PER_PAGE + 1;

  function goToPage(nextPage) {
    const clamped = Math.max(1, Math.min(nextPage, totalPages));
    setPage(clamped);
    router.push(clamped === 1 ? "/projects" : `/projects?page=${clamped}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2">
            Portfolio
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Projects
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl description-text">
            A collection of {projects.length} applications — from Kanban tools to real-time
            trackers. Switch views or open a live demo.
          </p>
        </header>

        <ProjectsToolbar
          page={page}
          totalPages={totalPages}
          onPageChange={goToPage}
          total={projects.length}
          view={view}
          setView={setView}
        />

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {visibleProjects.map((project, index) => (
              <GridCard
                key={project.id}
                project={project}
                index={startIndex - 1 + index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleProjects.map((project, index) => (
              <ListCard
                key={project.id}
                project={project}
                index={startIndex - 1 + index}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
