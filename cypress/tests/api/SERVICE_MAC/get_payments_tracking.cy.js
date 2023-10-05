import { faker } from "@faker-js/faker";
import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    
    it('Get Payment tracking [200]: verify valid payments tracking',() => {
        const account = serviceMacApi.getEnvironment().account 
        const tracking = serviceMacApi.getEnvironment().tracking

        serviceMacApi.getPaymentsTracking(account,tracking).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.eq(tracking);
        });
    });

    it('Get Payment tracking [404]: verify invalid payments tracking',() => {
        const account = serviceMacApi.getEnvironment().account 
        const tracking = faker.number.int({ min: 1000000, max: 9999999 })

        serviceMacApi.getPaymentsTracking(account,tracking).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
})