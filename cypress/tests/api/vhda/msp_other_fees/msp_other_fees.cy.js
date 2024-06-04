import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('VHDA', function () {
  describe('/msp_other_fees', function () {
    const vhdaApi = new VhdaApi();
    let testCredential;

    before(() => {
      vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    it('VEN-15594_vhda_get_msp_other_fees_with_valid_credentials', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        testCredential.last_4_ssn);

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.getMspOtherFees().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.not.equal(null);
        });
      });
    });

    it('VEN-15594_vhda_get_msp_other_fees_with_invalid_credentials', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
        faker.number.int(5), faker.number.int(4));

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.getMspOtherFees().then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });
  });
});