import { faker } from '@faker-js/faker';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

describe('vhda: Create Loan', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn);
  let loanRequest = vhdaApi.payloadGenerator.newLoan(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn);
  let invalidCredential = faker.string.uuid;

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('Create Loan:Verify valid loan data creates a new loan', () => {
    vhdaApi.newLoan(loanRequest).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.not.equal(null);
    });
  });

  it('Create Loan:Verify invalid token gives Authentication error', () => {
    vhdaApi.newLoan(loanRequest, invalidCredential).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

});