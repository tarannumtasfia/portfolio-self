import { readPublicData } from "@/app/lib/readPublicData";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json(await readPublicData("contact.json"));
  } catch {
    return Response.json({ error: "Failed to load contact data" }, { status: 500 });
  }
}
