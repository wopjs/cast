import { describe, it, expect } from "vitest";

import { noop, returnsUndefined, returnsNull, returnsFalse, returnsTrue, returnsEmptyString } from "./returns";

describe("returns functions", () => {
  it("noop should return undefined", () => {
    expect(noop()).toBeUndefined();
  });

  it("returnsUndefined should return undefined", () => {
    expect(returnsUndefined()).toBeUndefined();
  });

  it("returnsNull should return null", () => {
    expect(returnsNull()).toBeNull();
  });

  it("returnsFalse should return false", () => {
    expect(returnsFalse()).toBe(false);
  });

  it("returnsTrue should return true", () => {
    expect(returnsTrue()).toBe(true);
  });

  it("returnsEmptyString should return an empty string", () => {
    expect(returnsEmptyString()).toBe("");
  });
});
