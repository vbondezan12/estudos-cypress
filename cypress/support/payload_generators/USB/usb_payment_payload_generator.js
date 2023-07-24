const { faker } = require("@faker-js/faker");
const moment = require("moment");

export class UsbPaymentPayloadGenerator {

    generateData(client_id, loan_number) {
        let data = {
            type: 'payment',
            attributes: this.generateAttributes(client_id, loan_number)
        }
        
        return data;
    }

    generateAttributes(client_id, loan_number) {
        let attributes = {
            client_id: client_id,
            loan_number: loan_number,
            post_date: moment().format("YYYY-MM-DD"),
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
            //ToDo: Figure out how to get different account holder IDs and pass them in
            account_holder_id: '9009642',
            email: faker.internet.email({ firstName: 'Ventanex', lastName: 'Testing', provider: 'repay.com'}),
            // ToDo: Figure out if these next 4 values can be anything different
            payment_type: "ach",
            checking: "checking",
            account_number: '053200983',
            routing_number: '11101010',
            save_pay_account: false,
            state: faker.location.state({ abbreviated: true }),
            city: faker.location.city(),
            address1: faker.location.streetAddress(true),
            zip: faker.location.zipCode()
        }

        return attributes;
    }
}