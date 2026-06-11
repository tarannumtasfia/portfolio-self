import { Suspense } from "react";
import BlogGrid from "./BlogGrid";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="space-y-6">
              <div className="h-24 rounded-2xl bg-slate-200/60 dark:bg-slate-800 animate-pulse" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-80 rounded-2xl bg-slate-200/60 dark:bg-slate-800 animate-pulse"
                  />
                ))}
              </div>
            </div>
          }
        >
          <BlogGrid />
        </Suspense>
      </div>
    </main>
  );
}
