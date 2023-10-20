const { faker } = require('@faker-js/faker');

export class ServiceMacAccountHolderPayloadGenerator {

    generateData(loan_number) {
        let jsonData = {
            data: {
                type: 'account_holder',
                attributes: this.generateAttributes(loan_number)
            }
        }
        cy.log(JSON.stringify(jsonData));
        
       return jsonData;
    }

    generateAttributes(loan_number) {
        let attributes = {
            name: faker.person.fullName(),
            ssn: "1116",
            email: faker.internet.email({ firstName: 'Ventanex', lastName: 'Testing', provider: 'repay.com'}),            
            phone: faker.phone.number(),
            account_type: faker.person.firstName(),
            loan_number: loan_number,
            address_line1: faker.commerce.price(),
            address_line2: faker.commerce.price(),
            address_city: faker.commerce.price(),
            address_state: faker.commerce.price(),
            address_zip: faker.commerce.price()           
        }

        return attributes;
    }
}