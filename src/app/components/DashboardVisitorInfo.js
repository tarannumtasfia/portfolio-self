"use client";

import { useEffect, useState } from "react";
import { Clock, Globe, Laptop, MapPin, Monitor, Sparkles } from "lucide-react";

function formatAddress(address) {
  const parts = [
    address.neighbourhood,
    address.suburb,
    address.city_district || address.borough,
    address.city || address.town,
  ]
    .filter(Boolean)
    .filter((part, index, list) => list.indexOf(part) === index);

  return parts.length ? parts.join(" / ") : null;
}

function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Microsoft Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Google Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  return "Unknown browser";
}

function getOsName() {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown OS";
}

function getTimezone() {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().toLocaleTimeString("en-US", {
      timeZoneName: "shortOffset",
    }).split(" ").pop();
    return offset ? `${zone} (${offset})` : zone;
  } catch {
    return "Unavailable";
  }
}

async function reverseGeocode(latitude, longitude) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "json");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("zoom", "14");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en",
    },
  });

  if (!response.ok) return null;

  const data = await response.json();
  return formatAddress(data.address || {});
}

async function fetchPublicIp() {
  const response = await fetch("https://api.ipify.org?format=json");
  if (!response.ok) return null;
  const data = await response.json();
  return data.ip || null;
}

function InfoItem({ icon: Icon, label, value, loading, mono = false, iconClass = "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400" }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 px-3 py-2.5 min-w-0">
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${iconClass}`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 truncate">{label}</p>
        <p
          className={`text-xs font-medium text-slate-800 dark:text-slate-100 truncate ${mono ? "font-mono" : ""}`}
          title={!loading && value ? value : undefined}
        >
          {loading ? "Detecting..." : value || "Unavailable"}
        </p>
      </div>
    </div>
  );
}

export default function DashboardVisitorInfo() {
  const [location, setLocation] = useState(null);
  const [ip, setIp] = useState(null);
  const [browser, setBrowser] = useState(null);
  const [os, setOs] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingIp, setLoadingIp] = useState(true);

  useEffect(() => {
    setBrowser(getBrowserName());
    setOs(getOsName());
    setTimezone(getTimezone());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadVisitorInfo() {
      try {
        const response = await fetch("/api/visitor-info");
        const data = await response.json();

        if (cancelled) return;

        let resolvedIp = data.ip;
        if (!resolvedIp || resolvedIp === "Unavailable" || resolvedIp === "127.0.0.1" || resolvedIp === "::1") {
          resolvedIp = (await fetchPublicIp()) || "Unavailable";
        }

        setIp(resolvedIp);
        if (data.location) {
          setLocation(data.location);
        }
      } catch {
        if (!cancelled) {
          const publicIp = await fetchPublicIp();
          setIp(publicIp || "Unavailable");
        }
      } finally {
        if (!cancelled) setLoadingIp(false);
      }

      if (!navigator.geolocation) {
        if (!cancelled) setLoadingLocation(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const resolvedLocation = await reverseGeocode(
              position.coords.latitude,
              position.coords.longitude
            );
            if (!cancelled && resolvedLocation) {
              setLocation(resolvedLocation);
            }
          } catch {
            // Keep IP-based location if geolocation reverse lookup fails.
          } finally {
            if (!cancelled) setLoadingLocation(false);
          }
        },
        () => {
          if (!cancelled) setLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 }
      );
    }

    loadVisitorInfo();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mt-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
          <Sparkles size={16} />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Your visit summary
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        <InfoItem
          icon={MapPin}
          label="Location"
          value={location}
          loading={loadingLocation}
        />
        <InfoItem
          icon={Globe}
          label="IP"
          value={ip}
          loading={loadingIp}
          mono
          iconClass="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
        />
        <InfoItem
          icon={Monitor}
          label="Browser"
          value={browser}
          loading={!browser}
          iconClass="bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400"
        />
        <InfoItem
          icon={Laptop}
          label="OS"
          value={os}
          loading={!os}
          iconClass="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        />
        <InfoItem
          icon={Clock}
          label="Time zone"
          value={timezone}
          loading={!timezone}
          iconClass="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
        />
      </div>
    </section>
  );
}
