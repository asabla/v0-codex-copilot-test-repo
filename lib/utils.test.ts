import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("p-4", "m-2")).toBe("p-4 m-2");
  });

  it("dedupes conflicting classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
