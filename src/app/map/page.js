import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-10 sm:pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 min-h-[calc(100dvh-6rem)]">
        <Link
          href="/contact-info"
          className="inline-flex items-center gap-1.5 w-fit rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors shrink-0 min-h-11"
        >
          <ArrowLeft size={15} />
          Back to contact
        </Link>

        <div className="flex-1 min-h-[min(60dvh,520px)] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <iframe
            src="https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh&z=20&output=embed"
            title="Location map"
            className="w-full h-full min-h-[280px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <a
          href="https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:self-center rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white font-semibold px-6 py-3.5 min-h-11 shadow-lg shadow-indigo-500/25 transition-all"
        >
          Open in Google Maps
          <ExternalLink size={16} />
        </a>
      </div>
    </main>
  );
}
