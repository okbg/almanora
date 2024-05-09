#!/usr/bin/env node

import process from "process";
import path from "path";
import { writeFile } from "fs/promises";

import { getConfig } from "../config.mjs";
import { argOrDefault } from "../utils/process.mjs";
import { renderTemplate } from "../utils/templating.mjs";

const config = await getConfig();

const dockerfile = await (async () => {
  switch (config.framework) {
    case "nextjs": {
      return await renderTemplate("Dockerfile.nextjs.mustache");
    }
    default: {
      throw new Error(`Unsupported framework "${config.framework}"`);
    }
  }
})();

const outputPath = argOrDefault(
  "--dockerfile",
  path.join(process.cwd(), "Dockerfile")
);

writeFile(outputPath, dockerfile, { encoding: "utf-8" });
