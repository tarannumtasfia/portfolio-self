"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ExternalLink,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  BookOpen,
} from "lucide-react";
import PageLoader from "../components/PageLoader";

function BlogSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 sm:mb-8 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20" />
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-24" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full max-w-xl" />
      </div>
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full max-w-md mb-6" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-80 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}

function PaginationControls({ page, totalPages, onPageChange }) {
  return (
    <div className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 w-fit">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="flex items-center justify-center min-w-11 min-h-11 w-11 h-11 rounded-md text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
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
            className={`min-w-11 min-h-11 h-11 px-2 rounded-md text-xs font-medium transition-all cursor-pointer inline-flex items-center justify-center ${
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
          className="flex items-center justify-center min-w-11 min-h-11 w-11 h-11 rounded-md text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronRight size={15} />
        </button>
      </div>
  );
}

function BlogToolbar({ page, totalPages, onPageChange, total, view, setView }) {
  return (
    <div className="mb-6 flex flex-col items-center gap-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left sm:justify-self-start order-2 sm:order-none">
        Page {page} of {totalPages} · {total} posts
      </p>

      <div className="justify-self-center order-1 sm:order-none w-full flex justify-center overflow-x-auto">
        <PaginationControls page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </div>

      <div className="justify-self-end flex justify-center sm:justify-end w-full sm:w-auto order-3 sm:order-none">
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
        className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-11 rounded-lg text-sm font-medium transition-all cursor-pointer ${
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
        className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-11 rounded-lg text-sm font-medium transition-all cursor-pointer ${
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

function BlogTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function GridCard({ post, index }) {
  const { title, description, href, image, date, tags } = post;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-200/80 dark:hover:border-indigo-800 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 text-xs font-semibold text-white/90 tabular-nums bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={14} className="text-slate-700 dark:text-slate-200" />
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mb-2">
          <Calendar size={12} />
          {date}
        </div>

        <h2 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-[#3e0097] dark:group-hover:text-indigo-300 transition-colors leading-snug">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed description-text flex-1 line-clamp-3">
          {description}
        </p>

        <div className="mt-4">
          <BlogTags tags={tags} />
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          Read on Medium
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </a>
  );
}

function ListCard({ post, index }) {
  const { title, description, href, image, date, tags } = post;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-indigo-200/80 dark:hover:border-indigo-800 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="relative w-full sm:w-56 lg:w-64 shrink-0 aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3e0097] to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex flex-col gap-4 p-5 sm:p-6 flex-1 min-w-0 lg:flex-row lg:items-center lg:gap-5">
          <div className="lg:w-52 shrink-0">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">
              Article {String(index + 1).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mb-2">
              <Calendar size={12} />
              {date}
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-[#3e0097] dark:group-hover:text-indigo-300 transition-colors leading-snug">
              {title}
            </h2>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed description-text line-clamp-3">
              {description}
            </p>
            <BlogTags tags={tags} />
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <span className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white text-sm font-semibold px-4 py-2.5 shadow-sm shadow-indigo-500/20 group-hover:shadow-md transition-all">
              Read on Medium
              <ExternalLink size={14} />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function BlogGrid() {
  const [view, setView] = useState("grid");
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function loadBlog() {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to load blog");

        const data = await response.json();
        if (!cancelled) setBlogData(data);
      } catch {
        if (!cancelled) setError("Could not load blog data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBlog();

    return () => {
      cancelled = true;
    };
  }, []);

  const posts = blogData?.posts ?? [];
  const postsPerPage = blogData?.postsPerPage ?? 3;
  const header = blogData?.header;
  const mediumLink = blogData?.mediumLink;

  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!blogData) return;
    const urlPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    setPage(Math.min(urlPage, totalPages));
  }, [searchParams, totalPages, blogData]);

  const visiblePosts = useMemo(() => {
    const start = (page - 1) * postsPerPage;
    return posts.slice(start, start + postsPerPage);
  }, [page, posts, postsPerPage]);

  const startIndex = (page - 1) * postsPerPage + 1;

  function goToPage(nextPage) {
    const clamped = Math.max(1, Math.min(nextPage, totalPages));
    setPage(clamped);
    router.push(clamped === 1 ? "/blog" : `/blog?page=${clamped}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) {
    return (
      <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 opacity-50 pointer-events-none select-none">
          <BlogSkeleton />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pt-24">
          <PageLoader label="Loading blog..." icon={BookOpen} />
        </div>
      </main>
    );
  }

  if (error || !blogData) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          {error || "Blog unavailable."}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-1">
            {header.eyebrow}
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {header.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl description-text text-center">
            {header.description}
          </p>
        </header>

      <BlogToolbar
        page={page}
        totalPages={totalPages}
        onPageChange={goToPage}
        total={posts.length}
        view={view}
        setView={setView}
      />

      {view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post, index) => (
            <GridCard key={post.id} post={post} index={startIndex - 1 + index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visiblePosts.map((post, index) => (
            <ListCard key={post.id} post={post} index={startIndex - 1 + index} />
          ))}
        </div>
      )}

        <div className="mt-8 text-center">
          <a
            href={mediumLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 hover:from-[#32007a] hover:to-indigo-700 text-white text-sm font-semibold px-5 py-2.5 shadow-sm transition-all"
          >
            <img src={mediumLink.icon} alt="" className="w-4 h-4 brightness-0 invert" />
            {mediumLink.label}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </main>
  );
}
