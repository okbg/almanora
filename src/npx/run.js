#!/usr/bin/env node

const { getConfig } = require("../config");
const docker = require("../utils/docker");

getConfig().then(async (config) => {
  await docker.build(config);
  await docker.run(config);
});
