import { LoginPage } from '../../../../support/page_objects/vhda/quick_pay/login_page';
import { PaymentPage } from '../../../../support/page_objects/vhda/quick_pay/payment_page';
import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { BANK_ACCOUNT_TYPE } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';


describe('Quickpay New Account', { tags: [ '@NewAccount', '@regression' ] }, () => {
  const baseUrl = Cypress.config().vhda.baseUrl;
  let loginPage = new LoginPage();
  let paymentPage = new PaymentPage();
  let testCredential;
  let microbiltAccount;
  let routingNumber;
  let accountNumber;
  let account_name;
  let accountNickname;
  const vhdaApi = new VhdaApi();


  before(() => {
    const payload = vhdaApi.payloadGenerator.generateMicrobiltPayload('valid');
    vhdaApi.getMicrobiltAccounts(payload).then((response) => {
      microbiltAccount = response.body[0];
      routingNumber = microbiltAccount.routing;
      accountNumber = microbiltAccount.account;
      accountName = faker.person.firstName() + ' ' + faker.person.lastName();
      accountNickname = faker.person.firstName();
    });
  })

  beforeEach(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body['test_credentials'][0];
      const loanNumber = testCredential.loan_number;
      const zipCode = testCredential.zip_code;
      const ssn = testCredential.last_4_ssn;

      loginPage.login(loanNumber, zipCode, ssn);

      cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
    });
  })

  it('should create a new checking personal account successfully', { tags: '@smoke' }, function () {
    const accountType = BANK_ACCOUNT_TYPE.CHECKING_PERSONAL;

    paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType);

    cy.url().should('contains', `${ baseUrl }/payments/new`);
    paymentPage.newAccountInfo
      .should('be.visible')
      .should('have.text', 'Using new account. *****5555');
  })

  it('should create a new savings personal account successfully', { tags: '@smoke' }, function () {
    const accountType = BANK_ACCOUNT_TYPE.SAVINGS_PERSONAL;

    paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType);

    cy.url().should('contains', `${ baseUrl }/payments/new`);
    paymentPage.newAccountInfo
      .should('be.visible')
      .should('have.text', 'Using new account. *****5555');
  })

  it('should create a new checking business account successfully', { tags: '@smoke' }, function () {
    const accountType = BANK_ACCOUNT_TYPE.CHECKING_BUSINESS;

    paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType);

    cy.url().should('contains', `${ baseUrl }/payments/new`);
    paymentPage.newAccountInfo
      .should('be.visible')
      .should('have.text', 'Using new account. *****5555');
  })

  it('should create a new savings business account successfully', { tags: '@smoke' }, function () {
    const accountType = BANK_ACCOUNT_TYPE.SAVINGS_BUSINESS;

    paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType);

    cy.url().should('contains', `${ baseUrl }/payments/new`);
    paymentPage.newAccountInfo
      .should('be.visible')
      .should('have.text', 'Using new account. *****5555');
  })

  it('should give error when inputing invalid routing number', { tags: '@smoke' }, function () {
    const routingNumber = faker.number.int({ min: 100000000, max: 999999999 });

    paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname);

    paymentPage.routingNumberErrorMessage
      .should('be.visible')
      .should('have.text', 'Invalid Routing Number');
  })

  it('should give error when inputing invalid account number', { tags: '@smoke' }, function () {
    const accountNumber = faker.number.int({ min: 100, max: 999 });

    paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname);

    paymentPage.accountNumberErrorMessage
      .should('be.visible')
      .should('have.text', 'Invalid Account Number');
  })

  it('should give error when inputing first name only', { tags: '@smoke' }, function () {
    const accountName = faker.person.firstName();

    paymentPage.addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname);

    paymentPage.accountNameErrorMessage
      .should('be.visible')
      .should('have.text', 'First and last name are required');
  })

  // Debit card payment

  it('should create a new debit card successfully', { tags: '@smoke' }, function () {
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
  })

  it('should give error when inputing first name only', { tags: '@smoke' }, function () {
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
  })

  it('should give error when inputing no name', { tags: '@smoke' }, function () {
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
  })

  it('should give error when inputing no card number', { tags: '@smoke' }, function () {
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
  })

  it('should give errors when inputing no information on modal', { tags: '@smoke' }, function () {
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
  })

});