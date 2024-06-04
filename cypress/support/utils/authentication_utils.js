import { AUTHENTICATION_TYPE } from '../../config/constants';

const defaultHeader = require('../../fixtures/default_header.json');
const xAuthTokenHeader = require('../../fixtures/x_auth_token_header.json');

export class AuthenticationUtils {

  /**
   * Update the headers with proper authorization
   * @param authenticationType The type of authentication
   * @returns {{Accept: string, Authorization: string, 'Content-Type': string}}
   */
  updateHeaderAuthorization(authenticationType) {
    switch (authenticationType) {
      case AUTHENTICATION_TYPE.BASIC:
        this.headers = defaultHeader;
        this.headers.Authorization = `${ authenticationType } ${ Cypress.config().basicToken }`;
        break;
      case AUTHENTICATION_TYPE.BEARER:
        this.headers = defaultHeader;
        this.headers.Authorization = `${ authenticationType } ${ Cypress.config().bearerToken }`;
        break;
      case AUTHENTICATION_TYPE.X_AUTH:
        this.headers = xAuthTokenHeader;
        this.headers[ 'x-auth-token-headers' ] = Cypress.config().xAuthToken;
        break;
    }

    return this.headers;
  }
}