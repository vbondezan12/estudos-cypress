const { faker } = require('@faker-js/faker');
const moment = require('moment');

const randomMonth = faker.number.int({ min: 1, max: 12 });
const randomDay = faker.number.int({ min: 1, max: 30 });
const randomDate = moment(`2024-${ randomMonth.toString().padStart(2, '0') }-${ randomDay.toString().padStart(2, '0') }`).format('YYYY-MM-DD');

export class ServiceMacAccountHolderPayloadGenerator {

  generateData(type, loanNumber = null) {
    let jsonData;

    switch (type) {
      case 'account_holder':
        jsonData = {
          data: {
            type: 'account_holder',
            attributes: this.generateAttributes(loanNumber)
          }
        };
        break;
      case 'payment':
        jsonData = {
          data: {
            type: 'payment',
            attributes: this.generatePaymentAttributes(loanNumber)
          }
        };
        break;
      case 'paymentId':
        jsonData = {
          data: {
            id: null,
            type: 'payment',
            attributes: this.generatePaymentIdAttributes(loanNumber)
          }
        };
        break;
    }

    return jsonData;
  }

  generateAttributes(loanNumber) {
    let attributes = {
      name: faker.person.fullName(),
      ssn: '1116',
      email: faker.internet.email({ firstName: 'Ventanex', lastName: 'Testing', provider: 'repay.com' }),
      phone: faker.phone.number(),
      account_type: 'borrower',
      loanNumber: loanNumber,
      address_line1: faker.commerce.price(),
      address_line2: faker.commerce.price(),
      address_city: faker.commerce.price(),
      address_state: faker.commerce.price(),
      address_zip: faker.commerce.price()
    };

    return attributes;
  }

  generatePaymentAttributes() {
    let attributes = {
      payment_amount: faker.number.int({ min: 1, max: 100 }),
      post_date: randomDate,
      transaction_fee: faker.number.int({ min: 1, max: 100 }),
      late_fees_paid: 0,
      nsf_fees_paid: 0,
      other_fees_paid: 0,
      suspense: 0,
      escrow: 0,
      apply_towards_principal: faker.number.int({ min: 1, max: 100 }),
      total_amount_due: null,
      pay_account: {
        pay_account_type: "BankAccount",
        account_number: "4003830171874018",
        routing_number: "021000021",
        name: "Kenzie J Tep",
        account_type: "checking",
        save_pay_account: true
      }
    };
    attributes.total_amount_due = attributes.payment_amount + attributes.transaction_fee + attributes.apply_towards_principal;

    return attributes;
  }
  generatePaymentIdAttributes() {
    let attributes = {
      payment_amount: faker.number.int({ min: 1, max: 100 }),
      post_date: randomDate,
      transaction_fee: faker.number.int({ min: 1, max: 100 }),
      late_fees_paid: 0.0,
      nsf_fees_paid: 0.0,
      other_fees_paid: 0.0,
      escrow: 0.00,
      apply_towards_principal: faker.number.int({ min: 1, max: 100 }),
      pay_account_id: null,
      total_amount_due: null,
      browser_type: "Chrome",
      ip_address: "40.70.72.189"
    };

    attributes.total_amount_due = attributes.payment_amount + attributes.transaction_fee + attributes.apply_towards_principal;
    return attributes;

  }

}