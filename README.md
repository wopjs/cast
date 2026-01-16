# @wopjs/cast

[![Docs](https://img.shields.io/badge/Docs-read-%23fdf9f5)](https://wopjs.github.io/cast)
[![Build Status](https://github.com/wopjs/cast/actions/workflows/build.yml/badge.svg)](https://github.com/wopjs/cast/actions/workflows/build.yml)
[![npm-version](https://img.shields.io/npm/v/@wopjs/cast.svg)](https://www.npmjs.com/package/@wopjs/cast)
[![Coverage Status](https://wopjs.github.io/cast/coverage-badges/@wopjs/cast.svg)](https://wopjs.github.io/cast/coverage/)
[![minified-size](https://img.shields.io/bundlephobia/minzip/@wopjs/cast)](https://bundlephobia.com/package/@wopjs/cast)

Type-safe utilities for filtering and coercing `unknown` values in TypeScript.

## Features

- **Three-tier API pattern** (`is`/`to`/`as`) for flexible type filtering
- **Strong TypeScript type narrowing** that preserves complex types (unions, tuples, readonly arrays)
- **Zero dependencies** and tree-shakeable
- **Safe edge case handling** (NaN, null, undefined, circular references)

## Install

```
npm add @wopjs/cast
```

## API Pattern

Every type has up to three functions following a consistent naming pattern:

| Pattern | Returns          | Use Case                                      |
| ------- | ---------------- | --------------------------------------------- |
| `is*`   | `boolean`        | Type guards for conditional narrowing         |
| `to*`   | `T \| undefined` | Optional values, composable with Option types |
| `as*`   | `T`              | Always returns valid value with fallback      |

```ts
import { isNumber, toNumber, asNumber } from "@wopjs/cast";

// is* - Type guard for conditionals
if (isNumber(value)) {
  value; // type narrowed to number
}

// to* - Returns undefined for invalid input
const num = toNumber(input); // number | undefined

// as* - Always returns a number (0 as fallback)
const safeNum = asNumber(input); // number
```

## Type Narrowing

The library preserves and correctly narrows complex TypeScript types:

```ts
import { isArray, toArray, isTruthy } from "@wopjs/cast";

// Preserves array element types
const arr: string[] = ["a", "b"];
if (isArray(arr)) {
  arr; // still string[], not unknown[]
}

// Extracts from unions
const value: string | string[] = getData();
if (isArray(value)) {
  value; // narrowed to string[]
}

// Preserves tuples and readonly arrays
const tuple: [string, number] = ["a", 1];
const result = toArray(tuple); // [string, number] | undefined

// Excludes falsy types
const val: string | null | undefined = "hello";
if (isTruthy(val)) {
  val; // narrowed to string
}
```

## Available Functions

### Booleans

| Function    | Description                                  |
| ----------- | -------------------------------------------- |
| `isTrue`    | Returns `true` if value is exactly `true`    |
| `toTrue`    | Returns `true` or `undefined`                |
| `asTrue`    | Returns `true` or `false`                    |
| `isTruthy`  | Returns `true` if `Boolean(x)` is `true`     |
| `toTruthy`  | Returns truthy value or `undefined`          |
| `isFalsy`   | Returns `true` if `Boolean(x)` is `false`    |
| `isBoolean` | Returns `true` if value is `true` or `false` |
| `toBoolean` | Returns boolean or `undefined`               |

### Numbers

| Function   | Description                                           |
| ---------- | ----------------------------------------------------- |
| `isNumber` | Returns `true` if value is a number (excluding `NaN`) |
| `toNumber` | Returns number or `undefined`                         |
| `asNumber` | Returns number or `0`                                 |

### Strings

| Function           | Description                                   |
| ------------------ | --------------------------------------------- |
| `isString`         | Returns `true` if value is a string           |
| `toString`         | Returns string or `undefined`                 |
| `asString`         | Returns string or `""`                        |
| `isNonEmptyString` | Returns `true` if value is a non-empty string |
| `toNonEmptyString` | Returns non-empty string or `undefined`       |

### Arrays

| Function          | Description                                     |
| ----------------- | ----------------------------------------------- |
| `isArray`         | Type guard for arrays (preserves element types) |
| `toArray`         | Returns array or `undefined`                    |
| `asArray`         | Returns array or `[]`                           |
| `isNonEmptyArray` | Type guard for non-empty arrays                 |
| `toNonEmptyArray` | Returns non-empty array or `undefined`          |

### Objects

| Function                | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| `isObject`              | Returns `true` for objects (including arrays, excluding `null`) |
| `toObject`              | Returns object or `undefined`                                   |
| `asObject`              | Returns object or `{}`                                          |
| `isPlainObject`         | Returns `true` for plain objects (excluding arrays)             |
| `toPlainObject`         | Returns plain object or `undefined`                             |
| `asPlainObject`         | Returns plain object or `{}`                                    |
| `isNonEmptyPlainObject` | Returns `true` for objects with at least one key                |
| `toNonEmptyPlainObject` | Returns non-empty object or `undefined`                         |
| `isNonEmptyJSONObject`  | Returns `true` for objects with non-undefined values            |
| `toNonEmptyJSONObject`  | Returns JSON object or `undefined`                              |

### Utilities

| Function              | Description                                |
| --------------------- | ------------------------------------------ |
| `isDefined`           | Returns `true` if value is not `undefined` |
| `toPlainObjectOf`     | Filter object values by type predicate     |
| `toPlainObjectOfTrue` | Filter object to only `true` values        |
| `print`               | Safely stringify any value for display     |

## Usage Example

```ts
import * as c from "@wopjs/cast";

// Parsing unknown API response
function parseUser(data: unknown) {
  const obj = c.asPlainObject(data);
  return {
    name: c.asString(obj.name),
    age: c.toNumber(obj.age), // undefined if not a number
    tags: c.asArray(obj.tags),
    settings: c.toNonEmptyPlainObject(obj.settings),
  };
}

// Filtering object values
const config = { debug: true, verbose: false, enabled: true };
c.toPlainObjectOfTrue(config); // { debug: true, enabled: true }

// Safe number handling
c.isNumber(NaN); // false (NaN is excluded)
c.asNumber(NaN); // 0 (safe fallback)
c.asNumber("42"); // 0 (not coerced, use parseInt for that)
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
