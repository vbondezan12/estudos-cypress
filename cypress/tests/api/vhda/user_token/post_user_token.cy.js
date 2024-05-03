import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';
const { faker } = require('@faker-js/faker');

describe('vhda: POST user_token', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[0];
    });
  });

  xit('user_token returns 201 with valid credentials', () => {
    const credentials = vhdaApi.payloadGenerator.login(testCredential.username, testCredential.password);

    vhdaApi.createLoginJwt(credentials).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.jwt).to.not.be.null;
      expect(response.body.jwt).to.not.be.empty;
    });
  });

  // TODO: Khannara to write bug
  xit('user_token returns 401 with invalid username', () => {
    const credentials = vhdaApi.payloadGenerator.login(faker.internet.userName(), vhdaApi.cypressEnv.password);

    vhdaApi.createLoginJwt(credentials).then(response => {
      expect(response.status).to.eq(401);
    });
  });

  // TODO: Khannara to write bug
  xit('user_token returns 401 with invalid password', () => {
    const credentials = vhdaApi.payloadGenerator.login(vhdaApi.cypressEnv.username, faker.internet.password());

    vhdaApi.createLoginJwt(credentials).then(response => {
      expect(response.status).to.eq(401);
    });
  });

  // TODO: Khannara to write bug
  xit('user_token returns 401 with invalid username and password', () => {
    const credentials = vhdaApi.payloadGenerator.login(faker.internet.userName(), faker.internet.password());

    vhdaApi.createLoginJwt(credentials).then(response => {
      expect(response.status).to.eq(401);
    });
  });
});