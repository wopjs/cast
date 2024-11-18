# @wopjs/cast

[![Docs](https://img.shields.io/badge/Docs-read-%23fdf9f5)](https://wopjs.github.io/cast)
[![Build Status](https://github.com/wopjs/cast/actions/workflows/build.yml/badge.svg)](https://github.com/wopjs/cast/actions/workflows/build.yml)
[![npm-version](https://img.shields.io/npm/v/@wopjs/cast.svg)](https://www.npmjs.com/package/@wopjs/cast)
[![Coverage Status](https://img.shields.io/coverallsCoverage/github/wopjs/cast)](https://coveralls.io/github/wopjs/cast)
[![minified-size](https://img.shields.io/bundlephobia/minzip/@wopjs/cast)](https://bundlephobia.com/package/@wopjs/cast)

Filter types from unknown.

## Install

```
npm add @wopjs/cast
```

## Usage

```js
import * as c from "@wopjs/cast";
import { Option } from "@wopjs/tsur";

const dataParser = {
  width: c.toNumber,
  position: a => Option.from(a, a => a && c.isNumber(a.x) && c.isNumber(a.y)),
  metadata: c.toNonEmptyPlainObject,
};

function parseData(data) {
  const d = c.asObject(data);
  return Object.fromEntries(Object.keys(dataParser).map(k => [k, Option.unwrapOr(dataParser[k](d[k]))]));
}
```

## Publish New Version

You can use [npm version](https://docs.npmjs.com/cli/v10/commands/npm-version) to bump version.

```
npm version patch
```

Push the tag to remote and CI will publish the new version to npm.

```
git push --follow-tags
```

### CI Publish

If you want to publish the package in CI, you need to set the `NPM_TOKEN` secrets [in GitHub repository settings](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository). See how to [create a NPM access token](https://docs.npmjs.com/creating-and-viewing-access-tokens).
