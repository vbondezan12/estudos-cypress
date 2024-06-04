import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

describe('ServiceMac', function () {
  describe('/accounts', function () {
    const serviceMacApi = new ServiceMacApi();
    let testCredential;

    before(() => {
      serviceMacApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    xit('Get Accounts vru_lookup [200]: verify valid account_holders', () => {
      const account = testCredential.loan_number;

      serviceMacApi.getAccountLookup(account).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it('VEN-15594_servicemac_get_accounts_with_invalid_account_holder', () => {
      const account = faker.number.int({ min: 1000000, max: 9999999 });
      serviceMacApi.getAccountLookup(account).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});