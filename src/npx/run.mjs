#!/usr/bin/env node

import { getConfig } from "../config.mjs";
import * as docker from "../utils/docker.mjs";

const config = await getConfig();
await docker.updateDockerfile(config);
await docker.build(config);
await docker.run(config);
