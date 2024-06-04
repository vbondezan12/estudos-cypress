import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('VHDA', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[ 0 ];
    });
  });

  describe('/multifactor', function () {
    xit('VEN-15594_vhda_get_multifactor_with_valid_jwt', () => {
      const payload = vhdaApi.payloadGenerator.login(testCredential.username, testCredential.password);

      vhdaApi.createLoginJwt(payload).then(() => {
        vhdaApi.getLastMfaCode(testCredential.email).then((response) => {
          const mfaCode = response.body;

          // TODO create payload generator
          const token = {
            token: mfaCode
          };

          const payload = {
            multifactor: token
          };

          vhdaApi.multifactor(payload).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
      });
    });

    xit('VEN-15594_vhda_get_multifactor_with_invalid_jwt', () => {
      const payload = vhdaApi.payloadGenerator.login(faker.internet.userName(), faker.internet.password());
      const token = {
        token: faker.finance.accountNumber(6)
      };

      const mfaToken = {
        multifactor: token
      };

      vhdaApi.createLoginJwt(payload).then(() => {
        vhdaApi.multifactor(mfaToken).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  describe('/multifactor/resend', function () {
    it('VEN-15594_vhda_resend_with_valid_jwt', () => {
      const payload = vhdaApi.payloadGenerator.login(testCredential.username, testCredential.password);

      vhdaApi.createLoginJwt(payload).then(() => {
        vhdaApi.resendMultifactor().then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });

    it('VEN-15594_vhda_resend_with_invalid_jwt', () => {
      const payload = vhdaApi.payloadGenerator.login(faker.internet.userName(), faker.internet.password());

      vhdaApi.createLoginJwt(payload).then(() => {
        vhdaApi.resendMultifactor().then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });
  });
});