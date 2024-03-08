import { LOAN_STATUS } from '../../../../config/constants';
import { SeleneApi } from '../../../../support/api_objects/selene/selene_api';

describe('API Tests: Selene loan lookup', function () {
  const seleneApi = new SeleneApi();
  let test_credential;

  before(() => {
    const testPayload = seleneApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    seleneApi.getTestLoans(testPayload).then((response) => {
      test_credential = response.body['test_credentials'][0];
    });
  });

  it('Successful lookup returns loan number', () => {
    const payload = seleneApi.payloadGenerator
      .generateLoanLookupPayload(test_credential.loan_number, test_credential.last_4_ssn, test_credential.zip_code);

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