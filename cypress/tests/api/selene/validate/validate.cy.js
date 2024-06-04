import { faker } from '@faker-js/faker';
import { SeleneApi } from '../../../../support/api_objects/selene/selene_api';

describe('Selene', function () {
  describe('/validate ', function () {
    const seleneApi = new SeleneApi();
    let microbiltAccount;

    before(() => {
      const payload = seleneApi.payloadGenerator.generateMicrobiltPayload('valid');
      seleneApi.getMicrobiltAccounts(payload).then((response) => {
        microbiltAccount = response.body[ 0 ];
      });
    });

    it('VEN-15594_selene_get_validate_with_valid_aba', () => {
      seleneApi.getValidateAba(microbiltAccount.routing).then((response) => {
        expect(response.status).to.eq(200);

        seleneApi.xmlParser.parseString(response.body, (error, xml) => {
          expect(error).to.be.null;
          expect(xml.aba.aba).to.eq(microbiltAccount.routing);
          expect(xml.aba.name).to.eq('TRUIST BANK');
        });
      });
    });

    it('VEN-15594_selene_get_validate_with_invalid_aba', () => {
      const invalidAbaNumber = faker.number.int({ min: 10000000000, max: 99999999999 });

      seleneApi.getValidateAba(invalidAbaNumber).then(response => {
        expect(response.status).to.eq(200);

        seleneApi.xmlParser.parseString(response.body, (error, xml) => {
          expect(error).to.be.null;
          expect(xml.aba.error).to.eq('ABA is not a valid');
        });
      });
    });
  });
});