"use client";

import { useEffect, useState } from "react";

function getDurationParts(startDate, now) {
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime()) || now < start) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

function DurationTile({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-700 shadow-sm px-1.5 sm:px-2 py-2.5 sm:py-3.5 min-h-[3.75rem] sm:min-h-[4.25rem] transition-all duration-200 hover:shadow-md hover:border-[#3e0097]/50 dark:hover:border-indigo-500 hover:-translate-y-0.5">
      <span className="text-lg sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white leading-none">
        {value}
      </span>
      <span className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#3e0097] dark:text-indigo-400 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function LiveCareerHero({ data }) {
  const [parts, setParts] = useState(() =>
    getDurationParts(
      data.careerStart,
      data.careerEnd ? new Date(data.careerEnd) : new Date()
    )
  );

  useEffect(() => {
    const tick = () =>
      setParts(
        getDurationParts(
          data.careerStart,
          data.careerEnd ? new Date(data.careerEnd) : new Date()
        )
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [data.careerStart]);

  const units = data.units || {};
  const tiles = [
    { key: "years", value: parts.years, label: units.years || "Years" },
    { key: "months", value: parts.months, label: units.months || "Months" },
    { key: "days", value: parts.days, label: units.days || "Days" },
    { key: "hours", value: parts.hours, label: units.hours || "Hours" },
    { key: "minutes", value: parts.minutes, label: units.minutes || "Minutes" },
    { key: "seconds", value: parts.seconds, label: units.seconds || "Seconds" },
  ];

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-indigo-100/90 dark:border-slate-800 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 shadow-sm mb-4 sm:mb-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-16 h-56 w-56 rounded-full bg-[#3e0097]/15 dark:bg-[#3e0097]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-indigo-300/25 dark:bg-indigo-500/10 blur-3xl"
      />

      <div className="relative grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-8 p-4 sm:p-5 lg:p-6">
        <div className="min-w-0 flex flex-col justify-center">
          <h1
            className="text-2xl sm:text-3xl lg:text-[2.75rem] font-semibold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            <span className="text-slate-900 dark:text-white">{data.titlePrefix}</span>{" "}
            <span className="text-[#3e0097] dark:text-indigo-400">{data.titleHighlight}</span>
          </h1>
          <p className="mt-1.5 text-sm sm:text-base font-semibold text-[#3e0097]/90 dark:text-indigo-300">
            {data.subtitle}
          </p>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
            {data.description}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-end gap-2 mb-3">
            <span className="h-px w-4 bg-indigo-300/80 dark:bg-indigo-700" />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#3e0097] dark:text-indigo-400">
              {data.totalLabel}
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-100/80 dark:border-slate-700 bg-indigo-50/60 dark:bg-slate-950/40 p-3 sm:p-4 shadow-inner">
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {tiles.slice(0, 3).map((tile) => (
                <DurationTile key={tile.key} value={tile.value} label={tile.label} />
              ))}
            </div>

            <div className="flex items-center gap-3 my-3 sm:my-3.5">
              <div className="h-px flex-1 bg-indigo-200/80 dark:bg-slate-700" />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#3e0097] dark:text-indigo-300 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                {data.liveLabel}
              </span>
              <div className="h-px flex-1 bg-indigo-200/80 dark:bg-slate-700" />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {tiles.slice(3).map((tile) => (
                <DurationTile key={tile.key} value={tile.value} label={tile.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
