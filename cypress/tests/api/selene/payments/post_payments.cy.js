import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { SeleneApi } from '../../../../support/api_objects/selene/selene_api';

describe('API Tests: Selene Payments', function () {
  const seleneApi = new SeleneApi();
  let testCredential;
  let microbiltAccount;

  before(() => {
    const testPayload = seleneApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    seleneApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body['test_credentials'][0];
    });

    const payload = seleneApi.payloadGenerator.generateMicrobiltPayload('valid');
    seleneApi.getMicrobiltAccounts(payload).then((response) => {
      microbiltAccount = response.body[0];
    });
  });

  it('Happy Path: should successfully post a payment', () => {
    // TODO: generate payload based on test_credential info
    const payload = seleneApi.payloadGenerator.generatePayment(testCredential);
    seleneApi.postIvrPayment(payload).then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it('Unhappy Path: should fail to post a payment with invalid data', () => {
    const payload = seleneApi.payloadGenerator.generatePayment();
    payload.payment.apply_towards_principal = faker.number.int({ min: 1, max: 999 }).toString();
    seleneApi.postIvrPayment(payload).then(response => {
      expect(response.status).to.eq(422);
    });
  });
});