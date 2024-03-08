import xml2js from 'xml2js';
import { AUTHENTICATION_TYPE } from '../../../config/constants';
import { SelenePayloadGenerator } from '../../payload_generators/selene/selene_payload_generator';
import { MockLoanServiceApi } from '../mock_loan_service/mock_loan_service_api';

const baseUrl = `${ Cypress.config().selene.baseUrl }/api/v1`;

export class SeleneApi extends MockLoanServiceApi {
  payloadGenerator = new SelenePayloadGenerator();

  xmlParser = new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: true,
    normalize: true,
    parserNumbers: true,
    parseBooleans: true
  });


  /**
   * POST call to look up a loan
   * @param body The request body
   * @returns {Cypress.Chainable<Cypress.Response<any>>}
   */
  postIvrLoanNumberLookup(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/ivr/vru_lookup`,
      body: body,
      failOnStatusCode: false
    });
  }

  /**
   * POST call to make a payment
   * @param body The request body
   * @returns {Cypress.Chainable<Cypress.Response<any>>}
   */
  postIvrPayment(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/ivr/vru_payment`,
      body: body,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  /**
   * GET call to validate ABA number
   * @param abaNumber - The ABA number
   * @returns {Cypress.Chainable<Cypress.Response<any>>}
   */
  getValidateAba(abaNumber) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/ivr/validate/${ abaNumber }`,
      failOnStatusCode: false
    });
  }
}