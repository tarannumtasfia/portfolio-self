import { readFile } from "fs/promises";
import path from "path";

export async function readPublicData(filename) {
  const filePath = path.join(process.cwd(), "public", "data", filename);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}
