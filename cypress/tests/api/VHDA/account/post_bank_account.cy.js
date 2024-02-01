import { faker } from '@faker-js/faker';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';
import { VhdaPayloadGenerator } from '../../../../support/payload_generators/vhda/vhda_payload_generator';

describe('VHDA: Create Bank Account', function () {
    const vhdaApi = new VhdaApi();
    const credentials = vhdaApi.payloadGenerator.quick_pay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);
    let Accountcreate = vhdaApi.payloadGenerator.bank_accounts();
    let invalidaccountcreate = vhdaApi.payloadGenerator.invalidbank_accounts();
    let invalidcred = faker.string.uuid;
    beforeEach(() => {
        vhdaApi.createQuickPayJwt(credentials);
    })

    it('Create Bank Account:Verify invalid account gives validation error', () => {
        vhdaApi.createBankAccounts(invalidaccountcreate).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it('Create Bank Account:Verify valid account data creates a new loan account', () => {
        vhdaApi.createBankAccounts(Accountcreate).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.not.equal(null);
        });
    })

    it('Create Bank Account:Verify invalid token gives Authentication error', () => {
        vhdaApi.createBankAccounts(Accountcreate, invalidcred).then((response) => {
            expect(response.status).to.eq(401);
        });
    })

})