import { faker } from "@faker-js/faker";
import { ServiceMacAccount } from "../../../support/api_objects/ServiceMac/service_mac_account"
import { ServiceMacLoanPaymentAccount } from "../../../support/payload_generators/service_mac/service_mac_loan_payment_account";
const moment = require('moment');

describe('API Tests: SERVICE_MAC', function() {
    const serviceMacApi = new ServiceMacAccount();
    const serviceMacPayloadGenerator = new ServiceMacLoanPaymentAccount();
    
    it('Post Loan Payment Account [200]: post valid account holder',() => {

        let payload = serviceMacPayloadGenerator.generateData();
        cy.log(JSON.stringify(payload))        

        serviceMacApi.postLoanPaymentAccount(payload).then((response) => {
            
            expect(response.status).to.eq(201);
            expect(response.body.data.attributes.transaction_date).to.eq(moment().format('YYYY-MM-DD'));
        });
    });

    it('Post Loan Payment Account [422]: post invalid account holder',() => {
        const payload = serviceMacPayloadGenerator.generateData()

        serviceMacApi.postLoanPaymentAccount(payload).then((response) => {
            
            expect(response.status).to.eq(422);
            expect(response.body.errors).to.eq('Loan not found');
        });
    });
})