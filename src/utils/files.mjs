import path from "path";
import { readFile } from "fs/promises";

/**
 * @async
 * @returns {Promise<object>} package.json as an object
 */
export async function getPackageJson() {
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
export async function getNextConfig() {
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
