const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}'
  },
});
