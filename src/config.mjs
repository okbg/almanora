import { getAlmaNoraConfig, getPackageJson } from "./utils/files.mjs";
import process from "process";
import * as nextjs from "./utils/nextjs.mjs";
import almanoraConfig from "../tests/manual/nextjs/almanora.config.mjs";

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
  const almaNoraConfig = await getAlmaNoraConfig();
  if (almaNoraConfig.framework) {
    return almaNoraConfig.framework;
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
  const almaNoraConfig = await getAlmaNoraConfig();
  const packageJson = await getPackageJson();
  return almaNoraConfig.projectName || packageJson.name;
}

/**
 * @async
 * @returns {Promise<string|undefined>} Project version, if any
 */
async function getProjectVersion() {
  const almaNoraConfig = await getAlmaNoraConfig();
  const packageJson = await getPackageJson();
  return almaNoraConfig.projectVersion || packageJson.version;
}

/**
 * @async
 * @returns {Promise<string>} Node version
 */
async function getNodeVersion() {
  const almaNoraConfig = await getAlmaNoraConfig();
  return almaNoraConfig.nodeVersion || process.versions.node;
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
  const almaNoraConfig = await getAlmaNoraConfig();
  if (!almaNoraConfig.updateDockerfileOnRun) {
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
  const projectName = await getProjectName();
  const projectVersion = await getProjectVersion();
  const nodeMajorVersion = await getNodeMajorVersion();
  const framework = await getFramework();
  const updateDockerfileOnRun = await getUpdateDockerfileOnRun();

  const config = {
    projectName: projectName || "default-almanora-runner",
    projectVersion: projectVersion || "0.0.1",
    nodeVersion: nodeMajorVersion,
    framework,
    updateDockerfileOnRun,
  };

  assertConfigSupported(config);

  return config;
}
