import process from "process";
import path from "path";
import { getNodeDockerToolsConfig, getPackageJson } from "./utils/files.mjs";
import * as nextjs from "./utils/nextjs.mjs";
import { existsSync } from "fs";

/**
 * @typedef {object} Config
 * @property {string} projectName Project name
 * @property {string} projectVersion Project version
 * @property {string} nodeVersion Node version
 * @property {"nextjs"} framework Framework used
 * @property {string=} envFile Env file to use, if any
 */
export const Config = {};

/**
 * @async
 * @returns {Promise<string|undefined>} Framework found, if any
 */
async function getFramework() {
  const nodeDockerToolsConfig = await getNodeDockerToolsConfig();
  if (nodeDockerToolsConfig.framework) {
    return nodeDockerToolsConfig.framework;
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
  const nodeDockerToolsConfig = await getNodeDockerToolsConfig();
  const packageJson = await getPackageJson();
  return nodeDockerToolsConfig.projectName || packageJson.name;
}

/**
 * @async
 * @returns {Promise<string|undefined>} Project version, if any
 */
async function getProjectVersion() {
  const nodeDockerToolsConfig = await getNodeDockerToolsConfig();
  const packageJson = await getPackageJson();
  return nodeDockerToolsConfig.projectVersion || packageJson.version;
}

/**
 * @async
 * @returns {Promise<string>} Node version
 */
async function getNodeVersion() {
  const nodeDockerToolsConfig = await getNodeDockerToolsConfig();
  return nodeDockerToolsConfig.nodeVersion || process.versions.node;
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
 * @returns {Promise<string|null>} The env file, if any
 */
async function getEnvFile() {
  const { envFile } = await getNodeDockerToolsConfig();
  if (envFile) {
    if (envFile.startsWith("/")) {
      return envFile;
    }
    return path.join(process.cwd(), envFile);
  }

  const dotEnvLocal = path.join(process.cwd(), ".env.local");
  if (existsSync(dotEnvLocal)) {
    return dotEnvLocal;
  }

  const dotEnv = path.join(process.cwd(), ".env");
  if (existsSync(dotEnv)) {
    return dotEnv;
  }

  return null;
}

/**
 *
 * @param {Config} config Config to use
 */
function assertConfigSupported(config) {
  if (config.framework !== "nextjs") {
    throw new Error("node-docker-tools currently only supports Next.js");
  }

  if (config.framework === "nextjs" && !nextjs.isOutputStandalone()) {
    throw new Error(
      "node-docker-tools only works with standalone output mode. This can be configure in next.config.js. See https://github.com/vercel/next.js/blob/canary/examples/with-docker/next.config.js"
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
  const envFile = await getEnvFile();

  const config = {
    projectName: projectName || "node-docker-tools-runner",
    projectVersion: projectVersion || "0.0.1",
    nodeVersion: nodeMajorVersion,
    framework,
    envFile,
  };

  assertConfigSupported(config);

  return config;
}
