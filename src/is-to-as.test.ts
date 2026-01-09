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
  isNonEmptyArray,
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

    // Type narrowing - preserves array type
    const stringArr: string[] = ["a", "b"];
    if (isArray(stringArr)) {
      const _check: string[] = stringArr;
      expect(_check).toBe(stringArr);
    }

    // Type narrowing - extracts array from union
    const unionValue: string | string[] = ["a"];
    if (isArray(unionValue)) {
      const _check: string[] = unionValue;
      expect(_check).toBe(unionValue);
    }

    // Type narrowing - preserves readonly array
    const readonlyArr: readonly number[] = [1, 2];
    if (isArray(readonlyArr)) {
      const _check: readonly number[] = readonlyArr;
      expect(_check).toBe(readonlyArr);
    }

    // Type narrowing - preserves tuple
    const tuple: [string, number] = ["a", 1];
    if (isArray(tuple)) {
      const _check: [string, number] = tuple;
      expect(_check).toBe(tuple);
    }

    // Type narrowing - unknown input returns any[] | undefined
    const unknownValue: unknown = ["a", "b"];
    if (isArray(unknownValue)) {
      const _check: unknown[] = unknownValue;
      expect(_check).toEqual(["a", "b"]);
    }

    // Type narrowing - non-array type (string) returns string & any[] | undefined
    const stringValue: string = "hello";
    if (isArray(stringValue)) {
      const _check: unknown[] = stringValue;
      expect(_check).toBe(undefined);
    }
  });

  it("toArray", () => {
    expect(toArray([])).toEqual([]);
    expect(toArray({})).toBe(undefined);

    // Type narrowing - preserves array type
    const stringArr: string[] = ["a", "b"];
    const result1 = toArray(stringArr);
    if (result1) {
      const _check: string[] = result1;
      expect(_check).toBe(stringArr);
    }

    // Type narrowing - extracts array from union
    const unionValue: string | string[] = ["a"];
    const result2 = toArray(unionValue);
    if (result2) {
      const _check: string[] = result2;
      expect(_check).toBe(unionValue);
    }

    // Type narrowing - preserves readonly array
    const readonlyArr: readonly number[] = [1, 2];
    const result3 = toArray(readonlyArr);
    if (result3) {
      const _check: readonly number[] = result3;
      expect(_check).toBe(readonlyArr);
    }

    // Type narrowing - preserves tuple
    const tuple: [string, number] = ["a", 1];
    const result4 = toArray(tuple);
    if (result4) {
      const _check: [string, number] = result4;
      expect(_check).toBe(tuple);
    }

    // Type narrowing - unknown input returns unknown[] | undefined
    const unknownValue: unknown = ["a", "b"];
    const result5: unknown[] | undefined = toArray(unknownValue);
    expect(result5).toEqual(["a", "b"]);

    // Type narrowing - non-array type (string) returns unknown[] | undefined
    const stringValue: string = "hello";
    const result6: unknown[] | undefined = toArray(stringValue);
    expect(result6).toBe(undefined);
  });

  it("isNonEmptyArray", () => {
    // Runtime behavior
    expect(isNonEmptyArray([1])).toBe(true);
    expect(isNonEmptyArray([1, 2, 3])).toBe(true);
    expect(isNonEmptyArray([])).toBe(false);
    expect(isNonEmptyArray({})).toBe(false);
    expect(isNonEmptyArray(null)).toBe(false);
    expect(isNonEmptyArray(undefined)).toBe(false);
    expect(isNonEmptyArray("string")).toBe(false);

    // Type narrowing - preserves array type
    const stringArr: string[] = ["a", "b"];
    if (isNonEmptyArray(stringArr)) {
      const _check: string[] = stringArr;
      expect(_check).toBe(stringArr);
    } else {
      const _check: never = stringArr;
      throw new Error("Unreachable");
    }

    // Type narrowing - extracts array from union
    const unionValue: string | string[] = ["a"];
    if (isNonEmptyArray(unionValue)) {
      const _check: string[] = unionValue;
      expect(_check).toBe(unionValue);
    } else {
      const _check: string = unionValue;
      throw new Error("Unreachable");
    }

    // Type narrowing - extracts array from union
    const stringLikeValue: string | string[] = "a";
    if (isNonEmptyArray(stringLikeValue)) {
      // @ts-expect-error Unreachable
      const _check: string[] = stringLikeValue;
      throw new Error("Unreachable");
    } else {
      const _check: string = stringLikeValue;
      expect(_check).toBe(stringLikeValue);
    }

    // Type narrowing - preserves readonly array
    const readonlyArr: readonly number[] = [1, 2];
    if (isNonEmptyArray(readonlyArr)) {
      const _check: readonly number[] = readonlyArr;
      expect(_check).toBe(readonlyArr);
    } else {
      const _check: readonly number[] = readonlyArr;
      throw new Error("Unreachable");
    }

    // Type narrowing - preserves tuple
    const tuple: [string, number] = ["a", 1];
    if (isNonEmptyArray(tuple)) {
      const _check: [string, number] = tuple;
      expect(_check).toBe(tuple);
    } else {
      const _check: never = tuple;
      throw new Error("Unreachable");
    }

    // Type narrowing - unknown input returns unknown[]
    const unknownValue: unknown = ["a", "b"];
    if (isNonEmptyArray(unknownValue)) {
      const _check: unknown[] = unknownValue;
      expect(_check).toEqual(["a", "b"]);
    } else {
      const _check: unknown = unknownValue;
      throw new Error("Unreachable");
    }

    // Type narrowing - non-array type (string) returns never
    const stringValue: string = "hello";
    if (isNonEmptyArray(stringValue)) {
      const _check: unknown[] = stringValue;
      throw new Error("Unreachable");
    } else {
      const _check: string = stringValue;
      expect(_check).toBe("hello");
    }
  });

  it("asArray", () => {
    expect(asArray([])).toEqual([]);
    expect(asArray({})).toEqual([]);

    // Type narrowing - preserves array type
    const stringArr: string[] = ["a", "b"];
    const result1: string[] = asArray(stringArr);
    expect(result1).toBe(stringArr);

    // Type narrowing - extracts array from union
    const unionValue: string | string[] = ["a"];
    const result2: string[] = asArray(unionValue);
    expect(result2).toEqual(["a"]);

    // Type narrowing - preserves readonly array
    const readonlyArr: readonly number[] = [1, 2];
    const result3: readonly number[] = asArray(readonlyArr);
    expect(result3).toBe(readonlyArr);

    // Type narrowing - preserves tuple
    const tuple: [string, number] = ["a", 1];
    const result4: [string, number] = asArray(tuple);
    expect(result4).toBe(tuple);

    // Type narrowing - unknown input returns unknown[]
    const unknownValue: unknown = ["a", "b"];
    const result5: unknown[] = asArray(unknownValue);
    expect(result5).toEqual(["a", "b"]);

    // Type narrowing - non-array type (string) returns unknown[]
    const stringValue: string = "hello";
    const result6: unknown[] = asArray(stringValue);
    expect(result6).toEqual([]);
  });

  it("toNonEmptyArray", () => {
    expect(toNonEmptyArray([1])).toEqual([1]);
    expect(toNonEmptyArray([])).toBe(undefined);

    // Type narrowing - preserves array type
    const stringArr: string[] = ["a", "b"];
    const result1 = toNonEmptyArray(stringArr);
    if (result1) {
      const _check: string[] = result1;
      expect(_check).toBe(stringArr);
    }

    // Type narrowing - extracts array from union
    const unionValue: string | string[] = ["a"];
    const result2 = toNonEmptyArray(unionValue);
    if (result2) {
      const _check: string[] = result2;
      expect(_check).toBe(unionValue);
    }

    // Type narrowing - preserves readonly array
    const readonlyArr: readonly number[] = [1, 2];
    const result3 = toNonEmptyArray(readonlyArr);
    if (result3) {
      const _check: readonly number[] = result3;
      expect(_check).toBe(readonlyArr);
    }

    // Type narrowing - preserves tuple
    const tuple: [string, number] = ["a", 1];
    const result4 = toNonEmptyArray(tuple);
    if (result4) {
      const _check: [string, number] = result4;
      expect(_check).toBe(tuple);
    }

    // Type narrowing - unknown input returns unknown[] | undefined
    const unknownValue: unknown = ["a", "b"];
    const result5: unknown[] | undefined = toNonEmptyArray(unknownValue);
    expect(result5).toEqual(["a", "b"]);

    // Type narrowing - non-array type (string) returns unknown[] | undefined
    const stringValue: string = "hello";
    const result6: unknown[] | undefined = toNonEmptyArray(stringValue);
    expect(result6).toBe(undefined);
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
    expect(toPlainObjectOf({ a: 1, b: 2 }, isTruthy)).toEqual({ a: 1, b: 2 });
    expect(toPlainObjectOf(undefined, isTrue)).toBe(undefined);
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
