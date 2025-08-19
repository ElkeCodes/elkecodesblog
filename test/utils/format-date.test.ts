import { describe, it, expect } from "vitest";
import { formatDate } from "../../src/utils/format-date";

describe("formatDate", () => {
  it("should format a date string correctly", () => {
    // Test with different date formats
    expect(formatDate("2023-05-15")).toMatch(/Monday, May 15, 2023/);
    expect(formatDate("1999-12-31")).toMatch(/Friday, December 31, 1999/);
    expect(formatDate("2000-01-01")).toMatch(/Saturday, January 1, 2000/);
  });

  it("should format a Date object correctly", () => {
    const date1 = new Date(2020, 0, 1); // January 1, 2020
    expect(formatDate(date1)).toMatch(/Wednesday, January 1, 2020/);

    const date2 = new Date(2030, 10, 11); // November 11, 2030
    expect(formatDate(date2)).toMatch(/Monday, November 11, 2030/);
  });
});
