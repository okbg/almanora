# almanora

Docker tools for Node.js apps

## Getting started

```sh
npm install almanora
npx almanora run
```

## Supported frameworks

These tools are tested to work with the following frameworks :

- [x] Next.js v13

## Supported versions of Node

- [x] Node version 22.1.0

## Roadmap

- [ ] Add support for express
- [ ] Add support for Remix
- [ ] Add support for reverse proxying using nginx
- [ ] Publish npm package

### Config

Default config location is `almanora.config.mjs` in the root of your project. For non default location use `--config path/to/config.mjs`.

#### Example

```js
import { Config } from "almanora/config.mjs";

/** @type {Config} */
export default {
  imageName: "myapp",
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
