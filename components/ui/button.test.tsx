import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Button } from "./button";

afterEach(cleanup);

describe("Button", () => {
  it("uses default styles", () => {
    const { getByRole } = render(<Button>Click</Button>);
    const button = getByRole("button");
    expect(button.className).toContain("bg-primary");
  });

  it("applies variant and size classes", () => {
    const { getByRole } = render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );
    const button = getByRole("button");
    expect(button.className).toContain("bg-destructive");
    expect(button.className).toContain("h-10");
  });
});
