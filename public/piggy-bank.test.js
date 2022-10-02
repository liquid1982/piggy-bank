import { describe, it, expect } from "vitest";
import PiggyBank from "./piggy-bank";

describe("Piggy Bank", () => {
  it("has an owner", () => {
    const piggy = new PiggyBank("John");
    expect(piggy.owner).toBe("John");
  });
});
