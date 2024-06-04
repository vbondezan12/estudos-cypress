import { faker } from '@faker-js/faker';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

describe('ServiceMac', function () {
  describe('/tracking', function () {
    const serviceMacApi = new ServiceMacApi();

    xit('Get Payment tracking [200]: verify valid vru_payment tracking', () => {
      const account = serviceMacApi.cypressEnv.account;
      const tracking = serviceMacApi.cypressEnv.tracking;

      serviceMacApi.getPaymentsTracking(account, tracking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(tracking);
      });
    });

    xit('Get Payment tracking [404]: verify invalid vru_payment tracking', () => {
      const account = serviceMacApi.cypressEnv.account;
      const tracking = faker.number.int({ min: 1000000, max: 9999999 });

      serviceMacApi.getPaymentsTracking(account, tracking).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});