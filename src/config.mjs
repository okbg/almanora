import { cwd } from "process";
import { join } from "path";

import { argOrDefault } from "./utils/process.mjs";

/**
 * @typedef {object} Config
 * @property {string} imageName Name of the image to create
 * @property {string=} nodeVersion Version of Node.js to use
 * @property {"nextjs"|undefined} framework Framework used, if any
 */
export const Config = {};

/**
 * @readonly
 * @constant
 * @type {Config}
 */
const DEFAULT_CONFIG = {
  nodeVersion: "2022.1.0",
};

/**
 * Resolve the configuration by applying the user defined configuration
 * on top of the default one
 * @async
 * @returns {Promise<Config>} The resolved config
 */
export async function resolveConfig() {
  const path = argOrDefault(
    "--config",
    join(cwd(), "node-docker-tools.config.mjs")
  );
  try {
    const module = await import(path);
    return { ...DEFAULT_CONFIG, ...module.default };
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") {
      throw Error(`WARNING: No valid config found at ${path}`);
    } else {
      throw e;
    }
  }
}
