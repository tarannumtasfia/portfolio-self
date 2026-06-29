import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "projects");

const projects = [
  { id: "movie", url: "https://movie-app-ashen-iota-35.vercel.app/" },
  { id: "eschool", url: "https://tarannumtasfia.github.io/e-school/" },
  { id: "crudapp", url: "https://crud-frontend-iota-one.vercel.app/" },
  { id: "courier", url: "https://courier-tracker-frontend-eosin.vercel.app/" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

for (const project of projects) {
  console.log(`Capturing ${project.id} from ${project.url}`);
  try {
    await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(4000);
    await page.screenshot({
      path: path.join(outDir, `${project.id}.png`),
      type: "png",
    });
    console.log(`Saved ${project.id}.png`);
  } catch (error) {
    console.error(`Failed ${project.id}:`, error.message);
    process.exitCode = 1;
  }
}

await browser.close();
console.log("Done.");
