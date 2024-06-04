import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('VHDA', function () {
  describe('/escrow_shortage', function () {
    const vhdaApi = new VhdaApi();
    let testCredential;

    before(() => {
      vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    xit('get escrow shortage returns 200 with valid credentials', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        testCredential.last_4_ssn);

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.getEscrowShortage().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.not.equal(null);
        });
      });
    });

    it('VEN-15594_vhda_get_escrow_shortage_with_invalid_credentials', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
        faker.number.int(5), faker.number.int(4));

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.getEscrowShortage().then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.not.equal(null);
        });
      });
    });
  });
});