import { faker } from "@faker-js/faker";
import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"
import { ServiceMacLoanPaymentAccount } from "../../../support/payload_generators/service_mac/service_mac_loan_payment_account";

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    const serviceMacPayloadGenerator = new ServiceMacLoanPaymentAccount();
    
    it('Post Account Holder [200]: post valid account holder',() => {

        const loan_number = serviceMacApi.getEnvironment().loan_number
        let payload = serviceMacPayloadGenerator.generateData(loan_number);
        cy.log(JSON.stringify(payload))        

        serviceMacApi.postAccountHolder(payload).then((response) => {
            
            expect(response.status).to.eq(201);
            expect(response.body.data.id).to.eq(serviceMacApi.getEnvironment().account);
        });
    });

    it('Post Account Holder [404]: post invalid account holder',() => {
        const account = faker.number.int({ min: 10000000000, max: 99999999999 })
        const payload = serviceMacPayloadGenerator.generateData(account)

        serviceMacApi.postAccountHolder(payload).then((response) => {
            
            expect(response.status).to.eq(404);
            expect(response.body.errors).to.eq('Loan not found');
        });
    });
})