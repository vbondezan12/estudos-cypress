import { faker } from '@faker-js/faker';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';
import { VhdaPayloadGenerator } from '../../../../support/payload_generators/vhda/vhda_payload_generator';

describe('VHDA: Create Loan', function () {
    const vhdaApi = new VhdaApi();
    const credentials = vhdaApi.payloadGenerator.quick_pay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);
    let loanrequest = vhdaApi.payloadGenerator.new_loan(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);
    let jwt = null;
    let invalidcred = faker.string.uuid;
    before(() => {
       vhdaApi.createQuickPayJwt(credentials);
       
    })
    it('Create Loan:Verify valid loan data creates a new loan',()=>{
        vhdaApi.newLoan(loanrequest).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.not.equal(null);  
    });
    }
    )

    it('Create Loan:Verify invalid token gives Authentication error', () => {
        vhdaApi.newLoan(loanrequest,invalidcred).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    


})