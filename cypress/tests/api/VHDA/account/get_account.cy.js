import { VhdaApi } from '../../../../support/api_objects/VHDA/vhda';
import { VhdaPayloadGenerator } from '../../../../support/payload_generators/VHDA/vhda_payload_generator';

describe('[VHDA]: Account', function () {
    const vhdaApi = new VhdaApi();
    const vhdaPayloadGenerator = new VhdaPayloadGenerator();
    const environment = Cypress.env('vhda');
    const credentials = vhdaPayloadGenerator.quick_pay(environment.loan_number, environment.zip, environment.ssn);
    let jwt = null;

    before(() => {
        vhdaApi.createQuickPayJwt(credentials);
        cy.get('@jwt').then(content => {
            jwt = content
        })
    })

    it('testing authentication', () => {
        vhdaApi.getAccounts(jwt).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.attributes).to.exist;
        })
    })
})