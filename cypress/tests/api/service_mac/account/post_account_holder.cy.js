import { faker } from '@faker-js/faker';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

describe('API Tests: ServiceMac', function () {
  const serviceMacApi = new ServiceMacApi();

  it('Post Account Holder [200]: post valid account holder', () => {

    const loanNumber = serviceMacApi.cypressEnv.loan_number;
    let payload = serviceMacApi.payloadGenerator.generateData('account_holder', loanNumber);

    serviceMacApi.postAccountHolder(payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.id).to.eq(serviceMacApi.cypressEnv.account);
    });
  });

  it('Post Account Holder [404]: post invalid account holder', () => {
    const account = faker.number.int({ min: 10000000000, max: 99999999999 });
    const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);

    serviceMacApi.postAccountHolder(payload).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.errors).to.eq('Loan not found');
    });
  });

  it('Post Account Holder [422]: Loan Number field mandatory', () => {
    const account = faker.number.int({ min: 10000000000, max: 99999999999 });
    const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);
    delete payload.data.attributes.loanNumber;

    serviceMacApi.postAccountHolder(payload).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('loan_number');
      expect(response.body.errors.loan_number).to.be.an('array');
      expect(response.body.errors.loan_number).to.have.length(1);
      expect(response.body.errors.loan_number[0]).to.equal('can\'t be blank');
    });
  });

  it('Post Account Holder [422]: ssn field mandatory', () => {
    const account = faker.number.int({ min: 10000000000, max: 99999999999 });
    const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);
    delete payload.data.attributes.ssn;

    serviceMacApi.postAccountHolder(payload).then((response) => {

      expect(response.status).to.eq(422);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('ssn');
      expect(response.body.errors.ssn).to.be.an('array');
      expect(response.body.errors.ssn).to.have.length(1);
      expect(response.body.errors.ssn[0]).to.equal('can\'t be blank');
    });
  });

  it('Post Account Holder [422]: name field mandatory', () => {
    const account = faker.number.int({ min: 10000000000, max: 99999999999 });
    const payload = serviceMacApi.payloadGenerator.generateData('account_holder', account);
    delete payload.data.attributes.name;

    serviceMacApi.postAccountHolder(payload).then((response) => {

      expect(response.status).to.eq(422);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('name');
      expect(response.body.errors.name).to.be.an('array');
      expect(response.body.errors.name).to.have.length(1);
      expect(response.body.errors.name[0]).to.equal('can\'t be blank');
    });
  });

  it('Post Account Holder [422]: All mandatory fields', () => {
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
      expect(response.body.errors.name[0]).to.equal('can\'t be blank');
      expect(response.body.errors.loan_number[0]).to.equal('can\'t be blank');
      expect(response.body.errors.ssn[0]).to.equal('can\'t be blank');
    });
  });
});