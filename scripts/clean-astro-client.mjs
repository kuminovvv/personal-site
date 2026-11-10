import { readdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";

const root = "dist";
const astroDir = join(root, "_astro");

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
};

const htmlFiles = await walk(root);
const html = (await Promise.all(htmlFiles.map((file) => readFile(file, "utf8")))).join("\n");
const clientChunks = (await readdir(astroDir)).filter(
  (name) => name.startsWith("client.") && name.endsWith(".js"),
);

const unused = clientChunks.filter((name) => !html.includes(name));

await Promise.all(unused.map((name) => rm(join(astroDir, name), { force: true })));

if (unused.length) {
  console.log(`Removed unused Astro client chunks: ${unused.join(", ")}`);
}
