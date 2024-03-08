import { faker } from '@faker-js/faker';
import { SeleneApi } from '../../../../support/api_objects/selene/selene_api';

describe('API Tests: Selene ABA Number', function () {
  const seleneApi = new SeleneApi();
  let microbiltAccount;

  before(() => {
    const payload = seleneApi.payloadGenerator.generateMicrobiltPayload('valid');
    seleneApi.getMicrobiltAccounts(payload).then((response) => {
      microbiltAccount = response.body[0];
    });
  });

  it('Get ABA number [200]: verify valid aba number', () => {
    seleneApi.getValidateAba(microbiltAccount.routing).then((response) => {
      expect(response.status).to.eq(200);

      seleneApi.xmlParser.parseString(response.body, (error, xml) => {
        expect(error).to.be.null;
        expect(xml.aba.aba).to.eq(microbiltAccount.routing);
        expect(xml.aba.name).to.eq('TRUIST BANK');
      });
    });
  });

  it('Get ABA number [404]: verify invalid aba number', () => {
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