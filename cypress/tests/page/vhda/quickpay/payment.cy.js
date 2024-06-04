// TODO
describe('VHDA', () => {
  describe('Quickpay', () => {
    describe('Payment', () => {
      let quickPay;

      beforeEach(() => {
        // TODO use testcredential
      });

      xit('should create a payments successfully', { tags: '@smoke' }, function () {
        // TODO use TestCredential credentials
        quickPay.login(loanNumber, zipCode, ssn);

        cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
      });
    });
  });
});