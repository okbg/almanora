#!/usr/bin/env node

import { getConfig } from "../config.mjs";
import * as docker from "../utils/docker.mjs";

const config = await getConfig();
await docker.build(config);
