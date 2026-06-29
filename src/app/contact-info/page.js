"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const contactRows = [
  {
    label: "Email",
    value: "tasfiatarannum@yahoo.com",
    href: "mailto:tasfiatarannum@yahoo.com",
    imgSrc: "/mail-icon.png",
    accent: "from-indigo-500/15 to-violet-500/15 dark:from-indigo-500/25 dark:to-violet-500/25",
    ring: "ring-indigo-200/60 dark:ring-indigo-800/60",
  },
  {
    label: "Phone",
    value: "+880 1701 442277",
    href: "tel:+8801701442277",
    imgSrc: "/call-icon.png",
    accent: "from-emerald-500/15 to-teal-500/15 dark:from-emerald-500/25 dark:to-teal-500/25",
    ring: "ring-emerald-200/60 dark:ring-emerald-800/60",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tasfiatarannum",
    href: "https://linkedin.com/in/tasfiatarannum",
    imgSrc: "/linkedin-icon.png",
    external: true,
    accent: "from-sky-500/15 to-blue-500/15 dark:from-sky-500/25 dark:to-blue-500/25",
    ring: "ring-sky-200/60 dark:ring-sky-800/60",
  },
  {
    label: "Address",
    value: "Block-A, Aftabnagar, Rampura, Dhaka, Bangladesh",
    href: "https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh",
    imgSrc: "/location-icon.png",
    external: true,
    accent: "from-rose-500/15 to-orange-500/15 dark:from-rose-500/25 dark:to-orange-500/25",
    ring: "ring-rose-200/60 dark:ring-rose-800/60",
  },
  {
    label: "Website",
    value: "portfolio-self-alpha-ten.vercel.app",
    href: "https://portfolio-self-alpha-ten.vercel.app",
    imgSrc: "/globe-icon.png",
    external: true,
    accent: "from-violet-500/15 to-purple-500/15 dark:from-violet-500/25 dark:to-purple-500/25",
    ring: "ring-violet-200/60 dark:ring-violet-800/60",
  },
  {
    label: "Blog",
    value: "medium.com/@tasfiatarannum",
    href: "https://medium.com/@tasfiatarannum",
    imgSrc: "/book-icon.png",
    external: true,
    accent: "from-amber-500/15 to-yellow-500/15 dark:from-amber-500/25 dark:to-yellow-500/25",
    ring: "ring-amber-200/60 dark:ring-amber-800/60",
  },
];

const socialIcons = [
  { href: "https://linkedin.com/in/tasfiatarannum", src: "/linkedin-icon.png", label: "LinkedIn", size: 24 },
  { href: "https://github.com/tarannumtasfia", src: "/github-icon.png", label: "GitHub", size: 22 },
  { href: "https://leetcode.com/u/tasfiatarannum/", src: "/leetcode-icon.png", label: "LeetCode", size: 22 },
  { href: "/map", src: "/map-icon.png", label: "Location", size: 22, internal: true },
];

export default function ContactInfo() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-24 sm:py-28 overflow-hidden transition-colors duration-300 bg-gradient-to-br from-indigo-50 via-white to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-indigo-300/10 dark:bg-indigo-600/5 blur-3xl"
      />

      <div className="relative w-full max-w-lg">
        <div className="rounded-[1.75rem] p-[1px] bg-gradient-to-br from-[#3e0097] via-indigo-500 to-violet-400 shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-950/50">
          <div className="rounded-[calc(1.75rem-1px)] overflow-hidden bg-white dark:bg-slate-900">
            {/* Header banner */}
            <div className="relative px-6 sm:px-8 pt-8 sm:pt-9 pb-24 sm:pb-28 text-center bg-gradient-to-br from-[#3e0097] via-indigo-700 to-violet-500 overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                aria-hidden
                className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10 blur-2xl"
              />
              <div
                aria-hidden
                className="absolute -left-8 bottom-0 w-28 h-28 rounded-full bg-violet-300/20 blur-xl"
              />

              <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-200/90">
                Get in touch
              </p>
              <h1 className="relative mt-2 text-2xl sm:text-[1.65rem] font-bold text-white tracking-tight">
                Contact Me
              </h1>
              <p className="relative mt-2 text-sm text-white/75 max-w-xs mx-auto description-text">
                Let&apos;s connect — I&apos;d love to hear from you.
              </p>

              <svg
                className="absolute bottom-0 left-0 w-full text-white dark:text-slate-900"
                viewBox="0 0 1440 48"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z"
                />
              </svg>
            </div>

            {/* Profile */}
            <div className="relative flex flex-col items-center px-8 pb-1">
              <div className="relative -mt-[4.5rem] sm:-mt-[5.5rem] z-10">
                <div className="relative mx-auto w-fit group">
                  <div
                    aria-hidden
                    className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#3e0097]/35 via-indigo-500/25 to-violet-400/35 blur-xl opacity-90"
                  />

                  <div className="relative rounded-full p-[3px] bg-gradient-to-br from-[#3e0097] via-indigo-500 to-violet-400 shadow-xl shadow-indigo-500/30">
                    <div className="rounded-full p-[4px] bg-white dark:bg-slate-900">
                      <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-slate-800 dark:to-indigo-950">
                        <img
                          src="/portfolio_img.jpg"
                          alt="Tasfia Tarannum"
                          className="w-full h-full object-cover object-[center_18%] scale-[1.2] group-hover:scale-[1.28] transition-transform duration-500 ease-out"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                Tasfia Tarannum
              </h2>
              <p className="mt-1 text-sm font-semibold text-[#3e0097] dark:text-indigo-300">
                Junior Software Engineer
              </p>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed description-text">
                Reach out for job opportunities, collaborations, or a friendly hello.
              </p>
            </div>

            {/* Contact rows */}
            <div className="mt-6 px-4 sm:px-6 space-y-2.5">
              {contactRows.map(({ label, value, href, imgSrc, external, accent, ring }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/70 hover:border-indigo-200/80 dark:hover:border-indigo-800/60 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200"
                >
                  <span
                    className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${accent} ring-1 ${ring} shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <img src={imgSrc} alt="" className="w-5 h-5 object-contain" />
                  </span>
                  <span className="flex-1 min-w-0 text-left">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                      {label}
                    </span>
                    <span className="block mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-[#3e0097] dark:group-hover:text-indigo-300 transition-colors break-words leading-snug">
                      {value}
                    </span>
                  </span>
                  {external && (
                    <ExternalLink
                      size={14}
                      className="shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA + social */}
            <div className="px-6 pb-8 pt-5 mt-2">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all bg-gradient-to-r from-[#3e0097] to-indigo-600"
              >
                Send me a message
                <ArrowRight size={16} />
              </Link>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 text-center mb-3">
                  Connect
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {socialIcons.map(({ href, src, label, size, internal }) =>
                    internal ? (
                      <Link
                        key={label}
                        href={href}
                        aria-label={label}
                        title={label}
                        className="flex items-center justify-center w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:scale-105 transition-all"
                      >
                        <img src={src} alt="" style={{ width: size, height: size }} />
                      </Link>
                    ) : (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="flex items-center justify-center w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:scale-105 transition-all"
                      >
                        <img src={src} alt="" style={{ width: size, height: size }} />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
