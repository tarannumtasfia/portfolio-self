import { readPublicData } from "@/app/lib/readPublicData";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json(await readPublicData("blog.json"));
  } catch {
    return Response.json({ error: "Failed to load blog data" }, { status: 500 });
  }
}
