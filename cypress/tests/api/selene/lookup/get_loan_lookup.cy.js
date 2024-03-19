import { LOAN_STATUS } from '../../../../config/constants';
import { SeleneApi } from '../../../../support/api_objects/selene/selene_api';

describe('API Tests: Selene loan lookup', function () {
  const seleneApi = new SeleneApi();
  let testCredential;

  before(() => {
    const testPayload = seleneApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    seleneApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body['test_credentials'][0];
    });
  });

  it('Successful lookup returns loan number', () => {
    const payload = seleneApi.payloadGenerator
      .generateLoanLookupPayload(testCredential.loan_number, testCredential.last_4_ssn, testCredential.zip_code);

    seleneApi.postIvrLoanNumberLookup(payload).then((response) => {
      expect(response.status).to.eq(200);

      seleneApi.xmlParser.parseString(response.body, (error, xml) => {
        const loanData = xml['loan-data'];

        expect(error).to.be.null;
        expect(loanData['loan-number']).to.eq(payload.loan.loan_number.toString());
        expect(loanData['users-name']).to.eq('Repay Tester');
      });
    });
  });
});