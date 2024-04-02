import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

describe('vhda: Send Recovery Email', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body[0];
    });
  });

  xit('Send Recovery Email:Verify valid email Id send recovery email', () => {
    const email = vhdaApi.payloadGenerator.resendRecoveryEmail(testCredential.email);

    vhdaApi.resendRecoveryEmail(email).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('Send Recovery Email:Verify invalid email Id gives an error', () => {
    const invalidEmail = vhdaApi.payloadGenerator.resendRecoveryEmail(`${ faker.string.uuid }`);

    vhdaApi.resendRecoveryEmail(invalidEmail).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});