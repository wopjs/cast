const _ = undefined;
export type _ = undefined;

/** Returns `U` if `T` is `never` or `any`, otherwise returns `T`. */
export type SetDefaultType<T, U> = [T, U][T extends any ? (0 extends 1 & T ? 1 : 0) : 1];

/** Returns `true` if `x` is not `undefined`. */
export const isDefined = <T>(x: T | undefined): x is T => x !== _;

export const isTrue = (x: unknown): x is true => x === true;

/** Returns `true` if `x` is `true`, otherwise returns `undefined`. */
export const toTrue = (x: unknown): true | _ => (x === true ? true : _);

/** Returns `true` if `x` is `true`, otherwise returns `false`. */
export const asTrue = (x: unknown): boolean => (x === true ? x : false);

export type Falsy = false | null | undefined | 0 | "";

export type ExtractFalsy<T> = SetDefaultType<Extract<T, Falsy>, Falsy>;

/** Returns `true` if `Boolean(x)` is `false`. */
export const isFalsy = <T>(x: T): x is ExtractFalsy<T> => !x;

/** Returns `x` if `Boolean(x)` is `false`, otherwise returns `undefined`. */
export const toFalsy = <T>(x: T): ExtractFalsy<T> | _ => (isFalsy(x) ? x : _);

/** Returns `true` if `Boolean(x)` is `true`. */
export const isTruthy = <T>(x: T): x is Exclude<T, Falsy> => !!x;

/** Returns `x` if `Boolean(x)` is `true`, otherwise returns `undefined`. */
export const toTruthy = <T>(x: T): Exclude<T, Falsy> | _ => (isTruthy(x) ? x : _);

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

/** Returns `true` if `x` is a string and not `''`. */
export const isNonEmptyString = (x: unknown): x is string => isString(x) && x !== "";

/** Returns `x` if `x` is a string and not empty, otherwise returns `undefined`. */
export const toNonEmptyString = (x: unknown): string | _ => (isNonEmptyString(x) ? x : _);

/** Extracts array type from `T`, or `unknown[]` if no array type found. */
export type ExtractArray<T> = SetDefaultType<Extract<T, readonly unknown[]>, unknown[]>;

export const isArray = Array.isArray as <T>(x: T) => x is ExtractArray<T>;

/** Returns `x` if `x` is an array. */
export const toArray = <T>(x: T): ExtractArray<T> | _ => (isArray(x) ? x : _);

/** Returns `x` if `x` is an array, otherwise returns `[]` (empty array). */
export const asArray = <T>(x: T): ExtractArray<T> => (isArray(x) ? x : ([] as ExtractArray<T>));

/** Returns `true` if `x` is an array and has at least one element. */
export const isNonEmptyArray = <T>(x: T): x is ExtractArray<T> => isArray(x) && x.length > 0;

/** Returns `x` if `x` is an array and has at least one element, otherwise returns `undefined`. */
export const toNonEmptyArray = <T>(x: T): ExtractArray<T> | _ => (isNonEmptyArray(x) ? x : _);

export type ExtractObject<T> = SetDefaultType<Extract<T, object>, object>;

/** Returns `true` if `x` is an object (including array) and not null. */
export const isObject = <T>(x: T): x is ExtractObject<T> => x !== null && typeof x === "object";

/** Returns `x` if `x` is an object (including array). */
export const toObject = <T>(x: T): ExtractObject<T> | _ => (isObject(x) ? x : _);

/** Returns `x` if `x` is an object (including array), otherwise returns `{}` (empty object). */
export const asObject = <T>(x: T): ExtractObject<T> => (isObject(x) ? x : ({} as ExtractObject<T>));

export interface PlainObject {
  [key: PropertyKey]: unknown;
}

export type ExtractPlainObject<T> = SetDefaultType<Exclude<Extract<T, object>, readonly unknown[]>, PlainObject>;

/** Returns `true` if `x` is a plain object (shallow test), not `null` or array. */
export const isPlainObject = <T>(x: T): x is ExtractPlainObject<T> => isObject(x) && !isArray(x);

/** Returns `x` if `x` is a plain object. */
export const toPlainObject = <T>(x: T): ExtractPlainObject<T> | _ => (isPlainObject(x) ? x : _);

/** Returns `x` if `x` is a plain object, otherwise returns `{}` (empty object). */
export const asPlainObject = <T>(x: T): ExtractPlainObject<T> => (isPlainObject(x) ? x : ({} as ExtractPlainObject<T>));

const walkPlainObjectValues = <T>(x: T, predicate?: (x: unknown) => boolean): boolean => {
  if (isPlainObject(x)) {
    for (let key in x) {
      if (Object.hasOwn(x, key) && (!predicate || predicate(x[key]))) {
        return true;
      }
    }
  }
  return false;
};

/** Returns `true` if `x` is a plain object and has at least one key. */
export const isNonEmptyPlainObject = <T>(x: T): x is ExtractPlainObject<T> => walkPlainObjectValues(x);

/** Returns `x` if `x` is a plain object and has at least one key. */
export const toNonEmptyPlainObject = <T>(x: T): ExtractPlainObject<T> | _ => (isNonEmptyPlainObject(x) ? x : _);

/** Returns `true` if `x` is a plain object and has at least one key with non-undefined value. */
export const isNonEmptyJSONObject = <T>(x: T): x is ExtractPlainObject<T> => walkPlainObjectValues(x, isDefined);

/** Returns `x` if `x` is a plain object and has at least one key with non-undefined value, otherwise returns `undefined`. */
export const toNonEmptyJSONObject = <T>(x: T): ExtractPlainObject<T> | _ => (isNonEmptyJSONObject(x) ? x : _);

type ExtractPlainObjectValue<T> = ExtractPlainObject<T>[keyof ExtractPlainObject<T>];

/**
 * Creates an object from `x` with keys `k` if `f(x[k])` returns `true`.
 * If `x` is not a plain object, or there's no passed props, returns `undefined`.
 */
export const toPlainObjectOf = <T, U extends ExtractPlainObjectValue<T>>(
  x: T,
  f: (v: ExtractPlainObjectValue<T>) => v is U
): Record<PropertyKey, U> | _ => {
  if (isPlainObject(x)) {
    let index = -1;
    let props = Object.keys(x);
    let length = props.length;
    let result: Record<PropertyKey, U> | _;

    while (++index < length) {
      let key = props[index] as keyof typeof x;
      let value = x[key];
      if (f(value)) {
        (result ??= {})[key] = value;
      }
    }

    return result;
  }
};

/** Filter props from object `x` whose values are `true`. */
export const toPlainObjectOfTrue = (x: unknown): Record<PropertyKey, true> | _ => toPlainObjectOf(x, isTrue);

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
