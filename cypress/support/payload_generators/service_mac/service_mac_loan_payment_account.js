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
            payment_amount: amount,
            post_date: moment().format('YYYY-MM-DD'),
            transaction_fee: faker.number.int({ min: 0, max: 5 }),
            late_fees_paid: faker.number.int({ min: 0, max: 5 }),
            nsf_fees_paid: faker.number.int({ min: 0, max: 5 }),
            other_fees_paid: faker.number.int({ min: 0, max: 5 }),
            suspense: faker.number.int({ min: 0, max: 5 }),
            escrow: faker.number.int({ min: 0, max: 5 }),
            apply_towards_principal: faker.number.int({ min: 0, max: 5 }),
            total_amount_due: amount,
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


    generatelateFeesPaid() {
        const late_fees_paid = faker.number.int({ min: 0, max: 5 });
        return late_fees_paid
    }

    generateNsfFeesPaid() {
        const nsf_fees_paid = faker.number.int({ min: 0, max: 5 });
        return nsf_fees_paid
    }

    generateOtherFeesPaid() {
        const other_fees_paid = faker.number.int({ min: 0, max: 5 });
        return other_fees_paid
    }
    generatePaymentAmount() {
        const payment_amount = faker.number.int({ min: 0, max: 5 });
        return payment_amount
    }
    generateSuspense() {
        const suspense = faker.number.int({ min: 0, max: 5 });
        return suspense
    }
    generateEscrow() {
        const suspense = faker.number.int({ min: 0, max: 5 });
        return suspense
    }
    generateApplyTowardsprincipal() {
        const apply_towards_principal = faker.number.int({ min: 0, max: 5 });
        return apply_towards_principal
    }

}