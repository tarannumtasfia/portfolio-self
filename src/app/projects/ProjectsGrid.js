"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LayoutGrid,
  List,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Play,
  X,
  Github,
} from "lucide-react";
import PageLoader from "../components/PageLoader";

function DemoVideoModal({ project, ui, onClose }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (!project) return;

    setVideoLoaded(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const videoUrl = project.demoVideo || ui?.demoVideoUrl;
  const isLocalVideo = /\.(mp4|webm|ogg)$/i.test(videoUrl);
  const title = `${project.title} — Demo Video`;
  const subtitle = project.role;
  const loadingText = ui?.demoVideoLoadingText || "Starting playback...";
  const closeHint = ui?.demoVideoCloseHint || "Press Esc or click outside to close";

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6" role="presentation">
      <button
        type="button"
        aria-label="Close video"
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md animate-[video-backdrop-in_0.25s_ease-out]"
        onClick={onClose}
      />

      <div role="dialog" aria-modal="true" aria-label={title} className="relative w-full max-w-4xl max-h-[min(92dvh,100%)] overflow-y-auto animate-[video-modal-in_0.3s_ease-out]">
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#3e0097] via-indigo-500 to-violet-400 shadow-2xl shadow-indigo-950/40">
          <div className="rounded-[calc(1rem-1px)] overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 border-b border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600/90 text-white shrink-0">
                  <Play size={16} className="ml-0.5" fill="currentColor" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-semibold text-white truncate">{title}</p>
                  <p className="text-xs text-indigo-200/80 truncate hidden sm:block">{subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-video w-full max-h-[min(50dvh,calc(100dvh-10rem))] sm:max-h-none bg-black">
              {!videoLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play size={18} className="text-indigo-300 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-indigo-200/70">{loadingText}</p>
                </div>
              )}

              {isLocalVideo ? (
                <video
                  src={videoUrl}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    videoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  controls
                  autoPlay
                  onLoadedData={() => setVideoLoaded(true)}
                />
              ) : (
                <iframe
                  src={videoUrl}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    videoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  title={title}
                  onLoad={() => setVideoLoaded(true)}
                />
              )}
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-white/10 bg-slate-950/90">
              <p className="text-[11px] text-slate-400 text-center">{closeHint}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 sm:mb-10 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24" />
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-32" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full max-w-xl" />
      </div>
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full max-w-md mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="h-80 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}

function CategoryFilters({ filters, active, onChange }) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/70 shadow-sm">
      {filters.map((filter) => {
        const isActive = filter.id === active;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            aria-pressed={isActive}
            className={`px-3.5 py-2 min-h-10 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              isActive
                ? "bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-sm shadow-indigo-500/25"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-[#3e0097] dark:hover:text-indigo-300"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

function PaginationControls({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return (
      <div className="inline-flex items-center gap-1">
        <button
          type="button"
          disabled
          aria-label="Previous page"
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
        >
          <ChevronLeft size={15} />
        </button>
        <button
          type="button"
          aria-current="page"
          className="min-w-9 h-9 px-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-sm"
        >
          1
        </button>
        <button
          type="button"
          disabled
          aria-label="Next page"
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
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
          className={`min-w-9 h-9 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center justify-center ${
            pageNum === page
              ? "bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-sm"
              : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600"
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
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

function ViewToggle({ view, setView, ui }) {
  return (
    <div className="inline-flex w-auto items-center gap-1.5">
      <button
        type="button"
        onClick={() => setView("grid")}
        className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 min-h-9 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          view === "grid"
            ? "bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-sm shadow-indigo-500/25"
            : "border border-[#3e0097]/40 dark:border-indigo-500/50 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#3e0097] dark:hover:text-indigo-300"
        }`}
      >
        <LayoutGrid size={15} />
        {ui?.gridLabel || "Grid"}
      </button>
      <button
        type="button"
        onClick={() => setView("list")}
        className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 min-h-9 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          view === "list"
            ? "bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white shadow-sm shadow-indigo-500/25"
            : "border border-[#3e0097]/40 dark:border-indigo-500/50 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#3e0097] dark:hover:text-indigo-300"
        }`}
      >
        <List size={15} />
        {ui?.listLabel || "List"}
      </button>
    </div>
  );
}

function ProjectsToolbar({
  filters,
  category,
  onCategoryChange,
  page,
  totalPages,
  onPageChange,
  total,
  view,
  setView,
  ui,
}) {
  const totalText = (ui?.totalLabel || "Total {total} Projects").replace(
    "{total}",
    total
  );

  return (
    <div className="mb-6 flex flex-col gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4">
      <div className="flex justify-center lg:justify-start overflow-x-auto">
        <CategoryFilters
          filters={filters}
          active={category}
          onChange={onCategoryChange}
        />
      </div>

      <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 text-center whitespace-nowrap">
        {totalText}
      </p>

      <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-3">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <ViewToggle view={view} setView={setView} ui={ui} />
      </div>
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

function ProjectActions({ project, ui, onQuickDemo }) {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap items-stretch lg:items-center gap-2 w-full">
      <button
        type="button"
        onClick={() => onQuickDemo?.(project)}
        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 hover:from-[#32007a] hover:to-indigo-700 text-white text-sm font-semibold px-4 py-2.5 min-h-11 shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
      >
        {ui?.demoVideoLabel || "Demo Video"}
        <Play size={14} className="fill-current" />
      </button>
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-700 dark:text-slate-200 text-sm font-medium px-4 py-2.5 min-h-11 transition-all"
        >
          {ui?.githubLinkLabel || "GitHub Link"}
          <Github size={14} />
        </a>
      ) : null}
      <a
        href={project.iframeSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 text-[#3e0097] dark:text-indigo-300 text-sm font-medium px-4 py-2.5 min-h-11 transition-all"
      >
        {ui?.liveDemoLabel || "Live Demo"}
        <ExternalLink size={14} />
      </a>
    </div>
  );
}

function GridCard({ project, index, ui, onQuickDemo }) {
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
          <ProjectActions project={project} ui={ui} onQuickDemo={onQuickDemo} />
        </div>
      </div>
    </article>
  );
}

function ListCard({ project, index, ui, onQuickDemo }) {
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
              {ui?.projectPrefix || "Project"} {String(index + 1).padStart(2, "0")}
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
            <ProjectActions project={project} ui={ui} onQuickDemo={onQuickDemo} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsGrid() {
  const [view, setView] = useState("grid");
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickDemoProject, setQuickDemoProject] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to load projects");

        const data = await response.json();
        if (!cancelled) setProjectsData(data);
      } catch {
        if (!cancelled) setError("Could not load projects data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const projects = projectsData?.projects ?? [];
  const filters = projectsData?.filters ?? [
    { id: "live", label: "Live" },
    { id: "cloud", label: "Cloud" },
    { id: "upcoming", label: "Upcoming" },
  ];
  const projectsPerPage = projectsData?.projectsPerPage ?? 4;
  const header = projectsData?.header;
  const ui = projectsData?.ui;
  const defaultCategory = filters[0]?.id || "live";

  const [category, setCategory] = useState(defaultCategory);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!projectsData) return;

    const validIds = new Set(filters.map((f) => f.id));
    const urlCategory = searchParams.get("category") || defaultCategory;
    const nextCategory = validIds.has(urlCategory) ? urlCategory : defaultCategory;
    setCategory(nextCategory);

    const filteredCount = projects.filter((p) => p.category === nextCategory).length;
    const nextTotalPages = Math.max(1, Math.ceil(filteredCount / projectsPerPage));
    const urlPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    setPage(Math.min(urlPage, nextTotalPages));
  }, [searchParams, projectsData, filters, projects, projectsPerPage, defaultCategory]);

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.category === category),
    [projects, category]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));

  const visibleProjects = useMemo(() => {
    const start = (page - 1) * projectsPerPage;
    return filteredProjects.slice(start, start + projectsPerPage);
  }, [page, filteredProjects, projectsPerPage]);

  const startIndex = (page - 1) * projectsPerPage + 1;

  function updateUrl(nextCategory, nextPage) {
    const params = new URLSearchParams();
    if (nextCategory && nextCategory !== defaultCategory) {
      params.set("category", nextCategory);
    }
    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }
    const query = params.toString();
    router.push(query ? `/projects?${query}` : "/projects", { scroll: false });
  }

  function goToPage(nextPage) {
    const clamped = Math.max(1, Math.min(nextPage, totalPages));
    setPage(clamped);
    updateUrl(category, clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function changeCategory(nextCategory) {
    if (nextCategory === category) return;
    setCategory(nextCategory);
    setPage(1);
    updateUrl(nextCategory, 1);
  }

  if (loading) {
    return (
      <main className="relative min-h-[50vh] bg-slate-50 dark:bg-slate-950 pt-24 pb-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 opacity-50 pointer-events-none select-none">
          <ProjectsSkeleton />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pt-24">
          <PageLoader label="Loading projects..." icon={FolderKanban} />
        </div>
      </main>
    );
  }

  if (error || !projectsData) {
    return (
      <main className="bg-slate-50 dark:bg-slate-950 pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          {error || ui?.unavailableLabel || "Projects unavailable."}
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-950 pt-20 pb-6 sm:pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-5 sm:mb-6">
          <h1 className="sr-only">{header.title}</h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-left leading-relaxed break-words max-w-full">
            {header.description}
          </p>
        </header>

        <ProjectsToolbar
          filters={filters}
          category={category}
          onCategoryChange={changeCategory}
          page={page}
          totalPages={totalPages}
          onPageChange={goToPage}
          total={filteredProjects.length}
          view={view}
          setView={setView}
          ui={ui}
        />

        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 px-6 py-16 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {ui?.emptyFilterLabel || "No projects in this category yet."}
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleProjects.map((project, index) => (
              <GridCard
                key={project.id}
                project={project}
                index={startIndex - 1 + index}
                ui={ui}
                onQuickDemo={setQuickDemoProject}
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
                ui={ui}
                onQuickDemo={setQuickDemoProject}
              />
            ))}
          </div>
        )}
      </div>

      <DemoVideoModal
        project={quickDemoProject}
        ui={ui}
        onClose={() => setQuickDemoProject(null)}
      />
    </main>
  );
}
