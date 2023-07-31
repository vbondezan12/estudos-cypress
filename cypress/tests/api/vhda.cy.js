import { VhdaApi } from "../../support/api_objects/VHDA/vhda";
import { VhdaPayloadGenerator } from "../../support/payload_generators/VHDA/vhda_payload_generator";

describe('API Tests: VHDA', function() {
    const vhdaApi = new VhdaApi();
    const vhdaPayloadGenerator = new VhdaPayloadGenerator();
    let loginCredentials = vhdaPayloadGenerator.login(Cypress.env('vhda_username'),Cypress.env('vhda_password'));
    let jwt = null;

    before(() => {
        vhdaApi.createJwt(loginCredentials);
        cy.get('@jwt').then(content => {
            jwt = content            
        })
    })

    it('testing authentication',() => {
        vhdaApi.getAccounts(jwt).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.attributes).to.exist;
        })
    })

})