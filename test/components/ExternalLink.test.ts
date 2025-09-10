import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ExternalLink from "../../src/components/ExternalLink.astro";

test("ExternalLink", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(ExternalLink, {
    props: {
      href: "testURL",
    },
  });

  expect(result).toContain('href="testURL"');
  expect(result).toContain('target="_blank"');
});
