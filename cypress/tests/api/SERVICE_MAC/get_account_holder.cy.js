import { faker } from "@faker-js/faker";
import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    
    it('Get Account Holder[200]: verify valid loan response',() => {
        const queryParameters = {
            'loan_number': serviceMacApi.getEnvironment().loan_number
        }        
        serviceMacApi.getAccountHolder(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            
        });
    });
    it('Get Account Holder[404]: verify invalid loan has correct error',() => {
        const queryParameters = {
            'loan_number': faker.number.int({ min: 1000000, max: 9999999 })
        }
        serviceMacApi.getAccountHolder(queryParameters).then((response) => {
            //TODO
            expect(response.status).to.eq(404);
        });
    });
    
})