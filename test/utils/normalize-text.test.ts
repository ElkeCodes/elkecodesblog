import { describe, expect, it } from "vitest";
import { normalizeText } from "@utils/normalize-text";

describe("normalizeText", () => {
  it("converts text to lowercase", () => {
    expect(normalizeText("HELLO WORLD")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(normalizeText("hello world")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(normalizeText("hello, world!")).toBe("hello-world");
  });

  it("replaces multiple spaces with a single hyphen", () => {
    expect(normalizeText("hello   world")).toBe("hello-world");
  });

  it("trims hyphens from the start and end", () => {
    expect(normalizeText(" -hello-world- ")).toBe("hello-world");
  });

  it("handles consecutive hyphens", () => {
    expect(normalizeText("hello---world")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(normalizeText("")).toBe("");
  });

  it("handles non-string input (e.g., numbers)", () => {
    expect(normalizeText(123 as unknown as string)).toBe("123");
  });

  it("handles mixed special characters and spaces", () => {
    expect(normalizeText("  hello@world#123  ")).toBe("helloworld123");
  });

  it("handles leading/trailing spaces and special characters", () => {
    expect(normalizeText("  !hello, world?  ")).toBe("hello-world");
  });
});
