import type { PlainObject } from ".";

import { describe, it, expect } from "vitest";

import {
  isDefined,
  isTrue,
  toTrue,
  asTrue,
  isTruthy,
  isFalsy,
  toFalsy,
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
  toObject,
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

/** Bypass TypeScript static type inference. */
const castType = <T>(x: T): T => x;

describe("primitive.ts", () => {
  it("isDefined", () => {
    expect(isDefined(1)).toBe(true);
    expect(isDefined(undefined)).toBe(false);

    {
      // Type narrowing - excludes undefined from type
      const val = castType<string>("hello");
      if (isDefined(val)) {
        const check: string = val;
        expect(check).toBe("hello");
      }
    }

    {
      // Type narrowing - excludes undefined from union
      const val = castType<string | undefined>("hello");
      if (isDefined(val)) {
        const check: string = val;
        expect(check).toBe("hello");
      }
    }

    {
      // Type narrowing - excludes undefined but keeps null
      const val = castType<number | null | undefined>(42);
      if (isDefined(val)) {
        const check: number | null = val;
        expect(check).toBe(42);
      }
    }
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

    {
      // Type narrowing - excludes falsy from union
      const val = castType<string | null | undefined>("hello");
      if (isTruthy(val)) {
        const check: string = val;
        expect(check).toBe("hello");
      }
    }

    {
      // Type narrowing - excludes all falsy types
      const val = castType<number | false | null | undefined | "" | 0>(42);
      if (isTruthy(val)) {
        const check: number = val;
        expect(check).toBe(42);
      }
    }

    {
      // Type narrowing - narrows boolean to true
      const val = castType<boolean>(true);
      if (isTruthy(val)) {
        const check: true = val;
        expect(check).toBe(true);
      }
    }
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

    {
      // Type narrowing - extracts falsy from union
      const val = castType<string | null | undefined>(null);
      if (isFalsy(val)) {
        const check: null | undefined = val;
        expect(check).toBe(null);
      }
    }

    {
      // Type narrowing - extracts all falsy types
      const val = castType<number | false | null | undefined | "" | 0>(0);
      if (isFalsy(val)) {
        const check: false | null | undefined | "" | 0 = val;
        expect(check).toBe(0);
      }
    }

    {
      // Type narrowing - narrows boolean to false
      const val = castType<boolean>(false);
      if (isFalsy(val)) {
        const check: false = val;
        expect(check).toBe(false);
      }
    }
  });

  it("toFalsy", () => {
    expect(toFalsy(false)).toBe(false);
    expect(toFalsy(null)).toBe(null);
    expect(toFalsy(undefined)).toBe(undefined);
    expect(toFalsy(0)).toBe(0);
    expect(toFalsy("")).toBe("");
    expect(toFalsy(true)).toBe(undefined);
    expect(toFalsy(1)).toBe(undefined);
    expect(toFalsy("hello")).toBe(undefined);

    {
      // Type narrowing - extracts falsy from union
      const val = castType<string | null | undefined>(null);
      const result = toFalsy(val);
      if (result !== undefined) {
        const check: "" | null = result;
        expect(check).toBe(null);
      }
    }

    {
      // Type narrowing - returns undefined for truthy value
      const val = castType<string | null>("hello");
      const result: "" | null | undefined = toFalsy(val);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - extracts falsy from number union
      const val = castType<number | false>(0);
      const result = toFalsy(val);
      if (result !== undefined) {
        const check: 0 | false = result;
        expect(check).toBe(0);
      }
    }
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
    // Runtime behavior - truthy cases
    expect(isNonEmptyString("hello")).toBe(true);
    expect(isNonEmptyString("a")).toBe(true);
    expect(isNonEmptyString(" ")).toBe(true);
    expect(isNonEmptyString("  ")).toBe(true);
    expect(isNonEmptyString("\t")).toBe(true);
    expect(isNonEmptyString("\n")).toBe(true);
    expect(isNonEmptyString("\r\n")).toBe(true);
    expect(isNonEmptyString("0")).toBe(true);
    expect(isNonEmptyString("false")).toBe(true);
    expect(isNonEmptyString("null")).toBe(true);
    expect(isNonEmptyString("undefined")).toBe(true);
    expect(isNonEmptyString("Hello, 世界")).toBe(true);
    expect(isNonEmptyString("🎉")).toBe(true);
    expect(isNonEmptyString("\u0000")).toBe(true); // null character
    expect(isNonEmptyString(String("hello"))).toBe(true);

    // Runtime behavior - falsy cases
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString(String(""))).toBe(false);
    expect(isNonEmptyString(1)).toBe(false);
    expect(isNonEmptyString(0)).toBe(false);
    expect(isNonEmptyString(-1)).toBe(false);
    expect(isNonEmptyString(NaN)).toBe(false);
    expect(isNonEmptyString(Infinity)).toBe(false);
    expect(isNonEmptyString(true)).toBe(false);
    expect(isNonEmptyString(false)).toBe(false);
    expect(isNonEmptyString(null)).toBe(false);
    expect(isNonEmptyString(undefined)).toBe(false);
    expect(isNonEmptyString({})).toBe(false);
    expect(isNonEmptyString({ toString: () => "hello" })).toBe(false);
    expect(isNonEmptyString([])).toBe(false);
    expect(isNonEmptyString(["a", "b"])).toBe(false);
    expect(isNonEmptyString(() => "hello")).toBe(false);
    expect(isNonEmptyString(Symbol("hello"))).toBe(false);
    expect(isNonEmptyString(new Date())).toBe(false);
    expect(isNonEmptyString(/regex/)).toBe(false);
    expect(isNonEmptyString(new String("hello"))).toBe(false); // String object, not primitive

    {
      // Type narrowing - unknown input narrows to string
      const str = castType<unknown>("hello");
      if (isNonEmptyString(str)) {
        const check: string = str;
        expect(check).toBe("hello");
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - empty string returns false
      const str = castType<string>("");
      if (isNonEmptyString(str)) {
        const _check: string = str;
        throw new Error("Unreachable");
      } else {
        expect(str).toBe("");
      }
    }

    {
      // Type narrowing - extracts string from union
      const str = castType<string | number>("hello");
      if (isNonEmptyString(str)) {
        const check: string = str;
        expect(check).toBe("hello");
      } else {
        const _check: string | number = str;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - number in union returns false
      const str = castType<string | number>(42);
      if (isNonEmptyString(str)) {
        const _check: string = str;
        throw new Error("Unreachable");
      } else {
        const check: string | number = str;
        expect(check).toBe(42);
      }
    }

    {
      // Type narrowing - null | string union
      const str = castType<string | null>("hello");
      if (isNonEmptyString(str)) {
        const check: string = str;
        expect(check).toBe("hello");
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - null returns false
      const str = castType<string | null>(null);
      if (isNonEmptyString(str)) {
        const _check: string = str;
        throw new Error("Unreachable");
      } else {
        const check: string | null = str;
        expect(check).toBe(null);
      }
    }

    {
      // Type narrowing - any input
      const str = castType<any>("hello");
      if (isNonEmptyString(str)) {
        const check: string = str;
        expect(check).toBe("hello");
      }
    }

    {
      // Type narrowing - generic function
      const _fn = <T>(x: T): void => {
        if (isNonEmptyString(x)) {
          const y: string = x;
          expect(typeof y).toBe("string");
        }
      };
    }
  });

  it("toNonEmptyString", () => {
    // Runtime behavior - returns value for non-empty strings
    expect(toNonEmptyString("hello")).toBe("hello");
    expect(toNonEmptyString("a")).toBe("a");
    expect(toNonEmptyString(" ")).toBe(" ");
    expect(toNonEmptyString("  ")).toBe("  ");
    expect(toNonEmptyString("\t")).toBe("\t");
    expect(toNonEmptyString("\n")).toBe("\n");
    expect(toNonEmptyString("\r\n")).toBe("\r\n");
    expect(toNonEmptyString("0")).toBe("0");
    expect(toNonEmptyString("false")).toBe("false");
    expect(toNonEmptyString("null")).toBe("null");
    expect(toNonEmptyString("undefined")).toBe("undefined");
    expect(toNonEmptyString("Hello, 世界")).toBe("Hello, 世界");
    expect(toNonEmptyString("🎉")).toBe("🎉");
    expect(toNonEmptyString("\u0000")).toBe("\u0000");
    expect(toNonEmptyString(String("hello"))).toBe("hello");

    // Runtime behavior - returns undefined for empty string and non-strings
    expect(toNonEmptyString("")).toBe(undefined);
    expect(toNonEmptyString(String(""))).toBe(undefined);
    expect(toNonEmptyString(1)).toBe(undefined);
    expect(toNonEmptyString(0)).toBe(undefined);
    expect(toNonEmptyString(-1)).toBe(undefined);
    expect(toNonEmptyString(NaN)).toBe(undefined);
    expect(toNonEmptyString(Infinity)).toBe(undefined);
    expect(toNonEmptyString(true)).toBe(undefined);
    expect(toNonEmptyString(false)).toBe(undefined);
    expect(toNonEmptyString(null)).toBe(undefined);
    expect(toNonEmptyString(undefined)).toBe(undefined);
    expect(toNonEmptyString({})).toBe(undefined);
    expect(toNonEmptyString({ toString: () => "hello" })).toBe(undefined);
    expect(toNonEmptyString([])).toBe(undefined);
    expect(toNonEmptyString(["a", "b"])).toBe(undefined);
    expect(toNonEmptyString(() => "hello")).toBe(undefined);
    expect(toNonEmptyString(Symbol("hello"))).toBe(undefined);
    expect(toNonEmptyString(new Date())).toBe(undefined);
    expect(toNonEmptyString(/regex/)).toBe(undefined);
    expect(toNonEmptyString(new String("hello"))).toBe(undefined);

    {
      // Type narrowing - unknown input returns string | undefined
      const str = castType<unknown>("hello");
      const result: string | undefined = toNonEmptyString(str);
      expect(result).toBe("hello");
    }

    {
      // Type narrowing - empty string returns undefined
      const str = castType<string>("");
      const result = toNonEmptyString(str);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - extracts string from union
      const str = castType<string | number>("hello");
      const result = toNonEmptyString(str);
      if (result) {
        const check: string = result;
        expect(check).toBe("hello");
      }
    }

    {
      // Type narrowing - number in union returns undefined
      const str = castType<string | number>(42);
      const result = toNonEmptyString(str);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - null | string union
      const str = castType<string | null>("hello");
      const result = toNonEmptyString(str);
      if (result) {
        const check: string = result;
        expect(check).toBe("hello");
      }
    }

    {
      // Type narrowing - null returns undefined
      const str = castType<string | null>(null);
      const result = toNonEmptyString(str);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - any input returns string | undefined
      const str = castType<any>("hello");
      const result: string | undefined = toNonEmptyString(str);
      expect(result).toBe("hello");
    }

    {
      // Type narrowing - optional chaining works
      const str = castType<unknown>("hello");
      const upper = toNonEmptyString(str)?.toUpperCase();
      expect(upper).toBe("HELLO");
    }

    {
      // Type narrowing - optional chaining with empty string
      const str = castType<unknown>("");
      const upper = toNonEmptyString(str)?.toUpperCase();
      expect(upper).toBe(undefined);
    }
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

    {
      // Type narrowing - generic
      const _fn = <T>(x: T): void => {
        if (isArray(x)) {
          const y: readonly any[] = x;
          expect(Array.isArray(y)).toBe(true);
        }
      };
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
      toArray(arr)?.map(x => x);
    }

    {
      // Type narrowing - any returns any[]
      const arr = castType<any>("hello");
      const result: unknown[] | undefined = toArray(arr);
      expect(result).toBe(undefined);
      toArray(arr)?.map(x => x);
    }
  });

  it("isNonEmptyArray", () => {
    // Runtime behavior - truthy cases
    expect(isNonEmptyArray([1])).toBe(true);
    expect(isNonEmptyArray([1, 2, 3])).toBe(true);
    expect(isNonEmptyArray(["a", "b", "c"])).toBe(true);
    expect(isNonEmptyArray([undefined])).toBe(true);
    expect(isNonEmptyArray([null])).toBe(true);
    expect(isNonEmptyArray([false])).toBe(true);
    expect(isNonEmptyArray([0])).toBe(true);
    expect(isNonEmptyArray([""])).toBe(true);
    expect(isNonEmptyArray([{}])).toBe(true);
    expect(isNonEmptyArray([[]])).toBe(true);
    expect(isNonEmptyArray([() => {}])).toBe(true);
    expect(isNonEmptyArray(new Array(1).fill(undefined))).toBe(true);
    expect(isNonEmptyArray(Array.from({ length: 1 }))).toBe(true);
    // eslint-disable-next-line no-sparse-arrays
    expect(isNonEmptyArray([, , 1])).toBe(true); // sparse array with value
    expect(isNonEmptyArray(Object.assign([], { 0: "a" }))).toBe(true);

    // Runtime behavior - falsy cases
    expect(isNonEmptyArray([])).toBe(false);
    expect(isNonEmptyArray([])).toBe(false);
    expect(isNonEmptyArray(new Array(0))).toBe(false);
    expect(isNonEmptyArray(Array.from({ length: 0 }))).toBe(false);
    expect(isNonEmptyArray({})).toBe(false);
    expect(isNonEmptyArray({ length: 1, 0: "a" })).toBe(false); // array-like object
    expect(isNonEmptyArray({ length: 0 })).toBe(false);
    expect(isNonEmptyArray(null)).toBe(false);
    expect(isNonEmptyArray(undefined)).toBe(false);
    expect(isNonEmptyArray("string")).toBe(false);
    expect(isNonEmptyArray("")).toBe(false);
    expect(isNonEmptyArray("abc")).toBe(false); // string is not array
    expect(isNonEmptyArray(123)).toBe(false);
    expect(isNonEmptyArray(0)).toBe(false);
    expect(isNonEmptyArray(NaN)).toBe(false);
    expect(isNonEmptyArray(true)).toBe(false);
    expect(isNonEmptyArray(false)).toBe(false);
    expect(isNonEmptyArray(Symbol())).toBe(false);
    expect(isNonEmptyArray(() => {})).toBe(false);
    expect(isNonEmptyArray(function () {})).toBe(false);
    expect(isNonEmptyArray(new Date())).toBe(false);
    expect(isNonEmptyArray(/regex/)).toBe(false);
    expect(isNonEmptyArray(new Map([[0, "a"]]))).toBe(false);
    expect(isNonEmptyArray(new Set([1, 2]))).toBe(false);
    expect(isNonEmptyArray(new Int8Array([1, 2]))).toBe(false); // typed arrays are not Array.isArray

    // Sparse arrays (length > 0 but no actual elements)
    const sparseArray = new Array(3);
    expect(isNonEmptyArray(sparseArray)).toBe(true); // length is 3, so truthy

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
      // Type narrowing - extracts array from union (string case)
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
      // Type narrowing - empty array returns false
      const arr = castType<string[]>([]);
      if (isNonEmptyArray(arr)) {
        const _check: string[] = arr;
        throw new Error("Unreachable");
      } else {
        const check: string[] = arr;
        expect(check).toEqual([]);
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

    {
      // Type narrowing - null | array union
      const arr = castType<number[] | null>([1, 2]);
      if (isNonEmptyArray(arr)) {
        const check: number[] = arr;
        expect(check).toEqual([1, 2]);
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - null returns false
      const arr = castType<number[] | null>(null);
      if (isNonEmptyArray(arr)) {
        const _check: number[] = arr;
        throw new Error("Unreachable");
      } else {
        const check: null = arr;
        expect(check).toBe(null);
      }
    }

    {
      // Type narrowing - any input
      const arr = castType<any>([1, 2]);
      if (isNonEmptyArray(arr)) {
        const check: unknown[] = arr;
        expect(check).toEqual([1, 2]);
      }
    }

    {
      // Type narrowing - generic function
      const _fn = <T>(x: T): void => {
        if (isNonEmptyArray(x)) {
          const y: readonly unknown[] = x;
          expect(Array.isArray(y)).toBe(true);
        }
      };
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
      asArray(arr).map(x => x);
    }

    {
      // Type narrowing - non-array type (string) returns unknown[]
      const arr = castType<string>("hello");
      const result: unknown[] = asArray(arr);
      expect(result).toEqual([]);
      asArray(arr).map(x => x);
    }
  });

  it("toNonEmptyArray", () => {
    // Runtime behavior - returns value for non-empty arrays
    expect(toNonEmptyArray([1])).toEqual([1]);
    expect(toNonEmptyArray([1, 2, 3])).toEqual([1, 2, 3]);
    expect(toNonEmptyArray(["a", "b", "c"])).toEqual(["a", "b", "c"]);
    expect(toNonEmptyArray([undefined])).toEqual([undefined]);
    expect(toNonEmptyArray([null])).toEqual([null]);
    expect(toNonEmptyArray([false])).toEqual([false]);
    expect(toNonEmptyArray([0])).toEqual([0]);
    expect(toNonEmptyArray([""])).toEqual([""]);
    expect(toNonEmptyArray([{}])).toEqual([{}]);
    expect(toNonEmptyArray([[]])).toEqual([[]]);
    const fn = () => {};
    expect(toNonEmptyArray([fn])).toEqual([fn]);

    // Returns same reference for non-empty arrays
    const arr = [1, 2, 3];
    expect(toNonEmptyArray(arr)).toBe(arr);

    // Sparse arrays (length > 0)
    const sparseArray = new Array(3);
    expect(toNonEmptyArray(sparseArray)).toBe(sparseArray);

    // Runtime behavior - returns undefined for empty arrays and non-arrays
    expect(toNonEmptyArray([])).toBe(undefined);
    expect(toNonEmptyArray([])).toBe(undefined);
    expect(toNonEmptyArray(new Array(0))).toBe(undefined);
    expect(toNonEmptyArray(Array.from({ length: 0 }))).toBe(undefined);
    expect(toNonEmptyArray({})).toBe(undefined);
    expect(toNonEmptyArray({ length: 1, 0: "a" })).toBe(undefined); // array-like object
    expect(toNonEmptyArray({ length: 0 })).toBe(undefined);
    expect(toNonEmptyArray(null)).toBe(undefined);
    expect(toNonEmptyArray(undefined)).toBe(undefined);
    expect(toNonEmptyArray("string")).toBe(undefined);
    expect(toNonEmptyArray("")).toBe(undefined);
    expect(toNonEmptyArray("abc")).toBe(undefined);
    expect(toNonEmptyArray(123)).toBe(undefined);
    expect(toNonEmptyArray(0)).toBe(undefined);
    expect(toNonEmptyArray(NaN)).toBe(undefined);
    expect(toNonEmptyArray(true)).toBe(undefined);
    expect(toNonEmptyArray(false)).toBe(undefined);
    expect(toNonEmptyArray(Symbol())).toBe(undefined);
    expect(toNonEmptyArray(() => {})).toBe(undefined);
    expect(toNonEmptyArray(function () {})).toBe(undefined);
    expect(toNonEmptyArray(new Date())).toBe(undefined);
    expect(toNonEmptyArray(/regex/)).toBe(undefined);
    expect(toNonEmptyArray(new Map([[0, "a"]]))).toBe(undefined);
    expect(toNonEmptyArray(new Set([1, 2]))).toBe(undefined);
    expect(toNonEmptyArray(new Int8Array([1, 2]))).toBe(undefined);

    {
      // Type narrowing - preserves array type
      const arr = castType<string[]>(["a", "b"]);
      const result = toNonEmptyArray(arr);
      if (result) {
        const check: string[] = result;
        expect(check).toBe(arr);
      } else {
        throw new Error("Unreachable");
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
      // Type narrowing - string in union returns undefined
      const arr = castType<string | string[]>("hello");
      const result = toNonEmptyArray(arr);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - empty array returns undefined
      const arr = castType<string[]>([]);
      const result = toNonEmptyArray(arr);
      expect(result).toBe(undefined);
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
      let result = toNonEmptyArray(arr);
      if (result) {
        // rule out never
        let check = result;
        check = castType<unknown[]>(result);
        expect(check).toEqual(["a", "b"]);
      }
    }

    {
      // Type narrowing - non-array type (string) returns unknown[] | undefined
      const arr = castType<string>("hello");
      const result = toNonEmptyArray(arr);
      expect(result).toBe(undefined);
      if (result) {
        // rule out never
        let _check = result;
        _check = castType<unknown[]>(result);
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - null | array union
      const arr = castType<number[] | null>([1, 2]);
      const result = toNonEmptyArray(arr);
      if (result) {
        const check: number[] = result;
        expect(check).toEqual([1, 2]);
      }
    }

    {
      // Type narrowing - null returns undefined
      const arr = castType<number[] | null>(null);
      const result = toNonEmptyArray(arr);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - undefined | array union
      const arr = castType<number[] | undefined>([1, 2]);
      const result = toNonEmptyArray(arr);
      if (result) {
        const check: number[] = result;
        expect(check).toEqual([1, 2]);
      }
    }

    {
      // Type narrowing - any input returns unknown[] | undefined
      const arr = castType<any>([1, 2]);
      const result: unknown[] | undefined = toNonEmptyArray(arr);
      expect(result).toEqual([1, 2]);
    }

    {
      // Type narrowing - optional chaining works
      const arr = castType<unknown>([1, 2, 3]);
      const length = toNonEmptyArray(arr)?.length;
      expect(length).toBe(3);
    }

    {
      // Type narrowing - optional chaining with empty array
      const arr = castType<unknown>([]);
      const length = toNonEmptyArray(arr)?.length;
      expect(length).toBe(undefined);
    }

    {
      // Type narrowing - map over result
      const arr = castType<number[]>([1, 2, 3]);
      const doubled = toNonEmptyArray(arr)?.map(x => x * 2);
      expect(doubled).toEqual([2, 4, 6]);
    }
  });

  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(null)).toBe(false);

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: string }>({ a: "hello" });
      if (isObject(obj)) {
        const check: { a: string } = obj;
        expect(check).toBe(obj);
      }
    }

    {
      // Type narrowing - extracts object from union
      const obj = castType<string | { a: string }>({ a: "hello" });
      if (isObject(obj)) {
        const check: object = obj;
        expect(check).toEqual({ a: "hello" });
      }
    }

    {
      // Type narrowing - arrays are objects
      const arr = castType<string[]>(["a", "b"]);
      if (isObject(arr)) {
        const check: string[] = arr;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - unknown input narrows to object
      const obj = castType<unknown>({ a: 1 });
      if (isObject(obj)) {
        const check: object = obj;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - null | object union extracts object
      const obj = castType<null | { x: number }>({ x: 42 });
      if (isObject(obj)) {
        const check: { x: number } = obj;
        expect(check).toEqual({ x: 42 });
      }
    }
  });

  it("toObject", () => {
    expect(toObject({})).toEqual({});
    expect(toObject([])).toEqual([]);
    expect(toObject(null)).toBe(undefined);

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: string }>({ a: "hello" });
      const result = toObject(obj);
      if (result) {
        const check: { a: string } = result;
        expect(check).toBe(obj);
      }
    }

    {
      // Type narrowing - extracts object from union
      const obj = castType<string | { a: string }>({ a: "hello" });
      const result = toObject(obj);
      if (result) {
        const check: { a: string } = result;
        expect(check).toEqual({ a: "hello" });
      }
    }

    {
      // Type narrowing - preserves array (arrays are objects)
      const arr = castType<string[]>(["a", "b"]);
      const result = toObject(arr);
      if (result) {
        const check: string[] = result;
        expect(check).toBe(arr);
      }
    }

    {
      // Type narrowing - unknown input returns object | undefined
      const obj = castType<unknown>({ a: 1 });
      const result: object | undefined = toObject(obj);
      expect(result).toEqual({ a: 1 });
    }

    {
      // Type narrowing - non-object type (string) returns undefined
      const obj = castType<string>("hello");
      const result: object | undefined = toObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - null | object union extracts object
      const obj = castType<null | { x: number }>({ x: 42 });
      const result = toObject(obj);
      if (result) {
        const check: { x: number } = result;
        expect(check).toEqual({ x: 42 });
      }
    }
  });

  it("asObject", () => {
    expect(asObject({})).toEqual({});
    expect(asObject([])).toEqual([]);
    expect(asObject(null)).toEqual({});

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: string }>({ a: "hello" });
      const result: { a: string } = asObject(obj);
      expect(result).toBe(obj);
    }

    {
      // Type narrowing - extracts object from union
      const obj = castType<string | { a: string }>({ a: "hello" });
      const result: { a: string } = asObject(obj);
      expect(result).toEqual({ a: "hello" });
    }

    {
      // Type narrowing - preserves array (arrays are objects)
      const arr = castType<string[]>(["a", "b"]);
      const result: string[] = asObject(arr);
      expect(result).toBe(arr);
    }

    {
      // Type narrowing - unknown input returns object
      const obj = castType<unknown>({ a: 1 });
      const result: object = asObject(obj);
      expect(result).toEqual({ a: 1 });
    }

    {
      // Type narrowing - non-object type (string) returns object
      const obj = castType<string>("hello");
      const result: object = asObject(obj);
      expect(result).toEqual({});
    }

    {
      // Type narrowing - null | object union extracts object
      const obj = castType<null | { x: number }>({ x: 42 });
      const result: { x: number } = asObject(obj);
      expect(result).toEqual({ x: 42 });
    }
  });

  it("isPlainObject", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(null)).toBe(false);

    {
      // Type narrowing - unknown input narrows to PlainObject
      const obj = castType<unknown>({ a: 1 });
      if (isPlainObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - excludes array from union
      const obj = castType<{ a: number } | number[]>({ a: 1 });
      if (isPlainObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - null | object union extracts PlainObject
      const obj = castType<null | { x: number }>({ x: 42 });
      if (isPlainObject(obj)) {
        const check: { x: number } = obj;
        expect(check).toEqual({ x: 42 });
      }
    }
  });

  it("toPlainObject", () => {
    expect(toPlainObject({})).toEqual({});
    expect(toPlainObject([])).toBe(undefined);
    expect(toPlainObject(null)).toBe(undefined);

    {
      // Type narrowing - unknown input returns PlainObject | undefined
      const obj = castType<unknown>({ a: 1 });
      const result: PlainObject | undefined = toPlainObject(obj);
      expect(result).toEqual({ a: 1 });
    }

    {
      // Type narrowing - array returns undefined
      const arr = castType<number[]>([1, 2]);
      const result: PlainObject | undefined = toPlainObject(arr);
      expect(result).toBe(undefined);
    }
  });

  it("asPlainObject", () => {
    expect(asPlainObject({})).toEqual({});
    expect(asPlainObject([])).toEqual({});
    expect(asPlainObject(null)).toEqual({});

    {
      // Type narrowing - unknown input returns PlainObject
      const obj = castType<unknown>({ a: 1 });
      const result: PlainObject = asPlainObject(obj);
      expect(result).toEqual({ a: 1 });
    }

    {
      // Type narrowing - array returns empty object
      const arr = castType<number[]>([1, 2]);
      const result: PlainObject = asPlainObject(arr);
      expect(result).toEqual({});
    }

    {
      // Type narrowing - non-object returns empty object
      const val = castType<string>("hello");
      const result: PlainObject = asPlainObject(val);
      expect(result).toEqual({});
    }
  });

  it("isNonEmptyPlainObject", () => {
    // Runtime behavior - truthy cases
    expect(isNonEmptyPlainObject({ a: 1 })).toBe(true);
    expect(isNonEmptyPlainObject({ a: undefined })).toBe(true);
    expect(isNonEmptyPlainObject({ a: null })).toBe(true);
    expect(isNonEmptyPlainObject({ a: false })).toBe(true);
    expect(isNonEmptyPlainObject({ a: 0 })).toBe(true);
    expect(isNonEmptyPlainObject({ a: "" })).toBe(true);
    expect(isNonEmptyPlainObject({ "": 1 })).toBe(true);
    expect(isNonEmptyPlainObject({ 0: "a" })).toBe(true);
    expect(isNonEmptyPlainObject({ a: 1, b: 2, c: 3 })).toBe(true);
    expect(isNonEmptyPlainObject({ nested: { deep: { value: 1 } } })).toBe(true);
    expect(isNonEmptyPlainObject(Object.create(null, { a: { value: 1, enumerable: true } }))).toBe(true);

    // Runtime behavior - falsy cases
    expect(isNonEmptyPlainObject({})).toBe(false);
    expect(isNonEmptyPlainObject([])).toBe(false);
    expect(isNonEmptyPlainObject([1, 2, 3])).toBe(false);
    expect(isNonEmptyPlainObject("hello")).toBe(false);
    expect(isNonEmptyPlainObject("")).toBe(false);
    expect(isNonEmptyPlainObject(1)).toBe(false);
    expect(isNonEmptyPlainObject(0)).toBe(false);
    expect(isNonEmptyPlainObject(NaN)).toBe(false);
    expect(isNonEmptyPlainObject(null)).toBe(false);
    expect(isNonEmptyPlainObject(undefined)).toBe(false);
    expect(isNonEmptyPlainObject(false)).toBe(false);
    expect(isNonEmptyPlainObject(true)).toBe(false);
    expect(isNonEmptyPlainObject(Symbol())).toBe(false);
    expect(isNonEmptyPlainObject(() => {})).toBe(false);
    expect(isNonEmptyPlainObject(function () {})).toBe(false);
    expect(isNonEmptyPlainObject(new Date())).toBe(false);
    expect(isNonEmptyPlainObject(/regex/)).toBe(false);
    expect(isNonEmptyPlainObject(new Map([["a", 1]]))).toBe(false);
    expect(isNonEmptyPlainObject(new Set([1, 2]))).toBe(false);

    // Objects with only inherited properties (no own properties)
    const proto = { inherited: 1 };
    const objWithInherited = Object.create(proto);
    expect(isNonEmptyPlainObject(objWithInherited)).toBe(false);

    // Objects with own properties shadow inherited
    const objWithOwn = Object.create(proto);
    objWithOwn.own = 2;
    expect(isNonEmptyPlainObject(objWithOwn)).toBe(true);

    // Objects with symbol keys (symbols are not enumerated by for...in)
    const sym = Symbol("key");
    const objWithSymbol = { [sym]: 1 };
    expect(isNonEmptyPlainObject(objWithSymbol)).toBe(false);

    // Objects with both string and symbol keys
    const objWithBoth = { a: 1, [sym]: 2 };
    expect(isNonEmptyPlainObject(objWithBoth)).toBe(true);

    // Objects with non-enumerable properties
    const objWithNonEnumerable = {};
    Object.defineProperty(objWithNonEnumerable, "hidden", { value: 1, enumerable: false });
    expect(isNonEmptyPlainObject(objWithNonEnumerable)).toBe(false);

    // Object.create(null) with properties
    const nullProtoObj = Object.create(null);
    nullProtoObj.a = 1;
    expect(isNonEmptyPlainObject(nullProtoObj)).toBe(true);

    // Empty Object.create(null)
    expect(isNonEmptyPlainObject(Object.create(null))).toBe(false);

    // Class instances (they are plain objects in the shallow sense)
    class MyClass {
      prop = 1;
    }
    expect(isNonEmptyPlainObject(new MyClass())).toBe(true);

    // Empty class instance
    class EmptyClass {}
    expect(isNonEmptyPlainObject(new EmptyClass())).toBe(false);

    {
      // Type narrowing - unknown input narrows to PlainObject
      const obj = castType<unknown>({ a: 1 });
      if (isNonEmptyPlainObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - empty object returns false
      const obj = castType<{ a?: number }>({});
      if (isNonEmptyPlainObject(obj)) {
        const _check: { a?: number } = obj;
        throw new Error("Unreachable");
      } else {
        expect(obj).toEqual({});
      }
    }

    {
      // Type narrowing - excludes array
      const obj = castType<{ a: number } | number[]>({ a: 1 });
      if (isNonEmptyPlainObject(obj)) {
        const check: { a: number } = obj;
        expect(check).toEqual({ a: 1 });
      } else {
        const _check: number[] = obj;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - array returns false
      const arr = castType<{ a: number } | number[]>([1, 2, 3]);
      if (isNonEmptyPlainObject(arr)) {
        const _check: { a: number } = arr;
        throw new Error("Unreachable");
      } else {
        const check: number[] = arr;
        expect(check).toEqual([1, 2, 3]);
      }
    }

    {
      // Type narrowing - null | object union extracts PlainObject
      const obj = castType<null | { x: number }>({ x: 42 });
      if (isNonEmptyPlainObject(obj)) {
        const check: { x: number } = obj;
        expect(check).toEqual({ x: 42 });
      } else {
        const _check: null = obj;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - null returns false
      const obj = castType<null | { x: number }>(null);
      if (isNonEmptyPlainObject(obj)) {
        const _check: { x: number } = obj;
        throw new Error("Unreachable");
      } else {
        const check: null = obj;
        expect(check).toBe(null);
      }
    }

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: string; b: number }>({ a: "hello", b: 42 });
      if (isNonEmptyPlainObject(obj)) {
        const check: { a: string; b: number } = obj;
        expect(check).toEqual({ a: "hello", b: 42 });
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - any input
      const obj = castType<any>({ a: 1 });
      if (isNonEmptyPlainObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - generic function
      const _fn = <T>(x: T): void => {
        if (isNonEmptyPlainObject(x)) {
          const y: object = x;
          expect(typeof y).toBe("object");
        }
      };
    }
  });

  it("toNonEmptyPlainObject", () => {
    // Runtime behavior - returns value for non-empty plain objects
    expect(toNonEmptyPlainObject({ a: 1 })).toEqual({ a: 1 });
    expect(toNonEmptyPlainObject({ a: undefined })).toEqual({ a: undefined });
    expect(toNonEmptyPlainObject({ a: null })).toEqual({ a: null });
    expect(toNonEmptyPlainObject({ a: false })).toEqual({ a: false });
    expect(toNonEmptyPlainObject({ a: 0 })).toEqual({ a: 0 });
    expect(toNonEmptyPlainObject({ a: "" })).toEqual({ a: "" });
    expect(toNonEmptyPlainObject({ "": 1 })).toEqual({ "": 1 });
    expect(toNonEmptyPlainObject({ 0: "a" })).toEqual({ 0: "a" });
    expect(toNonEmptyPlainObject({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    expect(toNonEmptyPlainObject({ nested: { deep: { value: 1 } } })).toEqual({ nested: { deep: { value: 1 } } });

    // Runtime behavior - returns undefined for empty or non-objects
    expect(toNonEmptyPlainObject({})).toBe(undefined);
    expect(toNonEmptyPlainObject([])).toBe(undefined);
    expect(toNonEmptyPlainObject([1, 2, 3])).toBe(undefined);
    expect(toNonEmptyPlainObject("hello")).toBe(undefined);
    expect(toNonEmptyPlainObject("")).toBe(undefined);
    expect(toNonEmptyPlainObject(1)).toBe(undefined);
    expect(toNonEmptyPlainObject(0)).toBe(undefined);
    expect(toNonEmptyPlainObject(NaN)).toBe(undefined);
    expect(toNonEmptyPlainObject(null)).toBe(undefined);
    expect(toNonEmptyPlainObject(undefined)).toBe(undefined);
    expect(toNonEmptyPlainObject(false)).toBe(undefined);
    expect(toNonEmptyPlainObject(true)).toBe(undefined);
    expect(toNonEmptyPlainObject(Symbol())).toBe(undefined);
    expect(toNonEmptyPlainObject(() => {})).toBe(undefined);
    expect(toNonEmptyPlainObject(function () {})).toBe(undefined);
    expect(toNonEmptyPlainObject(new Date())).toBe(undefined);
    expect(toNonEmptyPlainObject(/regex/)).toBe(undefined);
    expect(toNonEmptyPlainObject(new Map([["a", 1]]))).toBe(undefined);
    expect(toNonEmptyPlainObject(new Set([1, 2]))).toBe(undefined);

    // Objects with only inherited properties (no own properties)
    const proto = { inherited: 1 };
    const objWithInherited = Object.create(proto);
    expect(toNonEmptyPlainObject(objWithInherited)).toBe(undefined);

    // Objects with own properties shadow inherited
    const objWithOwn = Object.create(proto);
    objWithOwn.own = 2;
    expect(toNonEmptyPlainObject(objWithOwn)).toBe(objWithOwn);

    // Objects with symbol keys (symbols are not enumerated by for...in)
    const sym = Symbol("key");
    const objWithSymbol = { [sym]: 1 };
    expect(toNonEmptyPlainObject(objWithSymbol)).toBe(undefined);

    // Objects with both string and symbol keys
    const objWithBoth = { a: 1, [sym]: 2 };
    expect(toNonEmptyPlainObject(objWithBoth)).toBe(objWithBoth);

    // Objects with non-enumerable properties
    const objWithNonEnumerable = {};
    Object.defineProperty(objWithNonEnumerable, "hidden", { value: 1, enumerable: false });
    expect(toNonEmptyPlainObject(objWithNonEnumerable)).toBe(undefined);

    // Object.create(null) with properties
    const nullProtoObj = Object.create(null);
    nullProtoObj.a = 1;
    expect(toNonEmptyPlainObject(nullProtoObj)).toBe(nullProtoObj);

    // Empty Object.create(null)
    expect(toNonEmptyPlainObject(Object.create(null))).toBe(undefined);

    // Class instances (they are plain objects in the shallow sense)
    class MyClass {
      prop = 1;
    }
    const instance = new MyClass();
    expect(toNonEmptyPlainObject(instance)).toBe(instance);

    // Empty class instance
    class EmptyClass {}
    expect(toNonEmptyPlainObject(new EmptyClass())).toBe(undefined);

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: number }>({ a: 1 });
      const result = toNonEmptyPlainObject(obj);
      if (result) {
        const check: { a: number } = result;
        expect(check).toEqual({ a: 1 });
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - undefined input returns undefined
      const obj = castType<{ a: number } | undefined>(undefined);
      const result: { a: number } | undefined = toNonEmptyPlainObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - empty object returns undefined
      const obj = castType<{ a?: number }>({});
      const result = toNonEmptyPlainObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - non-object type returns PlainObject | undefined
      const obj = castType<number>(42);
      const result: PlainObject | undefined = toNonEmptyPlainObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - unknown input returns PlainObject | undefined
      const obj = castType<unknown>({ a: 1 });
      const result: PlainObject | undefined = toNonEmptyPlainObject(obj);
      expect(result).toEqual({ a: 1 });
    }

    {
      // Type narrowing - any input returns PlainObject | undefined
      const obj = castType<any>({ a: 1 });
      const result: PlainObject | undefined = toNonEmptyPlainObject(obj);
      expect(result).toEqual({ a: 1 });
    }

    {
      // Type narrowing - extracts object from union with array
      const obj = castType<{ a: number } | number[]>({ a: 1 });
      const result = toNonEmptyPlainObject(obj);
      if (result) {
        const check: { a: number } = result;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - array in union returns undefined
      const obj = castType<{ a: number } | number[]>([1, 2, 3]);
      const result = toNonEmptyPlainObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - null | object union extracts PlainObject
      const obj = castType<null | { x: number }>({ x: 42 });
      const result = toNonEmptyPlainObject(obj);
      if (result) {
        const check: { x: number } = result;
        expect(check).toEqual({ x: 42 });
      }
    }

    {
      // Type narrowing - null returns undefined
      const obj = castType<null | { x: number }>(null);
      const result = toNonEmptyPlainObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - preserves complex object type
      const obj = castType<{ a: string; b: number; c: boolean }>({ a: "hello", b: 42, c: true });
      const result = toNonEmptyPlainObject(obj);
      if (result) {
        const check: { a: string; b: number; c: boolean } = result;
        expect(check).toEqual({ a: "hello", b: 42, c: true });
      }
    }

    {
      // Type narrowing - optional chaining works
      const obj = castType<unknown>({ a: 1 });
      const keys = Object.keys(toNonEmptyPlainObject(obj) ?? {});
      expect(keys).toEqual(["a"]);
    }
  });

  it("isNonEmptyJSONObject", () => {
    // Runtime behavior - truthy cases (has at least one non-undefined value)
    expect(isNonEmptyJSONObject({ a: 1 })).toBe(true);
    expect(isNonEmptyJSONObject({ a: null })).toBe(true);
    expect(isNonEmptyJSONObject({ a: false })).toBe(true);
    expect(isNonEmptyJSONObject({ a: 0 })).toBe(true);
    expect(isNonEmptyJSONObject({ a: "" })).toBe(true);
    expect(isNonEmptyJSONObject({ "": 1 })).toBe(true);
    expect(isNonEmptyJSONObject({ 0: "a" })).toBe(true);
    expect(isNonEmptyJSONObject({ a: 1, b: 2, c: 3 })).toBe(true);
    expect(isNonEmptyJSONObject({ nested: { deep: { value: 1 } } })).toBe(true);
    expect(isNonEmptyJSONObject(Object.create(null, { a: { value: 1, enumerable: true } }))).toBe(true);
    // Mixed undefined and defined values - should be true
    expect(isNonEmptyJSONObject({ a: undefined, b: 1 })).toBe(true);
    expect(isNonEmptyJSONObject({ a: 1, b: undefined })).toBe(true);
    expect(isNonEmptyJSONObject({ a: undefined, b: undefined, c: null })).toBe(true);

    // Runtime behavior - falsy cases
    expect(isNonEmptyJSONObject({})).toBe(false);
    expect(isNonEmptyJSONObject({ a: undefined })).toBe(false);
    expect(isNonEmptyJSONObject({ a: undefined, b: undefined })).toBe(false);
    expect(isNonEmptyJSONObject([])).toBe(false);
    expect(isNonEmptyJSONObject([1, 2, 3])).toBe(false);
    expect(isNonEmptyJSONObject("hello")).toBe(false);
    expect(isNonEmptyJSONObject("")).toBe(false);
    expect(isNonEmptyJSONObject(1)).toBe(false);
    expect(isNonEmptyJSONObject(0)).toBe(false);
    expect(isNonEmptyJSONObject(NaN)).toBe(false);
    expect(isNonEmptyJSONObject(null)).toBe(false);
    expect(isNonEmptyJSONObject(undefined)).toBe(false);
    expect(isNonEmptyJSONObject(false)).toBe(false);
    expect(isNonEmptyJSONObject(true)).toBe(false);
    expect(isNonEmptyJSONObject(Symbol())).toBe(false);
    expect(isNonEmptyJSONObject(() => {})).toBe(false);
    expect(isNonEmptyJSONObject(function () {})).toBe(false);
    expect(isNonEmptyJSONObject(new Date())).toBe(false);
    expect(isNonEmptyJSONObject(/regex/)).toBe(false);
    expect(isNonEmptyJSONObject(new Map([["a", 1]]))).toBe(false);
    expect(isNonEmptyJSONObject(new Set([1, 2]))).toBe(false);

    // Objects with only inherited properties (no own properties)
    const proto = { inherited: 1 };
    const objWithInherited = Object.create(proto);
    expect(isNonEmptyJSONObject(objWithInherited)).toBe(false);

    // Objects with inherited and own undefined property
    const objWithOwnUndefined = Object.create(proto);
    objWithOwnUndefined.own = undefined;
    expect(isNonEmptyJSONObject(objWithOwnUndefined)).toBe(false);

    // Objects with own non-undefined property
    const objWithOwn = Object.create(proto);
    objWithOwn.own = 2;
    expect(isNonEmptyJSONObject(objWithOwn)).toBe(true);

    // Objects with symbol keys (symbols are not enumerated by for...in)
    const sym = Symbol("key");
    const objWithSymbol = { [sym]: 1 };
    expect(isNonEmptyJSONObject(objWithSymbol)).toBe(false);

    // Objects with both string and symbol keys
    const objWithBoth = { a: 1, [sym]: 2 };
    expect(isNonEmptyJSONObject(objWithBoth)).toBe(true);

    // Objects with symbol key and only undefined string key
    const objWithSymbolAndUndefined = { a: undefined, [sym]: 2 };
    expect(isNonEmptyJSONObject(objWithSymbolAndUndefined)).toBe(false);

    // Objects with non-enumerable properties
    const objWithNonEnumerable = {};
    Object.defineProperty(objWithNonEnumerable, "hidden", { value: 1, enumerable: false });
    expect(isNonEmptyJSONObject(objWithNonEnumerable)).toBe(false);

    // Object.create(null) with non-undefined property
    const nullProtoObj = Object.create(null);
    nullProtoObj.a = 1;
    expect(isNonEmptyJSONObject(nullProtoObj)).toBe(true);

    // Object.create(null) with only undefined property
    const nullProtoObjUndefined = Object.create(null);
    nullProtoObjUndefined.a = undefined;
    expect(isNonEmptyJSONObject(nullProtoObjUndefined)).toBe(false);

    // Empty Object.create(null)
    expect(isNonEmptyJSONObject(Object.create(null))).toBe(false);

    // Class instances with non-undefined property
    class MyClass {
      prop = 1;
    }
    expect(isNonEmptyJSONObject(new MyClass())).toBe(true);

    // Class instances with only undefined property
    class MyClassUndefined {
      prop = undefined;
    }
    expect(isNonEmptyJSONObject(new MyClassUndefined())).toBe(false);

    // Empty class instance
    class EmptyClass {}
    expect(isNonEmptyJSONObject(new EmptyClass())).toBe(false);

    {
      // Type narrowing - unknown input narrows to PlainObject
      const obj = castType<unknown>({ a: 1 });
      if (isNonEmptyJSONObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - object with only undefined values returns false
      const obj = castType<{ a?: number }>({ a: undefined });
      if (isNonEmptyJSONObject(obj)) {
        const _check: { a?: number } = obj;
        throw new Error("Unreachable");
      } else {
        expect(obj).toEqual({ a: undefined });
      }
    }

    {
      // Type narrowing - excludes array
      const obj = castType<{ a: number } | number[]>({ a: 1 });
      if (isNonEmptyJSONObject(obj)) {
        const check: { a: number } = obj;
        expect(check).toEqual({ a: 1 });
      } else {
        const _check: number[] = obj;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - array returns false
      const arr = castType<{ a: number } | number[]>([1, 2, 3]);
      if (isNonEmptyJSONObject(arr)) {
        const _check: { a: number } = arr;
        throw new Error("Unreachable");
      } else {
        const check: number[] = arr;
        expect(check).toEqual([1, 2, 3]);
      }
    }

    {
      // Type narrowing - null | object union extracts PlainObject
      const obj = castType<null | { x: number }>({ x: 42 });
      if (isNonEmptyJSONObject(obj)) {
        const check: { x: number } = obj;
        expect(check).toEqual({ x: 42 });
      } else {
        const _check: null = obj;
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - null returns false
      const obj = castType<null | { x: number }>(null);
      if (isNonEmptyJSONObject(obj)) {
        const _check: { x: number } = obj;
        throw new Error("Unreachable");
      } else {
        const check: null = obj;
        expect(check).toBe(null);
      }
    }

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: string; b: number }>({ a: "hello", b: 42 });
      if (isNonEmptyJSONObject(obj)) {
        const check: { a: string; b: number } = obj;
        expect(check).toEqual({ a: "hello", b: 42 });
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - any input
      const obj = castType<any>({ a: 1 });
      if (isNonEmptyJSONObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - generic function
      const _fn = <T>(x: T): void => {
        if (isNonEmptyJSONObject(x)) {
          const y: object = x;
          expect(typeof y).toBe("object");
        }
      };
    }
  });

  it("toNonEmptyJSONObject", () => {
    // Runtime behavior - returns value for objects with at least one non-undefined value
    expect(toNonEmptyJSONObject({ a: 1 })).toEqual({ a: 1 });
    expect(toNonEmptyJSONObject({ a: null })).toEqual({ a: null });
    expect(toNonEmptyJSONObject({ a: false })).toEqual({ a: false });
    expect(toNonEmptyJSONObject({ a: 0 })).toEqual({ a: 0 });
    expect(toNonEmptyJSONObject({ a: "" })).toEqual({ a: "" });
    expect(toNonEmptyJSONObject({ "": 1 })).toEqual({ "": 1 });
    expect(toNonEmptyJSONObject({ 0: "a" })).toEqual({ 0: "a" });
    expect(toNonEmptyJSONObject({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    expect(toNonEmptyJSONObject({ nested: { deep: { value: 1 } } })).toEqual({ nested: { deep: { value: 1 } } });
    // Mixed undefined and defined values - should return the object
    expect(toNonEmptyJSONObject({ a: undefined, b: 1 })).toEqual({ a: undefined, b: 1 });
    expect(toNonEmptyJSONObject({ a: 1, b: undefined })).toEqual({ a: 1, b: undefined });

    // Runtime behavior - returns undefined for empty or non-objects or all-undefined
    expect(toNonEmptyJSONObject({})).toBe(undefined);
    expect(toNonEmptyJSONObject({ a: undefined })).toBe(undefined);
    expect(toNonEmptyJSONObject({ a: undefined, b: undefined })).toBe(undefined);
    expect(toNonEmptyJSONObject([])).toBe(undefined);
    expect(toNonEmptyJSONObject([1, 2, 3])).toBe(undefined);
    expect(toNonEmptyJSONObject("hello")).toBe(undefined);
    expect(toNonEmptyJSONObject("")).toBe(undefined);
    expect(toNonEmptyJSONObject(1)).toBe(undefined);
    expect(toNonEmptyJSONObject(0)).toBe(undefined);
    expect(toNonEmptyJSONObject(NaN)).toBe(undefined);
    expect(toNonEmptyJSONObject(null)).toBe(undefined);
    expect(toNonEmptyJSONObject(undefined)).toBe(undefined);
    expect(toNonEmptyJSONObject(false)).toBe(undefined);
    expect(toNonEmptyJSONObject(true)).toBe(undefined);
    expect(toNonEmptyJSONObject(Symbol())).toBe(undefined);
    expect(toNonEmptyJSONObject(() => {})).toBe(undefined);
    expect(toNonEmptyJSONObject(function () {})).toBe(undefined);
    expect(toNonEmptyJSONObject(new Date())).toBe(undefined);
    expect(toNonEmptyJSONObject(/regex/)).toBe(undefined);
    expect(toNonEmptyJSONObject(new Map([["a", 1]]))).toBe(undefined);
    expect(toNonEmptyJSONObject(new Set([1, 2]))).toBe(undefined);

    // Objects with only inherited properties (no own properties)
    const proto = { inherited: 1 };
    const objWithInherited = Object.create(proto);
    expect(toNonEmptyJSONObject(objWithInherited)).toBe(undefined);

    // Objects with inherited and own undefined property
    const objWithOwnUndefined = Object.create(proto);
    objWithOwnUndefined.own = undefined;
    expect(toNonEmptyJSONObject(objWithOwnUndefined)).toBe(undefined);

    // Objects with own non-undefined property
    const objWithOwn = Object.create(proto);
    objWithOwn.own = 2;
    expect(toNonEmptyJSONObject(objWithOwn)).toBe(objWithOwn);

    // Objects with symbol keys (symbols are not enumerated by for...in)
    const sym = Symbol("key");
    const objWithSymbol = { [sym]: 1 };
    expect(toNonEmptyJSONObject(objWithSymbol)).toBe(undefined);

    // Objects with both string and symbol keys
    const objWithBoth = { a: 1, [sym]: 2 };
    expect(toNonEmptyJSONObject(objWithBoth)).toBe(objWithBoth);

    // Objects with symbol key and only undefined string key
    const objWithSymbolAndUndefined = { a: undefined, [sym]: 2 };
    expect(toNonEmptyJSONObject(objWithSymbolAndUndefined)).toBe(undefined);

    // Objects with non-enumerable properties
    const objWithNonEnumerable = {};
    Object.defineProperty(objWithNonEnumerable, "hidden", { value: 1, enumerable: false });
    expect(toNonEmptyJSONObject(objWithNonEnumerable)).toBe(undefined);

    // Object.create(null) with non-undefined property
    const nullProtoObj = Object.create(null);
    nullProtoObj.a = 1;
    expect(toNonEmptyJSONObject(nullProtoObj)).toBe(nullProtoObj);

    // Object.create(null) with only undefined property
    const nullProtoObjUndefined = Object.create(null);
    nullProtoObjUndefined.a = undefined;
    expect(toNonEmptyJSONObject(nullProtoObjUndefined)).toBe(undefined);

    // Empty Object.create(null)
    expect(toNonEmptyJSONObject(Object.create(null))).toBe(undefined);

    // Class instances with non-undefined property
    class MyClass {
      prop = 1;
    }
    const instance = new MyClass();
    expect(toNonEmptyJSONObject(instance)).toBe(instance);

    // Class instances with only undefined property
    class MyClassUndefined {
      prop = undefined;
    }
    expect(toNonEmptyJSONObject(new MyClassUndefined())).toBe(undefined);

    // Empty class instance
    class EmptyClass {}
    expect(toNonEmptyJSONObject(new EmptyClass())).toBe(undefined);

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: number }>({ a: 1 });
      const result = toNonEmptyJSONObject(obj);
      if (result) {
        const check: { a: number } = result;
        expect(check).toEqual({ a: 1 });
      } else {
        throw new Error("Unreachable");
      }
    }

    {
      // Type narrowing - undefined input returns undefined
      const obj = castType<{ a: number } | undefined>(undefined);
      const result: { a: number } | undefined = toNonEmptyJSONObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - object with only undefined values returns undefined
      const obj = castType<{ a: number; b?: string }>({ a: undefined as unknown as number });
      const result = toNonEmptyJSONObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - non-object type returns PlainObject | undefined
      const obj = castType<number>(42);
      const result: PlainObject | undefined = toNonEmptyJSONObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - unknown input returns PlainObject | undefined
      const obj = castType<unknown>({ a: 1 });
      const result: PlainObject | undefined = toNonEmptyJSONObject(obj);
      expect(result).toEqual({ a: 1 });
    }

    {
      // Type narrowing - any input returns PlainObject | undefined
      const obj = castType<any>({ a: 1 });
      const result: PlainObject | undefined = toNonEmptyJSONObject(obj);
      expect(result).toEqual({ a: 1 });
    }

    {
      // Type narrowing - extracts object from union with array
      const obj = castType<{ a: number } | number[]>({ a: 1 });
      const result = toNonEmptyJSONObject(obj);
      if (result) {
        const check: { a: number } = result;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - array in union returns undefined
      const obj = castType<{ a: number } | number[]>([1, 2, 3]);
      const result = toNonEmptyJSONObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - null | object union extracts PlainObject
      const obj = castType<null | { x: number }>({ x: 42 });
      const result = toNonEmptyJSONObject(obj);
      if (result) {
        const check: { x: number } = result;
        expect(check).toEqual({ x: 42 });
      }
    }

    {
      // Type narrowing - null returns undefined
      const obj = castType<null | { x: number }>(null);
      const result = toNonEmptyJSONObject(obj);
      expect(result).toBe(undefined);
    }

    {
      // Type narrowing - preserves complex object type
      const obj = castType<{ a: string; b: number; c: boolean }>({ a: "hello", b: 42, c: true });
      const result = toNonEmptyJSONObject(obj);
      if (result) {
        const check: { a: string; b: number; c: boolean } = result;
        expect(check).toEqual({ a: "hello", b: 42, c: true });
      }
    }

    {
      // Type narrowing - optional chaining works
      const obj = castType<unknown>({ a: 1 });
      const keys = Object.keys(toNonEmptyJSONObject(obj) ?? {});
      expect(keys).toEqual(["a"]);
    }
  });

  it("toPlainObjectOf", () => {
    expect(toPlainObjectOf({ a: true, b: false }, isTrue)).toEqual({ a: true });
    // @ts-expect-error type mismatched
    expect(toPlainObjectOf({ a: 1, b: 2 }, isTrue)).toBe(undefined);
    expect(toPlainObjectOf({ a: 1, b: 2 }, isTruthy)).toEqual({ a: 1, b: 2 });
    expect(toPlainObjectOf(undefined, isTrue)).toBe(undefined);

    {
      // Type narrowing - result type matches predicate
      const obj = castType<{ a: unknown; b: unknown }>({ a: "hello", b: 123 });
      const result = toPlainObjectOf(obj, isString);
      if (result) {
        const check: { [key: PropertyKey]: string } = result;
        expect(check).toEqual({ a: "hello" });
      }
    }

    {
      // Type narrowing - filters to number type
      const obj = castType<{ a: unknown; b: unknown }>({ a: 1, b: "hello" });
      const result = toPlainObjectOf(obj, isNumber);
      if (result) {
        const check: { [key: PropertyKey]: number } = result;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - returns undefined when no values match
      const obj = castType<{ a: unknown; b: unknown }>({ a: "hello", b: "world" });
      const result = toPlainObjectOf(obj, isNumber);
      expect(result).toBe(undefined);
    }
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
