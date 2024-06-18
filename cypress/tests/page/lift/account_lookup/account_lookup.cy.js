import { CLIENT, LOAN_STATUS } from '../../../../config/constants';
import { HomePage } from '../../../../support/page_objects/lift/home/home_page';
import { AccountLookup } from '../../../../support/page_objects/lift/account_lookup/account_lookup';
import { faker } from '@faker-js/faker';

describe('Lift', () => {
  describe('Account Lookup', () => {
    const homePage = new HomePage();
    const accountLookup = new AccountLookup();
    let testCredential

    before(() => {
      homePage.getTestLoans(CLIENT.VHDA, LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[1];
      });
    });

    beforeEach(() => {
      cy.liftLogin(CLIENT.VENTANEX);
      homePage.open();
      homePage.clickEndtourButton();
      homePage.clickClientSelectionForm();
      homePage.clientSelection(CLIENT.VHDA);
    });

    it('VEN-15594_lift_home_should_access_account_lookup_successfully', { tags: '@smoke' }, function () {
      cy.intercept('GET', `${Cypress.config().lift.baseUrl}/account_lookup/search`).as('accountLookupSearch');

      homePage.clickAccountLookup()

      cy.wait('@accountLookupSearch').its('response.statusCode').should('be.oneOf', [200, 201, 202]);
      cy.url().should('contains', `${Cypress.config().lift.baseUrl}/account_lookup/search`);
    });

    it('VEN-15594_lift_home_should_lookup_invalid_loan', { tags: '@smoke' }, function () {
      const invalidLoanNumber = faker.number.int( {min: 1, max: 12} )

      homePage.clickAccountLookup()
      accountLookup.inputLoanNumber(invalidLoanNumber)
      accountLookup.clickLookupButton()

      accountLookup.alertMessage()
      .invoke('text')
      .then((alertText) => {
        expect(alertText.trim()).to.eq('The account could not be found. Please confirm that account # exists.');
      });
      cy.url().should('contains', `${Cypress.config().lift.baseUrl}/account_lookup/search?loan_number=${invalidLoanNumber}&commit=Lookup`);
    });

    it('VEN-15594_lift_home_should_lookup_valid_loan', { tags: '@smoke' }, function () {
      homePage.clickAccountLookup()
      accountLookup.inputLoanNumber(testCredential.loan_number)
      accountLookup.clickLookupButton()

      cy.url().should('contains', `${Cypress.config().lift.baseUrl}/account_lookup/accounts/${testCredential.loan_number}`);
    });
  });
});