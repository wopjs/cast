import { describe, it, expect } from "vitest";

import {
  isTrue,
  toTrue,
  asTrue,
  isBoolean,
  toBoolean,
  isNumber,
  toNumber,
  asNumber,
  isString,
  toString,
  asString,
  print,
  isObject,
  isArray,
  isPlainObject,
  toPlainObject,
  asPlainObject,
  toNonEmptyPlainObject,
  toPlainObjectOf,
  toPlainObjectOfTrue,
} from ".";

describe("primitive.ts", () => {
  it("isTrue", () => {
    expect(isTrue(true)).toBe(true);
    expect(isTrue(false)).toBe(false);
    expect(isTrue(1)).toBe(false);
  });

  it("toTrue", () => {
    expect(toTrue(true)).toBe(true);
    expect(toTrue(false)).toBe(undefined);
    expect(toTrue(1)).toBe(undefined);
  });

  it("asTrue", () => {
    expect(asTrue(true)).toBe(true);
    expect(asTrue(false)).toBe(false);
    expect(asTrue(1)).toBe(false);
  });

  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(1)).toBe(false);
  });

  it("toBoolean", () => {
    expect(toBoolean(true)).toBe(true);
    expect(toBoolean(false)).toBe(false);
    expect(toBoolean(1)).toBe(undefined);
  });

  it("isNumber", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber("1")).toBe(false);
  });

  it("toNumber", () => {
    expect(toNumber(1)).toBe(1);
    expect(toNumber(NaN)).toBe(undefined);
    expect(toNumber("1")).toBe(undefined);
  });

  it("asNumber", () => {
    expect(asNumber(1)).toBe(1);
    expect(asNumber(NaN)).toBe(0);
    expect(asNumber("1")).toBe(0);
  });

  it("isString", () => {
    expect(isString("hello")).toBe(true);
    expect(isString(1)).toBe(false);
    expect(isString(true)).toBe(false);
  });

  it("toString", () => {
    expect(toString("hello")).toBe("hello");
    expect(toString(1)).toBe(undefined);
    expect(toString(true)).toBe(undefined);
  });

  it("asString", () => {
    expect(asString("hello")).toBe("hello");
    expect(asString(1)).toBe("");
    expect(asString(true)).toBe("");
  });

  it("show", () => {
    expect(print("hello")).toBe("hello");
    expect(print(null)).toBe("");
    expect(print({ a: 1 })).toBe(JSON.stringify({ a: 1 }, null, 2));
    expect(
      print({
        toJSON() {
          throw new Error("x");
        },
        toString() {
          return "str";
        },
      })
    ).toBe("str");
  });

  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(null)).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  it("isPlainObject", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
  });

  it("toPlainObject", () => {
    expect(toPlainObject({})).toEqual({});
    expect(toPlainObject([])).toBe(undefined);
    expect(toPlainObject(null)).toBe(undefined);
  });

  it("asPlainObject", () => {
    expect(asPlainObject({})).toEqual({});
    expect(asPlainObject([])).toEqual({});
    expect(asPlainObject(null)).toEqual({});
  });

  it("toNonEmptyPlainObject", () => {
    expect(toNonEmptyPlainObject({ a: 1 })).toEqual({ a: 1 });
    expect(toNonEmptyPlainObject({})).toBe(undefined);
  });

  it("toPlainObjectOf", () => {
    expect(toPlainObjectOf({ a: true, b: false }, isTrue)).toEqual({ a: true });
    expect(toPlainObjectOf({ a: 1, b: 2 }, isTrue)).toBe(undefined);
  });

  it("toPlainObjectOfTrue", () => {
    expect(toPlainObjectOfTrue({ a: true, b: false })).toEqual({ a: true });
    expect(toPlainObjectOfTrue({ a: 1, b: 2 })).toBe(undefined);
  });
});
