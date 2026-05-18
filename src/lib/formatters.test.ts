import { describe, expect, test } from "vitest";
import { formatDate, formatStatus, getStatusBadgeClass } from "./formatters";

describe("formatStatus", () => {
  test("capitalizes the first letter of a status", () => {
    expect(formatStatus("applied")).toBe("Applied");
  });
});

describe("formatDate", () => {
  test("formats an ISO date into a readable date", () => {
    expect(formatDate("2026-05-14T12:00:00.000Z")).toBe("May 14, 2026");
  });
});

describe("getStatusBadgeClass", () => {
  test("returns the correct badge class for interviewing status", () => {
    expect(getStatusBadgeClass("interviewing")).toContain("purple");
  });
});
