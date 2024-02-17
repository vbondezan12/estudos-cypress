const { faker } = require('@faker-js/faker');
const moment = require('moment');

export class UsbPaymentPayloadGenerator {

  generateData(clientId, loanNumber) {
    let jsonData = {
      data: {
        type: 'payment',
        attributes: this.generateAttributes(clientId, loanNumber)
      }
    };

    return jsonData;
  }

  generateAttributes(clientId, loanNumber) {
    let attributes = {
      clientId: clientId,
      loanNumber: loanNumber,
      post_date: moment().format('YYYY-MM-DD'),
      payment_amount: faker.commerce.price(),
      transaction_fee: faker.commerce.price(),
      late_fees_paid: faker.commerce.price(),
      nsf_fees_paid: faker.commerce.price(),
      other_fees_paid: faker.commerce.price(),
      suspense: faker.commerce.price(),
      apply_towards_principal: faker.commerce.price(),
      escrow: faker.commerce.price(),
      total_amount_due: faker.commerce.price(),
      note: faker.lorem.sentence(),
      name: faker.person.fullName(),
      account_holder_id: faker.finance.accountNumber(5),
      email: faker.internet.email({ firstName: 'Ventanex', lastName: 'Testing', provider: 'repay.com' }),
      // possible values: ach, debit, card
      payment_type: 'ach',
      // possible values: checking, savings
      checking: 'checking',
      /* account and routing can be hard-coded since we're not testing microbilt validation which is its own API
       053200983 / 11101010 are a working combination. We can auto-generate if we want the payment to fail with faked numbers.
       */
      account_number: '053200983',
      routing_number: '11101010',
      save_pay_account: false,
      state: faker.location.state({ abbreviated: true }),
      city: faker.location.city(),
      address1: faker.location.streetAddress(true),
      zip: faker.location.zipCode()
    };

    return attributes;
  }
}