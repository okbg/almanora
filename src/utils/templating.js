const path = require("path");
const mustache = require("mustache");
const { readFile } = require("fs/promises");
const { Config } = require("../config");

/**
 * @async
 * @param {string} name Name of the template
 * @param {object} context Rendering context to pass to template
 * @returns {Promise<string>} Output of the rendering
 */
async function renderTemplate(name, context) {
  const templatePath = path.join(__dirname, "..", "..", "templates", name);
  const template = await readFile(templatePath, { encoding: "utf-8" });
  return mustache.render(template, context);
}

/**
 * @async
 * @param {Config} config Config to use
 * @returns {Promise<string>} The rendered Dockerfile
 */
async function renderDockerfile(config) {
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

module.exports = { renderTemplate, renderDockerfile };
