import { getAnoraConfig, getPackageJson } from "./utils/files.mjs";
import process from "process";
import * as nextjs from "./utils/nextjs.mjs";

/**
 * @typedef {object} Config
 * @property {string} projectName Project name
 * @property {string} projectVersion Project version
 * @property {string} nodeVersion Node version
 * @property {"nextjs"} framework Framework used
 * @property {boolean?} updateDockerfileOnRun Whether to auto update Dockerfile on run
 */
export const Config = {};

/**
 * @async
 * @returns {Promise<string|undefined>} Framework found, if any
 */
async function getFramework() {
  const anoraConfig = await getAnoraConfig();
  if (anoraConfig.framework) {
    return anoraConfig.framework;
  }

  if (await nextjs.isDependency()) {
    return "nextjs";
  }

  return undefined;
}

/**
 * @async
 * @returns {Promise<string|undefined>} Package name, if any
 */
async function getProjectName() {
  const anoraConfig = await getAnoraConfig();
  const packageJson = await getPackageJson();
  return anoraConfig.projectName || packageJson.name;
}

/**
 * @async
 * @returns {Promise<string|undefined>} Project version, if any
 */
async function getProjectVersion() {
  const anoraConfig = await getAnoraConfig();
  const packageJson = await getPackageJson();
  return anoraConfig.projectVersion || packageJson.version;
}

/**
 * @async
 * @returns {Promise<string>} Node version
 */
async function getNodeVersion() {
  const anoraConfig = await getAnoraConfig();
  return anoraConfig.nodeVersion || process.versions.node;
}

/**
 * @async
 * @returns {Promise<number>} Node major version
 */
async function getNodeMajorVersion() {
  return (await getNodeVersion()).split(".")[0];
}

/**
 * @async
 * @returns {Promise<boolean>} Should we update Dockerfile on run?
 */
async function getUpdateDockerfileOnRun() {
  const anoraConfig = await getAnoraConfig();
  if (anoraConfig.updateDockerfileOnRun === false) {
    return false;
  }
  return true;
}

/**
 *
 * @param {Config} config Config to use
 */
function assertConfigSupported(config) {
  if (config.framework !== "nextjs") {
    throw new Error("Anora currently only supports Next.js");
  }

  if (config.framework === "nextjs" && !nextjs.isOutputStandalone()) {
    throw new Error(
      "Anora only works with standalone output mode. This can be configure in next.config.js. See https://github.com/vercel/next.js/blob/canary/examples/with-docker/next.config.js"
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
  const projectName = await getProjectName();
  const projectVersion = await getProjectVersion();
  const nodeMajorVersion = await getNodeMajorVersion();
  const framework = await getFramework();
  const updateDockerfileOnRun = await getUpdateDockerfileOnRun();

  const config = {
    projectName: projectName || "anora-runner",
    projectVersion: projectVersion || "0.0.1",
    nodeVersion: nodeMajorVersion,
    framework,
    updateDockerfileOnRun,
  };

  assertConfigSupported(config);

  return config;
}
