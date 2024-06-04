import { CLIENT } from '../../../../../config/constants';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';
import { TransactionListing } from '../../../../../support/page_objects/lift/reporting/transaction/listing_page';

describe('Lift', () => {
  describe('Transaction Listing', () => {
    const homePage = new HomePage();
    const transactionListing = new TransactionListing();

    beforeEach(() => {
      cy.liftLogin(CLIENT.VENTANEX);
      homePage.open();
      homePage.clickEndtourButton();
      homePage.clickClientSelectionForm();
      homePage.clientSelection(CLIENT.VHDA);
    });

    it('VEN-15594_lift_transaction_listing_should_show_results_with_valid_dates', { tags: '@smoke' },
      function () {
        transactionListing.openReportsListing();
        transactionListing.setListingStartDate('01/01/2024');
        transactionListing.clickSearchButton();

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ');
        transactionListing.transactionListed
          .should('not.be.empty')
          .should('be.visible');
      });

    it('VEN-15594_lift_transaction_listing_should_not_show_results_with_invalid_dates',
      { tags: '@smoke' }, function () {
        transactionListing.openReportsListing();
        transactionListing.setListingStartDate('05/02/2024');
        transactionListing.setListingEndDate('05/02/2024');
        transactionListing.clickSearchButton();

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ');
        transactionListing.totalAmountreported
          .should('be.empty');
      });

    it('VEN-115594_lift_transaction_listing_should_show_pending_presentment_status_results', { tags: '@smoke' },
      function () {
        transactionListing.openReportsListing();
        transactionListing.setListingStartDate('04/01/2024');
        transactionListing.setListingEndDate('05/02/2024');
        transactionListing.selectStatusDropdownButton('Pending Presentment');
        transactionListing.clickSearchButton();

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ');
        transactionListing.transactionListed
          .should('not.be.empty')
          .should('be.visible');
        transactionListing.pendingPresentmentTransactionStatus
          .should('not.be.empty')
          .should('contains.text', 'Pending Presentment');
      });

    it('VEN-15594_lift_transaction_listing_should_show_authorized_status_results', { tags: '@smoke' },
      function () {
        transactionListing.openReportsListing();
        transactionListing.setListingStartDate('04/01/2024');
        transactionListing.setListingEndDate('05/02/2024');
        transactionListing.selectStatusDropdownButton('Authorized - Sent for Deposit');
        transactionListing.clickSearchButton();

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ');
        transactionListing.transactionListed
          .should('not.be.empty')
          .should('be.visible');
        transactionListing.authorizedTransactionStatus
          .should('not.be.empty')
          .should('contains.text', 'Authorized - Sent for Deposit');
      });

    it('VEN-15594_lift_transaction_listing_should_show_card_decline_status_results', { tags: '@smoke' }, function () {
      transactionListing.openReportsListing();
      transactionListing.setListingStartDate('04/01/2024');
      transactionListing.setListingEndDate('05/02/2024');
      transactionListing.selectStatusDropdownButton('Card Declined');
      transactionListing.clickSearchButton();

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
      homePage.clientSelectionForm
        .should('contains.text', ' 863 Virginia Housing ');
      transactionListing.transactionListed
        .should('not.be.empty')
        .should('be.visible');
      transactionListing.cardDeclinedTransactionStatus
        .should('not.be.empty')
        .should('contains.text', 'Card Declined');
    });

    it('VEN-15594_lift_transaction_listing_should_show_card_refunded_results', { tags: '@smoke' }, function () {
      transactionListing.openReportsListing();
      transactionListing.setListingStartDate('04/01/2024');
      transactionListing.setListingEndDate('05/02/2024');
      transactionListing.selectStatusDropdownButton('Card Refunded');
      transactionListing.clickSearchButton();

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
      homePage.clientSelectionForm
        .should('contains.text', ' 863 Virginia Housing ');
      transactionListing.transactionListed
        .should('not.be.empty')
        .should('be.visible');
      transactionListing.cardRefundedTransactionStatus
        .should('not.be.empty')
        .should('contains.text', 'Card Refunded');
    });

    it('VEN-115594_lift_transaction_listing_should_show_results_from_advanced_options', { tags: '@smoke' },
      function () {
        transactionListing.openReportsListing();
        transactionListing.setListingStartDate('04/01/2024');
        transactionListing.setListingEndDate('05/02/2024');
        transactionListing.clickAdvanceOptionsButton();
        transactionListing.setListingAmount();
        transactionListing.clickSearchButton();

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ');
        transactionListing.transactionListed
          .should('not.be.empty')
          .should('be.visible');
        transactionListing.totalAmountreported
          .should('not.be.empty')
          .should('contains.text', '$40.00');
      });

    it('VEN-115594_lift_transaction_listing_should_show_details_of_transaction', { tags: '@smoke' },
      function () {
        transactionListing.openReportsListing();
        transactionListing.setListingStartDate('04/01/2024');
        transactionListing.setListingEndDate('05/02/2024');
        transactionListing.clickAdvanceOptionsButton();
        transactionListing.setListingAmount();
        transactionListing.clickSearchButton();
        transactionListing.clickTransactionDetails();

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ');
        transactionListing.transactionListed
          .should('not.be.empty')
          .should('be.visible');
        transactionListing.clientReferenceNumber
          .should('not.be.empty')
          .should('be.visible')
          .should('contains.text', '130369');
      });
  });
});