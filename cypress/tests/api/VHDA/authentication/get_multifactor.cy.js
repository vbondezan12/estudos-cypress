import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

const { faker } = require('@faker-js/faker');

describe('VHDA: Multifactor', function () {
    const vhdaApi = new VhdaApi();
    const credentials = vhdaApi.payloadGenerator.quick_pay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);

    before(() => {
        vhdaApi.createQuickPayJwt(credentials);
    })

    it('multifactor returns 200 with valid credentials', () => {
        vhdaApi.resendMultifactor().then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('multifactor returns 401 with invalid credentials', () => {
        vhdaApi.resendMultifactor(faker.string.uuid).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});