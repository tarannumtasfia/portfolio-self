import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import LiveCareerHero from "./LiveCareerHero";

export default function ExperienceSection({ data }) {
  const { header, careerHero, experiences, growthMessage, relatedLinks, labels } = data;
  const highlightsLabel = labels?.highlights || "Key contributions";
  const technologiesLabel = labels?.technologies || "Technologies";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {careerHero ? (
          <LiveCareerHero data={careerHero} />
        ) : (
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2">
              {header.eyebrow}
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {header.title}
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto description-text text-center">
              {header.description}
            </p>
          </header>
        )}

        <h2 className="sr-only">{header.title}</h2>

<div className="relative">
  <div
    aria-hidden
    className="absolute left-[1.65rem] top-4 bottom-4 w-px bg-gradient-to-b from-[#3e0097] via-indigo-400 to-transparent hidden sm:block"
  />

          <div className="space-y-5">
            {experiences.map((job, index) => (
              <article key={job.id} className="relative sm:pl-16">
                <div
                  aria-hidden
                  className="absolute left-4 top-8 hidden sm:flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-[#3e0097] to-indigo-600 ring-4 ring-slate-50 dark:ring-slate-950 shadow-md shadow-indigo-500/30"
                />

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:border-indigo-200/80 dark:hover:border-indigo-800 transition-all duration-300">
                  <div className="h-1.5 bg-gradient-to-r from-[#3e0097] via-indigo-600 to-violet-500" />

                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0 shadow-sm">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="w-11 h-11 object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {job.duration}
                          </span>
                          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                            {job.type}
                          </span>
                          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                            {job.workMode}
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                          {job.role}
                        </h2>
                        <p className="mt-1 text-base font-medium text-indigo-600 dark:text-indigo-400">
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {job.company}
                          </a>
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar size={14} className="text-slate-400" />
                            {job.period}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} className="text-slate-400" />
                            {job.location}
                          </span>
                        </div>

                        <p className="mt-5 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 description-text">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-3">
                          {highlightsLabel}
                        </h3>
                        <ul className="space-y-2.5">
                          {job.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400"
                            >
                              <CheckCircle2
                                size={15}
                                className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-3">
                          {technologiesLabel}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          {relatedLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={
                                link.primary
                                  ? "inline-flex items-center gap-1.5 min-h-11 px-3 text-sm font-semibold text-[#3e0097] dark:text-indigo-400 hover:underline"
                                  : "inline-flex items-center gap-1.5 min-h-11 px-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                              }
                            >
                              {link.label}
                              <ArrowRight size={14} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {index === 0 && experiences.length === 1 && growthMessage && (
                  <p className="mt-4 text-center sm:text-left text-xs text-slate-400 dark:text-slate-500 sm:pl-0">
                    {growthMessage}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
