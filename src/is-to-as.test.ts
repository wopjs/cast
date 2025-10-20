import { describe, it, expect } from "vitest";

import {
  isDefined,
  isTrue,
  toTrue,
  asTrue,
  isTruthy,
  isFalsy,
  isBoolean,
  toBoolean,
  isNumber,
  toNumber,
  asNumber,
  isString,
  toString,
  asString,
  isNonEmptyString,
  toNonEmptyString,
  print,
  isArray,
  toArray,
  asArray,
  toNonEmptyArray,
  isObject,
  asObject,
  isPlainObject,
  toPlainObject,
  asPlainObject,
  isNonEmptyPlainObject,
  toNonEmptyPlainObject,
  isNonEmptyJSONObject,
  toNonEmptyJSONObject,
  toPlainObjectOf,
  toPlainObjectOfTrue,
  toTruthy,
} from ".";

describe("primitive.ts", () => {
  it("isDefined", () => {
    expect(isDefined(1)).toBe(true);
    expect(isDefined(undefined)).toBe(false);
  });

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

  it("isTruthy", () => {
    expect(isTruthy(true)).toBe(true);
    expect(isTruthy(false)).toBe(false);
    expect(isTruthy(1)).toBe(true);
  });

  it("toTruthy", () => {
    const expectTruthy = (o: unknown) => expect(toTruthy(o)).toBe(o);
    expectTruthy({});
    expectTruthy([]);
    expectTruthy("string");
    expectTruthy(Symbol());
    expectTruthy(1);
    expectTruthy(true);

    expect(toTruthy(false)).toBe(undefined);
    expect(toTruthy(0)).toBe(undefined);
    expect(toTruthy(NaN)).toBe(undefined);
    expect(toTruthy(null)).toBe(undefined);
    expect(toTruthy(undefined)).toBe(undefined);
  });

  it("isFalsy", () => {
    expect(isFalsy(true)).toBe(false);
    expect(isFalsy(false)).toBe(true);
    expect(isFalsy(1)).toBe(false);
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

  it("isNonEmptyString", () => {
    expect(isNonEmptyString("hello")).toBe(true);
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString(1)).toBe(false);
  });

  it("toNonEmptyString", () => {
    expect(toNonEmptyString("hello")).toBe("hello");
    expect(toNonEmptyString("")).toBe(undefined);
    expect(toNonEmptyString(1)).toBe(undefined);
  });

  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  it("toArray", () => {
    expect(toArray([])).toEqual([]);
    expect(toArray({})).toBe(undefined);
  });

  it("asArray", () => {
    expect(asArray([])).toEqual([]);
    expect(asArray({})).toEqual([]);
  });

  it("toNonEmptyArray", () => {
    expect(toNonEmptyArray([1])).toEqual([1]);
    expect(toNonEmptyArray([])).toBe(undefined);
  });

  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(null)).toBe(false);
  });

  it("asObject", () => {
    expect(asObject({})).toEqual({});
    expect(asObject([])).toEqual([]);
    expect(asObject(null)).toEqual({});
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

  it("isNonEmptyPlainObject", () => {
    expect(isNonEmptyPlainObject({ a: 1 })).toBe(true);
    expect(isNonEmptyPlainObject({})).toBe(false);
    expect(isNonEmptyPlainObject([])).toBe(false);
  });

  it("toNonEmptyPlainObject", () => {
    expect(toNonEmptyPlainObject({ a: 1 })).toEqual({ a: 1 });
    expect(toNonEmptyPlainObject({})).toBe(undefined);
  });

  it("isNonEmptyJSONObject", () => {
    expect(isNonEmptyJSONObject({ a: 1 })).toBe(true);
    expect(isNonEmptyJSONObject({})).toBe(false);
    expect(isNonEmptyJSONObject([])).toBe(false);
  });

  it("toNonEmptyJSONObject", () => {
    expect(toNonEmptyJSONObject({ a: 1 })).toEqual({ a: 1 });
    expect(toNonEmptyJSONObject({})).toBe(undefined);
  });

  it("toPlainObjectOf", () => {
    expect(toPlainObjectOf({ a: true, b: false }, isTrue)).toEqual({ a: true });
    expect(toPlainObjectOf({ a: 1, b: 2 }, isTrue)).toBe(undefined);
  });

  it("toPlainObjectOfTrue", () => {
    expect(toPlainObjectOfTrue({ a: true, b: false })).toEqual({ a: true });
    expect(toPlainObjectOfTrue({ a: 1, b: 2 })).toBe(undefined);
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
});
