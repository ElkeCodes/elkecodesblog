import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import index from "@pages/coding/pomodoro/index.astro";
import vueRenderer from "@astrojs/vue/server.js";

test("pomodoro index page", async () => {
  const container = await AstroContainer.create();
      container.addServerRenderer({
      renderer: vueRenderer,
      name: "@astrojs/vue",
    });
    container.addClientRenderer({
      name: "@astrojs/vue",
      entrypoint: "@astrojs/vue/client.js",
    });
  const result = await container.renderToString(index);

  expect(result).toContain("Pomodoro");
});
