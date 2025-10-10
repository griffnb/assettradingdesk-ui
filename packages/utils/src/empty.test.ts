import { describe, it, expect } from "vitest";
import isEmpty from "./empty";
// npm exec vitest UserStore.test.ts

describe("Empty", () => {
  it("Empty Test", async () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(false);
    expect(isEmpty("Adam Hawkins")).toBe(false);
    expect(isEmpty([0, 1, 2])).toBe(false);
    expect(isEmpty("\n\t")).toBe(false);
    expect(isEmpty("  ")).toBe(false);
  });
});
