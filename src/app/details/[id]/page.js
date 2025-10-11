import { notFound } from "next/navigation";
import Link from "next/link";

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
    logo: "/portfolio_img.jpg",
    description:
      "A full-stack application to manage users. Features include registration, login, and CRUD operations uisng postman.",
    iframeSrc: "https://crud-frontend-iota-one.vercel.app/",
    
  },
  {
  id: "courier",
  title: "Courier Package Tracker",
  role: "Real-Time Package Tracker",
  tags: ["Next.js", "Socket.IO", "MongoDB", "Tailwind"],
  logo: "/portfolio_img.jpg", // update this if you have a custom image
  description:
    "A real-time package tracking system with alerting and drill-down views for dispatchers.",
  iframeSrc: "https://courier-tracker-frontend-eosin.vercel.app/",
  bg: "bg-yellow-100",
},

];

export default function ProjectDetails({ params }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6 flex flex-col items-center">
      <Link
        href="/projects"
        className="mb-6 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        ← Back to Projects
      </Link>

      <h1 className="text-3xl font-bold mb-4 text-indigo-800">
        {project.title}
      </h1>
      <div className="w-full h-[100vh] bg-gradient-to-br from-sky-50 to-indigo-100 overflow-hidden">
    <iframe
      src={project.iframeSrc}
      className="w-full h-full"
      title={project.title}
      style={{ backgroundColor: "transparent" }}
    />
  </div>
    </main>
  );
}
