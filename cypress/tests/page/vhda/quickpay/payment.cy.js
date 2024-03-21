import { LoginPage } from '../../../../support/page_objects/vhda/quick_pay/login_page';

// TODO
describe('Quickpay Payment', { tags: [ '@Payment', '@regression' ] }, () => {
  let loginPage;

  beforeEach(() => {
    loginPage = new LoginPage();

    const loanNumber = 8675309;
    const zipCode = 11111;
    const ssn = 1111;

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
  });

  it('should create a payment successfully', { tags: '@smoke' }, function () {

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
  });
});