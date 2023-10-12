import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';
import { VhdaPayloadGenerator } from '../../../../support/payload_generators/vhda/vhda_payload_generator';

const { faker } = require('@faker-js/faker');

describe('VHDA: GetDocuments', function () {
    const vhdaPayloadGenerator = new VhdaPayloadGenerator();
    const environment = Cypress.env('vhda');
    const vhdaApi = new VhdaApi();
    let credentials = vhdaPayloadGenerator.quick_pay(environment.loan_number, environment.zip, environment.ssn);
    let jwt = null;

    before(() => {
        vhdaApi.createQuickPayJwt(credentials);
        cy.get('@jwt').then(content => {
            jwt = content
        })
    })

    it('get documents returns 200 with valid credentials', () => {
        vhdaApi.getDocuments(jwt).then((response) => {
            expect(response.status).to.eq(200);
        });
    }); 
  
    it('get documents returns 401 with invalid credentials', () => {
        vhdaApi.getDocuments(faker.string.uuid).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});