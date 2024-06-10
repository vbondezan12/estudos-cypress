import { CLIENT } from '../../../../../config/constants';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';

describe('Lift', () => {
  describe('Home', () => {
    const homePage = new HomePage();

    beforeEach(() => {
      cy.liftLogin(CLIENT.VENTANEX);
      homePage.open();

    });

    it('VEN-15594_lift_home_with_valid_client_selection', { tags: '@smoke' }, function () {
      homePage.clickEndtourButton();
      homePage.clickClientSelectionForm();
      homePage.clientSelection(CLIENT.VHDA);

      cy.url().should('contains', `${Cypress.config().lift.baseUrl}/home`);
      homePage.clientSelectionForm
        .should('contains.text', ' 863 Virginia Housing ');
    });

    describe('Payments Menu', () => {

      it('VEN-15594_lift_home_should_validate_payment_side_menu_options', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()


        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/home`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ')
        homePage.paymentsNewMspPayment
          .should('exist')
          .contains('New MSP Payment')
        homePage.paymentsMSPRecurringPayment
          .should('exist')
          .contains('MSP Recurring Payment')
        homePage.paymentsCollectOneTimePayment
          .should('exist')
          .contains('Collect Onetime Payment')
        homePage.paymentsIssueOneTimePayment
          .should('exist')
          .contains('Issue Onetime Payment')
        homePage.paymentsRecurringPayment
          .should('exist')
        homePage.paymentsResearch
          .should('exist')
          .contains('Research')
      });

      it('VEN-15594_lift_home_should_access_New_MSP_Payment_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsNewMspPayment.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/msp_payments/new`);
      });

      it('VEN-15594_lift_home_should_access_MSP_Recurring_Payments_Manage_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsMSPRecurringPayment.wait(1000).click()
        homePage.paymentsMSPRecurringPaymentManage.click()


        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/msp_recurring_payments`);
      });

      it('VEN-15594_lift_home_should_access_MSP_Recurring_Payments_Create_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsMSPRecurringPayment.wait(1000).click()
        homePage.paymentsMSPRecurringPaymentCreate.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/msp_recurring_payments/new`);
      });

      it('VEN-15594_lift_home_should_access_Collect_Onetime_Payment_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsCollectOneTimePayment.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/payments/new/onetime_debit`);
      });

      it('VEN-15594_lift_home_should_access_Issue_Onetime_Payment_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsIssueOneTimePayment.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/payments/new/onetime_credit`);
      });

      it('VEN-15594_lift_home_should_access_Recurring_Payments_Manage_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsRecurringPayment.wait(1000).click()
        homePage.paymentsRecurringPaymentManage.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/recurring_payments`);
      });

      it('VEN-15594_lift_home_should_access_Recurring_Payments_Create_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsRecurringPayment.wait(1000).click()
        homePage.paymentsRecurringPaymentCreate.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/recurring_payments`);
      });

      it('VEN-15594_lift_home_should_access_Research_Email_Confirmation_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsResearch.wait(1000).click()
        homePage.paymentsReseachEmailConfirmations.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/email_confirmations`);
      });

      it('VEN-15594_lift_home_should_access_Research_Email_Confirmation_page_successfully', { tags: '@smoke' }, function () {
        homePage.clickPaymentsSideMenu()
        homePage.paymentsResearch.wait(1000).click()
        homePage.paymentsReseachMySummary.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/stored_payments/my_summary`);
      });
    });

    describe('Secure Exchange Menu', () => {
      it('VEN-15594_lift_home_should_access_File_management_successfully', { tags: '@smoke' }, function () {
        homePage.clickClientSelectionForm();
        homePage.clientSelection(CLIENT.VILLAGE_CAPITAL);
        homePage.clickSecureExchangeSideMenu()
        homePage.fileManagement.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/client_inbound_files`);
      });

      it('VEN-15594_lift_home_should_access_msp_Lockbox_Exception_Items_successfully', { tags: '@smoke' }, function () {
        homePage.clickSecureExchangeSideMenu()
        homePage.mspLockboxExceptionItems.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/msp_lockbox_exceptions`);
      });

    });

    describe('Documents Menu', () => {

      it('VEN-15594_lift_home_should_access_Documents_management_successfully', { tags: '@smoke' }, function () {
        homePage.clickDocumentsSideMenu()
        homePage.management.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/documents`);
      });

      it('VEN-15594_lift_home_should_access_Documents_research_successfully', { tags: '@smoke' }, function () {
        homePage.clickDocumentsSideMenu()
        homePage.research.click()
        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/documents/research`);
      });

      it('VEN-15594_lift_home_should_access_Documents_research_archived_successfully', { tags: '@smoke' }, function () {
        homePage.clickDocumentsSideMenu()
        homePage.researchArchived.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/archive_documents/research`);
      });

    });
    //TODO
    describe('Reporting Menu', () => {

      it('VEN-15594_lift_home_should_access_Documents_management_successfully', { tags: '@smoke' }, function () {
        homePage.clickDocumentsSideMenu()
        homePage.management.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/documents`);
      });

      it('VEN-15594_lift_home_should_access_Documents_research_successfully', { tags: '@smoke' }, function () {
        homePage.clickDocumentsSideMenu()
        homePage.research.click()
        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/documents/research`);
      });

      it('VEN-15594_lift_home_should_access_Documents_research_archived_successfully', { tags: '@smoke' }, function () {
        homePage.clickDocumentsSideMenu()
        homePage.researchArchived.click()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/archive_documents/research`);
      });

    });

    describe('User Section', () => {

      it('VEN-15594_lift_home_should_open_profile_page', { tags: '@smoke' }, function () {
        homePage.clickUserButton()
        homePage.clickProfileButton()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/users`);
      });

      xit('VEN-15594_lift_home_should_open_inbox_page', { tags: '@smoke' }, function () {
        homePage.clickUserButton()
        homePage.clickInboxButton()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/inbox`);
        // Inbox page is returning a 500, need to be implemented in QA environment
      });

      it('VEN-15594_lift_home_should_logout_successfully', { tags: '@smoke' }, function () {
        homePage.clickUserButton()
        homePage.clickLogoutButton()

        cy.url().should('contains', `${Cypress.config().lift.baseUrl}/sessions/logout`);
        homePage.toastMessage
          .should('contains.text', 'Successfully Logged Out')
      });

    });
  });
});