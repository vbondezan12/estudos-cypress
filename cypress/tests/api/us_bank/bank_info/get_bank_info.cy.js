import { UsBankApi } from '../../../../support/api_objects/us_bank/us_bank_api';

describe('US Bank: Bank Info', function () {
  const usBankApi = new UsBankApi();

  it('Get Bank Info: verify valid bank returns correct data', () => {
    const queryParameters = {
      'client_id': usBankApi.cypressEnv.client_id,
      'routing_number': usBankApi.cypressEnv.routing_number
    };

    usBankApi.getBankInfo(queryParameters).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bank_name).to.eq('US BANK NA');
      expect(response.body.found).to.eq(true);
      expect(response.body.waived_fee).to.eq(true);
    });
  });
});