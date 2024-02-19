import moment from 'moment';
const { faker } = require('@faker-js/faker');

export class ServiceMacLoanPaymentAccount {

  generateData() {
    let jsonData = {
      data: {
        type: 'payments',
        attributes: this.generateAttributes()
      }
    };
    (JSON.stringify(jsonData));
    return jsonData;
  }

  generateAttributes() {
    let attributes = {
      payment_amount: faker.number.int({ min: 0, max: 100 }),
      post_date: moment().format('YYYY-MM-DD'),
      transaction_fee: faker.number.int({ min: 0, max: 100 }),
      late_fees_paid: 0,
      nsf_fees_paid: 0,
      other_fees_paid: 0,
      suspense: faker.number.int({ min: 0, max: 100 }),
      escrow: faker.number.int({ min: 0, max: 100 }),
      apply_towards_principal: faker.number.int({ min: 0, max: 100 }),
      total_amount_due: null,
      pay_account: {
        // how to get information for the fiels below ?
        pay_account_type: 'BankAccount',
        account_number: '4003830171874018',
        routing_number: '021000021',
        name: faker.person.fullName(),
        account_type: 'checking',
        save_pay_account: true
      },
    };
    attributes.total_amount_due = attributes.payment_amount + attributes.transaction_fee + attributes.late_fees_paid + attributes.nsf_fees_paid + attributes.other_fees_paid + attributes.suspense + attributes.escrow + attributes.apply_towards_principal;

    return attributes;
  }

}