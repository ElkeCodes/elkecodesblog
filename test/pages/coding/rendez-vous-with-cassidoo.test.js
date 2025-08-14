import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import rendezVousWithCassidoo from "../../../src/pages/coding/rendez-vous-with-cassidoo.astro";

test("coding rendezVousWithCassidoo page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(rendezVousWithCassidoo);

  expect(result).toContain("Rendez-vous with Cassidoo");
  expect(result).toContain("Completion progress:");
});
