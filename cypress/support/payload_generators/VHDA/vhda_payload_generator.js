const { faker } = require("@faker-js/faker");
const moment = require("moment");

export class VhdaPayloadGenerator {

    login(user, pass) {
        let authorization = {
            username: user,
            password: pass
        }

        let login = {
            auth: authorization
        }

        return login;
    }

    multifactor(userToken) {
        let localToken = {
            token: userToken
        }

        let multifactor = {
            token: localToken
        }         

        return multifactor;
    }

    quick_pay(loanNumber, zipCode, SSN) {
        let authorization = {
            loan_number: loanNumber,
            zip: zipCode,
            ssn: SSN
        }

        let auth = {
            auth: authorization
        }

        return auth;
    }

    register(loanNumber, zipCode, SSN) {
        let userEmail = faker.internet.email({ firstName: 'Ventanex', lastName: 'Testing', provider: 'repay.com'});
        let userPassword = faker.internet.password()

        let createUser = {
            email: userEmail,
            email_confirmation: userEmail,
            password: userPassword,
            password_confirmation: userPassword,
            loan_number: loanNumber,
            zip_code: zipCode,
            ssn: SSN,
            username: faker.internet.userName()
        }

        let user = {
            user: createUser
        }

        return user;
    }
    
    resend_recovery_email(userEmail) {
        let email = {
            email: userEmail
        }

        return email;
    }

    new_loan(loanNumber, zipCode, SSN){
        let loan = {
            loan_number: loanNumber,
            zip_code: zipCode,
            ssn: SSN,
            nickname: faker.internet.displayName()
        }

        return loan;
    }

    bank_accounts() {
        let bankAccount = {
            routing_number: '053200983',
            name: faker.person.fullName,
            account_number: '11101010',
            // possible values: checking, savings
            checking: 'checking',
            account_business: 'personal',
            nickname: faker.internet.displayName(),
            save_pay_account: 'true',
            default: 'true'
        }

        return bankAccount;
    }

    card_accounts() {
        let cardAccount = {
            default: 'false',
            card_default: 'false',
            save_pay_account: 'true',
            save_card_account: 'true',
            nickname: faker.internet.displayName(),
            card_nickname: faker.internet.displayName(),
            state: faker.location.state({ abbreviated: true }),
            city: faker.location.city(),
            address1: faker.location.streetAddress(true),
            address2: faker.location.streetAddress(true),
            zip: faker.location.zipCode(),
            exp_month: moment().format('MM'),
            exp_year: moment().add(2, 'y').format('YYYY'),
            card_number: 4111111111111111,
            card_name: faker.person.fullName(),
            payment_type: '7'
        }
        
        return cardAccount;
    }

    recurring_payment() {
        let recurringPayment = {
            start_date: moment().format('YYYY-MM-DD'),
            payment_amount: faker.commerce.price(),
            total_amount_due: faker.commerce.price(),
            payment_type: '1',
            pay_account: this.bank_accounts()
        }

        return recurringPayment;
    }

}