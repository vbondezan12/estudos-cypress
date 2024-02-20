import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';
const authenticationUtils = new AuthenticationUtils();
const baseUrl = Cypress.config().launch.baseUrl;

export class LaunchApi {
  cypressEnv = Cypress.env('launch');

  getPayAccounts() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/pay_accounts`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }
}