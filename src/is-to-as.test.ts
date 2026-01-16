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
      // Type narrowing - unknown input returns unknown[]
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
    expect(isNonEmptyPlainObject({ a: 1 })).toBe(true);
    expect(isNonEmptyPlainObject({})).toBe(false);
    expect(isNonEmptyPlainObject([])).toBe(false);

    {
      // Type narrowing - unknown input narrows to PlainObject
      const obj = castType<unknown>({ a: 1 });
      if (isNonEmptyPlainObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - empty object returns false
      const obj = castType<{ a?: number }>({});
      if (isNonEmptyPlainObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({});
      } else {
        expect(obj).toEqual({});
      }
    }

    {
      // Type narrowing - excludes array
      const obj = castType<{ a: number } | number[]>({ a: 1 });
      if (isNonEmptyPlainObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      }
    }
  });

  it("toNonEmptyPlainObject", () => {
    expect(toNonEmptyPlainObject({ a: 1 })).toEqual({ a: 1 });
    expect(toNonEmptyPlainObject({})).toBe(undefined);

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: number }>({ a: 1 });
      const result = toNonEmptyPlainObject(obj);
      if (result) {
        const check: { a: number } = result;
        expect(check).toEqual({ a: 1 });
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
      // type narrowing - non-object type returns PlainObject | undefined
      const obj = castType<number>(42);
      const result: PlainObject | undefined = toNonEmptyPlainObject(obj);
      expect(result).toBe(undefined);
    }
  });

  it("isNonEmptyJSONObject", () => {
    expect(isNonEmptyJSONObject({ a: 1 })).toBe(true);
    expect(isNonEmptyJSONObject({})).toBe(false);
    expect(isNonEmptyJSONObject([])).toBe(false);
    expect(isNonEmptyJSONObject({ a: undefined })).toBe(false);

    {
      // Type narrowing - unknown input narrows to PlainObject
      const obj = castType<unknown>({ a: 1 });
      if (isNonEmptyJSONObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      }
    }

    {
      // Type narrowing - object with only undefined values returns false
      const obj = castType<{ a?: number }>({ a: undefined });
      if (isNonEmptyJSONObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({});
      } else {
        expect(obj).toEqual({ a: undefined });
      }
    }

    {
      // Type narrowing - excludes array
      const obj = castType<{ a: number } | number[]>({ a: 1 });
      if (isNonEmptyJSONObject(obj)) {
        const check: PlainObject = obj;
        expect(check).toEqual({ a: 1 });
      }
    }
  });

  it("toNonEmptyJSONObject", () => {
    expect(toNonEmptyJSONObject({ a: 1 })).toEqual({ a: 1 });
    expect(toNonEmptyJSONObject({})).toBe(undefined);

    {
      // Type narrowing - preserves object type
      const obj = castType<{ a: number }>({ a: 1 });
      const result = toNonEmptyJSONObject(obj);
      if (result) {
        const check: { a: number } = result;
        expect(check).toEqual({ a: 1 });
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
