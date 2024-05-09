# node-docker-tools

Docker tools for Node.js that simplifies generating Dockerfiles, building images and running containers locally.

## Usage

### Commands

```sh
npx node-docker-tools generate    # Generate a Dockerfile
npx node-docker-tools build       # Build the image
npx node-docker-tools run         # Run the container
```

### Config

Default config location is `node-docker-tools.config.mjs` in the root of your project. For non default location use `--config path/to/config.mjs`.

#### Example

```js
import { Config } from "node-docker-tools";

/** @type {Config} */
export default {
  nodeVersion: "22.1.0",
  framework: "nextjs",
};
```

## Contribute

Door is always open for pull requests

### Linting

Linting is done with [ESLint](https://eslint.org)

```sh
npm run lint
```

### Tests

#### Unit

Unit tests are run with [Node.js test runner](https://nodejs.org/api/test.html)

```
npm run test
```

#### Manual

For ease of testing different frameworks and configurations end-to-end you'll find some example projects under [tests/manual] that you can play around with.

To test a local version of an npx scripts within the context of an example app you can just execute it with node like:

```sh
cd tests/manual/nextjs
node ../../../src/npx/generate.mjs
```
