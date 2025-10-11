"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 h-16 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Nav Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              className="hover:text-indigo-600 font-medium text-black"
            >
              Portfolio
            </Link>
            <Link
              href="/experience"
              className="hover:text-indigo-600 font-medium text-black"
            >
              Experience
            </Link>
            <Link
              href="/projects"
              className="hover:text-indigo-600 font-medium text-black"
            >
              Projects
            </Link>
            
            <Link
              href="/skills"
              className="hover:text-indigo-600 font-medium text-black"
            >
              Skills
            </Link>
            <Link
              href="/contact"
              className="hover:text-indigo-600 font-medium text-black"
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger menu button (left side) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Brand (logo on right side) */}
          <Link href="/contact" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Tasfia Tarannum"
              className="w-8 h-8 rounded-full object-cover border border-[#3e0097]"
            />
            <div className="flex flex-col leading-tight">
              <Link href="/">
                <span className="text-sm md:text-xl font-bold text-[#3e0097]">
                  Tasfia Tarannum
                </span>
              </Link>
              <span className="text-xs md:text-sm text-[#3e0097] font-medium md:ml-1 ">
                Applicant
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute left-0 right-auto top-16 mt-2 px-2 md:hidden bg-white rounded-2xl shadow-lg py-6 flex flex-col items-start w-full max-w-xs space-y-4 animate-fade-in z-50">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-900 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition"
            >
              Portfolio
            </Link>
            <Link
              href="/experience"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-900 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition"
            >
              Experience
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-900 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition"
            >
              Projects
            </Link>
            
            <Link
              href="/skills"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-900 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition"
            >
              Skills
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-900 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
