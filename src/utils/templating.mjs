import path from "path";
import mustache from "mustache";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { Config } from "../config.mjs";

/**
 * @async
 * @param {string} name Name of the template
 * @param {object} context Rendering context to pass to template
 * @returns {Promise<string>} Output of the rendering
 */
export async function renderTemplate(name, context) {
  const filePath = fileURLToPath(import.meta.url);
  const templatePath = path.join(
    path.dirname(filePath),
    "..",
    "..",
    "templates",
    name
  );
  const template = await readFile(templatePath, { encoding: "utf-8" });
  return mustache.render(template, context);
}

/**
 * @async
 * @param {Config} config Config to use
 * @returns {Promise<string>} The rendered Dockerfile
 */
export async function renderDockerfile(config) {
  switch (config.framework) {
    case "nextjs": {
      return await renderTemplate("Dockerfile.nextjs.mustache", config);
    }
    default: {
      throw new Error(
        `Can't find template for framework "${config.framework}"`
      );
    }
  }
}
