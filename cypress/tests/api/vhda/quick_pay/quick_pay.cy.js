import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('VHDA', function () {
  describe('/quick_pay', function () {
    const vhdaApi = new VhdaApi();
    let testCredential;

    before(() => {
      vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    it('VEN-15594_vhda_quickpay_with_valid_credentials', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        testCredential.last_4_ssn);

      vhdaApi.createQuickPayJwt(payload).then(response => {
        expect(response.status).to.eq(201);
        expect(response.body.jwt).to.not.be.null;
        expect(response.body.jwt).to.not.be.empty;
      });
    });

    it('VEN-15594_vhda_post_quick_pay_with_valid_credentials', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        faker.number.int());

      vhdaApi.createQuickPayJwt(payload).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.jwt).to.be.undefined;
      });
    });

    it('VEN-15594_vhda_post_quick_pay_with_invalid_credentials', () => {
      const credentials = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
        faker.number.int(5), faker.number.int(4));

      vhdaApi.createQuickPayJwt(credentials).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.jwt).to.be.undefined;
      });
    });
  });
});