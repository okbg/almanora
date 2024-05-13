const path = require("path");
const { readFile } = require("fs/promises");

/**
 * @async
 * @returns {Promise<object>} package.json as an object
 */
async function getPackageJson() {
  return JSON.parse(
    await readFile(path.join(process.cwd(), "package.json"), {
      encoding: "utf-8",
    })
  );
}

/**
 * @async
 * @returns {Promise<object|undefined>} next.config.js as an object
 */
async function getNextConfig() {
  let module;
  try {
    module = await import(path.join(process.cwd(), "next.config.js"));
  } catch (e) {
    if (e.code === "ENOTFOUND") {
      // No config file found
    } else {
      throw e;
    }
  }

  if (module && module.default) {
    return JSON.stringify(module.default);
  }

  return undefined;
}

/**
 * @async
 * @returns {Promise<object>} node-docker-tools config as an object
 */
async function getNodeDockerToolsConfig() {
  try {
    const module = await import(
      path.join(process.cwd(), "node-docker-tools.config")
    );
    return module && module.default ? module.default : {};
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") {
      return {};
    } else {
      throw e;
    }
  }
}

module.exports = { getPackageJson, getNextConfig, getNodeDockerToolsConfig };
