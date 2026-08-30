import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";

const MAP_EMBED =
  "https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh&z=17&output=embed";
const MAP_LINK = "https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh";

export default function MapPage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 pt-20 pb-6 sm:pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
          <Link
            href="/contact-info"
            className="inline-flex items-center gap-1.5 w-fit rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors min-h-11"
          >
            <ArrowLeft size={15} />
            Back to contact
          </Link>

          <div className="min-w-0 sm:flex-1 sm:px-4 sm:text-center">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
              <MapPin size={15} className="text-[#3e0097] dark:text-indigo-400 shrink-0" />
              <span className="break-words">BTI Chorus, Dhaka, Bangladesh</span>
            </p>
          </div>

          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 text-white text-sm font-semibold px-4 py-2.5 min-h-11 shadow-sm transition-all shrink-0"
          >
            Open in Google Maps
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="relative w-full h-[calc(100dvh-14rem)] sm:h-[calc(100dvh-10.5rem)] min-h-[240px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <iframe
            src={MAP_EMBED}
            title="Location map — BTI Chorus, Dhaka"
            className="absolute inset-0 h-full w-full border-0"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}
