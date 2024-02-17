const defaultHeader = require('../../fixtures/default_header.json');
const xAuthTokenHeader = require('../../fixtures/x_auth_token_header.json');

export class AuthenticationUtils {
  updateHeaderAuthorization(type, token) {
    if (type === 'x-auth') {
      this.headers = xAuthTokenHeader;
      this.headers['x-auth-token-headers'] = token;
    } else {
      this.headers = defaultHeader;
      this.headers.Authorization = `${ type } ${ token }`;
    }

    return this.headers;
  }

  getAuthToken(token) {
    return token ? token : window.sessionStorage.getItem('session_auth_token');
  }
}