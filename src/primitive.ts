const _ = undefined;
export type _ = undefined;

export const isTrue = (x: unknown): x is true => x === true;

/** Returns `true` if `x` is `true`, otherwise returns `undefined`. */
export const toTrue = (x: unknown): true | _ => (x === true ? true : _);

/** Returns `true` if `x` is `true`, otherwise returns `false`. */
export const asTrue = (x: unknown): boolean => (x === true ? x : false);

export const isBoolean = (x: unknown): x is boolean => x === true || x === false;

/** Returns `x` if `x` is `true` or `false`, otherwise returns `undefined`. */
export const toBoolean = (x: unknown): boolean | _ => (isBoolean(x) ? x : _);

/** Returns `true` if `x` is a number, returns `false` if `x` is `NaN` or other value. */
export const isNumber = (x: unknown): x is number => typeof x === "number" && x === x;

/** Returns `x` if `x` is a number, `NaN` and other value will be coerced to `undefined`. */
export const toNumber = (x: unknown): number | _ => (isNumber(x) ? x : _);

/** Returns `x` if `x` is a number, `NaN` and other value will be coerced to `0`. */
export const asNumber = (x: unknown): number => (isNumber(x) ? x : 0);

/** Returns `true` if `x` is a string. */
export const isString = (x: unknown): x is string => typeof x === "string";

/** Returns `x` if `x` is a string, otherwise returns `undefined`. */
export const toString = (x: unknown): string | _ => (isString(x) ? x : _);

/** Returns `x` if `x` is a string, otherwise returns `''` (empty string). */
export const asString = (x: unknown): string => (isString(x) ? x : "");

/**
 * Returns `x` if `x` is string, otherwise returns `''` (empty string) if
 * `x` is `null` or `undefined`, otherwise returns `JSON.stringify(x)`.
 * This is very useful to show a value inside a React component.
 */
export const print = (x: unknown): string => {
  if (isString(x)) return x;
  if (x == null) return "";
  try {
    return JSON.stringify(x, null, 2);
  } catch {
    // Insane case is not handled: x = { toString: () => { throw x } }
    return x + "";
  }
};

export interface PlainObject {
  [key: PropertyKey]: unknown;
}

/** Returns `true` if `x` is an object (including array) and not null. */
export const isObject = (x: unknown): x is object => x !== null && typeof x === "object";

/** Returns `x` if `x` is an object (including array), otherwise returns `{}` (empty object). */
export const asObject = (x: unknown): object => (isObject(x) ? x : {});

export const isArray = Array.isArray;

/** Returns `x` if `x` is an array. */
export const toArray = (x: unknown): unknown[] | undefined => (isArray(x) ? x : _);

/** Returns `x` if `x` is an array and has at least one element, otherwise returns `undefined`. */
export const toNonEmptyArray = <T>(x: T[]): T[] | _ => (x.length > 0 ? x : _);

/** Returns `x` if `x` is an array, otherwise returns `[]` (empty array). */
export const asArray = (x: unknown): unknown[] => (isArray(x) ? x : []);

/** Returns `true` if `x` is a plain object (shallow test), not `null` or array. */
export const isPlainObject = (x: unknown): x is PlainObject => isObject(x) && !isArray(x);

/** Returns `x` if `x` is a plain object. */
export const toPlainObject = (x: unknown): PlainObject | _ => (isPlainObject(x) ? x : _);

/** Returns `x` if `x` is a plain object, otherwise returns `{}` (empty object). */
export const asPlainObject = (x: unknown): PlainObject => (isPlainObject(x) ? x : {});

/** Returns `x` if `x` is a plain object and has at least one key. */
export const toNonEmptyPlainObject = <T extends PlainObject>(x: T): T | _ =>
  isPlainObject(x) && Object.keys(x).length > 0 ? x : _;

/**
 * Creates an object from `x` with keys `k` if `f(x[k])` returns `true`.
 * If `x` is not a plain object, or there's no passed props, returns `undefined`.
 */
export const toPlainObjectOf = <T>(x: unknown, f: (v: unknown) => v is T): { [key: PropertyKey]: T } | _ => {
  if (isPlainObject(x)) {
    let index = -1;
    let props = Object.keys(x);
    let length = props.length;
    let result: { [key: PropertyKey]: T } | _;

    while (++index < length) {
      let key = props[index];
      let value = x[key];
      if (f(value)) {
        (result ??= {})[key] = value;
      }
    }

    return result;
  }
};

/** Filter props from object `x` whose values are `true`. */
export const toPlainObjectOfTrue = (x: unknown): { [key: PropertyKey]: true } | _ => toPlainObjectOf(x, isTrue);
