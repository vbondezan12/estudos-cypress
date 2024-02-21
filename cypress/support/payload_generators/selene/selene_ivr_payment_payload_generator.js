import { faker } from '@faker-js/faker';
import moment from 'moment';

const randomMonth = faker.number.int({ min: 1, max: 12 });
const randomDay = faker.number.int({ min: 1, max: 30 });
const randomDate = moment(
  `2024-${ randomMonth.toString().padStart(2, '0') }-${ randomDay.toString().padStart(2, '0') }`).format('YYYY-MM-DD');

export class SelenePayloadGenerator {
  generatePayment() {
    let jsonData = {
      payment: {
        payment_amount: `${ `${ faker.number.int({ min: 0, max: 100 }) }` }`,
        escrow: '0',
        nsf_fees_paid: '0',
        escrow_shortage: 'false',
        other_fees_paid: '0',
        apply_towards_principal: '0',
        late_fees_paid: '0',
        total_amount_due: null,
        payment_array: [],
        post_date: randomDate,
        pay_account_id: '',
        loan_number: '2004984585',
        ssn: '0762',
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
    jsonData.payment.total_amount_due = `${ Number(jsonData.payment.payment_amount) + Number(
      jsonData.payment.escrow) + Number(jsonData.payment.nsf_fees_paid) + Number(
      jsonData.payment.other_fees_paid) + Number(jsonData.payment.late_fees_paid) + Number(
      jsonData.payment.apply_towards_principal) }`;
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
}
