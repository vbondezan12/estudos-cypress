// TODO
xdescribe('Quickpay Payment', { tags: [ '@Payment', '@regression' ] }, () => {
  let quickPay;

  beforeEach(() => {
    // TODO use testcredential
  });

  it('should create a payment successfully', { tags: '@smoke' }, function () {
    // TODO use TestCredential credentials
    quickPay.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
  });
});