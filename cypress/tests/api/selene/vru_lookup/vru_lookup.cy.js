import { LOAN_STATUS } from '../../../../config/constants';
import { SeleneApi } from '../../../../support/api_objects/selene/selene_api';

describe('Selene', function () {
  describe('/vru_lookup', function () {
    const seleneApi = new SeleneApi();
    let testCredential;

    before(() => {
      seleneApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    it('VEN-15594_selene_post_vru_lookup_with_valid_loan', () => {
      const payload = seleneApi.payloadGenerator
        .generateLoanLookupPayload(testCredential.loan_number, testCredential.last_4_ssn, testCredential.zip_code);

      seleneApi.postIvrLoanNumberLookup(payload).then((response) => {
        expect(response.status).to.eq(200);

        seleneApi.xmlParser.parseString(response.body, (error, xml) => {
          const loanData = xml[ 'loan-data' ];

          expect(error).to.be.null;
          expect(loanData[ 'loan-number' ]).to.eq(payload.loan.loan_number.toString());
          expect(loanData[ 'users-name' ]).to.eq('Repay Tester');
        });
      });
    });
  });
});