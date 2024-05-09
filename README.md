# almanora

Docker made easy

## Supported environments

### Node

- [x] 22.1.0

### Frameworks

- [x] Next.js v14

## Running

```sh
npx almanora run
```

## Config

Should be located at `almanora.config.mjs`

```js
import { Config } from "almanora/config.mjs";

/** @type {Config} */
export default {
  projectName: "myapp",         // By default derived from package.json
  projectVersion: "1.2.3",      // By default derived from package.json
  framework: "nextjs",          // By default derived from package.json
  nodeVersion: "21",            // By default derived from node -v
  updateDockerfileOnRun: true,  // By default true
};
```

## Roadmap

- [ ] Add support for reverse proxying using nginx
- [ ] Add support for express
- [ ] Add support for Remix
- [ ] Publish npm package

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
node ../../../src/npx/run.mjs
```
