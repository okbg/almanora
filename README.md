# node-docker-tools

Docker made easy

## Commands

```sh
npx node-docker-tools generate      # Generate a Dockerfile tailored for your app
npx node-docker-tools run           # Run the container locally
```

## Config

node-docker-tools requires no config file as it derives the configuration from your `package.json`. It is possibe to override configs though by placing a `node-docker-tools.config.mjs` file in the root of your project:

```js
import { Config } from "node-docker-tools/config.mjs";

/** @type {Config} */
export default {
  projectName: "myapp",         // By default derived from package.json
  projectVersion: "1.2.3",      // By default derived from package.json
  framework: "nextjs",          // By default derived from package.json
  nodeVersion: "21",            // By default derived from node -v
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
- [ ] Add support for environment variables using dotenv
- [ ] Add support for build args
- [ ] Add support for express
- [ ] Add support for Remix
- [ ] Add support for deploying
- [ ] Publish npm package

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

To execute a local npx script within the context of an example app just go to the project dir and run the script. Moving to the root project dir is important as the scripts often assume `cwd` contains config files like `package.json`.

```sh
cd examples/nexts
node ../../src/npx/generate.mjs
```
