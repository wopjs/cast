import type { Defined, Truthy } from "./is-to-as";

import { isTruthy } from "./is-to-as";

/**
 * Lazy filterMap that avoids creating a new array when possible.
 *
 * @returns the original array if `callbackfn` returns the same value for all items, otherwise a new array with the mapped items.
 *
 * @param arr
 * @param callbackfn Return `undefined` to filter out the item, or return a value to map the item.
 * @param thisArg
 */
export function inertFilterMap<T, U = T>(
  arr: T[],
  callbackfn: (value: T, index: number, arr: T[]) => U | undefined,
  thisArg?: any
): Defined<U>[];
export function inertFilterMap<T, U = T>(
  arr: T[] | undefined,
  callbackfn: (value: T, index: number, arr: T[]) => U | undefined,
  thisArg?: any
): Defined<U>[] | undefined;
export function inertFilterMap<T, U = T>(
  arr: readonly T[],
  callbackfn: (value: T, index: number, arr: readonly T[]) => U | undefined,
  thisArg?: any
): readonly Defined<U>[];
export function inertFilterMap<T, U = T>(
  arr: readonly T[] | undefined,
  callbackfn: (value: T, index: number, arr: readonly T[]) => U | undefined,
  thisArg?: any
): readonly Defined<U>[] | undefined;
export function inertFilterMap<T, U = T>(
  arr: readonly T[] | undefined,
  callbackfn: (value: T, index: number, arr: T[]) => U | undefined,
  thisArg?: any
): readonly Defined<U>[] | undefined {
  if (arr) {
    let result: Defined<U>[] | undefined;
    let index = -1;
    let length = arr.length;
    while (++index < length) {
      const newItem = callbackfn.call(thisArg, arr[index], index, arr as T[]);
      if (newItem === undefined || !Object.is(newItem, arr[index])) {
        result ??= arr.slice(0, index) as Defined<U>[];
      }
      if (newItem !== undefined) {
        result?.push(newItem as Defined<U>);
      }
    }
    return result || (arr as readonly Defined<U>[]);
  }
}

/**
 * Lazy filter that avoids creating a new array when possible.
 *
 * @returns the original array if `predicate` returns `true` for all items, otherwise a new array with the filtered items.
 *
 * @param arr
 * @param predicate Return `false` to filter out the item, or `true` to keep it.
 * @param thisArg
 */
export function inertFilter<T, U extends T>(
  arr: T[],
  predicate: (value: T, index: number, arr: T[]) => value is U,
  thisArg?: any
): U[];
export function inertFilter<T, U extends T>(
  arr: T[] | undefined,
  predicate: (value: T, index: number, arr: T[]) => value is U,
  thisArg?: any
): U[] | undefined;
export function inertFilter<T, U extends T>(
  arr: readonly T[],
  predicate: (value: T, index: number, arr: readonly T[]) => value is U,
  thisArg?: any
): readonly U[];
export function inertFilter<T, U extends T>(
  arr: readonly T[] | undefined,
  predicate: (value: T, index: number, arr: readonly T[]) => value is U,
  thisArg?: any
): readonly U[] | undefined;
export function inertFilter<T>(arr: T[], predicate: (value: T, index: number, arr: T[]) => boolean, thisArg?: any): T[];
export function inertFilter<T>(
  arr: T[] | undefined,
  predicate: (value: T, index: number, arr: T[]) => boolean,
  thisArg?: any
): T[] | undefined;
export function inertFilter<T>(
  arr: readonly T[],
  predicate: (value: T, index: number, arr: readonly T[]) => boolean,
  thisArg?: any
): readonly T[];
export function inertFilter<T>(
  arr: readonly T[] | undefined,
  predicate: (value: T, index: number, arr: readonly T[]) => boolean,
  thisArg?: any
): readonly T[] | undefined;
export function inertFilter<T>(
  arr: readonly T[] | undefined,
  predicate: (value: T, index: number, arr: T[]) => boolean,
  thisArg?: any
): readonly T[] | undefined {
  if (arr) {
    let result: T[] | undefined;
    let index = -1;
    let length = arr.length;
    while (++index < length) {
      if (predicate.call(thisArg, arr[index], index, arr as T[])) {
        result?.push(arr[index]);
      } else {
        result ??= arr.slice(0, index);
      }
    }
    return result || arr;
  }
}

export interface Coalesce {
  <T>(arr: readonly T[]): readonly Truthy<T>[];
  <T>(arr: T[]): Truthy<T>[];
}

/**
 * @returns the same array if all its items are truthy, otherwise a new array with all falsy items removed.
 */
export const coalesce: Coalesce = arr => inertFilter(arr, isTruthy) as unknown[];
