export const runtime = "nodejs";

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || null;
}

function isLocalIp(ip) {
  if (!ip) return true;
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.")
  );
}

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
      "User-Agent": "TasfiaPortfolio/1.0",
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) return null;

  const data = await response.json();
  return formatAddress(data.address || {});
}

async function fetchIpLocation(ip) {
  const response = await fetch(
    `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,lat,lon,district,city,regionName,country`,
    { next: { revalidate: 0 } }
  );

  if (!response.ok) return null;

  const data = await response.json();
  if (data.status !== "success") return null;

  if (typeof data.lat === "number" && typeof data.lon === "number") {
    const precise = await reverseGeocode(data.lat, data.lon);
    if (precise) return precise;
  }

  const parts = [data.district, data.city, data.regionName].filter(Boolean);
  return parts.length ? parts.join(" / ") : null;
}

export async function GET(request) {
  try {
    const ip = getClientIp(request);
    let location = null;

    if (ip && !isLocalIp(ip)) {
      location = await fetchIpLocation(ip);
    }

    return Response.json({
      ip: ip || "Unavailable",
      location,
    });
  } catch {
    return Response.json({ ip: "Unavailable", location: null }, { status: 500 });
  }
}
