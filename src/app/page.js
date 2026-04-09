"use client";

import Navbar from "./components/Navbar";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const playerRef = useRef(null);

  const handleClose = () => {
    setShowVideo(false);
    setVideoReady(false);
  };

  useEffect(() => {
    if (!showVideo) return;

    // Load Vimeo SDK dynamically
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = () => {
      const player = new window.Vimeo.Player(playerRef.current);
      // "loaded" fires when video metadata + first frame are ready
      player.on("loaded", () => setVideoReady(true));
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [showVideo]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 pt-16">
      <Navbar />
      <div className="p-6 flex flex-col md:flex-row items-center md:items-start max-w-5xl mx-auto gap-10">
        {/* Left image */}
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
              <p className="text-lg font-bold text-[#3e0097]">Junior Software Engineer</p>
              <p className="text-base text-gray-600">
                at{" "}
                <a
                  href="https://fpt-is.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  FPT IS
                </a>
              </p>
              <p className="text-sm text-gray-500">Banani, Dhaka</p>
            </div>
          </div>

          <Link href="/contact">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg w-fit shadow transition">
              Work with me
            </button>
          </Link>

          <p className="text-gray-700 text-sm text-justify">
            I'm a Junior Software Engineer based in Bangladesh, currently working with modern
            technologies like React, Next.js, Node.js, and Express.js. I am passionate about
            building clean, efficient, and user-focused web applications. My goal is to
            continuously grow as a developer and contribute meaningfully to impactful projects
            through creativity, collaboration, and problem-solving.
          </p>

          <div className="flex space-x-4 mt-2">
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/tasfiatarannum" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-115 p-2 transition flex items-center justify-center">
              <img src="/linkedin-icon.png" alt="LinkedIn Icon" style={{ width: "30px", height: "30px" }} />
            </a>
            {/* GitHub */}
            <a href="https://github.com/tarannumtasfia" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:scale-115 p-2 transition">
              <img src="/github-icon.png" alt="Github Icon" style={{ width: "28px", height: "28px" }} />
            </a>
            {/* LeetCode */}
            <a href="https://leetcode.com/u/tasfiatarannum/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="hover:scale-115 p-2 transition flex items-center justify-center">
              <img src="/leetcode-icon.png" alt="LeetCode Icon" style={{ width: "28px", height: "28px" }} />
            </a>
            {/* Map */}
            <a href="/map" aria-label="Map" className="hover:scale-115 p-2 transition flex items-center justify-center">
              <img src="/map-icon.png" alt="Map Icon" style={{ width: "28px", height: "28px" }} />
            </a>
            {/* CV */}
            <a href="/tasfia_cv.pdf" aria-label="Download CV" className="hover:scale-115 p-2 transition flex items-center justify-center" download>
              <img src="/cv-icon.png" alt="CV Icon" style={{ width: "32px", height: "32px" }} />
            </a>
            {/* Video */}
            <button
              onClick={() => setShowVideo(true)}
              aria-label="Intro Video"
              className="hover:scale-115 p-2 transition flex items-center justify-center"
            >
              <img src="/youtube-icon.png" alt="YouTube Icon" style={{ width: "36px", height: "36px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${showVideo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={handleClose}
      >
        <div
          className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition"
          >
            <X size={18} />
          </button>

          {/* Video wrapper */}
          <div className="aspect-video w-full bg-black relative">

            {/* Loader — shown until Vimeo SDK fires "loaded" */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black z-10 transition-opacity duration-500 ${videoReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              {/* Animated ring */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              </div>
              {/* Loading text */}
              <p className="mt-4 text-white/60 text-sm tracking-widest uppercase animate-pulse">
                Loading video...
              </p>
            </div>

            {/* iframe — always mounted when modal is open so SDK can attach */}
            {showVideo && (
              <iframe
                ref={playerRef}
                src="https://player.vimeo.com/video/1180078365?autoplay=1&autopause=0"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Intro Video"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}