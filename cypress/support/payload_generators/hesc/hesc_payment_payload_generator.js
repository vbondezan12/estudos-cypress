const { faker } = require('@faker-js/faker');

export class HescPaymentPayloadGenerator {

  generateData(accountNumber, routingNumber) {
    return {
      data: {
        type: 'pay_account', attributes: this.generateAttributes(accountNumber, routingNumber)
      }
    };
  }

  generateAttributes(accountNumber, routingNumber) {
    return {
      pay_account: {
        type: 'BankAccount',
        account_number: accountNumber,
        routing_number: routingNumber,
        name: faker.person.fullName(),
        account_type: 'checking',
        default: true,
        nickname: faker.person.fullName()
      }
    };
  }
}