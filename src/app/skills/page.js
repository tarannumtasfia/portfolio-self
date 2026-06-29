import Link from "next/link";
import StandoutCarousel from "../components/StandoutCarousel";
import { Code2, Server, Brain, Wrench, Database, ArrowRight } from "lucide-react";

const skillCategories = [
  {
    category: "Frontend",
    icon: Code2,
    skills: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend & Languages",
    icon: Server,
    skills: ["Node.js", "Express.js", "C#", "Python", "Django"],
  },
  {
    category: "SQL & Databases",
    icon: Database,
    skills: ["MS SQL Server", "SQL Queries", "Schema Comparison", "Job Data", "MongoDB"],
  },
  {
    category: "Concepts",
    icon: Brain,
    skills: ["Data Structures", "Algorithms", "OOP", "SOLID", "Design Patterns", "HTTP"],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["VS Code", "GitHub", "Postman", "Figma", "LeetCode"],
  },
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-1">
            Expertise
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Skills
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto description-text">
            250+ algorithms solved, SQL & C# expertise, and modern full-stack development.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { value: "250+", label: "Algorithms" },
              { value: "SQL", label: "Queries & schemas" },
              { value: "C#", label: "OOP" },
              { value: "React", label: "Frontend" },
            ].map(({ value, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-3 py-1.5 text-xs shadow-sm"
              >
                <span className="font-bold text-[#3e0097] dark:text-indigo-400">{value}</span>
                <span className="text-slate-500 dark:text-slate-400">{label}</span>
              </span>
            ))}
          </div>
        </header>

        <StandoutCarousel />

        <section className="mt-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">All skills</h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3e0097] dark:text-indigo-400 hover:underline shrink-0"
            >
              View projects
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {skillCategories.map(({ category, icon: Icon, skills }) => (
              <div
                key={category}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <Icon size={15} className="text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/projects"
            className="font-semibold text-[#3e0097] dark:text-indigo-400 hover:underline"
          >
            Projects
          </Link>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <Link
            href="/experience"
            className="font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300"
          >
            Experience
          </Link>
        </div>
      </div>
    </main>
  );
}
