import { defineConfig } from "cypress";
import { log as cl } from './cypress/support/tasks'

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.myhome.ge/ka/",
    blockHosts: [
      "www.google-analytics.com",
      "www.youtube.com",
      "banners.myads.ge",
      "360.tbcconnect.ge",
    ],

    env: {
      allure: true,
      allureAvoidLoggingCommands: ['intercept']
    },

    setupNodeEvents(on, config) {
      //Events
      on('task', {

        log(valToLog: any[]) { return cl(valToLog) }

      })

      //Plugins      
      require('@cypress/grep/src/plugin')(config);
      require('@shelex/cypress-allure-plugin/writer')(on, config);

      return config;
    },
  },
});
