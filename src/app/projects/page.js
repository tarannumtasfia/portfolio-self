"use client";

import { useState } from "react";
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
      "A full-stack application to manage users. Features include registration, login, and CRUD operations using postman.",
    iframeSrc: "https://crud-frontend-iota-one.vercel.app/",
    bg: "bg-purple-100",
  },
  {
    id: "courier",
    title: "Courier Package Tracker",
    role: "Real-Time Package Tracker",
    tags: ["Next.js", "Socket.IO", "MongoDB", "Tailwind"],
    logo: "/portfolio_img.jpg",
    description:
      "A real-time package tracking system with alerting and drill-down views for dispatchers.",
    iframeSrc: "https://courier-tracker-frontend-eosin.vercel.app/",
    bg: "bg-yellow-100",
  },
];

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="2" width="14" height="2.5" rx="1" />
    <rect x="1" y="6.75" width="14" height="2.5" rx="1" />
    <rect x="1" y="11.5" width="14" height="2.5" rx="1" />
  </svg>
);

export default function Projects() {
  const [view, setView] = useState("grid");

  const activeBtn = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    border: "1px solid #4f46e5",
    background: "#4f46e5",
    color: "#ffffff",
    cursor: "pointer",
  };

  const inactiveBtn = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#4b5563",
    cursor: "pointer",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6 pt-20">
      {/* Header row */}
     <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end", marginBottom:"32px", paddingTop:"20px"}}>
  
  <div style={{display:"flex", gap:"8px"}}>
    <button onClick={() => setView("grid")} style={{padding:"8px 14px", background: view==="grid" ? "#4f46e5" : "#fff", color: view==="grid" ? "#fff" : "#374151", border:"1px solid #4f46e5", borderRadius:"8px", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px"}}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
      Grid
    </button>
    <button onClick={() => setView("list")} style={{padding:"8px 14px", background: view==="list" ? "#4f46e5" : "#fff", color: view==="list" ? "#fff" : "#374151", border:"1px solid #4f46e5", borderRadius:"8px", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px"}}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="2.5" rx="1"/><rect x="1" y="6.75" width="14" height="2.5" rx="1"/><rect x="1" y="11.5" width="14" height="2.5" rx="1"/></svg>
      List
    </button>
  </div>
</div>

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`relative ${project.bg} rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow border border-gray-100 flex flex-col min-h-[340px]`}
            >
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
      )}

      {/* List view */}
      {view === "list" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "80rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${project.bg} rounded-2xl shadow border border-gray-100 hover:shadow-lg transition-shadow`}
              style={{
                padding: "24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-bold text-xl text-gray-900" style={{ marginBottom: "4px" }}>
                  {project.role}
                </div>
                <div className="text-gray-700 text-sm" style={{ marginBottom: "12px" }}>
                  {project.description}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white rounded-full text-gray-600 text-sm font-medium shadow"
                      style={{ padding: "4px 12px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
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
      )}
    </main>
  );
}
