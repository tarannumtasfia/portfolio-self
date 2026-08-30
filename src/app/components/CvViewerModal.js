"use client";

import { useCv, CV_DOWNLOAD_NAME } from "./CvProvider";
import { X, FileText, Download } from "lucide-react";
import { useEffect } from "react";

export { CV_DOWNLOAD_NAME };

export default function CvViewerModal({ open, onClose }) {
  const { cvUrl } = useCv();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close CV viewer"
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md animate-[video-backdrop-in_0.25s_ease-out]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="CV viewer"
        className="relative w-full max-w-4xl h-[min(92vh,860px)] flex flex-col animate-[video-modal-in_0.3s_ease-out]"
      >
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#3e0097] via-indigo-500 to-violet-400 shadow-2xl shadow-indigo-950/40 flex flex-col min-h-0 h-full">
          <div className="rounded-[calc(1rem-1px)] overflow-hidden bg-slate-950 flex flex-col min-h-0 h-full">
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600/90 text-white shrink-0">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-semibold text-white truncate">Curriculum Vitae</p>
                  <p className="text-xs text-indigo-200/80 truncate hidden sm:block">
                    Tasfia Tarannum — Junior Software Engineer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={cvUrl}
                  download={CV_DOWNLOAD_NAME}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 hover:from-[#32007a] hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 shadow-sm transition-all"
                >
                  <Download size={15} />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">Save</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-0 bg-slate-100 dark:bg-slate-900">
              <iframe
                key={cvUrl}
                src={`${cvUrl}#view=FitH&toolbar=0`}
                title="Tasfia Tarannum CV"
                className="absolute inset-0 w-full h-full border-0 bg-white"
              />
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-white/10 bg-slate-950/90 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-[11px] text-slate-400 text-center sm:text-left">
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">
                  Esc
                </kbd>{" "}
                or click outside to close
              </p>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200 hover:underline"
              >
                Open PDF in new tab
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
