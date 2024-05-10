import { LoginPage } from '../../../../../support/page_objects/lift/login/login_page';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';
import { TransactionListing } from '../../../../../support/page_objects/lift/reporting/transaction/listing_page';
import { MockLoanServiceApi } from '../../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../../../config/constants';
import { LOAN_STATUS } from '../../../../../config/constants';
import { MfaPage } from '../../../../../support/page_objects/lift/login/mfa_page';

describe('Lift Reporting', { tags: [ '@Home', '@regression' ] }, () => {
  const loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();
  const homePage = new HomePage();
  const transactionListing = new TransactionListing();
  const mfaPage = new MfaPage();

  let testCredential;

  beforeEach(() => {
    mockLoanServiceApi.getTestLoans(CLIENT.VENTANEX, LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[1]
      loginPage.open()
      loginPage.login(testCredential.username, testCredential.password, CLIENT.VENTANEX);
      loginPage.getMfaCode(testCredential.email).then((response) => {
        mfaPage.enterMfaInput(response.body)
        mfaPage.clickMfaConfirmButton()
      });
      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
      homePage.clickEndtourButton()
      homePage.clickClientSelectionForm()
      homePage.clientSelection(CLIENT.VHDA)
    });
  });

  it('should go the listing option by visiting the URL and list a transaction successfuly ', { tags: '@smoke' }, function () {
    transactionListing.openReportsListing()
    transactionListing.setListingStartDate('01/01/2024')
    transactionListing.clickSearchButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    transactionListing.transactionListed
      .should('not.be.empty')
      .should('be.visible')
  });

  it('should go the listing option by visiting the URL and not list a transaction successfuly', { tags: '@smoke' }, function () {
    transactionListing.openReportsListing()
    transactionListing.setListingStartDate('05/02/2024')
    transactionListing.setListingEndDate('05/02/2024')
    transactionListing.clickSearchButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    transactionListing.totalAmountreported
      .should('be.empty')
  });

  it('should list transation with [Pending Presentment] Status', { tags: '@smoke' }, function () {
    transactionListing.openReportsListing()
    transactionListing.setListingStartDate('04/01/2024')
    transactionListing.setListingEndDate('05/02/2024')
    transactionListing.selectStatusDropdownButton('Pending Presentment')
    transactionListing.clickSearchButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    transactionListing.transactionListed
      .should('not.be.empty')
      .should('be.visible')
    transactionListing.pendingPresentmentTransactionStatus
      .should('not.be.empty')
      .should('contains.text', 'Pending Presentment')
  });

  it('should list transation with [Authorized - Sent For Deposit] Status', { tags: '@smoke' }, function () {
    transactionListing.openReportsListing()
    transactionListing.setListingStartDate('04/01/2024')
    transactionListing.setListingEndDate('05/02/2024')
    transactionListing.selectStatusDropdownButton('Authorized - Sent for Deposit')
    transactionListing.clickSearchButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    transactionListing.transactionListed
      .should('not.be.empty')
      .should('be.visible')
    transactionListing.authorizedTransactionStatus
      .should('not.be.empty')
      .should('contains.text', 'Authorized - Sent for Deposit')
  });

  it('should list transation with [Card Declined] Status', { tags: '@smoke' }, function () {
    transactionListing.openReportsListing()
    transactionListing.setListingStartDate('04/01/2024')
    transactionListing.setListingEndDate('05/02/2024')
    transactionListing.selectStatusDropdownButton('Card Declined')
    transactionListing.clickSearchButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    transactionListing.transactionListed
      .should('not.be.empty')
      .should('be.visible')
    transactionListing.cardDeclinedTransactionStatus
      .should('not.be.empty')
      .should('contains.text', 'Card Declined')
  });

  it('should list transation with [Card Refunded] Status', { tags: '@smoke' }, function () {
    transactionListing.openReportsListing()
    transactionListing.setListingStartDate('04/01/2024')
    transactionListing.setListingEndDate('05/02/2024')
    transactionListing.selectStatusDropdownButton('Card Refunded')
    transactionListing.clickSearchButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    transactionListing.transactionListed
      .should('not.be.empty')
      .should('be.visible')
    transactionListing.cardRefundedTransactionStatus
      .should('not.be.empty')
      .should('contains.text', 'Card Refunded')
  });

  it('should list transation using Advance Options', { tags: '@smoke' }, function () {
    transactionListing.openReportsListing()
    transactionListing.setListingStartDate('04/01/2024')
    transactionListing.setListingEndDate('05/02/2024')
    transactionListing.clickAdvanceOptionsButton()
    transactionListing.setListingAmount()
    transactionListing.clickSearchButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    transactionListing.transactionListed
      .should('not.be.empty')
      .should('be.visible')
    transactionListing.totalAmountreported
      .should('not.be.empty')
      .should('contains.text', '$40.00')
  });

  it('should list transation and validate the details of one transaction', { tags: '@smoke' }, function () {
    transactionListing.openReportsListing()
    transactionListing.setListingStartDate('04/01/2024')
    transactionListing.setListingEndDate('05/02/2024')
    transactionListing.clickAdvanceOptionsButton()
    transactionListing.setListingAmount()
    transactionListing.clickSearchButton()
    transactionListing.clickTransactionDetails()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    transactionListing.transactionListed
      .should('not.be.empty')
      .should('be.visible')
    transactionListing.clientReferenceNumber
      .should('not.be.empty')
      .should('be.visible')
      .should('contains.text', '130369')
  });
})
