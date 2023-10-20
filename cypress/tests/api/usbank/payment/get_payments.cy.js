import { UsBankApi } from '../../../../support/api_objects/usbank/usbank_api'

describe('US Bank: Payment', function () {
    const usbApi = new UsBankApi();

    it('Get Payments: verify type and account_holder_id for each record', () => {
        const queryParameters = { 'loan_number': '10916454', 'client_id': '515' }

        usbApi.getPayments(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            const accountsList = response.body.data;
            accountsList.forEach((account) => {
                expect(account.type).to.eq('payment')
                expect(account.id).to.eq(String(account.attributes.tracking))
            });
        });
    });
})