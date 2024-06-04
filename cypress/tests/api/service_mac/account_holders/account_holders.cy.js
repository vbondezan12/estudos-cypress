import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

describe('ServiceMac', function () {
  describe('/account_holders', function () {
    const serviceMacApi = new ServiceMacApi();
    let testCredential;

    before(() => {
      serviceMacApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    it('VEN-15594_servicemac_get_account_holders_with_valid_loan', () => {
      const payload = serviceMacApi.payloadGenerator.generateAccountHoldersPayload(testCredential.loan_number);

      serviceMacApi.getAccountHolder(payload).then((response) => {
        // Verify a loan is found
        expect(response.status).to.eq(200);
        expect(response.body.data.length).to.be.greaterThan(0);

        // Get the loan and assert its attributes
        const loan = response.body.data[ 0 ];
        expect(loan.id).to.eq('99848');
        expect(loan.type).to.eq('account_holder');
        expect(loan.attributes.loan_number).to.eq(testCredential.loan_number.toString());
      });
    });

    it('VEN-15594_servicemac_get_account_holders_with_invalid_loan', () => {
      const payload = serviceMacApi.payloadGenerator.generateAccountHoldersPayload(
        faker.number.int({ min: 1000000, max: 9999999 }));

      serviceMacApi.getAccountHolder(payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.length).to.eq(0);
      });
    });

    xit('Post Account Holder [200]: post valid account_holders holder', () => {
      let payload = serviceMacApi.payloadGenerator.generateData('account_holder', testCredential.loan_number);

      serviceMacApi.postAccountHolder(payload).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.data.id).to.eq(serviceMacApi.cypressEnv.account);
      });
    });

    it('VEN-15594_servicemac_post_account_holders_with_invalid_account_holder', () => {
      const account = faker.number.int({ min: 10000000000, max: 99999999999 });
      const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);

      serviceMacApi.postAccountHolder(payload).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.errors).to.eq('Loan not found');
      });
    });

    it('VEN-15594_servicemac_post_account_holders_without_loan_number_param', () => {
      const account = faker.number.int({ min: 10000000000, max: 99999999999 });
      const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);
      delete payload.data.attributes.loanNumber;

      serviceMacApi.postAccountHolder(payload).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.have.property('loan_number');
        expect(response.body.errors.loan_number).to.be.an('array');
        expect(response.body.errors.loan_number).to.have.length(1);
        expect(response.body.errors.loan_number[ 0 ]).to.equal('can\'t be blank');
      });
    });

    it('VEN-15594_servicemac_post_account_holders_without_ssn_param', () => {
      const account = faker.number.int({ min: 10000000000, max: 99999999999 });
      const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);
      delete payload.data.attributes.ssn;

      serviceMacApi.postAccountHolder(payload).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.have.property('ssn');
        expect(response.body.errors.ssn).to.be.an('array');
        expect(response.body.errors.ssn).to.have.length(1);
        expect(response.body.errors.ssn[ 0 ]).to.equal('can\'t be blank');
      });
    });

    it('VEN-15594_servicemac_post_account_holders_without_name_param', () => {
      const account = faker.number.int({ min: 10000000000, max: 99999999999 });
      const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);
      delete payload.data.attributes.name;

      serviceMacApi.postAccountHolder(payload).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.have.property('name');
        expect(response.body.errors.name).to.be.an('array');
        expect(response.body.errors.name).to.have.length(1);
        expect(response.body.errors.name[ 0 ]).to.equal('can\'t be blank');
      });
    });

    it('VEN-15594_servicemac_post_account_holders_without_all_required_params', () => {
      const account = faker.number.int({ min: 10000000000, max: 99999999999 });
      const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);
      delete payload.data.attributes;

      serviceMacApi.postAccountHolder(payload).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.have.property('name');
        expect(response.body.errors).to.have.property('loan_number');
        expect(response.body.errors).to.have.property('ssn');
        expect(response.body.errors.name).to.be.an('array');
        expect(response.body.errors.loan_number).to.be.an('array');
        expect(response.body.errors.ssn).to.be.an('array');
        expect(response.body.errors.name).to.have.length(1);
        expect(response.body.errors.loan_number).to.have.length(1);
        expect(response.body.errors.ssn).to.have.length(1);
        expect(response.body.errors.name[ 0 ]).to.equal('can\'t be blank');
        expect(response.body.errors.loan_number[ 0 ]).to.equal('can\'t be blank');
        expect(response.body.errors.ssn[ 0 ]).to.equal('can\'t be blank');
      });
    });
  });
});