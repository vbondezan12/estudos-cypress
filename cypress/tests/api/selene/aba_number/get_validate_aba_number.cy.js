import { faker } from '@faker-js/faker';
import SeleneApi from '../../../../support/api_objects/selene/selene_api';

describe('API Tests: Selene ABA Number', function () {
  const seleneApi = new SeleneApi();

  it('Get ABA number [200]: verify valid aba number', () => {
    const abaNumber = seleneApi.cypressEnv.aba_number;
    const abaAuthorization = seleneApi.cypressEnv.aba_authorization;
    seleneApi.getValidateAba(abaNumber, abaAuthorization).then(response => {
      expect(response.status).to.eq(200);
      cy.wrap(Cypress.$(response.body))
        .then(xml => xml.filter('aba').find('aba').text())
        .should('eq', '111000614');
      cy.wrap(Cypress.$(response.body))
        .then(xml => xml.filter('aba').find('name').text())
        .should('eq', 'JPMORGAN CHASE BANK, NA');
    });
  });

  it('Get ABA number [404]: verify invalid aba number', () => {
    const invalidAbaNumber = faker.number.int({ min: 10000000000, max: 99999999999 });
    seleneApi.getValidateAba(invalidAbaNumber).then(response => {
      cy.wrap(Cypress.$(response.body))
        .then(xml => xml.filter('aba').find('error').text())
        .should('eq', 'ABA is not a valid');
      expect(response.status).to.eq(200);
    });
  });
});