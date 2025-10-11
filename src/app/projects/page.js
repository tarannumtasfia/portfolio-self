"use client";

import Link from "next/link";

const projects = [
  {
    id: "todo",
    title: "To-Do List",
    role: "Task Manager App",
    tags: ["React", "Kanban", "Productivity"],
    logo: "/portfolio_img.jpg",
    description: "A Kanban board for managing tasks.",
    iframeSrc: "https://kanban-board-sigma-sepia.vercel.app/",
    bg: "bg-orange-100",
  },
  {
    id: "movie",
    title: "Movie website",
    role: "Movie Search App",
    tags: ["React", "API", "Movies"],
    logo: "/portfolio_img.jpg",
    description: "A simple movie website to search, view, and manage movies.",
    iframeSrc: "https://movie-app-ashen-iota-35.vercel.app/",
    bg: "bg-green-100",
  },
  {
    id: "eschool",
    title: "E-School Landing Page",
    role: "E School Landing Page",
    tags: ["HTML", "CSS", "Bootstrap"],
    logo: "/portfolio_img.jpg",
    description:
      "A static educational landing page built using HTML, CSS, and Bootstrap.",
    iframeSrc: "https://tarannumtasfia.github.io/e-school/",
    bg: "bg-blue-100",
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
    bg: "bg-purple-100",
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

export default function Projects() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-indigo-800 text-left">
        Project List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`relative ${project.bg} rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow border border-gray-100 flex flex-col min-h-[340px]`}
          >
            <div className="mt-8 font-semibold text-lg text-gray-800">
              {project.company}
            </div>
            <div className="font-bold text-2xl mt-2 mb-2 text-gray-900">
              {project.role}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white rounded-full px-3 py-1 text-gray-600 text-sm font-medium shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-4 text-gray-700 text-sm">
              {project.description}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <Link
                href={`/details/${project.id}`}
                className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
