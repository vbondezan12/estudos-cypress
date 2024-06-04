import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('VHDA', function () {
  describe('/notification_preferences', function () {
    const vhdaApi = new VhdaApi();
    let testCredential;

    before(() => {
      vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    it('VEN-15594_vhda_get_notification_preferences_with_valid_jwt', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        testCredential.last_4_ssn);

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.getNotificationPreferences().then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });

    it('VEN-15594_vhda_get_notification_preferences_with_invalid_jwt', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
        faker.number.int(5), faker.number.int(4));

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.getNotificationPreferences().then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });
  });
});