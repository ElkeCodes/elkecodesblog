import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Card from "../../src/components/Card.astro";

test("Card", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Card, {
    props: {
      href: "#test",
      title: "mock title",
      actionLabel: "mock action label",
    },
  });

  expect(result).toContain("mock title");
  expect(result).toContain("mock action label");
});
