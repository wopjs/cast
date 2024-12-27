export const noop = (): void => {};

export const returnsUndefined = noop as () => undefined;

export const returnsNull = (): null => null;

export const returnsFalse = (): false => false;

export const returnsTrue = (): true => true;

export const returnsEmptyString = (): string => "";
