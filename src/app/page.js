"use client";

import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 pt-16">
      <Navbar />
      <div className="p-6 flex flex-col md:flex-row items-center md:items-start max-w-5xl mx-auto gap-10">
        {/* Left image placeholder */}
        <div className="w-64 h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
          <img
            src="/portfolio_img.jpg"
            alt="Portfolio"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-115"
          />
        </div>

        {/* Right profile info */}
        <div className="flex flex-col space-y-6 max-w-md">
          <div className="flex flex-col space-y-6 max-w-md">
            <div>
              <p className="text-lg font-bold text-[#3e0097]">
                Junior Software Engineer
              </p>
              <p className="text-base text-gray-600">at FPT IS</p>
              <p classNamExperiencee="text-sm text-gray-500">Banani, Dhaka</p>
            </div>
          </div>

          <Link href="/contact">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg w-fit shadow transition">
              Work with me
            </button>
          </Link>

          <p className="text-gray-700 text-sm text-justify">
            I'm a Junior Software Engineer based in Bangladesh, currently
            working with modern technologies like React, Next.js, Node.js, and
            Express.js. I am passionate about building clean, efficient, and
            user-focused web applications. My goal is to continuously grow as a
            developer and contribute meaningfully to impactful projects through
            creativity, collaboration, and problem-solving.
          </p>

          <div>
            <span className="text-xs text-gray-500 tracking-widest">WORK</span>
            <div className="text-sm text-gray-700 mt-1">Bulipe Tech</div>
          </div>

          <div className="flex space-x-4 mt-2">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/tasfiatarannum"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-115 p-2 transition flex items-center justify-center"
            >
              <img
                src="/linkedin-icon.png"
                alt="LinkedIn Icon"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </a>
            {/* Facebook */}
            {/* <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-white shadow hover:bg-indigo-50 p-2 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-indigo-700"
              >
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.771c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.733-.592-1.326-1.325-1.326z" />
              </svg>
            </a> */}

            {/* GitHub */}
            <a
              href="https://github.com/tarannumtasfia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:scale-115  p-2 transition"
            >
              <img
                src="/github-icon.png"
                alt="Github Icon"
                style={{
                  width: "28px",
                  height: "28px",
                }}
              />
            </a>

            {/* LeetCode */}
            <a
              href="https://leetcode.com/u/tasfiatarannum/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              className="hover:scale-115 p-2 transition flex items-center justify-center"
            >
              <img
                src="/leetcode-icon.png"
                alt="LeetCode Icon"
                style={{
                  width: "28px",
                  height: "28px",
                }}
              />
            </a>
            {/* Map Icon */}
            <a
              href="/map"
              aria-label="Map"
              className=" hover:scale-115 p-2 transition flex items-center justify-center"
            >
              <img
                src="/map-icon.png"
                alt="Map Icon"
                style={{
                  width: "28px",
                  height: "28px",
                }}
              />
            </a>
            {/* CV Icon */}
            <a
              href="/CV.pdf"
              aria-label="Download CV"
              className="hover:scale-115 p-2 transition flex items-center justify-center"
              download
            >
              <img
                src="/cv-icon.png"
                alt="CV Icon"
                style={{
                  width: "32px",
                  height: "32px",
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
