import path from "path";
import mustache from "mustache";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

/**
 * Render a template by name
 * @param {string} name Name of the template
 * @param {object} context Rendering context to pass to template
 * @returns {Promise<string>} Output of the rendering
 */
export async function renderTemplate(name, content) {
  const url = fileURLToPath(import.meta.url);
  const templatePath = path.join(
    path.dirname(url),
    "..",
    "..",
    "templates",
    name
  );
  const template = await readFile(templatePath, { encoding: "utf-8" });
  return mustache.render(template, content);
}
