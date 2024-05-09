# anora

Hosting made easy

## Supported environments

### Node

- [x] 22.1.0

### Frameworks

- [x] Next.js v14

## Running

```sh
npx anora run
```

## Config

Create `anora.config.mjs` in the root of your project

```js
import { Config } from "anora/config.mjs";

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
- [ ] Add support for deploying
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

Example projects useful for testing things manually can be found under [/tests/manual](tests/manual/)

```sh
cd tests/manual/nextjs
node ../../../src/npx/run.mjs
```
