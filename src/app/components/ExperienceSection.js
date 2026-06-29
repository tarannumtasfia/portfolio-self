import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const experiences = [
  {
    id: "fpt-is",
    role: "Junior Software Engineer",
    company: "FPT IS",
    type: "Full-time",
    period: "Apr 2025 — Present",
    startMonth: 4,
    startYear: 2025,
    duration: "Current role",
    location: "Banani, Dhaka, Bangladesh",
    workMode: "On-site",
    logo: "/fpt-is-logo.png",
    companyUrl: "https://fpt-is.com/en/",
    description:
      "I contribute to web development using JavaScript, Next.js, and Node.js, focusing on performance and user experience. Passionate about learning and growing as a full-stack developer.",
    highlights: [
      "Develop and maintain web applications with modern JavaScript frameworks",
      "Collaborate on performance-focused, user-centered product features",
      "Work with Next.js and Node.js in a professional engineering environment",
      "Continuously improve full-stack skills through real-world project delivery",
    ],
    technologies: ["JavaScript", "Next.js", "Node.js", "React", "Express.js"],
  },
];

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatYearsAndMonths(startYear, startMonth) {
  const start = new Date(startYear, startMonth - 1, 1);
  const now = new Date();
  let totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

  if (totalMonths < 0) totalMonths = 0;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mo`;
  if (months === 0) return `${years} yr`;
  return `${years} yr ${months} mo`;
}

function getTotalExperience() {
  const earliest = experiences.reduce((current, job) => {
    if (!job.startYear || !job.startMonth) return current;
    const jobStart = job.startYear * 12 + job.startMonth;
    if (!current || jobStart < current.start) {
      return { start: jobStart, year: job.startYear, month: job.startMonth };
    }
    return current;
  }, null);

  if (!earliest) return { value: "—", detail: "" };

  return {
    value: formatYearsAndMonths(earliest.year, earliest.month),
    detail: `Since ${MONTH_NAMES[earliest.month - 1]} ${earliest.year}`,
  };
}

const experienceSummary = getTotalExperience();

const stats = [
  { label: "Roles", value: "1", icon: Briefcase },
  { label: "Experience", value: experienceSummary.value, detail: experienceSummary.detail, icon: Calendar },
  { label: "Work mode", value: "On-site", icon: Building2 },
  { label: "Location", value: "Dhaka", icon: MapPin },
];

export default function ExperienceSection() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2">
            Career
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Experience
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto description-text">
            My professional journey — roles, responsibilities, and the technologies
            I work with day to day.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, detail, icon: Icon }) => (
            <div
              key={label}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                  {detail && (
                    <p className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 mt-0.5">
                      {detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[1.65rem] top-4 bottom-4 w-px bg-gradient-to-b from-[#3e0097] via-indigo-400 to-transparent hidden sm:block"
          />

          <div className="space-y-8">
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
                          Key contributions
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
                          Technologies
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
                          <Link
                            href="/projects"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3e0097] dark:text-indigo-400 hover:underline"
                          >
                            View related projects
                            <ArrowRight size={14} />
                          </Link>
                          <Link
                            href="/skills"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                          >
                            See all skills
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {index === 0 && experiences.length === 1 && (
                  <p className="mt-4 text-center sm:text-left text-xs text-slate-400 dark:text-slate-500 sm:pl-0">
                    More roles will appear here as my career grows.
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
