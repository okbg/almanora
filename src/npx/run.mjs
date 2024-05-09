#!/usr/bin/env node

import { spawn } from "child_process";

import { resolveConfig } from "../config.mjs";

const config = await resolveConfig();

if (!config.imageName) {
  throw new Error("Missing imageName in config");
}

// TODO: Add support for --env-file?
const child = spawn("docker", [
  "run",
  "-p",
  "3000:3000",
  `${config.imageName}:local`,
]);

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

child.on("error", console.error);
child.on("exit", (code) => {
  if (code !== 0) {
    process.exit(code);
  }
  console.log("\nDocker container stopped");
});
