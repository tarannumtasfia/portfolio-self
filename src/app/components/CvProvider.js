"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearStoredCv, loadStoredCv, saveStoredCv } from "../lib/cvStorage";

export const DEFAULT_CV_PATH = "/tasfia_cv.pdf";
export const CV_DOWNLOAD_NAME = "Tasfia_Tarannum_CV.pdf";

const CvContext = createContext(null);

export function CvProvider({ children }) {
  const [cvUrl, setCvUrl] = useState(DEFAULT_CV_PATH);
  const [isCustom, setIsCustom] = useState(false);
  const [fileName, setFileName] = useState("");
  const [ready, setReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let objectUrl = null;

    async function hydrate() {
      const blob = await loadStoredCv();
      if (blob) {
        objectUrl = URL.createObjectURL(blob);
        setCvUrl(objectUrl);
        setIsCustom(true);
        setFileName(blob.name || "custom-cv.pdf");
      }
      setReady(true);
    }

    hydrate();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  const uploadCv = useCallback(async (file) => {
    if (!file) return { ok: false, error: "No file selected." };
    if (file.type !== "application/pdf") {
      return { ok: false, error: "Please choose a PDF file." };
    }
    if (file.size > 10 * 1024 * 1024) {
      return { ok: false, error: "PDF must be 10 MB or smaller." };
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      let serverUpdated = false;
      try {
        const response = await fetch("/api/cv", { method: "POST", body: formData });
        if (response.ok) {
          serverUpdated = true;
        }
      } catch {
        // Offline or production read-only — fall back to browser storage.
      }

      if (serverUpdated) {
        await clearStoredCv();
        setCvUrl(`${DEFAULT_CV_PATH}?v=${Date.now()}`);
        setIsCustom(false);
        setFileName(file.name);
        setMessage("CV updated on site.");
        return { ok: true, message: "Your CV has been updated successfully!" };
      }

      await saveStoredCv(file);
      setCvUrl((current) => {
        if (current.startsWith("blob:")) URL.revokeObjectURL(current);
        return URL.createObjectURL(file);
      });
      setIsCustom(true);
      setFileName(file.name);
      setMessage("CV saved in this browser.");
      return { ok: true, message: "Your CV has been saved successfully for this browser!" };
    } catch {
      return { ok: false, error: "Could not save CV. Try again." };
    } finally {
      setUploading(false);
    }
  }, []);

  const resetCv = useCallback(async () => {
    setUploading(true);
    setMessage("");

    try {
      await clearStoredCv();
      setCvUrl((current) => {
        if (current.startsWith("blob:")) URL.revokeObjectURL(current);
        return `${DEFAULT_CV_PATH}?v=${Date.now()}`;
      });
      setIsCustom(false);
      setFileName("");
      setMessage("Using default CV.");
      return { ok: true };
    } catch {
      return { ok: false, error: "Could not reset CV." };
    } finally {
      setUploading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      cvUrl,
      isCustom,
      fileName,
      ready,
      uploading,
      message,
      uploadCv,
      resetCv,
      setMessage,
    }),
    [cvUrl, isCustom, fileName, ready, uploading, message, uploadCv, resetCv]
  );

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
}

export function useCv() {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("useCv must be used within CvProvider");
  }
  return context;
}
