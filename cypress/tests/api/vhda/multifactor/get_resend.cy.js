import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: GET resend', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[ 0 ];
    });
  });

  it('resend returns 200 with valid credentials', () => {
    const payload = vhdaApi.payloadGenerator.login(testCredential.username, testCredential.password);

    vhdaApi.createLoginJwt(payload).then(() => {
      vhdaApi.resendMultifactor().then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('resend returns 401 with invalid credentials', () => {
    const payload = vhdaApi.payloadGenerator.login(faker.internet.userName(), faker.internet.password());

    vhdaApi.createLoginJwt(payload).then(() => {
      vhdaApi.resendMultifactor().then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });
});