import { describe, it, expect } from "vitest";

import { inertFilter, inertFilterMap, coalesce } from "./array";
import { isNumber, isString } from "./is-to-as";

/** Bypass TypeScript static type inference. */
const castType = <T>(x: T): T => x;

describe("array.ts", () => {
  describe("inertFilterMap", () => {
    it("returns undefined for undefined input", () => {
      const result = inertFilterMap(undefined, x => x);
      expect(result).toBe(undefined);
    });

    it("returns original array for empty array", () => {
      const arr: number[] = [];
      const result = inertFilterMap(arr, x => x);
      expect(result).toBe(arr);
    });

    it("returns original array when all items map to themselves", () => {
      const arr = [1, 2, 3];
      const result = inertFilterMap(arr, x => x);
      expect(result).toBe(arr);
    });

    it("returns original array when callback returns same reference for objects", () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const arr = [obj1, obj2];
      const result = inertFilterMap(arr, x => x);
      expect(result).toBe(arr);
    });

    it("returns new array when at least one item is mapped to different value", () => {
      const arr = [1, 2, 3];
      const result = inertFilterMap(arr, x => x * 2);
      expect(result).not.toBe(arr);
      expect(result).toEqual([2, 4, 6]);
    });

    it("returns new array when at least one item is filtered out", () => {
      const arr = [1, 2, 3];
      const result = inertFilterMap(arr, x => (x === 2 ? undefined : x));
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3]);
    });

    it("filters out all items when callback always returns undefined", () => {
      const arr = [1, 2, 3];
      const result = inertFilterMap(arr, () => undefined);
      expect(result).not.toBe(arr);
      expect(result).toEqual([]);
    });

    it("maps all items correctly", () => {
      const arr = ["a", "b", "c"];
      const result = inertFilterMap(arr, x => x.toUpperCase());
      expect(result).toEqual(["A", "B", "C"]);
    });

    it("filters and maps simultaneously", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = inertFilterMap(arr, x => (x % 2 === 0 ? x * 10 : undefined));
      expect(result).toEqual([20, 40]);
    });

    it("handles mixed filter and identity mapping", () => {
      const arr = [1, 2, 3, 4, 5];
      // Filter out even numbers, keep odd numbers as-is
      const result = inertFilterMap(arr, x => (x % 2 === 0 ? undefined : x));
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3, 5]);
    });

    it("uses Object.is for equality comparison", () => {
      // NaN is equal to NaN with Object.is
      const arr = [NaN, NaN];
      const result = inertFilterMap(arr, x => x);
      expect(result).toBe(arr);

      // +0 and -0 are different with Object.is
      const arr2 = [0];
      const result2 = inertFilterMap(arr2, x => (x === 0 ? -0 : x));
      expect(result2).not.toBe(arr2);
      expect(Object.is(result2[0], -0)).toBe(true);
    });

    it("provides correct index to callback", () => {
      const arr = ["a", "b", "c"];
      const indices: number[] = [];
      inertFilterMap(arr, (_, index) => {
        indices.push(index);
        return undefined;
      });
      expect(indices).toEqual([0, 1, 2]);
    });

    it("provides array reference to callback", () => {
      const arr = [1, 2, 3];
      let receivedArr: number[] | undefined;
      inertFilterMap(arr, (_, __, a) => {
        receivedArr = a;
        return undefined;
      });
      expect(receivedArr).toBe(arr);
    });

    it("respects thisArg", () => {
      const arr = [1, 2, 3];
      const context = { multiplier: 10 };
      const result = inertFilterMap(
        arr,
        function (this: typeof context, x) {
          return x * this.multiplier;
        },
        context
      );
      expect(result).toEqual([10, 20, 30]);
    });

    it("handles single element array - identity", () => {
      const arr = [42];
      const result = inertFilterMap(arr, x => x);
      expect(result).toBe(arr);
    });

    it("handles single element array - mapped", () => {
      const arr = [42];
      const result = inertFilterMap(arr, x => x * 2);
      expect(result).not.toBe(arr);
      expect(result).toEqual([84]);
    });

    it("handles single element array - filtered", () => {
      const arr = [42];
      const result = inertFilterMap(arr, () => undefined);
      expect(result).not.toBe(arr);
      expect(result).toEqual([]);
    });

    it("returns new array when first item changes", () => {
      const arr = [1, 2, 3];
      const result = inertFilterMap(arr, (x, i) => (i === 0 ? x * 2 : x));
      expect(result).not.toBe(arr);
      expect(result).toEqual([2, 2, 3]);
    });

    it("returns new array when last item changes", () => {
      const arr = [1, 2, 3];
      const result = inertFilterMap(arr, (x, i) => (i === 2 ? x * 2 : x));
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 2, 6]);
    });

    it("returns new array when middle item is filtered", () => {
      const arr = [1, 2, 3];
      const result = inertFilterMap(arr, (x, i) => (i === 1 ? undefined : x));
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3]);
    });

    it("handles readonly arrays", () => {
      const arr: readonly number[] = [1, 2, 3];
      const result = inertFilterMap(arr, x => x);
      expect(result).toBe(arr);

      const result2 = inertFilterMap(arr, x => x * 2);
      expect(result2).toEqual([2, 4, 6]);
    });

    it("handles arrays with undefined values - identity", () => {
      const arr = [1, undefined, 3];
      // When callback returns the original undefined, it gets filtered out
      const result = inertFilterMap(arr, x => x);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3]);
    });

    it("handles sparse arrays", () => {
      const arr = [1, , 3]; // eslint-disable-line no-sparse-arrays
      const result = inertFilterMap(arr, x => x);
      expect(result).not.toBe(arr);
      // Sparse slots become undefined, which gets filtered out
      expect(result).toEqual([1, 3]);
    });

    // Type narrowing tests
    {
      it("type narrowing - mutable array input returns mutable array", () => {
        const arr = castType<number[]>([1, 2, 3]);
        const result = inertFilterMap(arr, x => x.toString());
        const _check: string[] = result;
        expect(_check).toEqual(["1", "2", "3"]);
      });

      it("type narrowing - readonly array input returns readonly array", () => {
        const arr = castType<readonly number[]>([1, 2, 3]);
        const result = inertFilterMap(arr, x => x.toString());
        const _check: readonly string[] = result;
        expect(_check).toEqual(["1", "2", "3"]);
      });

      it("type narrowing - undefined input returns undefined", () => {
        const arr = castType<number[] | undefined>(undefined);
        const result = inertFilterMap(arr, x => x);
        const _check: number[] | undefined = result;
        expect(_check).toBe(undefined);
      });

      it("type narrowing - excludes undefined from result type", () => {
        const arr = castType<(number | undefined)[]>([1, undefined, 3]);
        const result = inertFilterMap(arr, x => x);
        // Result type should be number[] (Defined<number | undefined> = number)
        const _check: number[] = result;
        expect(_check).toEqual([1, 3]);
      });
    }
  });

  describe("inertFilter", () => {
    it("returns undefined for undefined input", () => {
      const result = inertFilter(undefined, () => true);
      expect(result).toBe(undefined);
    });

    it("returns original array for empty array", () => {
      const arr: number[] = [];
      const result = inertFilter(arr, () => true);
      expect(result).toBe(arr);
    });

    it("returns original array when all items pass predicate", () => {
      const arr = [1, 2, 3];
      const result = inertFilter(arr, () => true);
      expect(result).toBe(arr);
    });

    it("returns original array when all items pass actual condition", () => {
      const arr = [2, 4, 6];
      const result = inertFilter(arr, x => x % 2 === 0);
      expect(result).toBe(arr);
    });

    it("returns new array when at least one item is filtered out", () => {
      const arr = [1, 2, 3];
      const result = inertFilter(arr, x => x !== 2);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3]);
    });

    it("returns empty array when all items are filtered out", () => {
      const arr = [1, 2, 3];
      const result = inertFilter(arr, () => false);
      expect(result).not.toBe(arr);
      expect(result).toEqual([]);
    });

    it("filters correctly based on predicate", () => {
      const arr = [1, 2, 3, 4, 5, 6];
      const result = inertFilter(arr, x => x % 2 === 0);
      expect(result).toEqual([2, 4, 6]);
    });

    it("provides correct index to predicate", () => {
      const arr = ["a", "b", "c"];
      const indices: number[] = [];
      inertFilter(arr, (_, index) => {
        indices.push(index);
        return true;
      });
      expect(indices).toEqual([0, 1, 2]);
    });

    it("provides array reference to predicate", () => {
      const arr = [1, 2, 3];
      let receivedArr: number[] | undefined;
      inertFilter(arr, (_, __, a) => {
        receivedArr = a;
        return true;
      });
      expect(receivedArr).toBe(arr);
    });

    it("respects thisArg", () => {
      const arr = [1, 2, 3, 4, 5];
      const context = { threshold: 3 };
      const result = inertFilter(
        arr,
        function (this: typeof context, x) {
          return x > this.threshold;
        },
        context
      );
      expect(result).toEqual([4, 5]);
    });

    it("handles single element array - kept", () => {
      const arr = [42];
      const result = inertFilter(arr, () => true);
      expect(result).toBe(arr);
    });

    it("handles single element array - filtered", () => {
      const arr = [42];
      const result = inertFilter(arr, () => false);
      expect(result).not.toBe(arr);
      expect(result).toEqual([]);
    });

    it("returns new array when first item is filtered", () => {
      const arr = [1, 2, 3];
      const result = inertFilter(arr, (_, i) => i !== 0);
      expect(result).not.toBe(arr);
      expect(result).toEqual([2, 3]);
    });

    it("returns new array when last item is filtered", () => {
      const arr = [1, 2, 3];
      const result = inertFilter(arr, (_, i) => i !== 2);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 2]);
    });

    it("returns new array when middle item is filtered", () => {
      const arr = [1, 2, 3];
      const result = inertFilter(arr, (_, i) => i !== 1);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3]);
    });

    it("handles readonly arrays", () => {
      const arr: readonly number[] = [1, 2, 3];
      const result = inertFilter(arr, () => true);
      expect(result).toBe(arr);

      const result2 = inertFilter(arr, x => x !== 2);
      expect(result2).toEqual([1, 3]);
    });

    it("handles arrays with falsy values correctly", () => {
      const arr = [0, 1, "", "hello", false, true, null, undefined];
      const result = inertFilter(arr, () => true);
      expect(result).toBe(arr);
    });

    it("handles sparse arrays", () => {
      const arr = [1, , 3]; // eslint-disable-line no-sparse-arrays
      const result = inertFilter(arr, x => x !== undefined);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3]);
    });

    it("filters multiple consecutive items", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = inertFilter(arr, x => x === 1 || x === 5);
      expect(result).toEqual([1, 5]);
    });

    it("filters all but one item", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = inertFilter(arr, x => x === 3);
      expect(result).toEqual([3]);
    });

    // Type narrowing tests with type guard predicate
    {
      it("type narrowing - narrows type with type guard predicate", () => {
        const arr = castType<(string | number)[]>([1, "a", 2, "b"]);
        const result = inertFilter(arr, isString);
        const _check: string[] = result;
        expect(_check).toEqual(["a", "b"]);
      });

      it("type narrowing - narrows to number type", () => {
        const arr = castType<(string | number)[]>([1, "a", 2, "b"]);
        const result = inertFilter(arr, isNumber);
        const _check: number[] = result;
        expect(_check).toEqual([1, 2]);
      });

      it("type narrowing - mutable array input returns mutable array", () => {
        const arr = castType<number[]>([1, 2, 3]);
        const result = inertFilter(arr, x => x > 1);
        const _check: number[] = result;
        expect(_check).toEqual([2, 3]);
      });

      it("type narrowing - readonly array input returns readonly array", () => {
        const arr = castType<readonly number[]>([1, 2, 3]);
        const result = inertFilter(arr, x => x > 1);
        const _check: readonly number[] = result;
        expect(_check).toEqual([2, 3]);
      });

      it("type narrowing - undefined input returns undefined", () => {
        const arr = castType<number[] | undefined>(undefined);
        const result = inertFilter(arr, x => x > 1);
        const _check: number[] | undefined = result;
        expect(_check).toBe(undefined);
      });

      it("type narrowing - type guard with readonly array", () => {
        const arr = castType<readonly (string | number)[]>([1, "a", 2, "b"]);
        const result = inertFilter(arr, isString);
        const _check: readonly string[] = result;
        expect(_check).toEqual(["a", "b"]);
      });
    }
  });

  describe("coalesce", () => {
    it("returns original array when all items are truthy", () => {
      const arr = [1, 2, 3];
      const result = coalesce(arr);
      expect(result).toBe(arr);
    });

    it("returns original array for array of truthy strings", () => {
      const arr = ["a", "b", "c"];
      const result = coalesce(arr);
      expect(result).toBe(arr);
    });

    it("returns original array for array of truthy objects", () => {
      const arr = [{}, [], () => {}];
      const result = coalesce(arr);
      expect(result).toBe(arr);
    });

    it("filters out null values", () => {
      const arr = [1, null, 3];
      const result = coalesce(arr);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3]);
    });

    it("filters out undefined values", () => {
      const arr = [1, undefined, 3];
      const result = coalesce(arr);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 3]);
    });

    it("filters out false", () => {
      const arr = [true, false, true];
      const result = coalesce(arr);
      expect(result).not.toBe(arr);
      expect(result).toEqual([true, true]);
    });

    it("filters out 0", () => {
      const arr = [1, 0, 2];
      const result = coalesce(arr);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 2]);
    });

    it("filters out empty string", () => {
      const arr = ["a", "", "b"];
      const result = coalesce(arr);
      expect(result).not.toBe(arr);
      expect(result).toEqual(["a", "b"]);
    });

    it("filters out NaN", () => {
      const arr = [1, NaN, 2];
      const result = coalesce(arr);
      expect(result).not.toBe(arr);
      expect(result).toEqual([1, 2]);
    });

    it("filters out all falsy values", () => {
      const arr = [1, null, undefined, false, 0, "", NaN, 2];
      const result = coalesce(arr);
      expect(result).toEqual([1, 2]);
    });

    it("returns empty array when all values are falsy", () => {
      const arr = [null, undefined, false, 0, "", NaN];
      const result = coalesce(arr);
      expect(result).toEqual([]);
    });

    it("returns original empty array", () => {
      const arr: unknown[] = [];
      const result = coalesce(arr);
      expect(result).toBe(arr);
    });

    it("handles readonly arrays", () => {
      const arr: readonly (number | null)[] = [1, null, 3];
      const result = coalesce(arr);
      expect(result).toEqual([1, 3]);
    });

    it("preserves truthy falsy-looking values", () => {
      // These are all truthy
      const arr = ["0", "false", "null", "undefined", " ", []];
      const result = coalesce(arr);
      expect(result).toBe(arr);
    });

    // Type narrowing tests
    {
      it("type narrowing - removes null and undefined from type", () => {
        const arr = castType<(string | null | undefined)[]>(["a", null, "b", undefined]);
        const result = coalesce(arr);
        // Result type should be string[] (Truthy removes null, undefined, etc.)
        const _check: string[] = result as string[];
        expect(_check).toEqual(["a", "b"]);
      });

      it("type narrowing - removes false from boolean union", () => {
        const arr = castType<(string | boolean)[]>(["a", true, false, "b"]);
        const result = coalesce(arr);
        expect(result).toEqual(["a", true, "b"]);
      });

      it("type narrowing - handles mixed types", () => {
        const arr = castType<(number | string | null | undefined | false | 0 | "")[]>([
          1,
          "hello",
          null,
          undefined,
          false,
          0,
          "",
          2,
          "world",
        ]);
        const result = coalesce(arr);
        expect(result).toEqual([1, "hello", 2, "world"]);
      });
    }
  });
});
