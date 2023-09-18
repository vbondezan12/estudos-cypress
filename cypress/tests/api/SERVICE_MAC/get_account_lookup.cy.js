import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/serviceMac_account"

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    
    it('Get Accounts [SUCCESS]: verify valid account',() => {
        const account = 9017353

        serviceMacApi.getAccountLookup(account).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Get Accounts [FAIL]: verify invalid loan has correct error',() => {
        const account = 123456789

        serviceMacApi.getAccountLookup(account).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
    
})