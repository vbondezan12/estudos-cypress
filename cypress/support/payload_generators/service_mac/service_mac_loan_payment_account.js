const { faker } = require('@faker-js/faker');

export class ServiceMacLoanPaymentAccount {

    generateData(loan_number) {
        let jsonData = {
            data: {
                type: 'payments',
                attributes: this.generateAttributes(loan_number)
            }
        }
        cy.log(JSON.stringify(jsonData));
        return jsonData;
    }

    generateAttributes(amount) {
        let attributes = {
            payment_amount: faker.number.int({ min: 0, max: 5 }),
            post_date: moment().format('YYYY-MM-DD'),
            transaction_fee: faker.number.int({ min: 0, max: 5 }),
            late_fees_paid: faker.number.int({ min: 0, max: 5 }),
            nsf_fees_paid: faker.number.int({ min: 0, max: 5 }),
            other_fees_paid: faker.number.int({ min: 0, max: 5 }),
            suspense: faker.number.int({ min: 0, max: 5 }),
            escrow: faker.number.int({ min: 0, max: 5 }),
            apply_towards_principal: faker.number.int({ min: 0, max: 5 }),
            total_amount_due: null,
            pay_account: {
                //how to get information for the fiels below ?
                pay_account_type: "BankAccount",
                account_number: "4003830171874018",
                routing_number: "021000021",
                name: faker.person.fullName(),
                account_type: "checking",
                save_pay_account: true
            },
        }
        attributes.total_amount_due = attributes.payment_amount + attributes.transaction_fee + attributes.late_fees_paid + attributes.nsf_fees_paid + attributes.other_fees_paid + attributes.suspense + attributes.escrow + attributes.apply_towards_principal

        return attributes;
    }

    generateTransactionFee() {
        const transaction_fee = faker.number.int({ min: 0, max: 5 });
        return transaction_fee
    }

    //TBD
    generateAmounts() {
        {
            transaction_fee = faker.number.int({ min: 0, max: 5 }),
                late_fees_paid = faker.number.int({ min: 0, max: 5 }),
                nsf_fees_paid = faker.number.int({ min: 0, max: 5 }),
                nsf_fees_paid = faker.number.int({ min: 0, max: 5 });
        }
        return
    }

}