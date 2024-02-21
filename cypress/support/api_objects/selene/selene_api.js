import xml2js from 'xml2js';
import { SelenePayloadGenerator } from '../../payload_generators/selene/selene_ivr_payment_payload_generator';
import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const baseUrl = Cypress.config().selene.baseUrl;

export default class SeleneApi extends AuthenticationUtils {
  cypressEnv = Cypress.env('selene');
  payloadGenerator = new SelenePayloadGenerator();
  xmlParser = new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: true,
    normalize: true,
    parserNumbers: true,
    parseBooleans: true
  });

  /**
   * Sends a POST request to perform IVR loan number lookup
   *
   * @param {JSON} body - the body of the request
   * @return {Response} the response from the request
   */
  postIvrLoanNumberLookup(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/ivr/vru_lookup`,
      body: body,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  /**
   * Sends a POST request to make a payment for the IVR endpoint
   *
   * @param {JSON} body - the body of the request
   * @return {Response} the response from the IVR payment endpoint
   */
  postIvrPayment(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/ivr/vru_payment`,
      body: body,
      failOnStatusCode: false
    });
  }

  /**
   * Retrieves the validation result for the given ABA number.
   *
   * @param {string} abaNumber - The ABA number to validate.
   * @return {Promise} A Promise that resolves to the validation result.
   */
  getValidateAba(abaNumber) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/ivr/validate/${ abaNumber }`,
      failOnStatusCode: false
    });
  }
}