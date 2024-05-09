import { cwd } from "process";
import { join } from "path";

import { argOrDefault } from "./utils/process.mjs";

/**
 * @typedef {object} Config
 * @property {"nextjs"|undefined} framework Framework used, if any
 * @property {string=} nodeVersion Version of Node.js to use
 */
export const Config = {};

/**
 * @readonly
 * @constant
 * @type {Config}
 */
const DEFAULT_CONFIG = {
  nodeVersion: "2022.1.0",
  type: "",
};

/**
 * Import user defined overrides
 * @async
 * @returns {Promise<Config|null>} The user defined overrides, or null
 */
async function getOverrides() {
  const path = argOrDefault(
    "--config",
    join(cwd(), "node-docker-tools.config.mjs")
  );
  try {
    const module = await import(path);
    return module.default;
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") {
      console.warn(`WARNING: No valid config found at ${path}`);
      return Promise.resolve(null);
    }
    throw e;
  }
}

/**
 * Get the final config, that is default config with user defined overrides applied
 * @async
 * @returns {Promise<Config>} The config
 */
export async function getConfig() {
  const overrides = await getOverrides();
  return { ...DEFAULT_CONFIG, ...(overrides || {}) };
}
