import { defineConfig } from "cypress";
import { lighthouse, prepareAudit } from "@cypress-audit/lighthouse";
import { writeFile } from "fs";

export default defineConfig({
  e2e: {
    lighthouse: {
      thresholds: {
        performance: 85,
        accessibility: 100,
        "best-practices": 85,
        seo: 85,
        pwa: 0, // since we don't have a pwa, we ignore this
      },
      options: {
        output: "html",
      },
    },
    setupNodeEvents(on) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(({ report, requestedUrl, ...rest }) => {
          writeFile("lighthouse.html", report, (error) => {
            error
              ? console.error(`${requestedUrl} gave lighthouse error: ${error}`)
              : console.log(`${requestedUrl}: Report created successfully`);
          });
        }),
      });
    },
  },
});
