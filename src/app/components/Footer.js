import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-3">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-300">
          <span className="whitespace-nowrap">
            © {new Date().getFullYear()} Portfolio — Built with Next.js
          </span>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/tarannumtasfia"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/tasfiatarannum"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:tasfiatarannum@yahoo.com"
              className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}