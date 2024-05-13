#!/usr/bin/env node

const { getConfig } = require("../config");
const docker = require("../utils/docker");

getConfig().then((config) => docker.build(config));
