import SeleneApi from '../../../../support/api_objects/selene/selene_api';

describe('API Tests: Selene loan lookup', function () {
  const seleneApi = new SeleneApi();

  it('Successful lookup returns loan number', () => {
    const payload = seleneApi.payloadGenerator.generateLoanLookupPayload(
      8675309,
      1111,
      11111);

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