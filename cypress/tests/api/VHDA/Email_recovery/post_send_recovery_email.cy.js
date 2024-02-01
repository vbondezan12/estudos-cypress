import { faker } from '@faker-js/faker';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';
import { VhdaPayloadGenerator } from '../../../../support/payload_generators/vhda/vhda_payload_generator';

describe('VHDA: Send Recovery Email', function () {
    const vhdaApi = new VhdaApi();
    const credentials = vhdaApi.payloadGenerator.quick_pay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);
    let email = vhdaApi.payloadGenerator.resend_recovery_email(vhdaApi.cypressEnv.user_name);
    let invalidemail = vhdaApi.payloadGenerator.resend_recovery_email(`${faker.string.uuid}`);

    beforeEach(() => {
        vhdaApi.createQuickPayJwt(credentials);
    })

    it('Send Recovery Email:Verify valid email Id send recovery email', () => {
        vhdaApi.resendRecoveryEmail(email).then((response) => {
            expect(response.status).to.eq(204);
        });
    })

    it('Send Recovery Email:Verify invalid email Id gives an error', () => {
        vhdaApi.resendRecoveryEmail(invalidemail).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

})