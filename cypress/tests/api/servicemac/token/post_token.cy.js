import { ServiceMacApi } from '../../../../support/api_objects/servicemac/servicemac_api';
import { ServiceMacToken } from 'cypress/support/payload_generators/service_mac/service_mac_token';

describe('API Tests: servicemac', function () {
  const serviceMacApi = new ServiceMacApi();
  const serviceMacPayloadGenerator = new ServiceMacToken();

  it('Post Token [200]: valid Token', () => {
    let payload = serviceMacPayloadGenerator.generateData();
    serviceMacApi.postToken(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.be.a('string');
    });
  });

  it('Post Token [500]: invalid Token', () => {
    let payload = serviceMacPayloadGenerator.generateData();
    delete payload.data;
    serviceMacApi.postToken(payload).then((response) => {
      expect(response.status).to.eq(500);
    });
  });
});