import { readPublicData } from "@/app/lib/readPublicData";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json(await readPublicData("projects.json"));
  } catch {
    return Response.json({ error: "Failed to load projects data" }, { status: 500 });
  }
}
