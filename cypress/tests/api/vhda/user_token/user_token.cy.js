import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('VHDA', function () {
  describe('/user_token', function () {
    const vhdaApi = new VhdaApi();
    let testCredential;

    before(() => {
      vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    it('VEN-15594_vhda_create_user_token_with_valid_login_credentials', () => {
      const credentials = vhdaApi.payloadGenerator.login(testCredential.username, testCredential.password);

      vhdaApi.createLoginJwt(credentials).then(response => {
        expect(response.status).to.eq(201);
        expect(response.body.jwt).to.not.be.null;
        expect(response.body.jwt).to.not.be.empty;
      });
    });

    it('VEN-15594_vhda_create_user_token_with_invalid_username_only', () => {
      const credentials = vhdaApi.payloadGenerator.login(faker.internet.userName(), testCredential.password);

      vhdaApi.createLoginJwt(credentials).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.jwt).to.be.undefined;
      });
    });

    // Failing due to bug: https://repayonline.atlassian.net/browse/VEN-15846
    xit('VEN-15846_vhda_create_user_token_with_invalid_password_only', () => {
      const credentials = vhdaApi.payloadGenerator.login(testCredential.username, faker.internet.password());

      vhdaApi.createLoginJwt(credentials).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.jwt).to.be.undefined;
      });
    });

    it('VEN-15594_vhda_create_user_token_with_invalid_login_credentials', () => {
      const credentials = vhdaApi.payloadGenerator.login(faker.internet.userName(), faker.internet.password());

      vhdaApi.createLoginJwt(credentials).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.jwt).to.be.undefined;
      });
    });
  });
});