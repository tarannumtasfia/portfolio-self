import { writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return Response.json({ error: "PDF file is required." }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return Response.json({ error: "Only PDF files are allowed." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: "PDF must be 10 MB or smaller." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const targetPath = path.join(process.cwd(), "public", "tasfia_cv.pdf");
    await writeFile(targetPath, buffer);

    return Response.json({ ok: true, path: "/tasfia_cv.pdf" });
  } catch (error) {
    const readOnly =
      error?.code === "EROFS" ||
      error?.code === "EPERM" ||
      error?.message?.includes("read-only");

    return Response.json(
      {
        error: readOnly
          ? "Server storage is read-only. CV was not saved on the server."
          : "Failed to update CV.",
      },
      { status: readOnly ? 503 : 500 }
    );
  }
}
