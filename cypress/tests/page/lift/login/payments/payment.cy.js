import { CLIENT } from '../../../../../config/constants';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';
import { OneTimePaymentPage } from '../../../../../support/page_objects/lift/payment/one_time_payment/one_time_payment_page';

describe('Lift', () => {
  describe('One-Time Payment', () => {
    const paymentPage = new OneTimePaymentPage();
    const homePage = new HomePage();

    beforeEach(() => {
      cy.liftLogin(CLIENT.VENTANEX);
      homePage.open();
      homePage.clickEndtourButton();
      homePage.clickClientSelectionForm();
      homePage.clientSelection(CLIENT.VHDA);
    });

    it('VEN-15594_lift_one_time_payment_should_make_one_time_payment_with_new_card', { tags: '@smoke' },
      function () {
        paymentPage.openOneTimeDebitPayment();
        paymentPage.inputCustomerReferenceNumber('130369');
        paymentPage.clickCustomerReferenceNumberButton();
        paymentPage.selectCustomerButton();
        paymentPage.inputEffectiveDate();
        paymentPage.inputPaymentAmount();
        // Hard wait needed for payments amount save
        // eslint-disable-next-line
        cy.wait(1000);
        paymentPage.clickNextButton();
        // Hard wait needed to change from one page to the other
        // eslint-disable-next-line
        cy.wait(3000);
        paymentPage.clickPaymentMethod();
        paymentPage.addingNewCard();
        paymentPage.clickFinishButton();
        paymentPage.clickPostThisPaymentButton();

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/payments/new/onetime_debit`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ');
        paymentPage.transactionSuccessMessage
          .should('have.text', 'Thank You');
        paymentPage.thankYouTittle
          .should('have.text', 'The information detailed below has been successfully submitted for processing.');
      });

    it('VEN-15594_lift_one_time_payment_should_make_one_time_payment_with_saved_card', { tags: '@smoke' }, function () {
      paymentPage.openOneTimeDebitPayment();
      paymentPage.inputCustomerReferenceNumber('130369');
      paymentPage.clickCustomerReferenceNumberButton();
      paymentPage.selectCustomerButton();
      paymentPage.inputEffectiveDate();
      paymentPage.inputPaymentAmount();
      // Hard wait needed for payments amount save
      // eslint-disable-next-line
      cy.wait(1000);
      paymentPage.clickNextButton();
      // Hard wait needed to change from one page to the other
      // eslint-disable-next-line
      cy.wait(3000);
      paymentPage.selectAvailablePaymentAccount();
      paymentPage.nameOnPaymentAccount;
      paymentPage.clickFinishButton();
      paymentPage.clickPostThisPaymentButton();

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/payments/new/onetime_debit`);
      homePage.clientSelectionForm
        .should('contains.text', ' 863 Virginia Housing ');
    });
  });
});