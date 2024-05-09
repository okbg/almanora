# almanora

Docker made easy

## Running

```sh
npx almanora run
```

### Config

Config should be located at `almanora.config.mjs`

```js
import { Config } from "almanora/config.mjs";

/** @type {Config} */
export default {
  projectName: "myapp",
  projectVersion: "1.2.3",
  framework: "nextjs",
  nodeVersion: "21",
  updateDockerfileOnRun: true,
};
```

## Supported frameworks

- [x] Next.js v14

## Supported node versions

- [x] 22.1.0

## Roadmap

- [ ] Add support for express
- [ ] Add support for Remix
- [ ] Add support for reverse proxying using nginx
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
