import { faker } from "@faker-js/faker";
import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    
    it('Get Payment tracking [200]: verify valid payments',() => {
        const account = serviceMacApi.getEnvironment().account

        serviceMacApi.getPayments(account).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.eq(serviceMacApi.getEnvironment().tracking);
        });
    });

    it('Get Payments [404]: verify invalid payments',() => {
        const account = faker.number.int({ min: 1000000, max: 9999999 })

        serviceMacApi.getPayments(account).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
})