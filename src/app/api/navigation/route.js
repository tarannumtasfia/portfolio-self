import { readPublicData } from "@/app/lib/readPublicData";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json(await readPublicData("navigation.json"));
  } catch {
    return Response.json({ error: "Failed to load navigation data" }, { status: 500 });
  }
}
