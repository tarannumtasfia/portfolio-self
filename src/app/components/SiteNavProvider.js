"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SiteNavContext = createContext({
  data: null,
  loading: true,
});

export function SiteNavProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadNavigation() {
      try {
        const response = await fetch("/api/navigation");
        if (!response.ok) throw new Error("Failed to load navigation");

        const json = await response.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadNavigation();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteNavContext.Provider value={{ data, loading }}>
      {children}
    </SiteNavContext.Provider>
  );
}

export function useSiteNav() {
  return useContext(SiteNavContext);
}
