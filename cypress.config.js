const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig(
  {
    projectId: 'lift-cypress-automation',
    reporter: 'cypress-multi-reporters',
    e2e: {
      specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
      setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on);

        // Find the environment.settings file related to the current environment
        const environment = config.env.env || 'qa';
        const environmentSettingsPath = path.resolve('cypress', 'config', 'env', `${ environment }.settings.json`);
        const environmentSettings = require(environmentSettingsPath);

        // Find the environment variables from cypress.env.json related to the environment
        let cypressEnvVariables;
        switch (environment) {
        case 'development':
          cypressEnvVariables = config.env.development;
          break;
        case 'uat':
          cypressEnvVariables = config.env.uat;
          break;
        default:
          cypressEnvVariables = config.env.qa;
          break;
        }

        // Merge all the settings into default config
        config = {
          ...config,
          ...environmentSettings,
          ...cypressEnvVariables
        };

        return config;
      }
    }
  });