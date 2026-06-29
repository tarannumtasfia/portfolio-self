import { readPublicData } from "@/app/lib/readPublicData";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json(await readPublicData("hire.json"));
  } catch {
    return Response.json({ error: "Failed to load hire data" }, { status: 500 });
  }
}
