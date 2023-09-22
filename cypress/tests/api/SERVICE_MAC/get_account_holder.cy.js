import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    const environment = Cypress.env('service_mac');
    // const credentials = vhdaPayloadGenerator.quick_pay(environment.loan_number, environment.zip, environment.ssn);
    
    it('Get Account Holder: verify valid loan response',() => {
        const queryParameters = {"loan_number": "9831000100"}
        
        serviceMacApi.getAccountHolder(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.eq('Invalid Account Number or Product Id. Please validate and resubmit');
        });
    });

    it('Get Accounts [FAIL]: verify invalid loan has correct error',() => {
        const account = 123456789

        serviceMacApi.getAccountLookup(account).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
    
})