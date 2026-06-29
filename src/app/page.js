"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Briefcase,
  ArrowRight,
  FolderKanban,
  Sparkles,
  Mail,
  ExternalLink,
  Play,
  LayoutDashboard,
} from "lucide-react";

import CvViewerModal from "./components/CvViewerModal";
import DashboardVisitorInfo from "./components/DashboardVisitorInfo";
import PageLoader from "./components/PageLoader";

const QUICK_LINK_ICONS = {
  FolderKanban,
  Briefcase,
  Sparkles,
  Mail,
};

function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="aspect-[5/4] bg-slate-200 dark:bg-slate-800" />
            <div className="p-6 space-y-4">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mx-auto" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mx-auto" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <div className="h-48 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl" />
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showCv, setShowCv] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) throw new Error("Failed to load dashboard");

        const data = await response.json();
        if (!cancelled) setDashboard(data);
      } catch {
        if (!cancelled) setError("Could not load dashboard data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClose = () => {
    setShowVideo(false);
    setVideoLoaded(false);
  };

  useEffect(() => {
    if (!showVideo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") handleClose();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showVideo]);

  if (loading) {
    return (
      <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-4 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 opacity-50 pointer-events-none select-none">
          <DashboardSkeleton />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pt-24">
          <PageLoader label="Loading dashboard..." icon={LayoutDashboard} />
        </div>
      </main>
    );
  }

  if (error || !dashboard) {
    return (
      <main className="bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          {error || "Dashboard unavailable."}
        </div>
      </main>
    );
  }

  const { profile, introVideo, about, techStack, quickAccess, quickLinks, socialLinks } =
    dashboard;

  return (
    <main className="bg-slate-50 dark:bg-slate-950 pt-24 pb-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:items-stretch">
          <aside className="lg:col-span-4 lg:self-start">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden w-full">
              <div className="group relative w-full aspect-[5/4] overflow-hidden">
                <img
                  src={profile.image}
                  alt={profile.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover object-[center_15%] transition-transform duration-500 ease-out group-hover:scale-125"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#3e0097]/50 via-[#3e0097]/10 to-transparent"
                />
              </div>

              <div className="px-5 sm:px-6 pb-6 pt-5">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {profile.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#3e0097] dark:text-indigo-300">
                    {profile.title}
                  </p>

                  {profile.statusLabel && (
                    <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {profile.statusLabel}
                    </div>
                  )}
                </div>

                <div className="mt-5 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  {profile.company && (
                    <div className="flex items-center gap-2.5">
                      <Briefcase size={15} className="text-slate-400 shrink-0" />
                      <span>
                        at{" "}
                        <a
                          href={profile.company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                        >
                          {profile.company.name}
                          <ExternalLink size={12} />
                        </a>
                      </span>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-2.5">
                      <MapPin size={15} className="text-slate-400 shrink-0" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    href={profile.workCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3e0097] hover:bg-[#32007a] text-white text-sm font-semibold min-h-11 py-2.5 px-4 transition-colors shadow-sm"
                  >
                    {profile.workCta.label}
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowVideo(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200/80 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium min-h-11 py-2.5 px-4 transition-all cursor-pointer group"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white group-hover:scale-110 transition-transform">
                      <Play size={12} className="ml-0.5" fill="currentColor" />
                    </span>
                    {profile.introCta.label}
                  </button>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    {socialLinks.map(({ href, label, icon, size, internal, download, cv }) =>
                      cv ? (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setShowCv(true)}
                          aria-label={label}
                          className="group flex shrink-0 items-center justify-center w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all cursor-pointer"
                          title={label}
                        >
                          <img src={icon} alt="" style={{ width: size, height: size }} className="object-contain" />
                        </button>
                      ) : internal || download ? (
                        <a
                          key={label}
                          href={href}
                          aria-label={label}
                          download={download || undefined}
                          className="group flex shrink-0 items-center justify-center w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all"
                          title={label}
                        >
                          <img src={icon} alt="" style={{ width: size, height: size }} className="object-contain" />
                        </a>
                      ) : (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="group flex shrink-0 items-center justify-center w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all"
                          title={label}
                        >
                          <img src={icon} alt="" style={{ width: size, height: size }} />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 flex flex-col gap-6 h-full">
            <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-8 text-center shrink-0">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                {about.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] text-justify">
                {about.text}
              </p>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  {techStack.title}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {techStack.items.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {quickAccess.title}
                </h2>
                <Link
                  href={quickAccess.viewAllHref}
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  {quickAccess.viewAllLabel}
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 flex-1 auto-rows-fr">
                {quickLinks.map(({ href, label, description, icon, accent }) => {
                  const Icon = QUICK_LINK_ICONS[icon] || Sparkles;

                  return (
                    <Link
                      key={href}
                      href={href}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 h-full min-h-[5.5rem]"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                      />
                      <div className="relative flex items-start gap-4 h-full">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                            {label}
                          </p>
                          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 description-text">
                            {description}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        <DashboardVisitorInfo />
      </div>

      {showVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close video"
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md animate-[video-backdrop-in_0.25s_ease-out]"
            onClick={handleClose}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Intro video"
            className="relative w-full max-w-4xl animate-[video-modal-in_0.3s_ease-out]"
          >
            <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#3e0097] via-indigo-500 to-violet-400 shadow-2xl shadow-indigo-950/40">
              <div className="rounded-[calc(1rem-1px)] overflow-hidden bg-slate-950">
                <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 border-b border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600/90 text-white shrink-0">
                      <Play size={16} className="ml-0.5" fill="currentColor" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-semibold text-white truncate">{introVideo.title}</p>
                      <p className="text-xs text-indigo-200/80 truncate hidden sm:block">
                        {introVideo.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative aspect-video w-full bg-black">
                  {!videoLoaded && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
                      <div className="relative w-14 h-14">
                        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30" />
                        <div className="absolute inset-0 rounded-full border-2 border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play size={18} className="text-indigo-300 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-indigo-200/70">Starting playback...</p>
                    </div>
                  )}

                  <iframe
                    src={introVideo.url}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                      videoLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    allowFullScreen
                    title={introVideo.title}
                    onLoad={() => setVideoLoaded(true)}
                  />
                </div>

                <div className="px-4 sm:px-5 py-3 border-t border-white/10 bg-slate-950/90">
                  <p className="text-[11px] text-slate-400 text-center">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">Esc</kbd> or click outside to close
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CvViewerModal open={showCv} onClose={() => setShowCv(false)} />
    </main>
  );
}
