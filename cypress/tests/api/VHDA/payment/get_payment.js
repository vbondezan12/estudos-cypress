import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';
import { VhdaPayloadGenerator } from '../../../../support/payload_generators/vhda/vhda_payload_generator';

const { faker } = require('@faker-js/faker');

describe('VHDA: GET payment', function () {
    const vhdaApi = new VhdaApi();
    const vhdaPayloadGenerator = new VhdaPayloadGenerator();
    const environment = Cypress.env('vhda');
    let credentials = vhdaPayloadGenerator.quick_pay(environment.loan_number, environment.zip, environment.ssn);
    let jwt = null;

    before(() => {
        vhdaApi.createQuickPayJwt(credentials);
        cy.get('@jwt').then(content => {
            jwt = content
        })
    })
})