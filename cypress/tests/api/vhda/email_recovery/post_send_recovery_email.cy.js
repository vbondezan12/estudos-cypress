import { faker } from '@faker-js/faker';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

describe('vhda: Send Recovery Email', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn);
  let email = vhdaApi.payloadGenerator.resendRecoveryEmail(vhdaApi.cypressEnv.user_name);
  let invalidEmail = vhdaApi.payloadGenerator.resendRecoveryEmail(`${ faker.string.uuid }`);

  beforeEach(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('Send Recovery Email:Verify valid email Id send recovery email', () => {
    vhdaApi.resendRecoveryEmail(email).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('Send Recovery Email:Verify invalid email Id gives an error', () => {
    vhdaApi.resendRecoveryEmail(invalidEmail).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

});