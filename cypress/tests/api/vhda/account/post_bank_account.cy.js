import { faker } from '@faker-js/faker';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

describe('vhda: Create Bank Account', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn);
  let bankAccounts = vhdaApi.payloadGenerator.bankAccounts();
  let invalidBankAccount = vhdaApi.payloadGenerator.invalidBankAccounts();
  let invalidCredential = faker.string.uuid;

  beforeEach(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('Create Bank Account:Verify invalid account gives validation error', () => {
    vhdaApi.createBankAccounts(invalidBankAccount).then((response) => {
      expect(response.status).to.eq(422);
    });
  });

  it('Create Bank Account:Verify valid account data creates a new loan account', () => {
    vhdaApi.createBankAccounts(bankAccounts).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.not.equal(null);
    });
  });

  it('Create Bank Account:Verify invalid token gives Authentication error', () => {
    vhdaApi.createBankAccounts(bankAccounts, invalidCredential).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

});