"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, Lock, Upload, RotateCcw, X } from "lucide-react";
import { useCv } from "./CvProvider";

const CV_UPDATE_PIN = "2438";

export default function CvUpdateModal({ open, onClose }) {
  const inputRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [showPinWarning, setShowPinWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const { isCustom, fileName, uploading, message, uploadCv, resetCv, setMessage } = useCv();

  useEffect(() => {
    if (!open) {
      setUnlocked(false);
      setPin("");
      setShowPinWarning(false);
      setShowSuccess(false);
      setSuccessText("");
      setMessage("");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape" && !showPinWarning && !showSuccess) onClose();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, showPinWarning, showSuccess, setMessage]);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await uploadCv(file);
    if (result.ok) {
      setSuccessText(result.message || "Your CV has been updated successfully!");
      setShowSuccess(true);
    } else {
      setMessage(result.error || "Upload failed.");
    }

    event.target.value = "";
  }

  function handlePinSubmit(event) {
    event.preventDefault();
    if (pin === CV_UPDATE_PIN) {
      setUnlocked(true);
      setShowPinWarning(false);
      setPin("");
      return;
    }

    setShowPinWarning(true);
    setPin("");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close update CV dialog"
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md animate-[video-backdrop-in_0.25s_ease-out]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Update CV"
        className="relative w-full max-w-md animate-[video-modal-in_0.3s_ease-out]"
      >
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#3e0097] via-indigo-500 to-violet-400 shadow-2xl shadow-indigo-950/40">
          <div className="rounded-[calc(1rem-1px)] overflow-hidden bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white shrink-0">
                  {unlocked ? <FileText size={18} /> : <Lock size={18} />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Update CV</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {unlocked ? "Upload a new PDF" : "Enter PIN to continue"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              {!unlocked ? (
                <form onSubmit={handlePinSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="cv-update-pin"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
                    >
                      PIN
                    </label>
                    <input
                      id="cv-update-pin"
                      type="password"
                      inputMode="numeric"
                      autoComplete="off"
                      value={pin}
                      onChange={(event) => setPin(event.target.value)}
                      placeholder="Enter PIN"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!pin.trim()}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 hover:from-[#32007a] hover:to-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-3 transition-all cursor-pointer"
                  >
                    <Lock size={15} />
                    Verify PIN
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Current:{" "}
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {isCustom ? fileName || "Custom PDF" : "Default site CV"}
                    </span>
                  </p>

                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => inputRef.current?.click()}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3e0097] to-indigo-600 hover:from-[#32007a] hover:to-indigo-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-3 transition-all cursor-pointer"
                  >
                    <Upload size={15} />
                    {uploading ? "Uploading..." : "Choose PDF"}
                  </button>

                  {isCustom && (
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => resetCv()}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 text-sm font-medium px-4 py-3 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer disabled:opacity-60"
                    >
                      <RotateCcw size={14} />
                      Reset to default
                    </button>
                  )}

                  {message && (
                    <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">
                      {message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Dismiss success message"
            className="absolute inset-0 bg-slate-950/60"
            onClick={() => {
              setShowSuccess(false);
              onClose();
            }}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="cv-success-title"
            className="relative w-full max-w-sm rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900 shadow-2xl shadow-emerald-900/20 p-5 animate-[video-modal-in_0.25s_ease-out]"
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p id="cv-success-title" className="text-sm font-semibold text-slate-900 dark:text-white">
                  CV Updated
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {successText}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="mt-4 w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showPinWarning && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Dismiss warning"
            className="absolute inset-0 bg-slate-950/60"
            onClick={() => setShowPinWarning(false)}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="pin-warning-title"
            className="relative w-full max-w-sm rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-slate-900 shadow-2xl shadow-amber-900/20 p-5 animate-[video-modal-in_0.25s_ease-out]"
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p id="pin-warning-title" className="text-sm font-semibold text-slate-900 dark:text-white">
                  Incorrect PIN
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  The PIN you entered is wrong. Please try again.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowPinWarning(false)}
              className="mt-4 w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
