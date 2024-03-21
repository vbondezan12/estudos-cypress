import { MICROBILT_MESSAGE } from '../../../../config/constants';
import { UsBankApi } from '../../../../support/api_objects/us_bank/us_bank_api';

describe('US Bank: Bank Info', function () {
  const usBankApi = new UsBankApi();
  let microbiltAccount;

  before(() => {
    const payload = usBankApi.payloadGenerator.generateMicrobiltPayload(MICROBILT_MESSAGE.VALID);
    usBankApi.getMicrobiltAccounts(payload).then((response) => {
      microbiltAccount = response.body[0];
    });
  });

  it('Get Bank Info: verify valid bank returns correct data', () => {
    const payload = usBankApi.payloadGenerator
      .generateBankInfoPayload(515, microbiltAccount.routing);

    usBankApi.getBankInfo(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bank_name).to.eq('TRUIST BANK');
      expect(response.body.found).to.eq(true);
      expect(response.body.waived_fee).to.eq(false);
    });
  });

  it('Invalid Bank Info: verify invalid bank', () => {
    const payload = usBankApi.payloadGenerator.generateBankInfoPayload(515, null);

    usBankApi.getBankInfo(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bank_name).to.be.null;
      expect(response.body.found).to.eq(false);
      expect(response.body.waived_fee).to.eq(false);
    });
  });
});