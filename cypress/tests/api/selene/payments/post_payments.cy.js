import { faker } from '@faker-js/faker';
import SeleneApi from '../../../../support/api_objects/selene/selene_api';

describe('API Tests: Selene Payments', function () {
  const seleneApi = new SeleneApi();

  it('Happy Path: should successfully post a payment', () => {
    const payload = seleneApi.payloadGenerator.generatePayment();
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