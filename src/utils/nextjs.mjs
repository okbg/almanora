import path from "path";
import process from "process";
import { getPackageJson } from "./files.mjs";

/**
 * @async
 * @returns {Promise<boolean>} True if dependency on nextjs is found
 */
export async function isDependency() {
  const packageJson = await getPackageJson();
  return packageJson.dependencies.next !== undefined;
}

/**
 * @async
 * @returns {Promise<boolean>} True if output=standalone in next.config.js
 */
export async function isOutputStandalone() {
  let module;
  try {
    module = await import(path.join(process.cwd(), "next.config.js"));
  } catch (e) {
    if (e.code === "ENOTFOUND") {
      return false;
    } else {
      throw e;
    }
  }

  return JSON.stringify(module.default).output === "standalone";
}
