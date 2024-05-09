import { getPackageJson } from "./utils/files.mjs";
import process from "process";
import * as nextjs from "./utils/nextjs.mjs";

/**
 * @typedef {object} Config
 * @property {string} projectName Project name
 * @property {string} projectVersion Project version
 * @property {string} nodeVersion Node version
 * @property {"nextjs"} framework Framework used
 */
export const Config = {};

/**
 * @async
 * @returns {Promise<string|undefined>} Supported framework found, if any
 */
async function getFramework() {
  if (await nextjs.isDependency()) {
    return "nextjs";
  }
  return undefined;
}

/**
 * @async
 * @returns {Promise<string|undefined>} Package name, if any
 */
async function getPackageName() {
  const packageJson = await getPackageJson();
  return packageJson.name;
}

/**
 * @async
 * @returns {Promise<string|undefined>} Project version, if any
 */
async function getProjectVersion() {
  const packageJson = await getPackageJson();
  return packageJson.version;
}

/**
 * @returns {string} Node version
 */
function getNodeVersion() {
  return process.versions.node;
}

/**
 * @returns {number} Node major version
 */
function getNodeMajorVersion() {
  return getNodeVersion().split(".")[0];
}

/**
 *
 * @param {Config} config Config to use
 */
function assertConfigSupported(config) {
  if (config.framework !== "nextjs") {
    throw new Error("almanora currently only supports Next.js");
  }

  if (config.framework === "nextjs" && !nextjs.isOutputStandalone()) {
    throw new Error(
      "almanora only works for 'standalone' output mode. For an example of how to configure this see https://github.com/vercel/next.js/blob/canary/examples/with-docker/next.config.js"
    );
  }
}

/**
 * Resolve the configuration by applying the user defined configuration
 * on top of the default one
 * @async
 * @returns {Promise<Config>} The resolved config
 */
export async function getConfig() {
  const framework = await getFramework();
  const projectName = await getPackageName();
  const projectVersion = await getProjectVersion();
  const nodeMajorVersion = getNodeMajorVersion();

  const config = {
    projectName: projectName || "default-almanora-runner",
    projectVersion: projectVersion || "0.0.1",
    framework,
    nodeVersion: nodeMajorVersion,
  };

  assertConfigSupported(config);

  return config;
}
