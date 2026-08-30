import { readPublicData } from "@/app/lib/readPublicData";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json(await readPublicData("skills.json"));
  } catch {
    return Response.json({ error: "Failed to load skills data" }, { status: 500 });
  }
}
