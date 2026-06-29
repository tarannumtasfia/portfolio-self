import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 sm:pt-24 pb-24 sm:pb-28 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-7rem)] sm:h-[calc(100vh-8rem)] flex flex-col">
        <Link
          href="/contact-info"
          className="inline-flex items-center gap-1.5 w-fit mb-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors shrink-0"
        >
          <ArrowLeft size={15} />
          Back to contact
        </Link>

        <div className="flex-1 min-h-[280px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <iframe
            src="https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh&z=20&output=embed"
            title="Location map"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <a
          href="https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-auto sm:min-w-[280px] z-40 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white font-semibold px-6 py-3.5 shadow-lg shadow-indigo-500/25 transition-all"
        >
          Open in Google Maps
          <ExternalLink size={16} />
        </a>
      </div>
    </main>
  );
}
