const { faker } = require('@faker-js/faker');
import moment from 'moment'

export class HescPaymentPayloadGenerator {

    generateData(accountNumber, routingNumber) {
        let jsonData = {
            data: {
                type: 'pay_account',
                attributes: this.generateAttributes(accountNumber, routingNumber)
            }
        }
        cy.log(JSON.stringify(jsonData));
        return jsonData;
    }
    
    generateAttributes(accountNumber, routingNumber) {
        let attributes = {
        
            pay_account: {
                type: "BankAccount",
                account_number: accountNumber,
                routing_number: routingNumber,
                name: faker.person.fullName(),
                account_type: "checking",
                default: true,
                nickname: faker.person.fullName()
            },
        }

        return attributes;
    }
}