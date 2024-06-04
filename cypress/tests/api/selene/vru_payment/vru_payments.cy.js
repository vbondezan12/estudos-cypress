import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { SeleneApi } from '../../../../support/api_objects/selene/selene_api';

describe('Selene', function () {
  describe('/vru_payment ', function () {
    const seleneApi = new SeleneApi();
    let testCredential;

    before(() => {
      seleneApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    xit('Happy Path: should successfully post a payments', () => {
      // TODO: generate payload based on test_credential info
      const payload = seleneApi.payloadGenerator.generatePayment(testCredential);
      seleneApi.postIvrPayment(payload).then(response => {
        expect(response.status).to.eq(200);
      });
    });

    xit('Unhappy Path: should fail to post a payments with invalid data', () => {
      const payload = seleneApi.payloadGenerator.generatePayment();
      payload.payment.apply_towards_principal = faker.number.int({ min: 1, max: 999 }).toString();
      seleneApi.postIvrPayment(payload).then(response => {
        expect(response.status).to.eq(422);
      });
    });
  });
});