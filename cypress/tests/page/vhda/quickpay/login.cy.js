import { LoginPage } from '../../../../support/page_objects/vhda/quick_pay/login_page';

describe('Quickpay Login', { tags: [ '@Login', '@regression' ] }, () => {
  const baseUrl = Cypress.config().vhda.baseUrl;
  let loginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('should login successfully with valid credentials', { tags: '@smoke' }, function () {
    const loanNumber = 8675309;
    const zipCode = 11111;
    const ssn = 1111;

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
  });

  it('should present toast message from invalid credentials', { tags: '@smoke' }, function () {
    const loanNumber = 1;
    const zipCode = 1;
    const ssn = 1111;

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    loginPage.toastMessage
      .should('be.visible')
      .should('have.text', 'Invalid loan number, zip, or ssn');
  });

  it('should give error when ssn is not 4 digits', { tags: '@smoke' }, function () {
    const loanNumber = 1;
    const zipCode = 1;
    const ssn = 1;

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    loginPage.ssnErrorMessage
      .should('be.visible')
      .should('have.text', 'Must be 4 characters');
  });

  it('should navigate to Login when Go to Login is clicked', { tags: '@smoke' }, function () {
    const loanNumber = 1;
    const zipCode = 1;
    const ssn = 1;

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    loginPage.goToLoginLink.should('have.text', 'Go to Login');

    loginPage.goToLoginLink.click();
    cy.url().should('contains', `${ baseUrl }/login`);
  });
});