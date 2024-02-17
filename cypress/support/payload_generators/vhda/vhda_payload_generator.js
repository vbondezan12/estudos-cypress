const { faker } = require('@faker-js/faker');
const moment = require('moment');

export class VhdaPayloadGenerator {

  login(user, pass) {
    let authorization = {
      username: user,
      password: pass
    };

    let login = {
      auth: authorization
    };

    return login;
  }

  multifactor(userToken) {
    let localToken = {
      token: userToken
    };

    let multifactor = {
      token: localToken
    };

    return multifactor;
  }

  quick_pay(loanNumber, zipCode, SSN) {
    let authorization = {
      loan_number: loanNumber,
      zip: zipCode,
      ssn: SSN
    };

    let auth = {
      auth: authorization
    };

    return auth;
  }

  register(loanNumber, zipCode, SSN) {
    let userEmail = faker.internet.email({ firstName: 'Ventanex', lastName: 'Testing', provider: 'repay.com' });
    let userPassword = faker.internet.password();

    let createUser = {
      email: userEmail,
      email_confirmation: userEmail,
      password: userPassword,
      password_confirmation: userPassword,
      loan_number: loanNumber,
      zip_code: zipCode,
      ssn: SSN,
      username: faker.internet.userName()
    };

    let user = {
      user: createUser
    };

    return user;
  }

  resend_recovery_email(userEmail) {
    let email = {
      email: userEmail
    };

    return email;
  }

  new_loan(loanNumber, zipCode, SSN) {
    let loan = {
      loan_number: loanNumber,
      zip: zipCode,
      ssn: SSN,
      nickname: faker.internet.displayName()
    };

    return loan;
  }

  bank_accounts() {
    let bankAccount = {
      routing_number: '011000028',
      name: `${ faker.person.fullName }`,
      account_number: `${ faker.number.int() }`,
      // possible values: checking, savings
      checking: 'checking',
      account_business: 'personal',
      nickname: faker.internet.displayName(),
      save_pay_account: 'true',
      default: 'true'
    };

    return bankAccount;
  }

  invalidbank_accounts() {
    let invalidbankAccount = {
      routing_number: '011000028',
      name: `${ faker.person.fullName }`,
      account_number: '011000028',
      // possible values: checking, savings
      checking: 'checking',
      account_business: 'personal',
      nickname: faker.internet.displayName(),
      save_pay_account: 'true',
      default: 'true'
    };

    return invalidbankAccount;
  }

  card_accounts() {
    let cardAccount = {
      default: 'false',
      card_default: 'false',
      save_pay_account: 'true',
      save_card_account: 'true',
      nickname: faker.internet.displayName(),
      card_nickname: faker.internet.displayName(),
      state: faker.location.state({ abbreviated: true }),
      city: faker.location.city(),
      address1: faker.location.streetAddress(true),
      address2: faker.location.streetAddress(true),
      zip: faker.location.zipCode(),
      exp_month: moment().format('MM'),
      exp_year: moment().add(2, 'y').format('YYYY'),
      card_number: 4111111111111111,
      card_name: faker.person.fullName(),
      payment_type: '7'
    };

    return cardAccount;
  }

  recurring_payment() {
    let recurringPayment = {
      start_date: moment().format('YYYY-MM-DD'),
      payment_amount: faker.commerce.price(),
      total_amount_due: faker.commerce.price(),
      payment_type: '1',
      pay_account: this.bank_accounts()
    };

    return recurringPayment;
  }

  notification_preferences() {
    let notificationTypes = {
      sms: 'true',
      email: true
    };

    let notificationPreferences = {
      email: faker.internet.email({ firstName: 'Ventanex', lastName: 'Testing', provider: 'repay.com' }),
      phone: faker.phone.number(),
      state: faker.location.state({ abbreviated: true }),
      city: faker.location.city(),
      address_line1: faker.location.streetAddress(true),
      address_line2: faker.location.streetAddress(true),
      zip: faker.location.zipCode(),
      day_of_month: faker.number.int({ min: 1, max: 7 }),
      payment_not_received: notificationTypes,
      payment_posted: notificationTypes,
      recurring_posted: notificationTypes,
    };

    return notificationPreferences;
  }

  payment() {
    let payment = {
      post_date: moment().format('YYYY-MM-DD'),
      // ToDo: Can this be randomly generated?
      pay_account_id: faker.finance.accountNumber(5),
      delinquency_reason: faker.company.buzzNoun(),
      total_payment: faker.commerce.price(),
      late_fees_paid: faker.commerce.price(),
      convenience_fee: faker.commerce.price(),
      nsf_fees_paid: faker.commerce.price(),
      corporate_advance: faker.commerce.price(),
      escrow: faker.commerce.price(),
      apply_towards_principal: faker.commerce.price(),
      total_amount_due: faker.commerce.price(),
      other_fees_paid: faker.commerce.price(),
      suspense: faker.commerce.price(),
      described_other_fees: faker.commerce.price(),
      escrow_shortage: 'false',
      pay_1_of_2: 'false',
      // ToDo: What values can this be?
      payment_type: 1,
      // ToDd: Can this be a bank account or a card account?
      pay_account: this.bank_accounts()
    };

    return payment;
  }

  updatedPassword(currentPassword) {
    let newPassword = faker.internet.password();

    let updatedPassword = {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: newPassword,
    };

    let updatePassword = {
      user: updatedPassword
    };

    return updatePassword;
  }

}