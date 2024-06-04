import { MICROBILT_MESSAGE } from '../../../../config/constants';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

const { faker } = require('@faker-js/faker');

describe('ServiceMac', function () {
  describe('/get_bank_info', function () {
    const serviceMacApi = new ServiceMacApi();
    let microbiltAccount;

    before(() => {
      const payload = serviceMacApi.payloadGenerator.generateMicrobiltPayload(MICROBILT_MESSAGE.VALID);
      serviceMacApi.getMicrobiltAccounts(payload).then((response) => {
        microbiltAccount = response.body[ 0 ];
      });
    });

    it('VEN-15594_servicemac_get_bank_info_with_valid_aba', () => {
      const payload = serviceMacApi.payloadGenerator.generateBankInfoPayload(microbiltAccount.routing);

      serviceMacApi.getBankInfo(payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bank_name).to.eq('TRUIST BANK');
        expect(response.body.found).to.eq(true);
      });
    });

    it('VEN-15594_servicemac_get_bank_info_with_invalid_aba', () => {
      const payload = serviceMacApi.payloadGenerator.generateBankInfoPayload(faker.number.int(1));

      serviceMacApi.getBankInfo(payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bank_name).to.be.null;
        expect(response.body.found).to.eq(false);
      });
    });
  });
});