import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import TableOfContents from "../../src/components/TableOfContents.astro";

test("TableOfContents", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(TableOfContents, {
    props: {
      headings: [
        {
          slug: "mockSlug1",
          text: "mockText1",
          depth: "mockDepth1",
        },
      ],
    },
  });

  expect(result).toContain("mockText1");

  // document.body.innerHTML = "";
  // const template = document.createElement("template");
  // template.innerHTML = result;

  // expect(getAllByLabel(template.content)).toEqual("test");
});
