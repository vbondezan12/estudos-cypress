import { VhdaPayloadGenerator } from '../../../../support/payload_generators/VHDA/vhda_payload_generator';

describe('[VHDA]: Authentication', function () {
    const vhdaPayloadGenerator = new VhdaPayloadGenerator();
    const environment = Cypress.env('vhda');

    it('Authentication: get quickpay token', () => {
        const credentials = vhdaPayloadGenerator.quick_pay(environment.loan_number, environment.zip, environment.ssn);

        cy.request({
            method: 'POST',
            url: Cypress.config().Vhda.base_url + '/quick_pay',
            failOnStatusCode: true,
            headers: this.headers,
            body: credentials
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.jwt).to.not.be.null;
            expect(response.body.jwt).to.not.be.empty;
        });
    })

    it('Authentication: get login token', () => {
        const credentials = vhdaPayloadGenerator.login(environment.user_name, environment.password);

        cy.request({
            method: 'POST',
            url: Cypress.config().Vhda.base_url + '/user_token',
            failOnStatusCode: true,
            headers: this.headers,
            body: credentials
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.jwt).to.not.be.null;
            expect(response.body.jwt).to.not.be.empty;
        });
    })
})