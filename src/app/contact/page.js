"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Zap,
} from "lucide-react";

const highlights = [
  {
    icon: Briefcase,
    label: "Open to work",
    text: "Full-time & freelance roles",
    accent: "from-violet-500/20 to-indigo-500/20 dark:from-violet-500/30 dark:to-indigo-500/30",
  },
  {
    icon: Clock,
    label: "Fast response",
    text: "Reply within 24–48 hours",
    accent: "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/30 dark:to-teal-500/30",
  },
  {
    icon: Zap,
    label: "What I build",
    text: "Web apps, APIs & full-stack products",
    accent: "from-amber-500/20 to-orange-500/20 dark:from-amber-500/30 dark:to-orange-500/30",
  },
];

const perks = [
  "Clean, modern UI development",
  "React, Next.js & Node.js stack",
  "Reliable communication",
];

const techTags = ["React", "Next.js", "Node.js", "Python", "Django", "MongoDB"];

export default function Contact() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-purple-400/25 dark:bg-purple-600/15 blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-400/25 dark:bg-indigo-600/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-300/15 dark:bg-violet-600/10 blur-3xl"
      />

      <div className="relative w-full max-w-4xl">
        <div className="rounded-[1.75rem] p-[1px] bg-gradient-to-br from-[#3e0097] via-indigo-500 to-violet-400 shadow-2xl shadow-indigo-500/25 dark:shadow-indigo-950/60">
          <div className="rounded-[calc(1.75rem-1px)] overflow-hidden bg-white dark:bg-slate-900">
            <div className="lg:grid lg:grid-cols-5">
              {/* Left panel — intro */}
              <aside className="lg:col-span-2 relative bg-gradient-to-br from-[#3e0097] via-indigo-700 to-violet-600 text-white overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-2xl"
                />
                <div
                  aria-hidden
                  className="absolute -left-10 bottom-10 w-36 h-36 rounded-full bg-violet-300/20 blur-2xl"
                />

                <div className="relative p-6 sm:p-8 lg:p-9 flex flex-col items-center lg:items-start text-center lg:text-left h-full">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-200/90">
                    Work together
                  </p>
                  <h1 className="mt-2 text-3xl sm:text-[2rem] font-bold tracking-tight leading-tight">
                    Hire{" "}
                    <span className="bg-gradient-to-r from-white via-indigo-100 to-violet-200 bg-clip-text text-transparent">
                      Me
                    </span>
                  </h1>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-xs description-text lg:mx-0 mx-auto">
                    Have a role, project, or collaboration in mind? Send a message — I&apos;d love
                    to connect.
                  </p>

                  <div className="mt-6 relative group">
                    <div
                      aria-hidden
                      className="absolute -inset-3 rounded-full bg-white/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="relative rounded-full p-[3px] bg-gradient-to-br from-white/80 via-indigo-200/80 to-violet-200/80 shadow-xl">
                      <div className="rounded-full p-[4px] bg-[#3e0097]">
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden">
                          <img
                            src="/portfolio_img.jpg"
                            alt="Tasfia Tarannum"
                            className="w-full h-full object-cover object-[center_18%] scale-[1.2] group-hover:scale-[1.28] transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-lg font-bold">Tasfia Tarannum</p>
                    <p className="text-sm text-indigo-200 font-medium">Junior Software Engineer</p>
                  </div>

                  <ul className="mt-6 space-y-2.5 w-full">
                    {perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-white/90">
                        <CheckCircle2 size={15} className="text-emerald-300 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-1.5 w-full">
                    {techTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Right panel — form */}
              <div className="lg:col-span-3 flex flex-col">
                <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-7 pb-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50/80 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/20">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3e0097] to-indigo-600 text-white shadow-lg shadow-indigo-500/25 shrink-0">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Send a message
                      </h2>
                      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                        Tell me about your opportunity — I&apos;ll reply soon.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {highlights.map(({ icon: Icon, label, text, accent }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md hover:border-indigo-200/80 dark:hover:border-indigo-800/60 transition-all"
                      >
                        <span
                          className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${accent} text-indigo-600 dark:text-indigo-400 shrink-0`}
                        >
                          <Icon size={16} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                            {label}
                          </p>
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
                            {text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 px-4 sm:px-6 md:px-8 py-5 pb-8">
                  <div className="rounded-2xl p-[1px] bg-gradient-to-br from-indigo-200/80 via-violet-200/60 to-purple-200/80 dark:from-indigo-800/60 dark:via-violet-800/40 dark:to-purple-800/40">
                    <div className="rounded-[calc(1rem-1px)] overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                      <iframe
                        src="https://contact-form-iota-opal.vercel.app/"
                        title="Contact form"
                        className="w-full h-[min(70vh,560px)] sm:h-[min(62vh,520px)] border-0 bg-white dark:bg-slate-900"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 text-center sm:text-left">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 shrink-0">
                        <Mail size={18} className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Prefer email?
                        </p>
                        <a
                          href="mailto:tasfiatarannum@yahoo.com"
                          className="text-sm font-semibold text-[#3e0097] dark:text-indigo-300 hover:underline"
                        >
                          tasfiatarannum@yahoo.com
                        </a>
                      </div>
                    </div>
                    <Link
                      href="/contact-info"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all"
                    >
                      View contact card
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
