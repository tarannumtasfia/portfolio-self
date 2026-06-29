import { Suspense } from "react";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="h-24 rounded-2xl bg-slate-200/60 dark:bg-slate-800 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-80 rounded-2xl bg-slate-200/60 dark:bg-slate-800 animate-pulse"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <ProjectsGrid />
    </Suspense>
  );
}
