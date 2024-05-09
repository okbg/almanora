import path from "path";
import process from "process";
import { writeFile } from "fs/promises";
import { spawn } from "child_process";
import { Config } from "../config.mjs";
import { renderDockerfile } from "./templating.mjs";

/**
 * @async
 * @param {Config} config Config to use
 * @returns {Promise<void>} Resolves when dockerfile has been successfully updated
 */
export async function updateDockerfile(config) {
  if (!config.updateDockerfileOnRun) {
    return;
  }
  const dockerfile = await renderDockerfile(config);
  const outputPath = path.join(process.cwd(), "Dockerfile");
  await writeFile(outputPath, dockerfile, { encoding: "utf-8" });
}

/**
 * @param {string[]} args Docker arguments
 * @returns {Promise<void>} Resolves after child process has exited successfully
 */
function spawnDocker(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("docker", args);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("error", console.error);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Docker exited with code ${code}`));
      }
    });
  });
}

/**
 * @async
 * @param {Config} config Config to use
 * @returns {Promise<void>} Resolved on build succeed
 */
export async function build(config) {
  await spawnDocker([
    "build",
    "-t",
    `${config.projectName}:${config.projectVersion}`,
    "-f",
    path.join(process.cwd(), "Dockerfile"),
    process.cwd(),
  ]);
}

/**
 * @async
 * @param {Config} config Config to use
 * @returns {Promise<void>} Resolved when container is stopped
 */
export async function run(config) {
  await spawnDocker([
    "run",
    "-p",
    "3000:3000",
    "--name",
    config.projectName,
    `${config.projectName}:${config.projectVersion}`,
  ]);
}
