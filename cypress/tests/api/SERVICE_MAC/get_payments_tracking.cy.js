import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    
    it('Get Payments [200]: verify valid account',() => {
        const account = 9017353

        serviceMacApi.getPayments(account).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Get Accounts [404]: verify invalid loan has correct error',() => {
        const account = 123456789

        serviceMacApi.getPayments(account).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
})