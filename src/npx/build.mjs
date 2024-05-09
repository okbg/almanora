#!/usr/bin/env node

import process from "process";
import { spawn } from "child_process";
import { resolveConfig } from "../config.mjs";

const config = await resolveConfig();

if (!config.imageName) {
  throw new Error("Missing imageName in config");
}

const child = spawn("docker", [
  "build",
  "-t",
  `${config.imageName}:local`,
  process.cwd(),
]);

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

child.on("error", console.error);
child.on("exit", (code) => {
  if (code !== 0) {
    process.exit(code);
  }
  console.info("\nBuild succeeded!");
});
