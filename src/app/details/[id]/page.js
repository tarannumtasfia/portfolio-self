import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "todo",
    title: "To-Do List",
    role: "Task Manager App",
    tags: ["React", "Kanban", "Productivity"],
    iframeSrc: "https://kanban-board-sigma-sepia.vercel.app/",
  },
  {
    id: "movie",
    title: "Movie website",
    role: "Movie Search App",
    tags: ["React", "API", "Movies"],
    iframeSrc: "https://movie-app-ashen-iota-35.vercel.app/",
  },
  {
    id: "eschool",
    title: "E-School Landing Page",
    role: "E School Landing Page",
    tags: ["HTML", "CSS", "Bootstrap"],
    iframeSrc: "https://tarannumtasfia.github.io/e-school/",
  },
  {
    id: "crudapp",
    title: "Full-Stack CRUD App",
    role: "User Management System",
    tags: ["React", "MongoDB", "Express", "Node.js"],
    iframeSrc: "https://crud-frontend-iota-one.vercel.app/",
  },
  {
    id: "courier",
    title: "Courier Package Tracker",
    role: "Real-Time Package Tracker",
    tags: ["Next.js", "Socket.IO", "MongoDB", "Tailwind"],
    iframeSrc: "https://courier-tracker-frontend-eosin.vercel.app/",
  },
];

export default function ProjectDetails({ params }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 sm:pt-24 pb-4 sm:pb-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-5rem)] sm:h-[calc(100vh-6.5rem)] flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 shrink-0">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 w-fit rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Projects
          </Link>

          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white truncate">
              {project.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{project.role}</p>
          </div>

          <a
            href={project.iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white text-sm font-semibold px-4 py-2.5 shadow-sm transition-all"
          >
            Open live demo
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="flex-1 min-h-0 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <iframe
            src={project.iframeSrc}
            className="w-full h-full min-h-[320px]"
            title={project.title}
          />
        </div>
      </div>
    </main>
  );
}
