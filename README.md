# node-docker-tools

Docker made easy

## Commands

```sh
npx node-docker-tools generate      # Generate a Dockerfile tailored for your app
npx node-docker-tools build         # Build the image
npx node-docker-tools run           # Build the image and run the container
```

## Config

Config should reside in the root of your project and be named `node-docker-tools.config.mjs`. A configuration file is often not needed though as node-docker-tools by default derives configuration from your environment.

```js
import { Config } from "node-docker-tools/config.mjs";

/** @type {Config} */
export default {
  projectName: "myapp",             // Default derived from package.json
  projectVersion: "1.2.3",          // Default derived from package.json
  framework: "nextjs",              // Default derived from package.json
  nodeVersion: "21",                // Default derived from node -v
  envFile: ".dotenv.local"          // Default .env.local or .env if any exists
};
```

## Compatibility

These tools are tested with:

### Node

- [x] 22.1.0

### Frameworks

- [x] Next.js v14

## Roadmap

- [ ] Add support for reverse proxying using nginx
- [ ] Add support for build args
- [ ] Add support for Express
- [ ] Add support for Remix
- [ ] Add support for pushing to a registry

## Contribute

Contributions are welcome. Please fork the repo and make pull requests to the master branch.

### Linting

Linting is done with [ESLint](https://eslint.org)

```sh
npm run lint
```

### Tests

Tests are run with [Node.js test runner](https://nodejs.org/api/test.html)

```
npm run test
```

## Examples

Example projects using different frameworks can be found under [/examples](examples/) and is an easy way of playing around with node-docker-tools in different contexts.

To execute a local npx script within the context of an example app just go to the project dir and run the script from there. Moving to the root project dir is important as the scripts often assume `cwd` contains config files like `package.json`.

```sh
cd examples/nexts
npx ../../src/npx/generate.mjs
```

## Publish a new version

To publish a new version to `npm` update the version in `package.json` and then run `npm publish`
