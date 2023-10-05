import { faker } from "@faker-js/faker";
import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    
    it('Get Accounts lookup [200]: verify valid account',() => {
        const account = serviceMacApi.getEnvironment().account 

        serviceMacApi.getAccountLookup(account).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Get Accounts lookup [404]: verify invalid account',() => {
        const account = faker.number.int({ min: 1000000, max: 9999999 })
        serviceMacApi.getAccountLookup(account).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
    
})