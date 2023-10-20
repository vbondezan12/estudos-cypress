import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

const { faker } = require('@faker-js/faker');

describe('VHDA: POST payment', function () {
    const vhdaApi = new VhdaApi();
    const credentials = vhdaApi.payloadGenerator.quick_pay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);

    before(() => {
        vhdaApi.createQuickPayJwt(credentials);
    })
})