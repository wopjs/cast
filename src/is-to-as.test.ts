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

const castType = <T>(x: T): T => x;

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

    {
      // Type narrowing - preserves array type
      const arr = castType<string[]>(["a", "b"]);
      if (isArray(arr)) {
        const check: string[] = arr;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - extracts array from union
      const arr = castType<string | string[]>(["a"]);
      if (isArray(arr)) {
        const check: string[] = arr;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - preserves readonly array
      const arr = castType<readonly number[]>([1, 2]);
      if (isArray(arr)) {
        const check: readonly number[] = arr;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - preserves tuple
      const arr = castType<[string, number]>(["a", 1]);
      if (isArray(arr)) {
        const check: [string, number] = arr;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - unknown input returns any[] | undefined
      const arr = castType<unknown>(["a", "b"]);
      if (isArray(arr)) {
        const check: unknown[] = arr;
        expect(check).toEqual(["a", "b"]);
      }
    }

    {
      // Type narrowing - non-array type (string) returns string & any[] | undefined
      const arr = castType<string>("hello");
      if (isArray(arr)) {
        const check: unknown[] = arr;
        expect(check).toBe(undefined);
      }
    }
  });

  it("toArray", () => {
    expect(toArray([])).toEqual([]);
    expect(toArray({})).toBe(undefined);

    {
      // Type narrowing - preserves array type
      const arr = castType<string[]>(["a", "b"]);
      const result = toArray(arr);
      if (result) {
        const check: string[] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - extracts array from union
      const arr = castType<string | string[]>(["a"]);
      const result = toArray(arr);
      if (result) {
        const check: string[] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - extracts array from array | undefined union
      const arr = castType<string[] | undefined>(["a"]);
      const result = toArray(arr);
      if (result) {
        const check: string[] = result;
        expect(check).toEqual(["a"]);
      }
    }

    {
      // Type narrowing - preserves readonly array
      const arr = castType<readonly number[]>([1, 2]);
      const result = toArray(arr);
      if (result) {
        const check: readonly number[] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - preserves tuple
      const arr = castType<[string, number]>(["a", 1]);
      const result = toArray(arr);
      if (result) {
        const check: [string, number] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - unknown input returns unknown[] | undefined
      const arr = castType<unknown>(["a", "b"]);
      const result: unknown[] | undefined = toArray(arr);
      expect(result).toEqual(["a", "b"]);
    }

    {
      // Type narrowing - non-array type (string) returns unknown[] | undefined
      const arr = castType<string>("hello");
      const result: unknown[] | undefined = toArray(arr);
      expect(result).toBe(undefined);
    }
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

    {
      // Type narrowing - preserves array type
      const arr = castType<string[]>(["a", "b"]);
      if (isNonEmptyArray(arr)) {
        const check: string[] = arr;
        expect(check).toBe(arr);
      } else {
        const _check: never = arr;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - extracts array from union
      const arr = castType<string | string[]>(["a"]);
      if (isNonEmptyArray(arr)) {
        const check: string[] = arr;
        expect(check).toBe(arr);
      } else {
        const _check: string = arr;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - extracts array from union
      const arr = castType<string | string[]>("a");
      if (isNonEmptyArray(arr)) {
        const _check: string[] = arr;
        throw new Error("Unreachable");
      } else {
        const check: string = arr;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - preserves readonly array
      const arr = castType<readonly number[]>([1, 2]);
      if (isNonEmptyArray(arr)) {
        const check: readonly number[] = arr;
        expect(check).toBe(arr);
      } else {
        const _check: readonly number[] = arr;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - preserves tuple
      const arr = castType<[string, number]>(["a", 1]);
      if (isNonEmptyArray(arr)) {
        const check: [string, number] = arr;
        expect(check).toBe(arr);
      } else {
        const _check: never = arr;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - unknown input returns unknown[]
      const arr = castType<unknown>(["a", "b"]);
      if (isNonEmptyArray(arr)) {
        const check: unknown[] = arr;
        expect(check).toEqual(["a", "b"]);
      } else {
        const _check: unknown = arr;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - non-array type (string) returns never
      const arr = castType<string>("hello");
      if (isNonEmptyArray(arr)) {
        const _check: unknown[] = arr;
        throw new Error("Unreachable");
      } else {
        const check: string = arr;
        expect(check).toBe("hello");
      }
    }
  });

  it("asArray", () => {
    expect(asArray([])).toEqual([]);
    expect(asArray({})).toEqual([]);

    {
      // Type narrowing - preserves array type
      const arr = castType<string[]>(["a", "b"]);
      const result: string[] = asArray(arr);
      expect(result).toBe(arr);
    }

    {
      // Type narrowing - extracts array from union
      const arr = castType<string | string[]>(["a"]);
      const result: string[] = asArray(arr);
      expect(result).toEqual(["a"]);
    }

    {
      // Type narrowing - preserves readonly array
      const arr = castType<readonly number[]>([1, 2]);
      const result: readonly number[] = asArray(arr);
      expect(result).toBe(arr);
    }

    {
      // Type narrowing - preserves tuple
      const arr = castType<[string, number]>(["a", 1]);
      const result: [string, number] = asArray(arr);
      expect(result).toBe(arr);
    }

    {
      // Type narrowing - unknown input returns unknown[]
      const arr = castType<unknown>(["a", "b"]);
      const result: unknown[] = asArray(arr);
      expect(result).toEqual(["a", "b"]);
    }

    {
      // Type narrowing - non-array type (string) returns unknown[]
      const arr = castType<string>("hello");
      const result: unknown[] = asArray(arr);
      expect(result).toEqual([]);
    }
  });

  it("toNonEmptyArray", () => {
    expect(toNonEmptyArray([1])).toEqual([1]);
    expect(toNonEmptyArray([])).toBe(undefined);

    {
      // Type narrowing - preserves array type
      const arr = castType<string[]>(["a", "b"]);
      const result = toNonEmptyArray(arr);
      if (result) {
        const check: string[] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - extracts array from union
      const arr = castType<string | string[]>(["a"]);
      const result = toNonEmptyArray(arr);
      if (result) {
        const check: string[] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - preserves readonly array
      const arr = castType<readonly number[]>([1, 2]);
      const result = toNonEmptyArray(arr);
      if (result) {
        const check: readonly number[] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - preserves tuple
      const arr = castType<[string, number]>(["a", 1]);
      const result = toNonEmptyArray(arr);
      if (result) {
        const check: [string, number] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - unknown input returns unknown[] | undefined
      const arr = castType<unknown>(["a", "b"]);
      const result: unknown[] | undefined = toNonEmptyArray(arr);
      expect(result).toEqual(["a", "b"]);
    }

    {
      // Type narrowing - non-array type (string) returns unknown[] | undefined
      const arr = castType<string>("hello");
      const result: unknown[] | undefined = toNonEmptyArray(arr);
      expect(result).toBe(undefined);
    }
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
