import { VhdaPayloadGenerator } from '../../../../support/payload_generators/vhda/vhda_payload_generator';

const { faker } = require('@faker-js/faker');

describe('VHDA: POST quick_pay', function () {
    const vhdaPayloadGenerator = new VhdaPayloadGenerator();
    const environment = Cypress.env('vhda');

    it('quick_pay returns 201 with valid credentials', () => {
        const credentials = vhdaPayloadGenerator.quick_pay(environment.loan_number, environment.zip, environment.ssn);

        cy.request({
            method: 'POST',
            url: Cypress.config().vhda.base_url + '/quick_pay',
            failOnStatusCode: true,
            headers: this.headers,
            body: credentials
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.jwt).to.not.be.null;
            expect(response.body.jwt).to.not.be.empty;
        });
    })

    it('quick_pay returns 401 when random account number', () => {
        const credentials = vhdaPayloadGenerator.quick_pay(faker.finance.accountNumber(8), faker.finance.accountNumber(5), environment.ssn);

        cy.request({
            method: 'POST',
            url: Cypress.config().vhda.base_url + '/quick_pay',
            failOnStatusCode: false,
            headers: this.headers,
            body: credentials
        }).then((response) => {
            // Dev code returns 200 without JWT
            // TODO write bug
            expect(response.status).to.eq(401);
        });
    })

    it('user_token returns 201 with valid credentials', () => {
        const credentials = vhdaPayloadGenerator.login(environment.user_name, environment.password);

        cy.request({
            method: 'POST',
            url: Cypress.config().vhda.base_url + '/user_token',
            failOnStatusCode: true,
            headers: this.headers,
            body: credentials
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.jwt).to.not.be.null;
            expect(response.body.jwt).to.not.be.empty;
        });
    })
})