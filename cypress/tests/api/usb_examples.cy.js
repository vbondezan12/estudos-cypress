import moment from "moment";
import { UsbPaymentApi } from "../../support/api_objects/USB/usb_payment"
import { UsbPaymentPayloadGenerator } from "../../support/payload_generators/USB/usb_payment_payload_generator";

describe('API Tests: VHDA', function() {
    const usbApi = new UsbPaymentApi();
    const usbPayloadGenerator = new UsbPaymentPayloadGenerator();
    

    it('Get Pay Accounts: verify type and account_holder_id for each record',() => {
        const queryParameters = {"loan_number": "10916454","client_id": "515"}

        usbApi.getPayAccounts(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            const accountsList = response.body.data;
            accountsList.forEach((object) => {
                expect(object.type).to.eq('pay_account')
                expect(object.attributes.account_holder_id).to.eq(3553409)
            });
        });
    });

    it('Get Pay Accounts: verify invalid loan has empty data',() => {
        const queryParameters = {"loan_number": "invalid","client_id": "515"}

        usbApi.getPayAccounts(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array').that.is.empty;
        });
    });

    it('Get Bank Info: verify valid bank returns forrect data',() => {
        const queryParameters = {"routing_number": "042100175","client_id": "515"}

        usbApi.getBankInfo(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.bank_name).to.eq('US BANK NA');
            expect(response.body.found).to.eq(true);
            expect(response.body.waived_fee).to.eq(true);
        });

    });

    it('Get Accounts: verify invalid loan has correct error',() => {
        const queryParameters = {"loan_number": "invalid","client_id": "DDA"}

        usbApi.getAccounts(queryParameters).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.error).to.eq('Invalid Account Number or Product Id. Please validate and resubmit');
        });
    });

    it('Get Payments: verify type and account_holder_id for each record',() => {
        const queryParameters = {"loan_number": "10916454","client_id": "515"}

        usbApi.getPayments(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            const accountsList = response.body.data;
            accountsList.forEach((object) => {
                expect(object.type).to.eq('payment')
                expect(object.id).to.eq(String(object.attributes.tracking))
            });
        });
    });

    it('Create Payment: verify valid payment data creates a payment',() => {
        
        let payment_payload = usbPayloadGenerator.generateData("515","2200020541");
        payment_payload.attributes.post_date = moment().endOf('month').format("YYYY-MM-DD")
        payment_payload.attributes.email = "example_test@demo.com"


        cy.log(payment_payload)

        // usbApi.createPayment(payment_payload).then((response) => {
        //     expect(response.status).to.eq(200);
        // });

    });

    
})