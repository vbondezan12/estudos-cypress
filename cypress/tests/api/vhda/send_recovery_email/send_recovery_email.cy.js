import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

describe('VHDA', function () {
  describe('/send_recovery_email', function () {
    const vhdaApi = new VhdaApi();
    let testCredential;

    before(() => {
      vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 1 ];
      });
    });

    it('VEN-15594_vhda_send_recovery_email_with_valid_email', () => {
      const payload = vhdaApi.payloadGenerator.resendRecoveryEmail(testCredential.email);

      vhdaApi.sendRecoveryEmail(payload).then((response) => {
        expect(response.status).to.eq(204);
      });
    });

    it('VEN-15594_vhda_send_recovery_email_with_invalid_email', () => {
      const invalidEmail = vhdaApi.payloadGenerator.resendRecoveryEmail(faker.internet.email());

      vhdaApi.sendRecoveryEmail(invalidEmail).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});