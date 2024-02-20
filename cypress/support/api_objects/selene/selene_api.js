import { SelenePayloadGenerator } from '../../payload_generators/selene/selene_ivr_payment_payload_generator';
import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const baseUrl = Cypress.config().selene.baseUrl;

export default class SeleneApi extends AuthenticationUtils {
  cypressEnv = Cypress.env('selene');

  payloadGenerator = new SelenePayloadGenerator();


  postIVRLoanNumberLookup(payload) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/ivr/vru_lookup`,
      body: payload,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  postIvrPayment(payload) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/ivr/vru_payment`,
      body: payload,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getValidateAba(abaNumber, abaAuthorization) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/ivr/validate/${ abaNumber }`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, abaAuthorization)
    });
  }
}