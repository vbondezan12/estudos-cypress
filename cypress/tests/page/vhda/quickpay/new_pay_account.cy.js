import { faker } from '@faker-js/faker';
import { BANK_ACCOUNT_TYPE } from '../../../../config/constants';
import { PaymentPage } from '../../../../support/page_objects/vhda/quick_pay/payment_page';
import { QuickPayLoginPage } from '../../../../support/page_objects/vhda/quick_pay/quick_pay_login_page';

describe('VHDA', () => {
  describe('Quickpay', () => {
    const baseUrl = Cypress.config().vhda.baseUrl;
    let quickPayLoginPage = new QuickPayLoginPage();
    let paymentPage = new PaymentPage();
    let microbiltAccount;
    let routingNumber;
    let accountNumber;
    let accountName;
    let accountNickname;

    before(() => {
      const payload = quickPayLoginPage.payloadGenerator.generateMicrobiltPayload('valid');
      quickPayLoginPage.getMicrobiltAccounts(payload).then((response) => {
        microbiltAccount = response.body[ 0 ];
        routingNumber = microbiltAccount.routing;
        accountNumber = microbiltAccount.account;
        accountName = faker.person.firstName() + ' ' + faker.person.lastName();
        accountNickname = faker.person.firstName();
      });
    });

    beforeEach(() => {
      cy.vhdaQuickpayLogin();
      paymentPage.open();
    });

    describe('Pay Account ACH', () => {
      it('VEN-15594_vhda_quickpay_pay_account_ach_should_create_personal_checking_account_when_added',
        { tags: '@smoke' }, function () {
          const accountType = BANK_ACCOUNT_TYPE.CHECKING_PERSONAL;

          paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType);

          cy.url().should('contains', `${ baseUrl }/payments/new`);
          paymentPage.newAccountInfo
            .should('be.visible')
            .should('have.text', 'Using new account. *****5555');
        });

      it('VEN-15594_vhda_quickpay_pay_account_ach_should_create_personal_savings_account_when_added',
        { tags: '@smoke' },
        function () {
          const accountType = BANK_ACCOUNT_TYPE.SAVINGS_PERSONAL;

          paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType);

          cy.url().should('contains', `${ baseUrl }/payments/new`);
          paymentPage.newAccountInfo
            .should('be.visible')
            .should('have.text', 'Using new account. *****5555');
        });

      it('VEN-15594_vhda_quickpay_pay_account_ach_should_create_checking_business_account_when_added',
        { tags: '@smoke' },
        function () {
          const accountType = BANK_ACCOUNT_TYPE.CHECKING_BUSINESS;

          paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType);

          cy.url().should('contains', `${ baseUrl }/payments/new`);
          paymentPage.newAccountInfo
            .should('be.visible')
            .should('have.text', 'Using new account. *****5555');
        });

      it('VEN-15594_vhda_quickpay_pay_account_ach_should_create_savings_business_account_when_added',
        { tags: '@smoke' },
        function () {
          const accountType = BANK_ACCOUNT_TYPE.SAVINGS_BUSINESS;

          paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType);

          cy.url().should('contains', `${ baseUrl }/payments/new`);
          paymentPage.newAccountInfo
            .should('be.visible')
            .should('have.text', 'Using new account. *****5555');
        });

      it('VEN-15594_vhda_quickpay_pay_account_ach_should_give_error_when_invalid_routing', { tags: '@smoke' },
        function () {
          const routingNumber = faker.number.int({ min: 100000000, max: 999999999 });

          paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname);

          paymentPage.routingNumberErrorMessage
            .should('be.visible')
            .should('have.text', 'Invalid Routing Number');
        });

      it('VEN-15594_vhda_quickpay_pay_account_ach_should_give_error_when_invalid_account_number', { tags: '@smoke' },
        function () {
          const accountNumber = faker.number.int({ min: 100, max: 999 });

          paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname);

          paymentPage.accountNumberErrorMessage
            .should('be.visible')
            .should('have.text', 'Invalid Account Number');
        });

      it('VEN-15594_vhda_quickpay_pay_account_ach_should_give_error_when_only_first_name_provided',
        { tags: '@smoke' }, function () {
          const accountName = faker.person.firstName();

          paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname);

          paymentPage.accountNameErrorMessage
            .should('be.visible')
            .should('have.text', 'First and last name are required');
        });

      describe('Quickpay Debit Pay Account ', () => {
        it('VEN-15594_vhda_quickpay_pay_account_ach_should_create_debit_card_when_added', { tags: '@smoke' },
          function () {
            const cardName = accountName;
            const cardNumber = '4111111111111111';
            const cardAddress = faker.location.street();
            const cardCity = faker.location.city();
            const cardState = faker.location.state();
            const cardZipCode = faker.location.zipCode();

            paymentPage.addNewDebitCard(cardName, cardNumber, cardAddress, cardCity, cardState, cardZipCode);

            cy.url().should('contains', `${ baseUrl }/payments/new`);
            paymentPage.newAccountInfo
              .should('be.visible')
              .should('have.text', 'Using new account. ***************1111');
          });

        it('VEN-15594_vhda_quickpay_pay_account_debit_should_create_debit_card_when_added', { tags: '@smoke' },
          function () {
            const cardName = faker.person.firstName();
            const cardNumber = '4111111111111111';
            const cardAddress = faker.location.street();
            const cardCity = faker.location.city();
            const cardState = faker.location.state();
            const cardZipCode = faker.location.zipCode();

            paymentPage.addNewDebitCard(cardName, cardNumber, cardAddress, cardCity, cardState, cardZipCode);

            paymentPage.cardNameErrorMessage
              .should('be.visible')
              .should('have.text', 'First and last name are required');
          });

        it('VEN-15594_vhda_quickpay_pay_account_debit_should_give_error_when_only_first_name_provided',
          { tags: '@smoke' }, function () {
            const cardName = '{backspace}';
            const cardNumber = '4111111111111111';
            const cardAddress = faker.location.street();
            const cardCity = faker.location.city();
            const cardState = faker.location.state();
            const cardZipCode = faker.location.zipCode();

            paymentPage.addNewDebitCard(cardName, cardNumber, cardAddress, cardCity, cardState, cardZipCode);

            paymentPage.cardNameErrorMessage
              .should('be.visible')
              .should('have.text', 'Name on Card is required');
          });

        it('VEN-15594_vhda_quickpay_pay_account_debit_should_give_error_when_invalid_card_number_length',
          { tags: '@smoke' }, function () {
            const cardName = accountName;
            const cardNumber = '1';
            const cardAddress = faker.location.street();
            const cardCity = faker.location.city();
            const cardState = faker.location.state();
            const cardZipCode = faker.location.zipCode();

            paymentPage.addNewDebitCard(cardName, cardNumber, cardAddress, cardCity, cardState, cardZipCode);

            paymentPage.cardNumberErrorMessage
              .should('be.visible')
              .should('have.text', 'Card Number is invalid');
          });

        it('VEN-15594_vhda_quickpay_pay_account_debit_should_give_error_when_fields_are_empty', { tags: '@smoke' },
          function () {
            const cardName = '{backspace}';
            const cardNumber = '{backspace}';
            const cardAddress = '{backspace}';
            const cardCity = '{backspace}';
            const cardState = 'State';
            const cardZipCode = '{backspace}';

            paymentPage.addNewDebitCard(cardName, cardNumber, cardAddress, cardCity, cardState, cardZipCode);

            paymentPage.cardNumberErrorMessage
              .should('be.visible')
              .should('have.text', 'Card Number is required');
            paymentPage.cardNameErrorMessage
              .should('be.visible')
              .should('have.text', 'Name on Card is required');
            paymentPage.cardAddressErrorMessage
              .should('be.visible')
              .should('have.text', 'Address 1 is required');
            paymentPage.cardCityErrorMessage
              .should('be.visible')
              .should('have.text', 'City is required');
            paymentPage.cardStateErrorMessage
              .should('be.visible')
              .should('have.text', 'State is required');
            paymentPage.cardZipCodeErrorMessage
              .should('be.visible')
              .should('have.text', 'Zip Code is required');
          });
      });
    });
  });
});