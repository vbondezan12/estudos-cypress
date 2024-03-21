import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

describe('API Tests: ServiceMac', function () {
  const serviceMacApi = new ServiceMacApi();

  xit('Post Token [200]: valid Token', () => {
    let payload = serviceMacApi.payloadGenerator.generateData('account_holder');
    serviceMacApi.postToken(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.be.a('string');
    });
  });

  it('Post Token [500]: invalid Token', () => {
    let payload = serviceMacApi.payloadGenerator.generateData('account_holder');
    delete payload.data;
    serviceMacApi.postToken(payload).then((response) => {
      expect(response.status).to.eq(500);
    });
  });
});