import { faker } from '@faker-js/faker';
import { CLIENT } from '../../../config/constants';
import { MockLoanServicePayloadGenerator } from '../mock_loan_service/mock_loan_service_payload_generator';

export class SelenePayloadGenerator extends MockLoanServicePayloadGenerator {


  generatePayment(loan) {
    let jsonData = {
      payment: {
        payment_amount: `${ `${ faker.number.int({ min: 0, max: 100 }) }` }`,
        escrow: faker.finance.amount(),
        nsf_fees_paid: faker.finance.amount(),
        escrow_shortage: 'false',
        other_fees_paid: faker.finance.amount(),
        apply_towards_principal: faker.finance.amount(),
        late_fees_paid: faker.finance.amount(),
        total_amount_due: null,
        payment_array: [],
        post_date: faker.date.soon(),
        pay_account_id: '',
        loan_number: loan.loan_number,
        ssn: loan.last_4_ssn,
        pay_account: {
          payment_type_id: '1',
          account_number: '844545434',
          aba: '111000614',
          name_on_account: faker.person.fullName(),
          nickname: '',
          account_checking: 'true',
          account_business: 'false',
          save_pay_account: 'false',
          default: 'false'
        }
      },
      request_key: '9020268'
    };

    jsonData.payment.total_amount_due = `${ Number(jsonData.payment.payment_amount) +
    Number(jsonData.payment.escrow) +
    Number(jsonData.payment.nsf_fees_paid) +
    Number(jsonData.payment.other_fees_paid) +
    Number(jsonData.payment.late_fees_paid) +
    Number(jsonData.payment.apply_towards_principal) }`;

    jsonData.payment.payment_array = [ jsonData.payment.total_amount_due ];

    return jsonData;
  }

  /**
   * Generates a payload for looking up a loan.
   *
   * @param {Number} loanNumber - The loan number
   * @param {Number} ssn - The last 4 digits of the SSN
   * @param {Number} zip - The 5-digit zip code
   * @return {{loan: {zip: Number, loan_number: Number, ssn: Number}}} The payload
   */
  generateLoanLookupPayload(loanNumber, ssn, zip) {
    return {
      loan: {
        loan_number: loanNumber,
        ssn: ssn,
        zip: zip
      }
    };
  }

  /**
   * Generate a JSON payload for fetching test credentials
   * @param loanStatus Status of the loan
   * @returns {{loan_status: *, environment: *, client_id: *}}
   */
  generateTestCredentialsLookupPayload(loanStatus) {
    return super.generateTestCredentialsLookupPayload(CLIENT.SELENE, loanStatus);
  }
}
