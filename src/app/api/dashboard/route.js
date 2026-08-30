import { readPublicData } from "@/app/lib/readPublicData";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json(await readPublicData("dashboard.json"));
  } catch {
    return Response.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}
