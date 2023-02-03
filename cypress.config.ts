import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.myhome.ge/ka/",
    blockHosts: [
      "www.google-analytics.com",
      "www.youtube.com",
      "banners.myads.ge",
      "360.tbcconnect.ge",
    ],
    setupNodeEvents(on, config) { },
  },
});
