import moment from "moment";
import { UsbPaymentApi } from "../../../support/api_objects/USB/usb_payment"
import { UsbPaymentPayloadGenerator } from "../../../support/payload_generators/USB/usb_payment_payload_generator";

describe('API Tests: VHDA', function() {
    const usbApi = new UsbPaymentApi();
    const usbPayloadGenerator = new UsbPaymentPayloadGenerator();

    it('Create Payment: verify valid payment data creates a payment',() => {
        
        let payment_payload = usbPayloadGenerator.generateData("515","2200020541");
        payment_payload.data.attributes.post_date = moment().endOf('month').format("YYYY-MM-DD")
        payment_payload.data.attributes.email = "example_test@demo.com"

        cy.log(payment_payload)

        // usbApi.createPayment(payment_payload).then((response) => {
        //     expect(response.status).to.eq(200);
        // });

    });

    
})