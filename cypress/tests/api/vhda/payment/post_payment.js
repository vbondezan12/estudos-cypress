import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';
describe('vhda: POST payment', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(
    vhdaApi.cypressEnv.loan_number,
    vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn
  );

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });
});