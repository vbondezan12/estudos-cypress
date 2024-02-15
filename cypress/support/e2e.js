import './commands'
import 'cypress-mochawesome-reporter/register';

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from failing the test
  return false
})