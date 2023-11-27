import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

const { faker } = require('@faker-js/faker');

describe('VHDA: POST quick_pay', function () {
    const vhdaApi = new VhdaApi();

    it('quick_pay returns 201 with valid credentials', () => {
        const credentials = vhdaApi.payloadGenerator.quick_pay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);

        vhdaApi.createQuickPayJwt(credentials).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body.jwt).to.not.be.null;
            expect(response.body.jwt).to.not.be.empty;
        });
    })

    xit('quick_pay returns 401 when random account number', () => {
        const credentials = vhdaApi.payloadGenerator.quick_pay(faker.finance.accountNumber(8), faker.finance.accountNumber(5), vhdaApi.cypressEnv.ssn);

        vhdaApi.createQuickPayJwt(credentials).then(response => {
            expect(response.status).to.eq(401);
        });
    })
})