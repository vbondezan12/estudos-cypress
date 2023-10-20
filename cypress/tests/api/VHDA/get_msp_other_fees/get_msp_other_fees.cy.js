import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';
import { VhdaPayloadGenerator } from '../../../../support/payload_generators/vhda/vhda_payload_generator';

const { faker } = require('@faker-js/faker');

describe('VHDA: GetNotificationPreferences', function () {
    const vhdaPayloadGenerator = new VhdaPayloadGenerator();
    const environment = Cypress.env('vhda_loan');
    const vhdaApi = new VhdaApi();
    let credentials = vhdaPayloadGenerator.quick_pay(environment.loan_number1, environment.zip1, environment.ssn1);
    let jwt = null;

    before(() => {
        vhdaApi.createQuickPayJwt(credentials);
        cy.get('@jwt').then(content => {
            jwt = content
        })
    })

    it('get notification preferences returns 200 with valid credentials', () => {
        vhdaApi.getMspOtherFees(jwt).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.equal(null);
        });
    }); 
  
    it('get notification preferences returns 401 with invalid credentials', () => {
        vhdaApi.getMspOtherFees(faker.string.uuid).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});