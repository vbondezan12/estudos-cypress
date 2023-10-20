import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const base_url = Cypress.config().launch.base_url;

export class LaunchApi {
    cypressEnv = Cypress.env('launch');

    getPayAccounts() {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/pay_accounts`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }
}