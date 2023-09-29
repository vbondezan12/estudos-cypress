import { faker } from "@faker-js/faker";
import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    
    it('Get Pay Accounts [200]: verify valid account',() => {
        const account_holder = serviceMacApi.getEnvironment().account_holder

        serviceMacApi.getPayAccounts(account_holder).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data[0].type).to.eq("pay_account");
        });
    });

    it('Get Pay Accounts [404]: verify invalid account',() => {
        const account_holder = faker.number.int({ min: 1000000, max: 9999999 })

        serviceMacApi.getPayAccounts(account_holder).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
})