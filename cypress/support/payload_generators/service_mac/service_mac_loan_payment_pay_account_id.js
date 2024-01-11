import moment from 'moment';
const { faker } = require('@faker-js/faker');

export class ServiceMacLoanPaymentPayAccountId {

    generateData() {
        let jsonData = {
            data: {
                type: 'payment',
                id: null,
                attributes: this.generateAttributes()
            }
        }
        cy.log(JSON.stringify(jsonData));
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
            escrow: faker.number.int({ min: 0, max: 100 }),
            apply_towards_principal: faker.number.int({ min: 0, max: 100 }),
            total_amount_due: null,
            pay_account_id: null,
            browser_type:"Chrome",
            ip_address:"40.70.72.189"
        }
        attributes.total_amount_due = attributes.payment_amount + attributes.transaction_fee + attributes.late_fees_paid + attributes.nsf_fees_paid + attributes.other_fees_paid + attributes.escrow + attributes.apply_towards_principal

        return attributes;
    }

}